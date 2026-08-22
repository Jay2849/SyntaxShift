# SYSTEM PROMPT & ARCHITECTURAL DIRECTIVE: SYNTAXSHIFT ANTIGRAVITY ENGINE

> **SyntaxShift: The AI Physics Sandbox** (Developed by Team J for Puzzle Masters Hackathon 2026)  
> *Solve dynamic 2D physics puzzles using the power of Natural Language Processing and Google Gemini API.*

---

## 1. MISSION & CORE DIRECTIVE

You are reading the production-grade architectural specification and technical master blueprint for the **Anti-Gravity and Vector Gravitation Subsystem** of **SyntaxShift: The AI Physics Sandbox**.

SyntaxShift bridges large language models (LLMs) and real-time rigid-body 2D physics engines. Players guide **Spark**—a high-density kinetic energy orb—through hazardous puzzle chambers by issuing free-form natural language directives to an in-game hacker terminal. Rather than manipulating character movement controls directly, players shape the underlying physical law of the environment itself (vector gravity, selective mass floating, elasticity, surface friction, and linear air resistance).

---

## 2. THE MATHEMATICAL & PHYSICAL FOUNDATION OF ANTIGRAVITY

### 2.1 Classical vs. Anti-Gravity Vector Field Model
In standard Cartesian HTML5 Canvas coordinate space (where $+X$ points right and $+Y$ points downwards):

- **Standard Earth-like Gravity Field:**
  $$\vec{g}_{\text{standard}} = (g_x, g_y) = (0, +1.0) \cdot c_{\text{engine}}$$

- **Complete Negative Gravity (True Anti-Gravity):**
  $$\vec{g}_{\text{anti}} = (0, -g_y) = (0, -1.0) \cdot c_{\text{engine}}$$

- **Multi-Axial Arbitrary Gravitational Vector:**
  $$\vec{g}(\theta, M) = (M \cos\theta, M \sin\theta)$$
  where $\theta \in [0, 2\pi)$ and magnitude $M \in [0.0, 3.0]$.

### 2.2 Local vs. Global Gravitational Overrides
The engine supports two distinct modes of gravitational mutation:

1. **Global Environmental Gravity:**
   - Directly mutates `world.gravity.x` and `world.gravity.y` in Matter.js.
   - Impacts all non-static rigid bodies concurrently (Spark, red hazard blocks, debris, pushable crates).

2. **Selective Entity Anti-Gravity (Isolated Entity Levitation):**
   - The global environment gravity remains unaffected: $\vec{g}_{\text{global}} = (0, +1.0)$.
   - For a specific target body $B_i$, an opposing upward force vector $\vec{F}_{\text{anti}}$ is calculated during each physics engine update tick (inside the `beforeUpdate` tick hook):
     $$\vec{F}_{\text{anti}} = -m_i \cdot \vec{g}_{\text{global}} + \vec{F}_{\text{desired}}$$
   - When $\vec{F}_{\text{desired}} = \vec{0}$, body $B_i$ experiences **zero-G floating** (true neutral buoyancy).
   - When $\vec{F}_{\text{desired}} = (0, -m_i \cdot |g|)$, body $B_i$ experiences **inverted $-1g$ upward flight**.

### 2.3 Terminal Velocity & Damping Mechanics in Inverted Fields
Anti-gravity without kinetic drag results in endless linear acceleration, causing rigid bodies to tunnel through geometry at high velocities:

- **Velocity Clamping (Max Speed Boundary):**
  $$v_y = \text{sign}(v_y) \cdot \min(|v_y|, v_{\text{max}})$$
  where $v_{\text{max}} = 15.0 \text{ px/tick}$.

- **Air Resistance (Linear Drag Damping):**
  $$\vec{F}_{\text{drag}} = -\frac{1}{2} \rho C_d A |v| \vec{v} \approx -k_{\text{air}} \vec{v}$$
  Engine implementation: `body.frictionAir = 0.04 - 0.05` (prevents uncontrolled ceiling impacts and clipping).

---

## 3. NATURAL LANGUAGE PROMPT TO PHYSICS COMPILER (NLP PIPELINE)

### 3.1 Strict JSON Extraction Schema
The Gemini API consumes free-form player prompt inputs and outputs the following structured JSON contract without preamble or conversational wrapper:

```json
{
  "commandType": "PHYSICS_MUTATION",
  "target": "GLOBAL" | "SPARK" | "RED_BLOCKS" | "BLUE_BLOCKS" | "CRATES" | "PARTICLES",
  "antigravity": {
    "enabled": true,
    "mode": "INVERT" | "ZERO_G" | "PULL_UP" | "LOCAL_FIELD" | "OSCILLATE",
    "vector": {
      "x": 0.0,
      "y": -1.0
    },
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

### 3.2 Prompt Taxonomy & Intent Mapping Examples
- **Direct Inversion Prompts:**
  - *"Turn gravity upside down"* $\rightarrow$ `{"target": "GLOBAL", "antigravity": {"mode": "INVERT", "vector": {"x": 0, "y": -1.0}}}`
  - *"Make me fall to the ceiling"* $\rightarrow$ `{"target": "SPARK", "antigravity": {"mode": "INVERT", "vector": {"x": 0, "y": -1.0}}}`
- **Zero-G Float Prompts:**
  - *"Disable gravity entirely"*, *"Make everything weightless"*, *"Moon float mode"* $\rightarrow$ `{"target": "GLOBAL", "antigravity": {"mode": "ZERO_G", "vector": {"x": 0, "y": 0}}}`
- **Targeted / Filtered Anti-Gravity:**
  - *"Lift only the red barriers upward"*, *"Anti-gravity on purple blocks only"* $\rightarrow$ `{"target": "RED_BLOCKS", "antigravity": {"mode": "PULL_UP", "vector": {"x": 0, "y": -1.5}}}`
- **Directional Vector Push Prompts:**
  - *"Blow everything towards the top-right corner"* $\rightarrow$ `{"target": "GLOBAL", "antigravity": {"mode": "LOCAL_FIELD", "vector": {"x": 1.0, "y": -1.0}}}`

### 3.3 The Deterministic Fallback Parser (Sub-10ms Offline Engine)
If no Gemini API key is configured or network latency exceeds 350ms, SyntaxShift automatically switches to the zero-dependency deterministic rule matrix parser:

```javascript
import { deterministicFallbackParser } from './src/ai/DeterministicFallbackParser.js';

const result = deterministicFallbackParser("Invert gravity for red blocks");
// Executes in < 10ms offline with zero network overhead!
```

---

## 4. LEVEL DESIGN: 5 DEDICATED ANTIGRAVITY PUZZLE CHAMBERS

| Chamber | Name | Objective & Mechanics | Intended Prompt Solution |
| :--- | :--- | :--- | :--- |
| **01** | **The Inversion Tutorial** | Spark starts on floor; portal is on ceiling behind a lower barrier wall. | *"Invert gravity upside down"* |
| **02** | **Selective Mass Separation** | Spark trapped under heavy red blocks beneath lethal ceiling lasers. | *"Lift only red blocks upward"* |
| **03** | **The Gravitational Chasm** | Wide pit lined with spikes, ceiling lined with proximity mines. | *"Zero gravity float with slight right drift"* |
| **04** | **Kinetic Pendulum Inversion** | Curved U-ramp; portal high on an isolated ledge. | *"Invert gravity when Spark reaches ramp tip"* |
| **05** | **Anti-Gravity Laser Labyrinth** | Moving vertical laser gates with timed openings & obstacles. | *"Make Spark super bouncy with zero friction"* |

---

## 5. ARCHITECTURAL CODE IMPLEMENTATION

The codebase is modularized cleanly under `src/`:

```
j:/SyntaxShift/
├── index.html                  # Cyberpunk Terminal HTML layout & HUD
├── vite.config.js              # Vite build setup
├── package.json                # Dependencies (@google/generative-ai, matter-js, canvas-confetti)
└── src/
    ├── css/
    │   └── style.css           # Cyberpunk dark mode CSS system (scanlines, glassmorphism, glowing HUD)
    ├── physics/
    │   ├── AntiGravityEngine.js# Classical vs. Anti-gravity math model & continuous tick applicator
    │   └── PhysicsWorld.js     # Matter.js world setup, collision handlers, entity spawners
    ├── ai/
    │   ├── GeminiCompiler.js   # Google Gemini API SDK wrapper & prompt system instruction
    │   └── DeterministicFallbackParser.js # Sub-10ms offline keyword matrix parser
    ├── levels/
    │   ├── ChamberConfigs.js   # 5 dedicated puzzle chamber layouts & entity parameters
    │   └── LevelManager.js     # Energy charge tracking, level reset, win/death triggers
    ├── audio/
    │   └── SoundEngine.js      # Web Audio API synthesized SFX (sub-bass drop 60Hz, sweeps, chimes)
    ├── ui/
    │   ├── TerminalUI.js       # Hacker terminal dock, preset chips, API key & JSON modal handlers
    │   └── VisualJuice.js      # Dust particle emitters, chromatic flash, directional vector arrows
    └── main.js                 # App entry point & 60 FPS animation render loop
```

### Core `AntiGravityEngine` Class Reference

```javascript
import Matter from 'matter-js';

export class AntiGravityEngine {
  constructor(matterWorld, matterEngine) {
    this.world = matterWorld;
    this.engine = matterEngine;
    this.activeEntityModifiers = new Map();
    this.isGlobalInverted = false;
    
    // Register custom beforeUpdate physics hook
    Matter.Events.on(this.engine, 'beforeUpdate', () => this.applyContinuousForces());
  }

  setGlobalGravity(x, y, scale = 0.001) {
    this.world.gravity.x = x;
    this.world.gravity.y = y;
    this.world.gravity.scale = scale;
    this.isGlobalInverted = y < 0;
  }

  applyContinuousForces() {
    // 1. Terminal velocity clamping
    // 2. Continuous isolated floating & upward force application
  }
}
```

---

## 6. VISUAL FEEDBACK, SHADERS & AUDIO-VISUAL JUICE

- **Particle Inversion Emitters:** Background dust/ambient glow particles reverse velocity vectors from $(0, +v)$ to $(0, -v \cdot 2.5)$.
- **Chromatic Aberration Pulse:** Brief screen distortion along the Y-axis using CSS compositing to communicate gravitational rupture.
- **Object HUD Badges:** Impacted bodies render a subtle neon cyan/pink halo with vector arrows indicating current directional pull.
- **Synthesized Audio Engine:**
  - Low-frequency sub-bass drop ($60\text{Hz}$) on gravity shift.
  - Ascending high-pass filter frequency sweep on inversion.
  - Victory portal chime fanfare & keystroke SFX.

---

## 7. EXECUTION & VALIDATION CRITERIA

- ✅ **0% Engine Crash Rate:** Malformed JSON or invalid prompt gracefully defaults to safe fallback without crashing physics simulation loop.
- ✅ **60 FPS Performance:** Optimized Matter.js render loop with zero memory leaks during multi-body vector inversions.
- ✅ **Sub-10ms Fallback Latency:** Instant response when running offline without Gemini API keys.
- ✅ **100% Production Ready:** Vite bundle verified with clean output.

---

## 8. GETTING STARTED & DEVELOPER SETUP

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- Git

### Installation & Local Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jay2849/SyntaxShift.git
   cd SyntaxShift
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Production Build:**
   ```bash
   npm run build
   ```

5. **(Optional) Configure Gemini API Key:**
   Click the **🔑 AI Key** button in the top HUD of the game and enter your Google Gemini API key to experience real-time LLM physics prompt compilation!

---

### Developed by Team J for Puzzle Masters Hackathon 2026 🚀
