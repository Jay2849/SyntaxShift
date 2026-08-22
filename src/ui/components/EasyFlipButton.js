export class EasyFlipButton {
  static createButton(onClick) {
    const btn = document.createElement('button');
    btn.className = 'btn-execute';
    btn.style.background = 'linear-gradient(135deg, #ff0055, #b537f2)';
    btn.innerHTML = '<span>⚡ 1-CLICK FLIP GRAVITY</span>';
    btn.addEventListener('click', onClick);
    return btn;
  }
}
