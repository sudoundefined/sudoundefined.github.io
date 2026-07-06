# 🤖 AI Disclosure — `claude.md`

> **Transparency Notice**: This portfolio website was built with significant assistance from AI coding tools. This document provides full disclosure on how AI was involved in the development process.

---

## Overview

This project — **Deepanshu Srivastava's 3D Space-Themed Portfolio** — was developed through a collaborative human–AI pair-programming workflow. The developer (Deepanshu Srivastava) directed all creative decisions, content, and architecture, while AI assistants were used to accelerate code generation, iterate on design, and debug implementation details.

---

## AI Tools Used

| Tool | Role |
|------|------|
| **Google Gemini (Antigravity IDE)** | Primary AI pair-programming assistant for code generation, refactoring, and debugging |
| **Claude (Anthropic)** | Supplementary code review, architecture feedback, and content refinement |

---

## What AI Helped With

### 🏗️ Architecture & Scaffolding
- Initial Vite + React + TypeScript project setup and configuration
- Component structure planning (Hero, Skills, Experience, Education, Contact, Scene)
- File organization and module separation patterns

### 🎨 Design & UI Implementation
- **Space/cyberpunk theme system** — The `#00ff66` (matrix green) and `#7000ff` (cosmic purple) color palette, glassmorphism panels, and CRT scanline effects were iterated on with AI assistance
- **Tailwind CSS utility classes** — Complex responsive class compositions for layout, typography, and hover states
- **Framer Motion animations** — Entry animations, scroll-triggered transitions, and the `AnimatePresence` loading sequence
- **Hexagonal skill grid** — SVG-based hexagon components with hover-reveal interactions

### 🌌 3D Scene System (Three.js / React Three Fiber)
- **5-scene architecture** — Scene transitions driven by `IntersectionObserver` as the user scrolls through sections
- **SceneV1–V5 components** — Procedural star fields, nebula particles, orbital rings, dark matter effects, and wormhole geometry
- **Camera rig** — Scroll-velocity-responsive camera zoom for parallax depth
- **Fog and lighting** — Dynamic fog color transitions between scenes

### ⚡ Interactive Systems
- **AudioEngine** — Web Audio API–based synthesizer with procedural blip/click sounds, ambient drone oscillator, and scroll-modulated filter sweeps
- **CustomCursor** — Custom cursor implementation with hover state detection
- **WarpOverlay** — CSS-based hyperspace warp transition effect triggered on navigation clicks
- **Boot Loader** — Terminal-style sequential boot sequence with CRT overlay

### 📬 Contact Form
- FormSubmit.co AJAX integration with input sanitization
- Stateful submission feedback (transmitting, success, error states)

### 🛠️ DevOps & Tooling
- GitHub Pages deployment pipeline (`gh-pages` package, `predeploy`/`deploy` scripts)
- Vite build configuration and base path setup
- OxLint configuration

---

## What Was Human-Directed

All of the following were driven entirely by the developer:

- **Content & personal data** — All professional experience, education details, skills inventory, and personal branding copy
- **Creative direction** — The "space mission control" metaphor, cyberpunk aesthetic, and sci-fi naming conventions (e.g., `COMM_RELAY`, `Diagnostic_Data`, `TRANSMISSION_VECTOR`)
- **Feature priorities** — Which sections to include/exclude (e.g., Projects section is currently hidden)
- **Contact & social links** — Email, LinkedIn, and resume PDF
- **Final design approval** — Every visual decision was reviewed and approved by the developer
- **Deployment target** — GitHub Pages hosting strategy and repository configuration

---

## AI Usage Philosophy

This project reflects a **tool-assisted development** approach:

1. **AI as accelerator, not creator** — AI was used to write code faster, not to replace creative or architectural thinking
2. **Human review at every step** — Every line of AI-generated code was reviewed, tested, and often modified before being committed
3. **Iterative refinement** — Multiple rounds of prompting, reviewing, and adjusting were used to achieve the desired quality
4. **No AI-generated content** — All biographical information, professional achievements, and descriptive copy were written by the developer

---

## Reproducibility

The entire codebase is open source. If you'd like to understand the AI-assisted development process or build something similar:

1. The tech stack is standard and well-documented: **React 19 + TypeScript + Vite + Three.js + Tailwind CSS v4 + Framer Motion**
2. No proprietary AI APIs or services are embedded in the production code
3. The AI assistance was limited to the **development phase** — the deployed site runs entirely on client-side code with no AI dependencies

---

## Questions?

If you have questions about the AI-assisted development process or would like to discuss this approach, feel free to reach out via the [contact form](https://deepanshu-srivastava.dev/#contact) or at **srivastava.deepanshu24@gmail.com**.

---

*Last updated: July 2026*
