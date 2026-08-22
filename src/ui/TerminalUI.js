import confetti from 'canvas-confetti';
import { CHAMBER_CONFIGS } from '../levels/ChamberConfigs.js';
import { LevelProgressBar } from './components/LevelProgressBar.js';

/**
 * SYNTAXSHIFT - TERMINAL UI & UX CONTROLLER
 * Connects HTML HUD elements, terminal form inputs, preset chips, modals, and confetti triggers.
 */
export class TerminalUI {
  constructor({ geminiCompiler, levelManager, soundEngine, visualJuice, onExecutePrompt }) {
    this.compiler = geminiCompiler;
    this.levelManager = levelManager;
    this.soundEngine = soundEngine;
    this.visualJuice = visualJuice;
    this.onExecutePrompt = onExecutePrompt;

    this.lastParsedJson = null;

    // Cache DOM Elements
    this.hudLevelNum = document.getElementById('hud-level-num');
    this.hudEnergyCharges = document.getElementById('hud-energy-charges');
    this.hudGravityState = document.getElementById('hud-gravity-state');
    this.gravIcon = document.getElementById('grav-icon');
    this.gravText = document.getElementById('grav-text');

    this.cardChamberNum = document.getElementById('card-chamber-num');
    this.cardChamberName = document.getElementById('card-chamber-name');
    this.cardChamberObjective = document.getElementById('card-chamber-objective');

    this.terminalForm = document.getElementById('terminal-form');
    this.terminalInput = document.getElementById('terminal-input');
    this.btnExecute = document.getElementById('btn-execute');
    this.terminalHudMessage = document.getElementById('terminal-hud-message');

    this.statusIndicator = document.getElementById('status-indicator');
    this.statusText = document.getElementById('status-text');

    // Modals
    this.modalApiKey = document.getElementById('modal-api-key');
    this.inputApiKey = document.getElementById('input-api-key');
    this.modalLevelSelect = document.getElementById('modal-level-select');
    this.chambersListContainer = document.getElementById('chambers-list-container');
    this.modalJsonInspector = document.getElementById('modal-json-inspector');
    this.jsonInspectorContent = document.getElementById('json-inspector-content');

    this.bindEvents();
    this.updateStatusBadge();
  }

  bindEvents() {
    // 1. Terminal Form Submission
    this.terminalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = this.terminalInput.value.trim();
      if (!text) return;

      this.soundEngine.playKeystroke();
      await this.handlePromptExecution(text);
    });

    // 1b. Quick 1-Click Gravity Flip Button
    document.getElementById('btn-quick-flip')?.addEventListener('click', async () => {
      this.soundEngine.playKeystroke();
      await this.handlePromptExecution("Invert gravity upside down");
    });

    // Keystroke SFX
    this.terminalInput.addEventListener('keydown', () => {
      this.soundEngine.playKeystroke();
    });

    // 2. Preset Prompt Chips
    const chipsContainer = document.getElementById('preset-chips-container');
    if (chipsContainer) {
      chipsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip-btn');
        if (btn && btn.dataset.prompt) {
          this.terminalInput.value = btn.dataset.prompt;
          this.soundEngine.playKeystroke();
        }
      });
    }

    // Header Action Buttons
    document.getElementById('btn-toggle-logs')?.addEventListener('click', () => {
      this.soundEngine.playKeystroke();
      if (this.logDrawer) this.logDrawer.toggle();
    });

    document.getElementById('btn-open-levels')?.addEventListener('click', () => this.openLevelModal());
    document.getElementById('btn-close-levels')?.addEventListener('click', () => this.closeLevelModal());

    document.getElementById('btn-api-key')?.addEventListener('click', () => this.openApiKeyModal());
    document.getElementById('btn-close-api-key')?.addEventListener('click', () => this.closeApiKeyModal());
    document.getElementById('btn-save-api-key')?.addEventListener('click', () => this.saveApiKey());

    document.getElementById('btn-reset-chamber')?.addEventListener('click', () => {
      this.soundEngine.playKeystroke();
      this.levelManager.resetCurrentChamber();
      this.setMessage("🔄 Chamber physics reset.", "warning");
    });

    document.getElementById('btn-inspect-json')?.addEventListener('click', () => this.openJsonModal());
    document.getElementById('btn-close-json')?.addEventListener('click', () => this.closeJsonModal());

    // More Prompts Modal
    const modalMore = document.getElementById('modal-more-prompts');
    document.getElementById('btn-more-prompts')?.addEventListener('click', () => {
      this.soundEngine.playKeystroke();
      modalMore?.classList.add('active');
    });
    document.getElementById('btn-close-more-prompts')?.addEventListener('click', () => {
      modalMore?.classList.remove('active');
    });

    modalMore?.addEventListener('click', (e) => {
      const chip = e.target.closest('.modal-chip');
      if (!chip) return;
      const promptText = chip.getAttribute('data-prompt');
      if (promptText) {
        this.terminalInput.value = promptText;
        this.soundEngine.playKeystroke();
        modalMore.classList.remove('active');
        this.handlePromptExecution(promptText);
      }
    });
  }

  async handlePromptExecution(promptText) {
    // Check remaining energy charges
    if (this.levelManager.remainingEnergy <= 0) {
      this.setMessage("⚠️ No energy charges remaining! Reset chamber to try again.", "danger");
      return;
    }

    this.btnExecute.disabled = true;
    this.setMessage("⚡ Compiling natural language physics command...", "info");

    try {
      // Parse Prompt via Gemini Compiler or Deterministic Fallback
      const payload = await this.compiler.parsePrompt(promptText);
      this.lastParsedJson = payload;

      // Consume 1 Energy Charge
      this.levelManager.consumeEnergy();

      // Execute Payload Callback
      if (this.onExecutePrompt) {
        this.onExecutePrompt(payload);
      }

      // Visual & Sound Feedback
      if (payload.antigravity && payload.antigravity.enabled) {
        if (payload.antigravity.mode === 'INVERT') {
          this.soundEngine.playInversionSweep();
        } else {
          this.soundEngine.playGravityDrop();
        }
        this.visualJuice.triggerChromaticFlash();
      }

      this.setMessage(`💡 ${payload.hudMessage || "Physics state updated."}`, "success");
      this.terminalInput.value = '';

    } catch (err) {
      console.error("Execution error:", err);
      this.setMessage("❌ Failed to parse physics command.", "danger");
    } finally {
      this.btnExecute.disabled = false;
      this.updateStatusBadge();
    }
  }

  updateHUD(hudState) {
    if (!hudState) return;
    if (this.hudLevelNum) this.hudLevelNum.textContent = `${hudState.levelIndex + 1} / ${hudState.totalLevels}`;
    if (this.hudEnergyCharges) this.hudEnergyCharges.textContent = `⚡ ${hudState.remainingEnergy} / ${hudState.maxEnergy}`;

    LevelProgressBar.render('level-progress-container', hudState.levelIndex, hudState.totalLevels);

    if (this.cardChamberNum) this.cardChamberNum.textContent = hudState.chamberNum;
    if (this.cardChamberName) this.cardChamberName.textContent = hudState.chamberName;
    if (this.cardChamberObjective) this.cardChamberObjective.textContent = hudState.chamberObjective;

    // Gravity badge direction
    if (hudState.gravityVector) {
      const { x, y } = hudState.gravityVector;
      const isInv = hudState.isGlobalInverted;

      if (this.gravText) this.gravText.textContent = `(${x.toFixed(1)}, ${y.toFixed(1)})`;
      if (this.gravIcon && this.hudGravityState) {
        if (isInv) {
          this.gravIcon.textContent = "⬆️";
          this.hudGravityState.classList.add('inverted');
        } else if (y === 0 && x === 0) {
          this.gravIcon.textContent = "🌌";
          this.hudGravityState.classList.remove('inverted');
        } else {
          this.gravIcon.textContent = "⬇️";
          this.hudGravityState.classList.remove('inverted');
        }
      }
    }
  }

  setMessage(msg, type = "info") {
    this.terminalHudMessage.innerHTML = `<span>${msg}</span>`;
  }

  updateStatusBadge() {
    if (this.compiler.hasApiKey()) {
      this.statusIndicator.classList.remove('offline');
      this.statusText.textContent = "Gemini AI API Connected";
    } else {
      this.statusIndicator.classList.add('offline');
      this.statusText.textContent = "Deterministic Offline Parser";
    }
  }

  /* Modals Management */
  openApiKeyModal() {
    this.inputApiKey.value = this.compiler.apiKey || '';
    this.modalApiKey.classList.add('active');
  }

  closeApiKeyModal() {
    this.modalApiKey.classList.remove('active');
  }

  saveApiKey() {
    const key = this.inputApiKey.value.trim();
    this.compiler.setApiKey(key);
    this.updateStatusBadge();
    this.closeApiKeyModal();
    this.setMessage(key ? "🔑 Gemini API key configured." : "⚡ Switched to Deterministic Offline Parser.", "info");
  }

  openLevelModal() {
    this.chambersListContainer.innerHTML = '';

    CHAMBER_CONFIGS.forEach((ch, idx) => {
      const card = document.createElement('div');
      card.className = 'stat-box';
      card.style.cursor = 'pointer';
      card.style.justifyContent = 'space-between';
      card.style.background = idx === this.levelManager.currentLevelIndex ? 'rgba(0, 243, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)';
      card.style.borderColor = idx === this.levelManager.currentLevelIndex ? 'var(--neon-cyan)' : 'var(--border-dim)';

      card.innerHTML = `
        <div>
          <strong style="color: var(--neon-cyan);">${ch.number}</strong>: ${ch.name}
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${ch.objective}</div>
        </div>
        <button class="chip-btn">Load</button>
      `;

      card.addEventListener('click', () => {
        this.levelManager.loadChamber(idx);
        this.closeLevelModal();
      });

      this.chambersListContainer.appendChild(card);
    });

    this.modalLevelSelect.classList.add('active');
  }

  closeLevelModal() {
    this.modalLevelSelect.classList.remove('active');
  }

  openJsonModal() {
    if (this.lastParsedJson) {
      this.jsonInspectorContent.textContent = JSON.stringify(this.lastParsedJson, null, 2);
    } else {
      this.jsonInspectorContent.textContent = "// Execute a prompt to inspect real-time JSON payload.";
    }
    this.modalJsonInspector.classList.add('active');
  }

  closeJsonModal() {
    this.modalJsonInspector.classList.remove('active');
  }

  triggerWinEffect() {
    this.soundEngine.playVictoryPortal();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
