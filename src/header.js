import { updateLists } from "./lists";
import { addModal } from "./addModal";

const mapTab = {
  'Все задачи': 'all',
  'Активные': 'active',
  'Выполненные': 'finished',
}

export function setupHeader(element, store) {
  element.innerHTML=`
  <div>
    <span class="tab active">Все задачи</span>
    <span class="tab">Активные</span>
    <span class="tab">Выполненные</span>
  </div>
  <div class="button-add" id="add-list">
    + добавить чек-лист
  </div>
  `
  const tabs = element.querySelectorAll('.tab');
  tabs.forEach((tab) => 
    tab.addEventListener('click', ()  => {
      tabs.forEach((tab) => tab.classList.remove('active'));
      tab.classList.add('active');
      store.show = mapTab[tab.textContent];
      updateLists(store);
  }));

  const addListButton = document.querySelector('#add-list');
  addListButton.addEventListener('click', () => {
    addModal('addList', store);
  });
}