export function descriptionModal(description) {
  const modal = document.querySelector('.modal');
  modal.innerHTML = `
  <div class="modal-content">
      <div class="close">x</div>
      <div>${description}</div>
  </div>
  `;
  modal.style.display = 'block';

  document.querySelector('.close')
    .addEventListener('click', () => {
      modal.style.display = 'none';
    })

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}