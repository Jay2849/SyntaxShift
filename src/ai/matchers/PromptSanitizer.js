export function sanitizePromptString(str) {
  return (str || '').toLowerCase().trim().replace(/[^a-z0-9\s-]/gi, '');
}

export function stripPunctuation(str) { return str.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ""); }