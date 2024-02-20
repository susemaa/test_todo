import { updateLists } from './lists';
import { getUniqueId, escapeHtml } from '../lib';

const map = {
  header: {
    'addList': 'Введите название чек-листа',
    'addTodo': 'Введите название и описание задачи',
    'editListName': 'Введите новое название',
  },
  placeholderName: {
    'addList': 'Домашнее задание',
    'addTodo': 'Сделать математику',
    'editListName': 'Домашнее задание',
  },
  placeholderDiscription: {
    'addTodo': 'Номера 123, 124, 125',
  },
  submitButton: {
    'addList': 'Добавить',
    'addTodo': 'Добавить',
    'editListName': 'Изменить',
  }
}

export function addModal(type, store, listId) {
  const modal = document.querySelector('.modal');
  modal.innerHTML = `
  <div class="modal-content">
      <h2>${map.header[type]}</h2>
      <input type="text" placeholder="${map.placeholderName[type]}" />
      ${type === 'addTodo' ? `<input type="text" placeholder="${map.placeholderDiscription[type]}" />` : ''}
      <div class="buttons">
        <button type="button" class="button-submit">${map.submitButton[type]}</button>
        <button type="button" class="button-cancel">Отмена</button>
      </div>
  </div>
  `;
  modal.style.display = 'block';

  const [nameInput, descriptionInput] = modal.querySelectorAll('input');
  if (type === 'editListName') {
    nameInput.value = store.lists.find((list) => list.id === listId).name;
    nameInput.select();
  } else {
    nameInput.focus();
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  document.querySelector('.button-cancel')
    .addEventListener('click', () => {
      modal.style.display = 'none';
  });

  document.querySelector('.button-submit')
    .addEventListener('click', () => {
      if (type === 'addList') {
        store.lists.push({
          id: getUniqueId(),
          name: escapeHtml(nameInput.value),
          todos: [],
        });
      } else if (type === 'addTodo') {
        store.lists.forEach((list) => {
          if (list.id === listId)
            list.todos.push({
              name: escapeHtml(nameInput.value),
              description: escapeHtml(descriptionInput.value),
              id: getUniqueId(),
              finished: false,
            });
        });
      } else if (type === 'editListName') {
        store.lists.forEach((list) => {
          if (list.id === listId)
            list.name = escapeHtml(nameInput.value);
        });
      }
      updateLists(store);
      modal.style.display = 'none';
  });
}