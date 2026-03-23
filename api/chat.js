import fs from "fs";
import path from "path";

const MODEL_CANDIDATES = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-2.0-flash-lite"];

function fallbackFromContext(consulta, contexto) {
  const q = (consulta || "").toLowerCase();
  const items = Array.isArray(contexto) ? contexto : [];
  if (!items.length) return "Esa información no figura en los proyectos actuales";

  const idMatch = q.match(/\b\d{4}-d-\d{4}\b/i);
  if (idMatch) {
    const id = idMatch[0].toUpperCase();
    const found = items.find((x) => (x.id || x.expediente || "").toUpperCase() === id);
    if (found) {
      const titulo = found.titulo || found.desc || "Sin título";
      const resumen = found.resumen || found.desc || "Sin resumen";
      const autor = found.autor_principal || found.autor || "Sin autor";
      const bloque = found.bloque || "Sin bloque";
      return `${id}: ${titulo}\nAutor: ${autor}\nBloque: ${bloque}\nResumen: ${resumen}`;
    }
  }

  const words = q.split(/\s+/).filter((w) => w.length > 3);
  const scored = items
    .map((x) => {
      const text = `${x.titulo || ""} ${x.resumen || ""} ${x.desc || ""}`.toLowerCase();
      let score = 0;
      words.forEach((w) => {
        if (text.includes(w)) score += 1;
      });
      return { x, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!scored.length) return "Esa información no figura en los proyectos actuales";

  const lines = scored.map(({ x }) => {
    const id = x.id || x.expediente || "Sin ID";
    const titulo = x.titulo || x.desc || "Sin título";
    const autor = x.autor_principal || x.autor || "Sin autor";
    return `• ${id}: ${titulo} (Autor: ${autor})`;
  });
  return `Encontré estos proyectos relacionados:\n${lines.join("\n")}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Solo POST");

  try {
    const { pregunta, mensajeUsuario, contexto, scope } = req.body || {};
    const consulta = (pregunta || mensajeUsuario || "").toString().trim();

    if (!consulta) {
      return res.status(400).json({ error: "Falta la pregunta del usuario." });
    }

    let datosLeyes = "";
    let contextoArray = null;
    if (contexto && (Array.isArray(contexto) || typeof contexto === "object")) {
      datosLeyes = JSON.stringify(contexto);
      if (Array.isArray(contexto)) contextoArray = contexto;
    } else {
      const rutaArchivo = path.join(process.cwd(), "api", "leyes.json");
      datosLeyes = fs.readFileSync(rutaArchivo, "utf8");
      try {
        const parsed = JSON.parse(datosLeyes);
        if (Array.isArray(parsed?.proyectos)) contextoArray = parsed.proyectos;
        else if (Array.isArray(parsed?.bills)) contextoArray = parsed.bills;
      } catch (_) {}
    }

    const alcance = scope === "cyt"
      ? "Ciencia y Tecnología"
      : scope === "ia"
      ? "Inteligencia Artificial"
      : "General";

    const instruccionSistema = `
Sos "LeyesBot", un experto legal argentino.
Estás atendiendo el dashboard: ${alcance}.
Tu única fuente de verdad son estos proyectos de ley: ${datosLeyes}.

Reglas:
1. Solo respondé basándote en la info que te pasé.
2. Si te preguntan algo que NO está en los proyectos, decí: "Esa información no figura en los proyectos actuales".
3. Sé amable pero técnico.
4. Si citás un proyecto, incluí su ID (ejemplo: 2505-D-2023).
`;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        texto: fallbackFromContext(consulta, contextoArray),
        model: "fallback-local",
      });
    }

    let GoogleGenerativeAI;
    try {
      ({ GoogleGenerativeAI } = await import("@google/generative-ai"));
    } catch (err) {
      return res.status(200).json({
        texto: fallbackFromContext(consulta, contextoArray),
        model: "fallback-local",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    let lastError = null;
    for (const modelName of MODEL_CANDIDATES) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent([instruccionSistema, consulta]);
        const response = await result.response;
        return res.status(200).json({ texto: response.text(), model: modelName });
      } catch (err) {
        lastError = err;
      }
    }

    return res.status(200).json({
      texto: fallbackFromContext(consulta, contextoArray),
      model: "fallback-local",
      note: lastError?.message || "Sin modelo Gemini disponible",
    });
  } catch (error) {
    console.error("/api/chat error:", error);
    return res.status(500).json({
      error: "Hubo un problema al procesar las leyes.",
      detalle: error?.message || "Error desconocido",
    });
  }
}
