import '../style.css'
import { setupHeader } from './header';
/*
type list = {
  name: string, 
  id: number,
  todos: [];
}
*/
const store = {
  lists: [],
  show: 'all',
}

document.querySelector('#app').innerHTML = `
<div class="container">
  <div class="container-title">
    Чек-листы
  </div>
  <div class="container-header"></div>
  <div id="lists-container"></div>
</div>
<div class="modal"></div>
`

setupHeader(document.querySelector('.container-header'), store);
