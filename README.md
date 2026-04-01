# Leyes IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Una plataforma web interactiva compuesta por un landing page y un dashboard avanzado para explorar, visualizar y analizar proyectos de ley relacionados con la **Inteligencia Artificial** en Argentina.

## ✨ Características Principales

- **Dashboard Interactivo (`dashboard.html` / `dashboard-cyt.html`)**: Visualización de proyectos de ley con gráficos y filtros en tiempo real.
- **Chat Asistente con IA (`api/chat.js`)**: Integra un endpoint serverless impulsado por Google Gemini para responder consultas sobre el cuerpo normativo.
- **Data Pipeline Local**: Scripts en Python para la extracción, estructuración y validación automática de datos de las iniciativas legislativas (`extract_bills.py`, `validate_bills_data.py`).
- **Arquitectura Serverless**: Preparado nativamente para Vercel.

## 🚀 Requisitos Previos

Para ejecutar la plataforma o manipular el pipeline de datos, necesitas:

- **Node.js** 18+ (Para entorno web y funciones serverless).
- **Python** 3.9+ (Opcional, sólo si quieres interactuar con el pipeline de extracción de datos en `/scripts`).
- **Vercel CLI** (Opcional, recomendado para testing del directorio `/api` en local).
- **Gemini API Key** (Para habilitar las funciones del chatbot en el frontend).

## 🛠 Instalación y Configuración (Desarrollo Local)

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/TU_ORGANIZACION/Leyes-IA.git
   cd Leyes-IA
   ```

2. **Instala las dependencias web:**
   ```bash
   npm install
   ```

3. **Configura tus variables de entorno:**
   Copia el archivo base y agrega tu API Key de Gemini.
   ```bash
   cp .env.example .env.local
   # Edita .env.local para añadir: GEMINI_API_KEY=tu_api_key_aqui
   ```

4. **Levanta el entorno de desarrollo:**
   - **Modo Completo** (Frontend + Endpoints de `/api` usando Vercel CLI):
     ```bash
     npm run dev
     ```
   - **Solo Frontend Estático** (usando Python para servir los estáticos HTTP, el chat no funcionará):
     ```bash
     npm run dev:static
     ```

## 📊 Pipeline de Datos (Python)

Si deseas actualizar los datos (`leyes.json`, `bills_data.json`):
1. Asegúrate de tener Python activado.
2. Revisa y ejecuta los scripts ubicados en la raíz para actualizar las métricas:
   - `extract_bills.py` - Extracción desde fuentes PDF/XLSX.
   - `validate_bills_data.py` - Validación estructural.
   - `export_bills_excel.py` - Volcado y exportes de uso general.

*(Los PDFs base se encuentran mapeados en `/PDFs_Proyectos_Ley`)*

## 🤝 Cómo Contribuir

¡Agradecemos mucho todas las contribuciones de la comunidad! Ya sea solucionando errores, documentando o desarrollando nuevas funciones.
Lee por favor nuestra guía [`CONTRIBUTING.md`](./CONTRIBUTING.md) para más detalles sobre cómo abrir Pull Requests, hacer un uso adecuado de los branches y las guías de código recomendadas.

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Desarrollado por **Colossus Lab**. Consultar el archivo [`LICENSE`](./LICENSE) para más información.
