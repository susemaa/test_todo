import { addModal } from './addModal';
import bin from '../bin.svg';
import { descriptionModal } from './descriptionModal';

export function updateLists(store) {
  document.querySelector('#lists-container').innerHTML = store.lists.map((list) => `
  <div class="checklist">
    <div class="checklist-header">
      <div class="checklist-title">
        ${list.name}
        <span class="edit-icon" id="edit${list.id}">✎</span>
      </div>
      <div class="delete-checklist" id="delete${list.id}">Удалить чек-лист</div>
    </div>
    <div class="item-container">
      ${list.todos.map((todo) => {
        if (store.show === 'active' && todo.finished)
          return '';
        if (store.show === 'finished' && !todo.finished)
          return '';
        
        return `
          <div class="checklist-item">
            <span>
              <input type="checkbox" id="task${todo.id}" ${todo.finished ? 'checked' : ''}>
              <label id="label${todo.id}" class="${todo.finished ? 'crossed' : ''}">
                ${todo.name}
              </label>
            </span>
            <span>
              <img src="${bin}" class="delete-checklist logo" id="delete${todo.id}" alt="Remove ${todo.name}"/>
            </span>
          </div>
        `;
      }).join('')}
    </div>
    <div class="button-add inline" id="add${list.id}">+ добавить пункт</div>
  </div>
  `).join('');

  store.lists.forEach((list) => {
    document.querySelector(`#add${list.id}`)
      .addEventListener('click', () => {
        addModal('addTodo', store, list.id);
    });

    document.querySelector(`#delete${list.id}`)
      .addEventListener('click', () => {
        store.lists = store.lists.filter((currList) => list.id !== currList.id);
        updateLists(store);
    });

    document.querySelector(`#edit${list.id}`)
      .addEventListener('click', () => {
        addModal('editListName', store, list.id);
    });

    list.todos.forEach((todo) => {
      if (store.show === 'all'
        || (store.show === 'active' && !todo.finished)
        || (store.show === 'finished' && todo.finished)) {
          document.querySelector(`#task${todo.id}`)
            .addEventListener('click', () => {
              todo.finished = !todo.finished;
              updateLists(store);
        });

        document.querySelector(`#delete${todo.id}`)
          .addEventListener('click', () => {
            const listIndex = store.lists.findIndex((currList) => currList.id === list.id);
            store.lists[listIndex].todos = store.lists[listIndex].todos
              .filter((currTodo) => currTodo.id !== todo.id);
            updateLists(store);
        });

        document.querySelector(`#label${todo.id}`)
          .addEventListener('click', () => {
            descriptionModal(todo.description);
          });
      }
    });
  })
};
