//import questions from "./questions";

const questions = [
  {
    question: "Какой метод можно использовать для возврата объекта из массива?",
    answers: ["reduce", "map", "split", "filter"],
    correct: 1,
  },
  {
    question: "Какое утверждение неверно?",
    answers: [
      "Map может использовать объекты в качестве ключей",
      "Стрелочные функции используют значение this окружающего контекста.",
      "Конструкция try..catch работает асинхронно",
      "Все встроенные функции-конструкторы используют свойство prototype",
    ],
    correct: 3,
  },
  {
    question:
      "let text = 5 + null + 'lalala'; Чему равно значение переменной text?",
    answers: ["ReferenceError", "NaN", "5nulllalala", "5lalala"],
    correct: 4,
  },
  {
    question: "let arr = [1, 2]; Что вернет console.log(...arr)?",
    answers: ["[1, 2]", "TypeError", "ReferenceError", "1 2"],
    correct: 4,
  },
];

//Элементы
const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

//переменные игры
let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  const title = `<h2 class="title">${questions[questionIndex]["question"]}</h2>`;

  headerContainer.innerHTML = title;

  for ([answerNumber, answerText] of questions[questionIndex][
    "answers"
  ].entries()) {
    const answerHTML = `<li>
		<label>
			<input value="${answerNumber + 1}" type="radio" class="answer" name="answer" />
			<span>${answerText}</span>
		</label>
	</li>`;

    listContainer.innerHTML += answerHTML;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );
  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }
  const userAnswer = parseInt(checkedRadio.value);

  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  console.log("showResults.started");

  let title, message;

  //titles and text variants
  if (score === questions.length) {
    title = "Поздравляем! 🏆";
    message = "Вы ответили верно на все вопросы! 😎 👍";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой результат! 😉";
    message = "Вы дали больше половины правильных ответов! 👍";
  } else {
    title = "Стоит постараться 😑";
    message = "Пока у вас меньше половины правильных ответов! ";
  }

  //result
  result = `${score} из ${questions.length}`;

  const finalMessage = `<h2 class="title">${title}</h2>
	<h3 class="summary">${message}</h3>
	<p class="result">${result}</p>`;

  headerContainer.innerHTML = finalMessage;

  submitBtn.blur();

  submitBtn.innerText = "Начать заново";
  submitBtn.onclick = () => history.go();
}
