# CropCare UI Redesign

This workspace contains a React UI scaffold implementing the CropCare redesign: modern dashboard, cards, assistant widget, auth pages, and responsive CSS.

Quick start:

1. Install deps:

```bash
npm install
```

2. Run:

```bash
npm run dev
```

Backend:

1. Install server deps and start server (in `server` folder):

```bash
cd server
npm install
npm run start
```

The server exposes mock APIs at `/api/*` used by the UI.

Files of interest:
- `src/components` — UI components
- `src/pages` — Login/Signup
- `src/styles/global.css` — Theme and responsive styles
