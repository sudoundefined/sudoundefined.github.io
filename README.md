# 🚀 Deepanshu Srivastava — 3D Space Portfolio

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r185-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**An immersive, space-themed 3D portfolio website with interactive WebGL backgrounds, procedural audio, and cyberpunk aesthetics.**

[🔗 Live Demo(sudoundefined.github.io)](#) · [📄 AI Disclosure](./claude.md) · [📥 Download Resume](./public/Resume.pdf)

</div>

---

## 📸 Preview

> The portfolio features a full-screen WebGL 3D canvas with five distinct space scenes that transition as you scroll through different sections.

---

## ✨ Features

### 🌌 Immersive 3D Backgrounds
- **5 unique Three.js scenes** that transition dynamically as you scroll through sections
- Procedural star fields, nebula particles, orbital rings, dark-matter effects, and a wormhole
- Scroll-velocity-responsive camera rig — the faster you scroll, the deeper you "fly" into space
- Smooth crossfade transitions between scenes powered by `IntersectionObserver`

### 🎮 Interactive Experience
- **Custom cursor** with context-aware hover states
- **Warp drive navigation** — clicking a nav link triggers a hyperspace jump animation
- **Terminal boot sequence** — a CRT-style loading screen simulates a system boot before revealing the site
- **Glassmorphism panels** with ambient glow effects and grid overlays

### 🔊 Procedural Audio Engine
- Built entirely with the **Web Audio API** — no audio files needed
- Ambient space drone oscillator with scroll-modulated low-pass filter
- Synthesized hover blips and click sounds
- Toggleable via the "COMMS" button in the navigation

### 📱 Fully Responsive
- Mobile-first design with adaptive layouts for all screen sizes
- Hamburger menu with full-screen overlay on mobile
- Touch-friendly interactions and optimized 3D performance

### 📬 Contact Form
- AJAX-powered form submission via [FormSubmit.co](https://formsubmit.co/)
- Client-side input sanitization
- Real-time status feedback (transmitting → success/error)

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [React 19](https://react.dev/) with functional components and hooks |
| **Language** | [TypeScript 6.0](https://www.typescriptlang.org/) for full type safety |
| **Build Tool** | [Vite 8.1](https://vite.dev/) with HMR and optimized production builds |
| **3D Graphics** | [Three.js r185](https://threejs.org/) via [React Three Fiber](https://r3f.docs.pmnd.rs/) and [Drei](https://drei.docs.pmnd.rs/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` plugin |
| **Animation** | [Framer Motion 12](https://www.framer.com/motion/) for scroll-triggered and layout animations |
| **Audio** | Web Audio API (native) — procedural synthesis, no external files |
| **Linting** | [OxLint](https://oxc.rs/) for fast, Rust-based linting |
| **Deployment** | [GitHub Pages](https://pages.github.com/) via `gh-pages` package |

---

## 📁 Project Structure

```
deepanshu-portfolio/
├── public/
│   ├── Resume.pdf              # Downloadable resume
│   ├── favicon.svg             # Site favicon
│   └── icons.svg               # SVG icon sprite
├── src/
│   ├── assets/
│   │   ├── hero.png            # Hero section image
│   │   ├── react.svg           # React logo
│   │   └── vite.svg            # Vite logo
│   ├── components/
│   │   ├── AudioEngine.tsx     # Web Audio API synthesizer & ambient drone
│   │   ├── Contact.tsx         # Contact form with AJAX submission
│   │   ├── CustomCursor.tsx    # Custom cursor with hover detection
│   │   ├── Education.tsx       # Education timeline with glowing nodes
│   │   ├── Experience.tsx      # Tabbed work experience viewer
│   │   ├── Hero.tsx            # Landing section with diagnostic card
│   │   ├── Loader.tsx          # Terminal boot sequence with CRT effect
│   │   ├── NotFound.tsx        # 404 page
│   │   ├── Projects.tsx        # Projects section (currently hidden)
│   │   ├── Scene.tsx           # 3D canvas orchestrator with crossfade
│   │   ├── SceneV1.tsx         # Scene 1: Star field
│   │   ├── SceneV2.tsx         # Scene 2: Nebula particles
│   │   ├── SceneV3.tsx         # Scene 3: Orbital rings
│   │   ├── SceneV4.tsx         # Scene 4: Dark matter
│   │   ├── SceneV5.tsx         # Scene 5: Wormhole
│   │   ├── Skills.tsx          # Hexagonal skill grid with hover reveal
│   │   └── WarpOverlay.tsx     # Hyperspace warp transition effect
│   ├── utils/
│   │   └── scrollState.ts      # Global scroll velocity tracker
│   ├── App.tsx                 # Root component with routing & nav
│   ├── App.css                 # Legacy/base styles
│   ├── index.css               # Global styles and design tokens
│   └── main.tsx                # React DOM entry point
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite + React + Tailwind configuration
├── tsconfig.json               # TypeScript project references
├── tsconfig.app.json           # App-specific TS config
├── tsconfig.node.json          # Node/Vite TS config
├── package.json                # Dependencies and scripts
├── claude.md                   # AI disclosure document
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/deepanshu-srivastava/deepanshu-portfolio.git
cd deepanshu-portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server with HMR
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Production Build

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

### Deployment

The project is configured for GitHub Pages deployment:

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

This runs the `predeploy` script (which triggers `npm run build`) followed by `gh-pages -d dist`.

---

## 🎨 Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| **Matrix Green** | `#00ff66` | Primary accent, CTAs, active states, borders |
| **Cosmic Purple** | `#7000ff` | Secondary accent, gradients, decorative elements |
| **Deep Space** | `#030305` | Background, dark panels |
| **Void Black** | `#010101` | Dark matter scene background |
| **Signal Red** | `#ff003c` | Error states, alert indicators |
| **Neutral Light** | `#e0e0e0` | Body text |
| **Neutral Mid** | `#a0a0a0` | Secondary text, nav links |
| **Neutral Dark** | `#888888` | Muted text, labels |

### Typography

- **Headings**: System font stack with `tracking-tighter` and `font-extrabold`
- **Code/Labels**: `font-mono` (monospace) with `tracking-widest` and `uppercase`
- **Body**: System sans-serif with `font-light` for readability against dark backgrounds

### Key CSS Classes

| Class | Description |
|-------|-------------|
| `glass-panel` | Glassmorphism container with blur backdrop and subtle border |
| `cyber-button` | Primary CTA with green border, glow on hover |
| `cyber-button-alt` | Secondary CTA variant |

---

## 🌌 3D Scene Architecture

The 3D background is powered by a scene manager that swaps between five distinct WebGL scenes:

```
Section          →  Scene    →  Visual Effect
─────────────────────────────────────────────
Hero/About       →  SceneV1  →  Drifting star field
Skills           →  SceneV2  →  Swirling nebula particles
Experience       →  SceneV3  →  Rotating orbital rings
Education        →  SceneV4  →  Dark matter void
Contact          →  SceneV5  →  Pulsating wormhole
```

Transitions are driven by `IntersectionObserver` with a 15% visibility threshold and custom root margins. The `CameraRig` component reads from a shared `scrollState` singleton to push the camera forward during fast scrolling, creating a "flying through space" parallax effect.

---

## 🔊 Audio System

The `AudioEngine` is a zero-dependency audio system built on the Web Audio API:

- **Drone**: A 55Hz sawtooth oscillator fed through a low-pass filter (400–800Hz, modulated by scroll position), mixed at very low volume for an ambient spaceship hum
- **Hover blip**: 600Hz sine wave, 100ms, soft volume
- **Click sound**: Two-stage — 1200Hz square wave + delayed 1800Hz sine wave for a crisp sci-fi feedback

Audio is opt-in (disabled by default) and can be toggled via the **COMMS ON/OFF** button in the nav bar.

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `npm run dev` | Start Vite dev server with HMR |
| **build** | `npm run build` | Type-check (`tsc -b`) and build for production |
| **preview** | `npm run preview` | Preview the production build locally |
| **lint** | `npm run lint` | Run OxLint for code quality checks |
| **deploy** | `npm run deploy` | Build and deploy to GitHub Pages |

---

## 🤖 AI Disclosure

This project was built with AI coding assistance. For full transparency on how AI tools were used during development, see [**claude.md**](./claude.md).

---

## 📄 License

This project is personal portfolio software. All rights reserved.

- **Code**: You may reference the code for learning purposes, but please do not clone and deploy it as your own portfolio.
- **Content**: All biographical information, professional data, and branding are proprietary to Deepanshu Srivastava.

---

## 🤝 Contact

- **Email**: [srivastava.deepanshu24@gmail.com](mailto:srivastava.deepanshu24@gmail.com)
- **LinkedIn**: [linkedin.com/in/ds3042](https://www.linkedin.com/in/ds3042/)

---

<div align="center">

**SYSTEM.HALT(); © 2026 Deepanshu Srivastava.**

</div>
