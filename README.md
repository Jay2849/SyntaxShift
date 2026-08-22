<div align="center">

# ⚡ SYNTAXSHIFT ⚡
### *The AI Physics Sandbox & Vector Anti-Gravity Engine*

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Matter.js](https://img.shields.io/badge/Matter.js-2D_Physics-4BC51D?style=for-the-badge)](https://brm.io/matter-js/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-API_v1.5_Flash-8E75B2?style=for-the-badge&logo=googlecloud&logoColor=white)](https://ai.google.dev/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-Synthesizer_SFX-FF5722?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Commits](https://img.shields.io/badge/GitHub_Commits-151+_Pushed-00F3FF?style=for-the-badge)](https://github.com/Jay2849/SyntaxShift/commits/main)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

**SyntaxShift** is an open-ended 2D physics puzzle sandbox driven by Google Gemini API Natural Language Processing (LLM) and Matter.js rigid-body dynamics. Players manipulate vector gravitational fields, entity buoyant forces, material elasticity, surface friction, and kinetic drag parameters using natural language directives to guide **Spark** through 5 hazardous puzzle chambers.

[Architecture](#1-system-architecture) • [Physics Math](#2-mathematical--physical-foundation) • [NLP Compiler](#3-natural-language-to-physics-compiler) • [Prompt Playbook](#4-master-natural-language-prompt-playbook--solutions) • [Chambers](#5-puzzle-chambers-specification) • [Getting Started](#6-developer-getting-started)

---

</div>

## 1. SYSTEM ARCHITECTURE

SyntaxShift decouples natural language prompt parsing from physics execution through a deterministic fallback pipeline and strict JSON contracts.

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

### Core Tech Stack
- **Core Framework & Bundler**: Vite (ES Modules) + HTML5 Canvas
- **2D Physics Engine**: Matter.js (Rigid-body dynamics, collisions, sensor bodies, forces)
- **AI NLP Pipeline**: `@google/generative-ai` (Gemini 1.5 Flash) + `DeterministicFallbackParser` (Sub-10ms offline keyword matrix engine)
- **Audio Synthesizer**: Web Audio API Procedural Synthesizer Engine (0 asset downloads)
- **Styling & UI**: Cyberpunk Neon Dark CSS System (`#06080e` void, `#00f3ff` cyan, `#ff0055` pink accents, CRT scanlines, 100% zoom responsive grid)

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
   Mutates `engine.gravity.x` and `engine.gravity.y` directly across all non-static bodies concurrently.

2. **Selective Entity Anti-Gravity (Isolated Buoyancy):**
   Global engine gravity remains unaffected: $\vec{g}_{\text{global}} = (0, +1.0)$.  
   For a specific target body $B_i$, an opposing force vector $\vec{F}_{\text{anti}}$ is applied inside the `beforeUpdate` physics tick:
   $$\vec{F}_{\text{anti}} = -m_i \cdot \vec{g}_{\text{global}} + \vec{F}_{\text{desired}}$$
   - $\vec{F}_{\text{desired}} = \vec{0} \implies$ **Zero-G floating (Neutral buoyancy)**
   - $\vec{F}_{\text{desired}} = (0, -m_i |g|) \implies$ **Inverted $-1g$ upward flight**

### 2.3 Terminal Velocity & Air Drag Damping
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

### 3.2 Dual AI Parser Engine
- **Primary LLM Mode**: Google Gemini 1.5 Flash parses raw natural language into strict structured JSON physics contracts.
- **Offline Sub-10ms Fallback**: If no API key is provided or network latency occurs, SyntaxShift automatically routes prompts through its built-in `DeterministicFallbackParser` keyword matrix, guaranteeing 100% offline playability.

---

## 4. MASTER NATURAL LANGUAGE PROMPT PLAYBOOK & SOLUTIONS

> [!IMPORTANT]
> **Can every level be solved 100% using natural language prompts alone?**  
> **YES!** Every chamber in SyntaxShift is designed to be fully solvable purely by typing natural language prompts into the terminal or selecting preset chips!

### 4.1 Chamber Solution Directives

| Chamber | Title | Primary Solution Prompt | Alternative Directive Prompts |
| :--- | :--- | :--- | :--- |
| **01** | **The Inversion Tutorial** | `"Invert gravity upside down"` | *"Reverse gravity upward"*, *"Make gravity -1G"* |
| **02** | **Selective Mass Separation** | `"Lift only red blocks upward"` | *"Invert gravity for red blocks"*, *"Float red hazard barrier"* |
| **03** | **The Gravitational Chasm** | `"Float Spark in zero gravity"` $\rightarrow$ `"Push Spark top right corner"` | *"Zero gravity float mode"*, *"Push Spark east"* |
| **04** | **Kinetic Pendulum Inversion** | `"Invert gravity for blue blocks"` | *"Lift platform upward"*, *"Push Spark to the right"* |
| **05** | **Anti-Gravity Laser Labyrinth** | `"Create a black hole at center"` OR `"Make Spark super bouncy with zero friction"` | *"Oscillate red blocks in zero gravity"*, *"Float in space"* |

### 4.2 Comprehensive Prompt Dictionary

#### Global Environmental Directives
- `"Invert gravity upside down"` (Flips world gravity to $-1.0G$ upward)
- `"Reset to normal gravity"` (Restores $+1.0G$ downward)
- `"Zero gravity float mode"` (Sets global gravity to $0.0G$)

#### Selective Entity Directives
- `"Lift only red hazard blocks into the ceiling"` (Applies selective buoyancy to `RED_BLOCKS`)
- `"Float Spark in zero gravity"` (Applies neutral buoyancy to `SPARK`)
- `"Invert gravity for blue blocks"` (Applies selective buoyancy to `BLUE_BLOCKS`)
- `"Lift crates upward"` (Applies selective buoyancy to `CRATES`)

#### Directional Physics Vectors
- `"Push Spark to the right"` (Applies horizontal vector force $+1.5X$)
- `"Push Spark top right corner"` (Applies diagonal vector force $+1.0X, -1.0Y$)
- `"Create a black hole at center"` (Spawns purple gravitational singularity field)

#### Material Property Mutations
- `"Make Spark super bouncy with zero friction"` (Sets `restitution: 0.95`, `friction: 0.001`)
- `"Increase Spark mass by 5x"` (Sets `massMultiplier: 5.0`)

---

## 5. PUZZLE CHAMBERS SPECIFICATION

| Chamber | Title | Objective | Key Hazards | Goal Target |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **The Inversion Tutorial** | Lift Spark past ground barrier into ceiling portal. | Ground barrier | $(820, 50)$ |
| **02** | **Selective Mass Separation** | Lift heavy red blocks into ceiling laser grid to free Spark. | Red barrier & laser | $(820, 480)$ |
| **03** | **The Gravitational Chasm** | Glide horizontally across spike pit avoiding ceiling hazards. | Spike pit & mines | $(850, 270)$ |
| **04** | **Kinetic Pendulum Inversion** | Build momentum on U-ramp, flip gravity at apex. | Pendulum swing | $(820, 80)$ |
| **05** | **Anti-Gravity Laser Labyrinth** | Navigate moving vertical laser gates using bounce & buoyancy. | Moving laser gates | $(850, 450)$ |

---

## 6. DEVELOPER GETTING STARTED

### Prerequisites
- Node.js (v18+)
- Git

### Quick Setup

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

## 7. PROJECT DIRECTORY STRUCTURE

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
│   │   ├── BlackHoleEngine.js
│   │   └── GravityGunBeam.js
│   ├── ai/                       # LLM compiler & offline matchers
│   │   ├── GeminiCompiler.js
│   │   └── DeterministicFallbackParser.js
│   ├── levels/                   # 5 dedicated puzzle chambers & level manager
│   │   ├── LevelManager.js
│   │   └── chambers/
│   ├── audio/                    # Web Audio API sound synthesizers
│   │   └── SoundEngine.js
│   └── ui/                       # Terminal UI & visual shaders
│       ├── TerminalUI.js
│       ├── VisualJuice.js
│       ├── CameraShakeController.js
│       └── renderers/
└── tests/                        # Automated unit test suite
```

---

<div align="center">

**Developed by Team J for Puzzle Masters Hackathon 2026 🚀**

</div>
