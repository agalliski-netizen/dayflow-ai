# DayFlow AI 🗓️

Describí tu día en lenguaje natural → obtenés un plan inteligente y optimizado.

## Cómo publicar en Vercel (10 minutos)

### Paso 1 — Conseguir tu API Key de Anthropic

1. Andá a https://console.anthropic.com
2. Creá una cuenta (gratis)
3. En el menú: **API Keys** → **Create Key**
4. Copiá la key (empieza con `sk-ant-...`)

> El costo es muy bajo: aproximadamente $0.003 USD por plan generado con claude-sonnet.

---

### Paso 2 — Subir el código a GitHub

1. Creá una cuenta en https://github.com si no tenés
2. Creá un repositorio nuevo (ej: `dayflow-ai`)
3. Subí todos estos archivos al repositorio

---

### Paso 3 — Deploy en Vercel

1. Andá a https://vercel.com y creá una cuenta (gratis)
2. Hacé click en **Add New Project**
3. Importá tu repositorio de GitHub
4. Antes de hacer deploy, en **Environment Variables** agregá:
   - Name: `ANTHROPIC_API_KEY`
   - Value: tu key de Anthropic
5. Hacé click en **Deploy**

En 2-3 minutos tu app va a estar en vivo en una URL del tipo `dayflow-ai.vercel.app`

---

### Paso 4 — Dominio propio (opcional)

En Vercel podés conectar un dominio propio. Dominios recomendados:
- `dayflow.app`
- `dayflowai.com`
- `getdayflow.com`

---

## Monetización sugerida

- **Free**: 3 planes por día
- **Pro ($2.99/mes)**: planes ilimitados + historial

Para agregar pagos, el próximo paso es integrar **Stripe** (también gratuito para empezar).

---

## Estructura del proyecto

```
dayflow/
├── pages/
│   ├── index.js        ← Frontend principal
│   ├── _app.js         ← Config de Next.js
│   └── api/
│       └── plan.js     ← Llamada a la API de Claude (backend)
├── styles/
│   └── globals.css     ← Estilos globales
├── package.json
├── next.config.js
└── .env.local.example  ← Renombrá a .env.local con tu API key
```
