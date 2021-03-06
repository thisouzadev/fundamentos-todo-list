const textoTarefa = document.querySelector('#texto-tarefa');
const criarTarefas = document.querySelector('#criar-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');

criarTarefas.addEventListener('click', () => {
  const newLi = document.createElement('li');
  newLi.innerText = textoTarefa.value;
  listaTarefas.appendChild(newLi);
  textoTarefa.value = '';
});

function selectItem() {
  listaTarefas.addEventListener('click', (event) => {
    const colorGrey = 'rgb(128, 128, 128)';
    const li = document.querySelectorAll('li');
    for (let index = 0; index < li.length; index += 1) {
      if (li[index].style.backgroundColor === colorGrey) {
        li[index].style.backgroundColor = '';
        li[index].classList.remove('seletorColor');
      }
    }
    const evt = event.target;
    evt.style.backgroundColor = colorGrey;
    evt.classList.add('seletorColor');
  });
}
selectItem();

function clearTasks() {
  const clearAllTasks = document.querySelector('#apaga-tudo');
  clearAllTasks.addEventListener('click', () => {
    listaTarefas.innerText = '';
  });
}
clearTasks();

function taskCompleted() {
  listaTarefas.addEventListener('dblclick', (event) => {
    const evt = event.target;
    if (evt.classList.contains('completed')) {
      evt.classList.remove('completed');
      evt.style.textDecoration = '';
    } else {
      evt.classList.add('completed');
      evt.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    }
  });
}
taskCompleted();

function removeTaskCompleted() {
  const butonRemoverFinalizados = document.querySelector('#remover-finalizados');
  butonRemoverFinalizados.addEventListener('click', () => {
    const completo = document.querySelectorAll('.completed');
    for (let index = 0; index < completo.length; index += 1) {
      listaTarefas.removeChild(completo[index]);
    }
  });
}
removeTaskCompleted();

const saveTask = () => {
  if (localStorage.getItem('key') !== undefined) {
    const listaItens = localStorage.getItem('key');
    listaTarefas.innerHTML = listaItens;
  }
  const salvarTarefas = document.querySelector('#salvar-tarefas');
  salvarTarefas.addEventListener('click', () => {
    localStorage.setItem('key', listaTarefas.innerHTML);
  });
};
saveTask();

// referencia:
// https://living-sun.com/pt/javascript/378747-move-list-item-up-javascript-dom.html
// https://developer.mozilla.org/en-US/docs/Web/API/Element/previousElementSibling
// https://developer.mozilla.org/en-US/docs/Web/API/Element/nextElementSibling
function moveLiButton() {
  const moveUp = document.querySelector('#mover-cima');
  moveUp.addEventListener('click', () => {
    const li = document.querySelector('.seletorColor');
    if (li != null && li.previousElementSibling) {
      li.parentNode.insertBefore(li, li.previousElementSibling);
    }
  });
  const moveDown = document.querySelector('#mover-baixo');
  moveDown.addEventListener('click', () => {
    const li = document.querySelector('.seletorColor');
    if (li != null && li.nextElementSibling) {
      li.parentNode.insertBefore(li.nextElementSibling, li);
    }
  });
}
moveLiButton();
