# Monitor de la Comisión de Ciencia y Tecnología (HCDN)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

El **Monitor de la Comisión de Ciencia y Tecnología** es una plataforma web de código abierto diseñada para explorar, analizar y navegar las leyes, consensos y discusiones legislativas del Honorable Congreso de la Nación (HCDN) en Argentina. 

Esta herramienta es utilizada activamente por la comisión y nace con la profunda vocación de **modernizar la forma en la que hacemos leyes**, aportando transparencia, agilidad y un riguroso análisis de datos (especialmente en áreas de Inteligencia Artificial, Ciencia y Tecnología) al proceso parlamentario.

---

## 🎯 ¿Para qué sirve esta herramienta?

El Monitor fue construido para asistir a legisladores, equipos de asesores, investigadores y ciudadanos a comprender un alto volumen de información parlamentaria en segundos. Sus principales funciones son:
- **Visualizar de forma interactiva** el avance y estado de los proyectos legislativos de la comisión.
- **Identificar consensos** a través del análisis de co-autorías y firmas transversales entre diferentes bloques políticos.
- **Interactuar con el corpus normativo** usando un asistente avanzado de Inteligencia Artificial (LeyesBot) que responde preguntas técnicas con extrema precisión.

---

## 🧭 Guía de Uso del Monitor

### 1. Dashboard Principal y Métricas
Al ingresar a la plataforma, encontrarás indicadores clave actualizados, como:
- Total de Proyectos Activos.
- Proyectos con media sanción.
- Distribución de temáticas (Inteligencia Artificial, Ciencia de Datos, Ciberseguridad, etc.).
- Participación por bloque político.

Todos los gráficos son **interactivos**. Al hacer clic en una porción de un gráfico de red o de torta, la tabla de proyectos inferior se filtrará automáticamente para mostrar solo los datos relevantes.

### 2. Tabla de Proyectos (Explorador)
En la sección principal inferior se encuentra el motor de búsqueda y exploración:
- **Buscador Inteligente:** Escribe palabras clave (ej. "privacidad", "presupuesto") para encontrar al instante todos los proyectos vinculados.
- **Detalle de Leyes:** Al hacer clic en un proyecto de la lista, se desplegará una vista extensa mostrando el tipo de proyecto, expediente, fecha, extracto y un enlace directo a descargar u observar el PDF original del HCDN.

### 3. LeyesBot (Asistente de Inteligencia Artificial)
Situada en un panel lateral interactivo, encontrarás a **LeyesBot**, tu asistente jurídico virtual.
- Puedes hacerle consultas en lenguaje natural (ej. *"¿Qué proyectos hablan de regulación de algoritmos y quiénes los firman?"*).
- El chatbot está restringido y calibrado **exclusivamente** con el contenido de los proyectos subidos al monitor, impidiendo que invente respuestas (alucinaciones) y asegurando rigor técnico institucional.

### 4. Flujo de Co-Autorías (Mapa de Consensos)
Una herramienta gráfica que mapea cómo los diferentes legisladores y bloques cruzan sus firmas en un mismo proyecto de ley, permitiendo observar claramente dónde radican los mayores consensos ideológicos para empujar una iniciativa.

---

## 🏛️ Origen de los Datos (Transparencia)

Los datos presentados provienen directamente de la extracción técnica de los Documentos y PDF Oficiales de Trámite Parlamentario provistos por el HCDN. El pipeline de datos automatizado ordena, consolida y digitaliza toda esta información para su ágil interpretación gráfica.

## 🤝 Repositorio y Código Abierto

Este Monitor es de código abierto (Licencia MIT) bajo la administración de **Colossus Lab**. Si bien su misión es asistir a la Comisión de Ciencia y Tecnología, cualquier equipo parlamentario, desarrollador u ONG puede sugerir mejoras a través de Pull Requests. Consulta [`CONTRIBUTING.md`](./CONTRIBUTING.md) para conocer las pautas de reporte de bugs y sugerencias de UI/UX.
