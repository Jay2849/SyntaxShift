export class ModalController {
  static toggleModal(id, show) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', show);
  }
}
