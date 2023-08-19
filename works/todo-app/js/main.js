'use strict';

const addButton = document.querySelector('.add-btn');
const deleteAllBtn = document.querySelector('.delete-btn');
const input = document.querySelector('.input-text');
const ul = document.querySelector('.todo-list');

//ローカルストレージから値（todos）のTodoリストを取得する
let list = JSON.parse(localStorage.getItem('todos')) || [];

//ローカルストレージから取得したTodoリストを表示する
for (const item of list) {
  //li要素を生成
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.textContent = `${item.data} ${item.todo}`;
  if (item.done) {
    // 追加：doneの状態に応じてスタイルを変更
    li.classList.add('done');
  }

  ul.appendChild(li);

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

  //doneボタンを押したときの処理
  doneBtn.addEventListener('click', function () {
    const li_done = doneBtn.closest('li');
    li_done.classList.toggle('done');
    const index = Array.from(ul.children).indexOf(li_done);
    list[index].done = li_done.classList.contains('done');
    localStorage.setItem('todos', JSON.stringify(list));
  });
  //deleteボタンを押したときの処理
  deleteBtn.addEventListener('click', function () {
    const result = window.confirm('削除しますか？');
    if (result) {
      const li = deleteBtn.closest('li');
      const index = Array.from(ul.children).indexOf(li);
      list.splice(index, 1);

      localStorage.setItem('todos', JSON.stringify(list));
      //リストから要素を削除
      ul.removeChild(li);
    }
  });
}


//addボタンを押した時の処理
addButton.addEventListener('click', function () {
  //日付追加
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();
  const output = `${year}/${month + 1}/${date}`;

  //入力値が空の場合の警告ダイアログを表示し、処理を中断する
  if (input.value == '') {
    alert('入力してください');
    return;
  }

  //入力文字数を15文字に制限
  input.value = input.value.slice(0, 15);


  //li要素を生成
  const li = document.createElement('li');
  li.classList.add('todo-item');
  li.textContent = `${output} ${input.value}`;

  ul.appendChild(li);


  list.push({
    data: output,
    todo: input.value,
    done: false,
  });

  //ローカルストレージに値を設定
  localStorage.setItem('todos', JSON.stringify(list));


  //入力欄を空にする
  input.value = '';

  //完了・削除ボタン要素の生成
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

  //doneボタンを押したときの処理
  doneBtn.addEventListener('click', function () {
    const li_done = doneBtn.closest('li');
    li_done.classList.toggle('done');
    const index = Array.from(ul.children).indexOf(li_done);
    list[index].done = li_done.classList.contains('done');
    localStorage.setItem('todos', JSON.stringify(list));
  });

  //deleteボタンを押した時の処理
  deleteBtn.addEventListener('click', function () {
    const result = window.confirm('削除しますか？');
    if (result) {
      const li = deleteBtn.closest('li');
      const index = Array.from(ul.children).indexOf(li);
      list.splice(index, 1);

      localStorage.setItem('todos', JSON.stringify(list));
      //リストから要素を削除
      ul.removeChild(li);
    }
  });
});

//全削除ボタンを押した時の処理
deleteAllBtn.addEventListener('click', function () {
  const result = window.confirm('全て削除しますか？');
  if (result) {
    localStorage.clear();
    location.reload();
  }
});