'use strict';

(function () {
  const btn = document.querySelector('.btn');
  const result = document.querySelector('#result');
  const resultMessage = document.querySelector('#result-message');

  const results = [
    ['大吉', '今日は素晴らしい一日になるでしょう♪'],
    ['吉', '今日は素敵な出会いがあるかも！？'],
    ['吉', '今日はラッキーな一日です。'],
    ['吉', '瞑想すると良いでしょう。']
    ['中吉', '期待していい日です！'],
    ['中吉', '笑顔で乗り切れば問題なし！'],
    ['小吉', '良いこともあるさ。'],
    ['小吉', '部屋の掃除をしましょう！'],
    ['末吉', '平凡な一日になりそうです。'],
    ['凶', '気をつけて過ごしましょう。'], 
    ['大凶', '今日はお家でゆっくり過ごしましょう。'],
  ];

  function showResult() {
    const randomResult = Math.floor(Math.random() * results.length);

    result.classList.add('answer');
    result.textContent = results[randomResult][0];
    resultMessage.textContent = results[randomResult][1];

    resultMessage.classList.add('message');

    //ボタンのテキストを「再度占う」に変更
    btn.textContent = '再度占う';

   // ボタンのスタイルを変更
   btn.classList.add('retry');
  }

  btn.addEventListener('click', showResult);

})();