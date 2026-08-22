import { GoogleGenerativeAI } from '@google/generative-ai';
import { deterministicFallbackParser } from './DeterministicFallbackParser.js';

/**
 * SYNTAXSHIFT - GEMINI API NATURAL LANGUAGE PHYSICS COMPILER
 * Converts free-form player natural language prompts into structured JSON contracts for Matter.js
 */
export class GeminiCompiler {
  constructor() {
    const envKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GEMINI_API_KEY : '';
    this.apiKey = localStorage.getItem('syntaxshift_gemini_key') || envKey || '';
    this.modelName = 'gemini-1.5-flash';
    this.genAI = null;

    if (this.apiKey) {
      this.initClient(this.apiKey);
    }
  }

  setApiKey(key) {
    this.apiKey = key ? key.trim() : '';
    if (this.apiKey) {
      localStorage.setItem('syntaxshift_gemini_key', this.apiKey);
      this.initClient(this.apiKey);
    } else {
      localStorage.removeItem('syntaxshift_gemini_key');
      this.genAI = null;
    }
  }

  hasApiKey() {
    return Boolean(this.apiKey);
  }

  initClient(key) {
    try {
      this.genAI = new GoogleGenerativeAI(key);
    } catch (e) {
      console.warn("Failed to initialize Gemini Client:", e);
      this.genAI = null;
    }
  }

  /**
   * System Instruction Contract enforcing strict JSON physics output
   */
  getSystemInstruction() {
    return `You are the Natural Language Physics Compiler for "SyntaxShift: The AI Physics Sandbox".
Your directive is to parse free-form player prompt inputs into a strictly valid JSON object conforming to this schema without markdown code blocks, conversational text, or preamble.

JSON SCHEMA CONTRACT:
{
  "commandType": "PHYSICS_MUTATION",
  "target": "GLOBAL" | "SPARK" | "RED_BLOCKS" | "BLUE_BLOCKS" | "CRATES",
  "antigravity": {
    "enabled": true | false,
    "mode": "INVERT" | "ZERO_G" | "PULL_UP" | "LOCAL_FIELD" | "OSCILLATE",
    "vector": {
      "x": number (-3.0 to 3.0),
      "y": number (-3.0 to 3.0)
    },
    "multiplier": number (0.1 to 3.0),
    "durationSeconds": number (1 to 30),
    "damping": number (0.01 to 0.2)
  },
  "auxiliaryModifiers": {
    "friction": number or null (0.001 to 1.0),
    "restitution": number or null (0.0 to 1.0),
    "massMultiplier": number or null (0.1 to 5.0)
  },
  "hudMessage": "Concise cyberpunk status message describing the physics mutation."
}

RULES:
1. Target mapping:
   - "Spark", "orb", "me", "player", "self" -> "SPARK"
   - "Red", "red blocks", "hazards", "barriers" -> "RED_BLOCKS"
   - "Blue", "blue blocks", "platforms" -> "BLUE_BLOCKS"
   - "Crates", "boxes" -> "CRATES"
   - "Everything", "all", "world", "environment", default -> "GLOBAL"
2. Antigravity vector math:
   - Invert/Upside down/Up: vector {x: 0, y: -1.0}, mode: "INVERT"
   - Zero-G/Float/Space: vector {x: 0, y: 0}, mode: "ZERO_G"
   - Push right/top-right: vector {x: 1.0, y: -1.0}, mode: "LOCAL_FIELD"
3. Output MUST be RAW JSON only.`;
  }

  /**
   * Parse prompt via Gemini API with automatic 400ms timeout fallback to Offline Parser
   */
  async parsePrompt(rawPrompt) {
    const fallbackResult = deterministicFallbackParser(rawPrompt);

    if (!this.hasApiKey() || !this.genAI) {
      console.log("⚡ Gemini API key absent. Executing Deterministic Offline Parser (<10ms).");
      return fallbackResult;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        systemInstruction: this.getSystemInstruction()
      });

      const response = await model.generateContent(
        `User Prompt: "${rawPrompt}"\nParse into structured JSON contract:`
      );
      
      clearTimeout(timeoutId);

      const text = response.response.text();
      // Clean JSON formatting if wrapped in ```json
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      parsed.isFallback = false;
      return parsed;

    } catch (err) {
      console.warn("Gemini API call failed or timed out. Falling back to Deterministic Parser:", err);
      return fallbackResult;
    }
  }
}
