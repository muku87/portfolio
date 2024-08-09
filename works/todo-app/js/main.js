'use strict';

const addButton = document.querySelector('.add-btn');
const deleteAllBtn = document.querySelector('.delete-btn');
const input = document.querySelector('.input-text');
const ul = document.querySelector('.todo-list');

//ローカルストレージから値（todos）のTodoリストを取得する
let list = JSON.parse(localStorage.getItem('todos')) || [];

// Todoリストを表示する関数
function displayTodos() {
  ul.innerHTML = ''; //既存のリストをクリア
  for (const item of list) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.textContent = `${item.data} ${item.todo}`;
    if (item.done) {
      li.classList.add('done');
    }
    //完了・削除ボタン要素を生成
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('li-buttons');
    li.appendChild(buttonsDiv);

    const doneBtn = document.createElement('button');
    doneBtn.innerText = '完了';
    doneBtn.classList.add('doneBtn');
    buttonsDiv.appendChild(doneBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '削除';
    deleteBtn.classList.add('deleteBtn');
    buttonsDiv.appendChild(deleteBtn);

    doneBtn.addEventListener('click', () => toggleDone(li, item));
    deleteBtn.addEventListener('click', () => deleteItem(li, item));


    ul.appendChild(li);
  }
}

// Todoアイテムの完了状態をトグルする関数
function toggleDone(li, item) {
  li.classList.toggle('done');
  item.done = li.classList.contains('done');
  localStorage.setItem('todos', JSON.stringify(list));
}

// Todoアイテムを削除する関数
function deleteItem(li, item) {
  if(window.confirm('削除しますか？')) {
    list = list.filter(todo => todo !== item);
    localStorage.setItem('todos', JSON.stringify(list));
    displayTodos(); // 更新後の表示
  }
}

//Todoアイテムを追加する処理
addButton.addEventListener('click', function () {
  //日付追加
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const output = `${year}/${month}/${date}`;

  if (input.value == '') {
    alert('入力してください');
    return;
  }

  //入力文字数を15文字に制限
  const todoValue = input.value.slice(0, 15);
    list.push({
    data: output,
    todo: todoValue,
    done: false,
  });
    
  localStorage.setItem('todos', JSON.stringify(list));
  input.value = '';
  displayTodos();
});

//全削除ボタンの処理
deleteAllBtn.addEventListener('click', ()=> {
  if (window.confirm('全て削除しますか？')) {
    localStorage.clear();
    list = [];
    displayTodos();
  }
});

//初期表示
displayTodos();
