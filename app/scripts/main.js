(function () {
  'use strict'

  // 問題定義
  const wordLists = ['うまみ', 'まずみ', '漢字です'];
  const totalWordNum = wordLists.length;
  let wordNum;
  let choiceWord;

  // 問題の中からランダムの値を返し、指定された値は削除する。
  const createTypeWord = () => {
    wordNum = Math.floor(Math.random() * wordLists.length);
    choiceWord = wordLists[wordNum];
    wordLists.splice(wordNum, 1)
    return choiceWord;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const titleWrap = document.getElementById('js-title-wrap');
    const questionWrap = document.getElementById('js-question-wrap');
    const totalResultWrap = document.getElementById('js-total-result-wrap');

    const typeWord = document.getElementById('js-type-word');
    const resultCorrect = document.getElementById('js-result-correct');
    const resultIncorrect = document.getElementById('js-result-incorrect');
    const inputAnswer = document.getElementById('js-input-answer');
    const startBtn = document.getElementById('js-start-btn');
    const confirmBtn = document.getElementById('js-confirm-btn');
    const nextQuestionBtn = document.getElementById('js-next-question-btn');
    const totalWordNumber = document.getElementById('js-total-word-number').textContent = totalWordNum;
    const totalCorrectWordNumber = document.getElementById('js-total-correct-word-number');
    const currentWordNumber = document.getElementById('js-current-word-number');
    const totalResultBtn = document.getElementById('js-total-result-btn');
    let currentNum = 1;
    let totalCorrectNum = 0;

    const checkAnswer = (str) => {
      inputAnswer.disabled = true;
      confirmBtn.classList.add('hide');

      if (typeWord.textContent === str) {
        resultCorrect.classList.add('show');
        setTimeout(() => {
          resultCorrect.classList.remove('show');
        }, 1000);
        totalCorrectNum++;
        totalCorrectWordNumber.textContent = totalCorrectNum;
      } else {
        resultIncorrect.classList.add('show');
        setTimeout(() => {
          resultIncorrect.classList.remove('show');
        }, 1000);
      }

      if (currentNum === totalWordNum) {

        totalResultBtn.classList.add('show');
        setTimeout(function () {
          totalResultBtn.focus();
        },0);
      } else {
        currentNum++;
        initQuestion();
        // nextQuestionBtn.classList.add('show');
        // setTimeout(function () {
        //   nextQuestionBtn.focus();
        // },0);
      }
    }

    const initQuestion = () => {
      currentWordNumber.textContent = currentNum;
      inputAnswer.value = '';
      inputAnswer.disabled = false;
      // resultCorrect.classList.remove('show');
      // resultIncorrect.classList.remove('show');
      confirmBtn.classList.remove('hide');
      nextQuestionBtn.classList.remove('show');
      typeWord.textContent = createTypeWord();
      inputAnswer.focus();
    }

    const totalResult = () => {
      const score = Math.floor((totalCorrectNum / totalWordNumber) * 100);
      const totalScoreComment = document.getElementById('js-total-score-comment');
      document.getElementById('js-total-score').textContent = score;
      if (score === 100) {
        totalScoreComment.textContent = '素晴らしい！'
      } else if (score => 80) {
        totalScoreComment.textContent = 'いい感じ'
      } else if (score => 50) {
        totalScoreComment.textContent = 'もうちょっと'
      }
      questionWrap.classList.add('hide');
      totalResultWrap.classList.add('show');
    }

    startBtn.addEventListener('click', () => {
      titleWrap.classList.add('hide');
      questionWrap.classList.add('show');
      initQuestion();
    });

    inputAnswer.addEventListener('keydown', (e) => {
      if(e.keyCode === 13){
        checkAnswer(inputAnswer.value);
      }
    });

    confirmBtn.addEventListener('click', () => {
      checkAnswer(inputAnswer.value);
    });

    nextQuestionBtn.addEventListener('click', () => {
      currentNum++;
      initQuestion();
    })

    totalResultBtn.addEventListener('click', () => {
      totalResult();
    });
  });
}());
