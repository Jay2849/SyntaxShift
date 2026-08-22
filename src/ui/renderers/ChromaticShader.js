export function triggerChromaticPulse(containerId = 'stage-container') {
  const el = document.getElementById(containerId);
  if (el) {
    el.classList.remove('chromatic-pulse');
    void el.offsetWidth;
    el.classList.add('chromatic-pulse');
  }
}
