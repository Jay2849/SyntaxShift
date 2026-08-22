<div align="center">

# ⚡ SYNTAXSHIFT ⚡
### *The AI Physics Sandbox & Vector Anti-Gravity Engine*

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Matter.js](https://img.shields.io/badge/Matter.js-2D_Physics-4BC51D?style=for-the-badge)](https://brm.io/matter-js/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-API_v1.5_Flash-8E75B2?style=for-the-badge&logo=googlecloud&logoColor=white)](https://ai.google.dev/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-Synthesizer_SFX-FF5722?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Commits](https://img.shields.io/badge/GitHub_Commits-152+_Pushed-00F3FF?style=for-the-badge)](https://github.com/Jay2849/SyntaxShift/commits/main)
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

### 4.1 Primary Chamber Solution Matrix

| Chamber | Title | Primary Solution Prompt | Alternative Directive Prompts |
| :--- | :--- | :--- | :--- |
| **01** | **The Inversion Tutorial** | `"Invert gravity upside down"` | *"Reverse gravity upward"*, *"Make gravity -1G"*, *"Flip world upside down"* |
| **02** | **Selective Mass Separation** | `"Lift only red blocks upward"` | *"Invert gravity for red blocks"*, *"Float red hazard barrier"*, *"Make red blocks fly to ceiling"* |
| **03** | **The Gravitational Chasm** | `"Float Spark in zero gravity"` $\rightarrow$ `"Push Spark top right corner"` | *"Zero gravity float mode"*, *"Push Spark east"*, *"Float in space"* |
| **04** | **Kinetic Pendulum Inversion** | `"Invert gravity for blue blocks"` | *"Lift platform upward"*, *"Push Spark to the right"*, *"Float blue platforms"* |
| **05** | **Anti-Gravity Laser Labyrinth** | `"Create a black hole at center"` OR `"Make Spark super bouncy with zero friction"` | *"Oscillate red blocks in zero gravity"*, *"Float in space"*, *"Gravity vortex at top"* |

---

### 4.2 Comprehensive 40+ Natural Language Prompt Dictionary

Below is the extensive catalog of free-form natural language physics directives supported by SyntaxShift:

#### 🌐 1. Global Gravity Field Manipulations
- `"Invert gravity upside down"` $\rightarrow$ Global inverted $-1.0G$ upward vector.
- `"Reverse world gravity"` $\rightarrow$ Inverts gravity vector vertically.
- `"Make gravity negative 1G"` $\rightarrow$ Upward $-1.0G$ trajectory.
- `"Reset to normal gravity"` $\rightarrow$ Restores standard $+1.0G$ downward gravity.
- `"Zero gravity float mode"` $\rightarrow$ Sets world gravity to neutral $0.0G$.
- `"Float everything in space"` $\rightarrow$ $0.0G$ zero-gravity float field.
- `"Double gravity downwards"` $\rightarrow$ Increases downward gravity to $+2.0G$.
- `"Low lunar gravity"` $\rightarrow$ Reduces gravity to $+0.16G$.
- `"Flip world upside down"` $\rightarrow$ Global upward gravity inversion.
- `"Neutral gravity field"` $\rightarrow$ Neutral $0.0G$ equilibrium.

#### 🎯 2. Selective Entity Buoyancy & Mass Separations
- `"Lift only red blocks upward"` $\rightarrow$ Applies selective anti-gravity to `RED_BLOCKS`.
- `"Invert gravity for red blocks"` $\rightarrow$ Isolated red block upward flight.
- `"Float red hazard barrier"` $\rightarrow$ Neutral buoyancy applied specifically to `RED_BLOCKS`.
- `"Lift crates into the ceiling"` $\rightarrow$ Applies selective buoyancy to `CRATES`.
- `"Float Spark in zero gravity"` $\rightarrow$ Neutral buoyancy applied specifically to `SPARK`.
- `"Make Spark float to the top"` $\rightarrow$ Isolated upward flight for `SPARK`.
- `"Invert gravity for blue platforms"` $\rightarrow$ Selective buoyancy applied to `BLUE_BLOCKS`.
- `"Make crates weightless"` $\rightarrow$ Zero-G neutral buoyancy for `CRATES`.
- `"Lift red hazard barrier into laser"` $\rightarrow$ Selective upward acceleration for `RED_BLOCKS`.
- `"Float player orb"` $\rightarrow$ Isolated buoyancy applied to `SPARK`.

#### ↗️ 3. Directional Vector Forces & Thrusts
- `"Push Spark to the right"` $\rightarrow$ Applies horizontal thrust vector $+1.5X$.
- `"Push Spark top right corner"` $\rightarrow$ Applies diagonal thrust vector $+1.0X, -1.0Y$.
- `"Nudge Spark left"` $\rightarrow$ Applies horizontal thrust vector $-1.0X$.
- `"Push everything east"` $\rightarrow$ Global horizontal vector force $+1.2X$.
- `"Launch Spark towards goal portal"` $\rightarrow$ Diagonal vector thrust $+1.5X, -1.2Y$.
- `"Push red blocks to the left"` $\rightarrow$ Directional force applied to `RED_BLOCKS`.
- `"Shoot Spark upward right"` $\rightarrow$ High-velocity diagonal thrust.
- `"Push crates to the right"` $\rightarrow$ Directional force applied to `CRATES`.
- `"Top right push"` $\rightarrow$ Diagonal force vector $+1.0X, -1.0Y$.
- `"Pull Spark left"` $\rightarrow$ Horizontal left force vector $-1.2X$.

#### ⚡ 4. Material Attributes & Kinetic Mutations
- `"Make Spark super bouncy with zero friction"` $\rightarrow$ Sets `restitution: 0.95`, `friction: 0.001`.
- `"Zero friction for Spark"` $\rightarrow$ Reduces surface friction to $0.001$.
- `"Make Spark bouncy like rubber"` $\rightarrow$ Increases restitution coefficient to $0.90$.
- `"Increase Spark mass by 5x"` $\rightarrow$ Multiplies Spark mass by $5.0$.
- `"Make red blocks heavy"` $\rightarrow$ Multiplies red block mass by $3.0$.
- `"Make Spark light as a feather"` $\rightarrow$ Reduces Spark mass multiplier to $0.2$.
- `"Super elasticity"` $\rightarrow$ Sets restitution coefficient across entities to $0.98$.
- `"Zero air resistance"` $\rightarrow$ Reduces `frictionAir` to $0.005$.
- `"High friction floor"` $\rightarrow$ Increases surface friction to $0.8$.
- `"Super heavy crates"` $\rightarrow$ Multiplies crate mass by $4.0$.

#### 🕳️ 5. Gravitational Singularity & Complex Directives
- `"Create a black hole at center"` $\rightarrow$ Spawns swirling purple gravity singularity at $(480, 270)$.
- `"Gravity vortex at top right"` $\rightarrow$ Spawns gravitational singularity at $(800, 100)$.
- `"Oscillate red blocks in zero gravity"` $\rightarrow$ Applies sinusoidal floating wave to `RED_BLOCKS`.
- `"Gravitational wave pulse"` $\rightarrow$ Applies pulsating radial force field.
- `"Create black hole singularity"` $\rightarrow$ Spawns central gravitational vortex field.

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
