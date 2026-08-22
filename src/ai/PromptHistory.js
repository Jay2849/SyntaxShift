export class PromptHistory {
  constructor() { this.history = []; }
  add(prompt) { this.history.push({ prompt, timestamp: Date.now() }); }
}
