<div align="center">

# ⚡ SYNTAXSHIFT ⚡
### *The AI Physics Sandbox & Vector Anti-Gravity Engine*

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Matter.js](https://img.shields.io/badge/Matter.js-2D_Physics-4BC51D?style=for-the-badge)](https://brm.io/matter-js/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-API_v1.5_Flash-8E75B2?style=for-the-badge&logo=googlecloud&logoColor=white)](https://ai.google.dev/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-Synthesizer_SFX-FF5722?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

**SyntaxShift** is an open-ended 2D physics puzzle sandbox driven by Google Gemini API Natural Language Processing (LLM) and Matter.js rigid-body dynamics. Players manipulate vector gravitational fields, entity buoyant forces, material elasticity, surface friction, and kinetic drag parameters using natural language directives to guide **Spark** through 5 hazardous puzzle chambers.

[Game Description](#-1-game-description) • [Gameplay Instructions](#-2-gameplay-instructions) • [Features](#-3-features) • [Controls](#-4-controls) • [Technologies Used](#-5-technology--tools-used) • [AI Tools Used](#-6-ai-tools-used) • [Installation](#-7-installation--running-instructions) • [Prompt Playbook](#-8-master-natural-language-prompt-playbook) • [Chambers](#-9-puzzle-chambers-specification)

---

</div>

## 📖 1. GAME DESCRIPTION

**SyntaxShift** bridges the gap between natural language AI interaction and 2D rigid-body physics simulation. In a distant cyberpunk research facility, an energy orb codenamed **Spark** is trapped inside experimental gravity testing chambers. Standard physics rules apply by default—downward gravity, surface friction, and mass resistance.

However, using the **SyntaxShift Terminal**, players can issue free-form natural language instructions (e.g., *"Invert gravity upside down"*, *"Lift only red blocks into the laser grid"*, or *"Create a black hole at center"*). The engine dynamically parses your prompt into structured physics parameters, instantly mutating gravitational vector fields, entity buoyancy, mass multipliers, and material elasticity in real time.

---

## 🎮 2. GAMEPLAY INSTRUCTIONS

### 🎯 Core Objective
Guide **Spark** (the cyan glowing energy orb) from the starting landing pad to the **Neon Goal Extraction Portal** in each chamber.

### 🕹️ How to Play Step-by-Step
1. **Analyze the Chamber:** Observe the layout, target portal position, ground barriers, moving laser gates, and spike pits.
2. **Issue Physics Directives:**
   - **Type a Prompt:** Enter natural language directives into the bottom `syntax>` terminal (e.g., *"Float Spark in zero gravity"* or *"Push Spark top right corner"*).
   - **Use Quick Prompts:** Click any of the Quick Preset Chips docked above the terminal for 1-click execution.
   - **Quick Gravity Flip:** Click the `⚡ FLIP GRAVITY` button to instantly invert global world gravity.
3. **Use the Mouse Gravity Beam:** Click and hold your left mouse button anywhere on the stage canvas to emit a cyan laser tether that exerts gravitational attraction on Spark, letting you pull and steer it manually.
4. **Vaporize Hazard Barriers:** Heavy red blocks blocking your path can be lifted into ceiling laser grids using selective anti-gravity to vaporize them!
5. **Clear & Rank:** Reach the extraction portal to trigger a supernova victory explosion! Finish chambers quickly with minimal prompts to earn an **S-RANK** performance rating.

---

## ✨ 3. FEATURES

- 🧠 **Dual AI Physics Compiler Pipeline:**
  Processes natural language prompts using Google Gemini 1.5 Flash. Includes a sub-10ms **Deterministic Offline Parser** fallback for 100% offline playability without an API key.
- 🧲 **Interactive Mouse Gravity Beam:**
  Real-time mouse cursor attraction beam that exerts continuous gravitational pull on Spark for precision steering.
- 🧩 **5 Hazardous Cyberpunk Puzzle Chambers:**
  Hand-crafted chambers featuring gravity inversion, selective mass separation, spike pits, U-ramp pendulums, and moving laser labyrinths.
- 🎵 **Web Audio API Procedural Synthesizers:**
  100% code-generated audio SFX (synthwave background beats, supernova victory explosions, death shockwaves, laser zaps) with zero external MP3/WAV assets.
- 🔍 **Real-Time JSON Payload Inspector:**
  View the exact structured JSON physics mutation contract parsed by the AI and applied to Matter.js.
- 📟 **Slide-Out Hacker Telemetry Log Console:**
  Live telemetry console recording all physics field mutations, chamber transitions, and event triggers.
- 🎨 **Cyberpunk Visual Juice Shaders & FX:**
  CRT scanline overlay, kinetic particle ribbon trails, matrix code rain streams, directional gravity vector HUD compass, and camera shockwave effects.

---

## 🕹️ 4. CONTROLS

| Input / Action | Location / Control | Function |
| :--- | :--- | :--- |
| **Mouse Left-Click + Drag** | Canvas Stage | Fires interactive **Cyan Laser Tether** pulling Spark toward cursor |
| **Type Prompt + Enter / Run** | Terminal Bar (`syntax>`) | Compiles and executes natural language physics directives |
| **Quick Preset Chips** | Terminal Dock Row | 1-tap instant execution of primary physics solution directives |
| **⚡ FLIP GRAVITY** | Terminal Bar Button | Instantly toggles global gravity between $+1.0G$ and $-1.0G$ |
| **➕ More Prompts...** | Terminal Dock Row | Opens the complete 40+ Chamber Physics Directive Library modal |
| **📟 Logs Button** | Top Right HUD | Toggles the slide-out **Hacker Telemetry Log Console** |
| **🎮 Levels Button** | Top Right HUD | Opens the **Chamber Selection Modal** |
| **🔑 AI Key Button** | Top Right HUD | Configures Google Gemini 1.5 Flash API Key |
| **🔄 Reset Button** | Top Right HUD | Instantly resets and rebuilds the current chamber |
| **JSON Inspector** | Bottom Status Badge | Opens live structured AI JSON physics payload viewer |

---

## 🛠️ 5. TECHNOLOGY & TOOLS USED

| Category | Technology / Tool | Usage & Purpose |
| :--- | :--- | :--- |
| **Core Language** | **JavaScript (ES6+)** | Modular ES Architecture (Classes, Modules, Canvas API) |
| **2D Physics Engine** | **Matter.js** | Rigid-body simulation, collision handling, sensor bodies, force applications |
| **Build System** | **Vite 6.4** | Ultra-fast HMR dev server and optimized ES production bundler |
| **AI LLM Engine** | **Google Gemini 1.5 Flash** | `@google/generative-ai` SDK for natural language to JSON physics compilation |
| **Audio Engine** | **Web Audio API** | Procedural sound synthesizer engine generating all beats, pulses, and SFX |
| **UI & Styling** | **Vanilla CSS3** | Cyberpunk Neon Design System (`#090d16` slate, CRT scanlines, flex/grid layouts) |
| **Deployment & SPA** | **Vercel / SPA Routing** | Single-page application routing configuration via `vercel.json` |

---

## 🤖 6. AI TOOLS USED

SyntaxShift leverages cutting-edge Artificial Intelligence across both runtime mechanics and software engineering:

### 1. Google Gemini 1.5 Flash API (Runtime LLM Parser)
- **Role:** Serves as the primary Natural Language Compiler.
- **Functionality:** Accepts unconstrained user text prompts (e.g., *"Make red blocks light as a feather and float Spark to ceiling"*) and outputs structured JSON adhering to the `PhysicsMutationPayload` contract.
- **Offline Resilience:** Supported by a sub-10ms deterministic keyword matrix fallback parser if no API key is provided.

### 2. Google Antigravity AI Assistant (Software Engineering & Architecture)
- **Role:** Agentic AI pair programmer used throughout project creation.
- **Contributions:**
  - Designed the decoupled 4-tier architecture (UI $\rightarrow$ Gemini Compiler $\rightarrow$ AntiGravity Engine $\rightarrow$ Matter.js World).
  - Engineered the Web Audio API procedural sound synthesizer math (oscillators, biquad filters, dynamic envelope gains).
  - Authored automated unit test suites for physics vector clamping and Gemini JSON payload validation.
  - Optimized production build pipelines for Vite and Vercel SPA deployment.

---

## 🚀 7. INSTALLATION & RUNNING INSTRUCTIONS

### 📋 Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**: Installed on your system

### 🔧 Step-by-Step Local Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Jay2849/SyntaxShift.git
   cd SyntaxShift
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000  (or http://localhost:5173)
   ```

5. **(Optional) Configure Gemini API Key:**
   - Click the **🔑 AI Key** button in the top HUD.
   - Paste your Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/).
   - Click **Save & Activate**. *(If skipped, the app automatically uses the sub-10ms Deterministic Offline Parser).*

6. **Production Build:**
   ```bash
   npm run build
   ```

---

## 📚 8. MASTER NATURAL LANGUAGE PROMPT PLAYBOOK

> [!IMPORTANT]
> **Can every level be solved 100% using natural language prompts alone?**  
> **YES!** Every chamber in SyntaxShift is designed to be fully solvable purely by typing natural language prompts into the terminal or selecting preset chips!

### 8.1 Primary Chamber Solution Matrix

| Chamber | Title | Primary Solution Prompt | Alternative Directive Prompts |
| :--- | :--- | :--- | :--- |
| **01** | **The Inversion Tutorial** | `"Invert gravity upside down"` | *"Reverse gravity upward"*, *"Make gravity -1G"*, *"Flip world upside down"* |
| **02** | **Selective Mass Separation** | `"Lift only red blocks upward"` | *"Invert gravity for red blocks"*, *"Float red hazard barrier"*, *"Make red blocks fly to ceiling"* |
| **03** | **The Gravitational Chasm** | `"Float Spark in zero gravity"` $\rightarrow$ `"Push Spark top right corner"` | *"Zero gravity float mode"*, *"Push Spark east"*, *"Float in space"* |
| **04** | **Kinetic Pendulum Inversion** | `"Invert gravity for blue blocks"` | *"Lift platform upward"*, *"Push Spark to the right"*, *"Float blue platforms"* |
| **05** | **Anti-Gravity Laser Labyrinth** | `"Create a black hole at center"` OR `"Make Spark super bouncy with zero friction"` | *"Oscillate red blocks in zero gravity"*, *"Float in space"*, *"Gravity vortex at top"* |

---

### 8.2 Comprehensive 40+ Natural Language Prompt Dictionary

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

## 🧩 9. PUZZLE CHAMBERS SPECIFICATION

| Chamber | Title | Objective | Key Hazards | Goal Target |
| :--- | :--- | :--- | :--- | :--- |
| **01** | **The Inversion Tutorial** | Lift Spark past ground barrier into ceiling portal. | Ground barrier | $(820, 50)$ |
| **02** | **Selective Mass Separation** | Lift heavy red blocks into ceiling laser grid to free Spark. | Red barrier & laser | $(820, 480)$ |
| **03** | **The Gravitational Chasm** | Glide horizontally across spike pit avoiding ceiling hazards. | Spike pit & mines | $(850, 270)$ |
| **04** | **Kinetic Pendulum Inversion** | Build momentum on U-ramp, flip gravity at apex. | Pendulum swing | $(820, 80)$ |
| **05** | **Anti-Gravity Laser Labyrinth** | Navigate moving vertical laser gates using bounce & buoyancy. | Moving laser gates | $(850, 450)$ |

---

## 📁 10. PROJECT DIRECTORY STRUCTURE

```
SyntaxShift/
├── index.html                    # Hacker terminal HTML layout & HUD
├── vite.config.js                # Vite build configuration
├── vercel.json                   # Vercel SPA routing configuration
├── package.json                  # Engine dependencies (@google/generative-ai, matter-js)
├── README.md                     # Complete project documentation & playbook
├── src/
│   ├── main.js                   # Main application entry point & render loop
│   ├── css/style.css             # Cyberpunk design system & CRT scanline shaders
│   ├── physics/                  # Matter.js world & AntiGravity engine modules
│   │   ├── AntiGravityEngine.js
│   │   ├── PhysicsWorld.js
│   │   ├── BlackHoleEngine.js
│   │   ├── VelocityClamp.js
│   │   ├── VectorMath.js
│   │   └── GravityGunBeam.js
│   ├── ai/                       # LLM compiler & offline matchers
│   │   ├── GeminiCompiler.js
│   │   └── DeterministicFallbackParser.js
│   ├── levels/                   # Dedicated puzzle chambers & scoring engine
│   │   ├── LevelManager.js
│   │   ├── ChamberConfigs.js
│   │   ├── ScoringEngine.js
│   │   └── chambers/
│   ├── audio/                    # Web Audio API sound synthesizers
│   │   ├── SoundEngine.js
│   │   └── synths/
│   └── ui/                       # Terminal UI & visual shaders
│       ├── TerminalUI.js
│       ├── VisualJuice.js
│       ├── CameraShakeController.js
│       └── renderers/
└── tests/                        # Automated unit test suite
```

---

<div align="center">

**Developed by Team SyntaxShift for Puzzle Masters Hackathon 2026 🚀**

</div>
