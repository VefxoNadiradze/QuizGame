const currentIndexSpan = document.querySelector(".currentIndexSpan");
const QuizLengthSpan = document.querySelector(".QuizLengthSpan");
const question = document.querySelector(".question");
const answersParent = document.querySelector(".answers");
const nextBtn = document.querySelector(".nextBtn");
const countDownSpan = document.querySelector(".countDownSpan");
let currentIndex = 0;
const answers = ["A", "B", "C", "D"];
let count = 10;
let interval;
const disableAnswerButtons = () => {
  let answerBtns = Array.from(document.querySelectorAll(".answer"));
  answerBtns.map((item) => {
    item.disabled = true;
  });
};

const getData = async () => {
  try {
    let res = await fetch("data.json");
    let data = await res.json();
    currentIndexSpan.innerText = currentIndex + 1;
    QuizLengthSpan.innerText = data.length;
    question.innerText = data[currentIndex].question;
    countDownSpan.innerText = count;

    const CountDownFoo = () => {
      clearInterval(interval);
      count = 10;
      countDownSpan.innerText = count;

      interval = setInterval(() => {
        console.log(count);

        if (count > 0) {
          countDownSpan.innerText = count;
          count--;
        } else {
          countDownSpan.innerText = count;
          clearInterval(interval);
          currentIndexSpan.innerText = ++currentIndex + 1;
          question.innerText = data[currentIndex].question;
          let answerBtns = Array.from(document.querySelectorAll(".answer"));
          answers.map((item, index) => {
            answerBtns[index].innerText = data[currentIndex][item];
            answerBtns[index].classList.remove("correctAnswer");
            answerBtns[index].classList.remove("IncorrectAnswer");
            answerBtns[index].disabled = false;
            if (currentIndex + 1 < data.length) {
              CountDownFoo();
            }
          });
        }
      }, 1000);
    };

    CountDownFoo();

    answers.map((item) => {
      const answer = document.createElement("button");
      answer.classList.add("answer");
      answersParent.appendChild(answer);
      answer.innerText = data[currentIndex][item];

      answer.addEventListener("click", () => {
        disableAnswerButtons();
        if (item === data[currentIndex].answer) {
          answer.classList.add("correctAnswer");
        } else {
          answer.classList.add("IncorrectAnswer");
        }
      });
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex + 1 < data.length) {
        currentIndexSpan.innerText = ++currentIndex + 1;
        question.innerText = data[currentIndex].question;
        CountDownFoo();
        let answerBtns = Array.from(document.querySelectorAll(".answer"));

        answers.map((item, index) => {
          answerBtns[index].innerText = data[currentIndex][item];
          answerBtns[index].classList.remove("correctAnswer");
          answerBtns[index].classList.remove("IncorrectAnswer");
          answerBtns[index].disabled = false;
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

getData();
