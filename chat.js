import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_CANDIDATES = ["gemini-2.0-flash", "gemini-2.5-flash", "gemini-2.0-flash-lite"];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Solo POST");

  try {
    const { pregunta, mensajeUsuario } = req.body || {};
    const consulta = (pregunta || mensajeUsuario || "").toString().trim();

    if (!consulta) {
      return res.status(400).json({ error: "Falta la pregunta del usuario." });
    }

    const rutaArchivo = path.join(process.cwd(), "api", "leyes.json");
    const datosLeyes = fs.readFileSync(rutaArchivo, "utf8");

    const instruccionSistema = `
Sos "LeyesBot", un experto legal argentino.
Tu única fuente de verdad son estos proyectos de ley: ${datosLeyes}.

Reglas:
1. Solo respondé basándote en la info que te pasé.
2. Si te preguntan algo que NO está en los proyectos, decí: "Esa información no figura en los proyectos actuales".
3. Sé amable pero técnico.
4. Si citás un proyecto, incluí su ID (ejemplo: 2505-D-2023).
`;

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

    throw lastError || new Error("No se pudo usar ningún modelo de Gemini");
  } catch (error) {
    console.error("/api/chat error:", error);
    return res.status(500).json({
      error: "Hubo un problema al procesar las leyes.",
      detalle: error?.message || "Error desconocido",
    });
  }
}
