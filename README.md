# Techfest — Beyond the Horizon

> "Where Ideas Become Reality"  
> *The future is not something we wait for. It is something we build.*

An immersive, futuristic, interactive 3D web experience engineered for a Techfest-style technology festival. Built with React, Three.js, React Three Fiber, React Three Drei, GSAP, Framer Motion, Tailwind CSS, and pure Web Audio API synthesis.

*Created as a creative 3D web development submission.*

---

## 🌟 Overview

**Techfest // Beyond the Horizon** is a premium cinematic web platform engineered to demonstrate high-performance procedural 3D computing in the browser. It combines real-time WebGL rendering, continuous scroll-linked camera interpolation, interactive 3D nodes with HUD telemetry, and an audiovisual soundscape without relying on heavy external 3D asset downloads.

---

## ✨ Features

- **Procedural 3D Hero Scene**:
  - Central **Orbital Core** with glowing Faceted Icosahedron nucleus, triple counter-rotating orbital rings, and dynamic floating micro-cubes.
  - Over 1,100+ ambient cosmic particles with additive blending and responsive expansion.
  - Interactive **Pillar Objects** (01 Innovation, 02 Competition, 03 Collaboration) with 3D HTML tooltips, hover scaling, and click inspection HUD.
  - Infinite sci-fi floor grid with dynamic offset motion.
- **Cinematic Scroll-Linked Camera Rig**:
  - Seamless lerped camera movement matching user scroll progress through deep spatial perspectives.
  - Reactive mouse parallax tracking across normalized viewport coordinates.
- **Interactive About Arena**:
  - Cinematic mission briefing with animated stat metrics (`50+ Experiences`, `1000+ Builders`, `∞ Possibilities`).
  - Embedded real-time **Quantum Gyroscope** 3D mini-viewport.
- **Dimension Cards with 3D Tilt**:
  - 6 technological frontier cards (`AI & Machine Learning`, `Robotics`, `Space & Science`, `Cybersecurity`, `Web3 & Blockchain`, `Sustainability`).
  - Dynamic 3D mouse tilt, glowing border reaction, and modal deep-dive inspection.
- **3D Event Timeline**:
  - Smooth 3D Catmull-Rom spline tube path with active waypoint beacons (`01 Discover`, `02 Build`, `03 Compete`, `04 Connect`, `05 Create`).
  - Interactive phase progression with date, location, and telemetry data.
- **The Grand Arena Challenge**:
  - Climactic rotating 3D **Tesseract Hypercube** construct with orbiting action nodes (`BUILD`, `BREAK`, `RETHINK`, `CREATE`).
- **The Future Lab (3D R&D Sandbox)**:
  - 5 selectable procedural 3D artifacts rendered with smooth floating physics:
    1. *AI Neural Synapse*
    2. *Orbital Telemetry Sat*
    3. *Cybernetic Kinetic Arm*
    4. *Terra Digital Twin*
    5. *Toroidal Fusion Core*
  - Live telemetric spec HUD and interactive controls.
- **Grand Finale Call to Action**:
  - High-energy "ENTER TECHFEST" activation with screen glow, particle burst, and confetti explosion.
- **Interactive Builder Admission Gateway**:
  - Interactive modal with cryptographic pass key generation (`TF-2026-XXXX-XXXX`).
- **Procedural Cyber Audio FX**:
  - Built-in Web Audio API synthesizer for UI clicks, selection chimes, and warp whooshes (muted by default, zero external audio dependencies).
- **Custom Futuristic Cursor**:
  - Desktop magnetic cursor with glowing center dot, trailing ring, and contextual state detection.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **3D Graphics Engine**: Three.js
- **Declarative WebGL**: React Three Fiber (`@react-three/fiber`)
- **3D Helpers & Controls**: `@react-three/drei`
- **Animations & Transitions**: Framer Motion & GSAP
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas Confetti
- **Audio**: Web Audio API (procedural oscillator synthesis)

---

## 🔮 3D Technology

All 3D objects in this project are constructed **procedurally** using native Three.js primitives and custom shaders/materials:
- `IcosahedronGeometry`, `SphereGeometry`, `TorusGeometry`, `TorusKnotGeometry`
- `OctahedronGeometry`, `DodecahedronGeometry`, `CylinderGeometry`, `BoxGeometry`
- `TubeGeometry` generated via `CatmullRomCurve3`
- `BufferGeometry` for high-performance particle distribution
- Optimized rendering with adaptive Device Pixel Ratio: `dpr={[1, 1.5]}`

No heavy external GLTF/GLB downloads required — 100% offline-ready, lightning fast, and free of broken third-party model links.

---

## 📂 Project Structure

```
techfest-3d-experience/
├── public/
│   └── favicon.svg               # Futuristic SVG favicon
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── ChallengeCore.jsx     # Rotating 3D tesseract construct
│   │   │   ├── FutureLabCanvas.jsx   # 5 procedural prototype models
│   │   │   ├── HeroScene.jsx         # Full-screen Hero 3D canvas & camera rig
│   │   │   ├── InteractivePillars.jsx# Interactive 3D pillar nodes
│   │   │   ├── OrbitalCore.jsx       # Nucleus, faceted shell, orbital rings
│   │   │   ├── ParticleField.jsx     # Additive particle system
│   │   │   └── TimelineScene.jsx     # 3D spline waypoint path
│   │   ├── About.jsx             # Vision block, stats & quantum gyro
│   │   ├── AudioToggle.jsx       # Cyber audio toggle control
│   │   ├── Challenge.jsx         # Hackathon arena & 3D tesseract
│   │   ├── CTA.jsx               # Climax CTA with warp & confetti
│   │   ├── CustomCursor.jsx      # Magnetic dual-ring desktop cursor
│   │   ├── Domains.jsx           # 6 frontier cards with 3D tilt
│   │   ├── Footer.jsx            # Telemetry footer & live UTC clock
│   │   ├── FutureLab.jsx         # R&D lab interactive sandbox
│   │   ├── Hero.jsx              # Hero typography & inspection HUD
│   │   ├── LoadingScreen.jsx     # Initializing boot sequence
│   │   ├── Navbar.jsx            # Glassmorphism header & navigation
│   │   ├── RegisterModal.jsx     # Admission pass minting modal
│   │   └── Timeline.jsx          # Chronological phase sequence
│   ├── hooks/
│   │   ├── useMouseParallax.js   # Smoothed mouse coordinate tracking
│   │   └── useScrollProgress.js  # Normalized scroll & active section spy
│   ├── utils/
│   │   ├── audio.js              # Web Audio API procedural sound engine
│   │   └── constants.js          # Domain tracks, timeline & lab specifications
│   ├── App.jsx                   # Application layout & state orchestrator
│   ├── index.css                 # Cyber grid, scanlines, glassmorphism CSS
│   └── main.jsx                  # React application entry point
├── index.html                    # SEO tags, Open Graph meta & typography
├── package.json                  # Dependencies and build scripts
├── postcss.config.js             # PostCSS Tailwind configuration
├── tailwind.config.js            # Futuristic neon color palette & styling
└── vite.config.js                # Vite build and server configuration
```

---

## 🚀 Installation

Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended):

```bash
npm install
```

---

## 💻 Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build

Compile optimized production assets:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the CLI prompts to deploy directly from your local terminal.

### Netlify
1. Connect your GitHub repository on Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

### GitHub Pages
1. Configure `base: './'` in `vite.config.js`.
2. Build the project using `npm run build`.
3. Deploy the `dist` directory to your `gh-pages` branch.

---

## 📜 Disclaimer

*This project was created as an independent creative 3D web development submission. It is not officially affiliated with or endorsed by Techfest IIT Bombay.*
