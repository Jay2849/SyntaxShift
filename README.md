<div align="center">

# ⚡ SYNTAXSHIFT ⚡
### *The AI Physics Sandbox & Vector Anti-Gravity Engine*

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Matter.js](https://img.shields.io/badge/Matter.js-2D_Physics-4BC51D?style=for-the-badge)](https://brm.io/matter-js/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-API_v1.5_Flash-8E75B2?style=for-the-badge&logo=googlecloud&logoColor=white)](https://ai.google.dev/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-Synthesizer_SFX-FF5722?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Status](https://img.shields.io/badge/Production-100%25_Ready-00F3FF?style=for-the-badge)](https://github.com/Jay2849/SyntaxShift)

---

**SyntaxShift** is an open-ended 2D physics puzzle environment driven by Google Gemini API Natural Language Processing and Matter.js rigid-body dynamics. Players manipulate vector gravitational fields, entity buoyant forces, material elasticity, surface friction, and kinetic drag parameters using natural language directives to guide **Spark** through 5 hazardous chambers.

[Architecture](#1-system-architecture) • [Physics Math](#2-mathematical--physical-foundation) • [NLP Schema](#3-natural-language-to-physics-compiler) • [Chambers](#4-puzzle-chambers-specification) • [Quick Start](#5-developer-getting-started)

---

</div>

## 1. SYSTEM ARCHITECTURE

SyntaxShift decouples prompt parsing from physics execution through a deterministic fallback pipeline and strict JSON contracts.

```
                  +-----------------------------------+
                  |   Player Natural Language Input   |
                  +-----------------------------------+
                                    |
                                    v
                  +-----------------------------------+
                  |    Google Gemini API (LLM)        |
                  |  OR Sub-10ms Deterministic Parser |
                  +-----------------------------------+
                                    |
                                    v [Strict JSON Contract]
                  +-----------------------------------+
                  |   AntiGravity Engine Subsystem    |
                  +-----------------------------------+
                                    |
                                    v [Continuous Tick Hook]
                  +-----------------------------------+
                  |  Matter.js 2D World Simulation    |
                  |   Canvas Shaders & Audio Juice    |
                  +-----------------------------------+
```

### Tech Stack Specifications
- **Core Engine & Bundler**: Vite (ES Modules) + HTML5 Canvas
- **2D Physics Engine**: Matter.js (Rigid-body collisions, constraints, forces)
- **AI NLP Pipeline**: `@google/generative-ai` (Gemini 1.5 Flash) + `DeterministicFallbackParser` (Zero-latency offline engine)
- **Audio Synthesizer**: Procedural Web Audio API Sound Engine (0 asset downloads)
- **Styling System**: Cyberpunk Neon Dark CSS (`#0a0b10` base, `#00f3ff` cyan, `#ff0055` pink accents, CRT scanlines)

---

## 2. MATHEMATICAL & PHYSICAL FOUNDATION

### 2.1 Classical vs. Anti-Gravity Field Model
Standard Cartesian coordinate space ($+X$ right, $+Y$ down):

- **Standard Earth-like Gravity Field:**
  $$\vec{g}_{\text{standard}} = (g_x, g_y) = (0, +1.0) \cdot c_{\text{scale}}$$

- **True Negative Anti-Gravity:**
  $$\vec{g}_{\text{anti}} = (0, -g_y) = (0, -1.0) \cdot c_{\text{scale}}$$

- **Multi-Axial Arbitrary Gravitational Vector:**
  $$\vec{g}(\theta, M) = (M \cos\theta, M \sin\theta)$$
  where $\theta \in [0, 2\pi)$ and magnitude $M \in [0.0, 3.0]$.

### 2.2 Local vs. Global Gravitational Overrides
1. **Global Environmental Gravity:**
   Mutates `world.gravity.x` and `world.gravity.y` directly across all non-static bodies concurrently.

2. **Selective Entity Anti-Gravity (Isolated Buoyancy):**
   Global engine gravity remains unaffected: $\vec{g}_{\text{global}} = (0, +1.0)$.  
   For a specific target body $B_i$, an opposing force vector $\vec{F}_{\text{anti}}$ is applied inside the `beforeUpdate` physics tick:
   $$\vec{F}_{\text{anti}} = -m_i \cdot \vec{g}_{\text{global}} + \vec{F}_{\text{desired}}$$
   - $\vec{F}_{\text{desired}} = \vec{0} \implies$ **Zero-G floating (Neutral buoyancy)**
   - $\vec{F}_{\text{desired}} = (0, -m_i |g|) \implies$ **Inverted $-1g$ upward flight**

### 2.3 Terminal Velocity & Air Drag Damping
Anti-gravity without kinetic friction results in unbounded acceleration:
- **Velocity Clamping:** $v_y = \text{sign}(v_y) \cdot \min(|v_y|, v_{\text{max}})$, where $v_{\text{max}} = 15.0 \text{ px/tick}$.
- **Air Resistance Damping:** $\vec{F}_{\text{drag}} \approx -k_{\text{air}} \vec{v}$, configured via `body.frictionAir = 0.04 - 0.05`.

---

## 3. NATURAL LANGUAGE TO PHYSICS COMPILER

### 3.1 JSON Contract Schema

```json
{
  "commandType": "PHYSICS_MUTATION",
  "target": "GLOBAL" | "SPARK" | "RED_BLOCKS" | "BLUE_BLOCKS" | "CRATES",
  "antigravity": {
    "enabled": true,
    "mode": "INVERT" | "ZERO_G" | "PULL_UP" | "LOCAL_FIELD" | "OSCILLATE",
    "vector": { "x": 0.0, "y": -1.0 },
    "multiplier": 1.0,
    "durationSeconds": 5.0,
    "damping": 0.05
  },
  "auxiliaryModifiers": {
    "friction": null,
    "restitution": null,
    "massMultiplier": null
  },
  "hudMessage": "Gravity inverted: Upward trajectory initiated."
}
```

### 3.2 Offline Sub-10ms Fallback Engine
When no Gemini API key is configured or network latency exceeds 350ms, SyntaxShift automatically falls back to its keyword matrix parser:
- `"Invert gravity upside down"` $\rightarrow$ Global inverted $-1G$ vector.
- `"Zero gravity float mode"` $\rightarrow$ Neutral buoyancy mode.
- `"Lift only red blocks upward"` $\rightarrow$ Isolated red block flotation.
- `"Make Spark super bouncy"` $\rightarrow$ Restitution set to $0.92$.

---

## 4. PUZZLE CHAMBERS SPECIFICATION

| Chamber | Title | Objective | Intended Directives |
| :--- | :--- | :--- | :--- |
| **01** | **The Inversion Tutorial** | Lift Spark past lower ground barrier into ceiling extraction portal. | *"Invert gravity upside down"* |
| **02** | **Selective Mass Separation** | Lift heavy red blocks into ceiling laser grid to free trapped Spark. | *"Lift only red blocks upward"* |
| **03** | **The Gravitational Chasm** | Glide horizontally across spike pit avoiding ceiling mines. | *"Zero gravity float with right drift"* |
| **04** | **Kinetic Pendulum Inversion** | Build momentum on U-ramp, flip gravity at apex to reach upper ledge. | *"Invert gravity at apex"* |
| **05** | **Anti-Gravity Laser Labyrinth** | Navigate moving vertical laser gates using bounce & buoyancy. | *"Super bouncy Spark with zero friction"* |

---

## 5. DEVELOPER GETTING STARTED

### Prerequisites
- Node.js (v18+)
- Git

### Installation & Execution

```bash
# 1. Clone the repository
git clone https://github.com/Jay2849/SyntaxShift.git
cd SyntaxShift

# 2. Install dependencies
npm install

# 3. Launch Vite Development Server
npm run dev
```

Open `http://localhost:3000` in your browser.

### Production Build
```bash
npm run build
```

---

## 6. PROJECT DIRECTORY STRUCTURE

```
SyntaxShift/
├── index.html                    # Hacker terminal HTML layout & HUD
├── vite.config.js                # Vite build configuration
├── package.json                  # Engine dependencies (@google/generative-ai, matter-js)
├── src/
│   ├── css/style.css             # Cyberpunk design system & CRT scanlines
│   ├── physics/                  # Matter.js world & AntiGravity engine modules
│   │   ├── AntiGravityEngine.js
│   │   ├── PhysicsWorld.js
│   │   ├── VectorMath.js
│   │   ├── VelocityClamp.js
│   │   ├── AirDrag.js
│   │   ├── ForceUtils.js
│   │   └── MassUtils.js
│   ├── ai/                       # LLM compiler & offline matchers
│   │   ├── GeminiCompiler.js
│   │   ├── DeterministicFallbackParser.js
│   │   └── matchers/
│   ├── levels/                   # 5 dedicated puzzle chambers & level manager
│   │   ├── LevelManager.js
│   │   └── chambers/
│   ├── audio/                    # Web Audio API sound synthesizers
│   │   ├── SoundEngine.js
│   │   └── synths/
│   └── ui/                       # Terminal UI & visual shaders
│       ├── TerminalUI.js
│       ├── VisualJuice.js
│       └── renderers/
└── tests/                        # Automated unit test suite
```

---

<div align="center">

**Developed by Team J for Puzzle Masters Hackathon 2026 🚀**

</div>
