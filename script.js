const currentIndexSpan = document.querySelector(".currentIndexSpan");
const QuizLengthSpan = document.querySelector(".QuizLengthSpan");
const question = document.querySelector(".question");
const answersParent = document.querySelector(".answers");
const nextBtn = document.querySelector(".nextBtn");
const countDownSpan = document.querySelector(".countDownSpan");
const main = document.querySelector("main");
let currentIndex = 0;
const answers = ["A", "B", "C", "D"];
let count = 10;
let interval;
let clicked = false;
let score = 0;
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

      interval = setInterval(() => {
        if (count > 0) {
          countDownSpan.innerText = count;
          count--;
        } else {
          countDownSpan.innerText = count;
          clearInterval(interval);
          currentIndexSpan.innerText = ++currentIndex + 1;
          question.innerText = data[currentIndex]?.question;
          let answerBtns = Array.from(document.querySelectorAll(".answer"));
          answers.map((item, index) => {
            answerBtns[index].innerText =
              data[currentIndex] && data[currentIndex][item];
            answerBtns[index].classList.remove("correctAnswer");
            answerBtns[index].classList.remove("IncorrectAnswer");
            answerBtns[index].disabled = false;
            if (currentIndex + 1 <= data.length) {
              CountDownFoo();
              return;
            } else {
              currentIndexSpan.innerText = currentIndex;

              main.innerHTML = "";
              const totalScore = document.createElement("h3");
              main.appendChild(totalScore);
              totalScore.innerText = `Total score:  ${score}`;

              const restartBtn = document.createElement("button");
              restartBtn.innerText = "Try again";
              restartBtn.classList.add("restartBtn");
              main.appendChild(restartBtn);
              let answerBtns = Array.from(document.querySelectorAll(".answer"));

              restartBtn.addEventListener("click", () => {
                CountDownFoo();
                score = 0;
                currentIndex = 0;
                currentIndexSpan.innerText = currentIndex + 1;
                totalScore.remove();
                restartBtn.remove();
                question.innerText = data[currentIndex].question;
                main.appendChild(question);
                main.appendChild(answersParent);

                answerBtns = Array.from(document.querySelectorAll(".answer"));
                answers.map((item, index) => {
                  answerBtns[index].innerText = data[currentIndex][item];
                  answerBtns[index].classList.remove("correctAnswer");
                  answerBtns[index].classList.remove("IncorrectAnswer");
                  answerBtns[index].disabled = false;
                });

                main.appendChild(nextBtn);
              });
            }
          });
        }
      }, 300);
    };

    CountDownFoo();

    answers.map((item) => {
      const answer = document.createElement("button");
      answer.classList.add("answer");
      answersParent.appendChild(answer);
      answer.innerText = data[currentIndex][item];

      answer.addEventListener("click", () => {
        disableAnswerButtons();

        clearInterval(interval);
        if (item === data[currentIndex].answer) {
          answer.classList.add("correctAnswer");
          score += 1;
        } else {
          answer.classList.add("IncorrectAnswer");
        }

        clicked = true;

        if (currentIndex + 1 == data.length && clicked == true) {
          main.innerHTML = "";
          const totalScore = document.createElement("h3");
          main.appendChild(totalScore);
          totalScore.innerText = `Total score:  ${score}`;

          const restartBtn = document.createElement("button");
          restartBtn.innerText = "Try again";
          restartBtn.classList.add("restartBtn");
          main.appendChild(restartBtn);
          let answerBtns = Array.from(document.querySelectorAll(".answer"));

          restartBtn.addEventListener("click", () => {
            CountDownFoo();
            score = 0;
            currentIndex = 0;
            currentIndexSpan.innerText = currentIndex + 1;
            totalScore.remove();
            restartBtn.remove();
            question.innerText = data[currentIndex].question;
            main.appendChild(question);
            main.appendChild(answersParent);

            answerBtns = Array.from(document.querySelectorAll(".answer"));
            answers.map((item, index) => {
              answerBtns[index].innerText = data[currentIndex][item];
              answerBtns[index].classList.remove("correctAnswer");
              answerBtns[index].classList.remove("IncorrectAnswer");
              answerBtns[index].disabled = false;
            });

            main.appendChild(nextBtn);
          });
        }
      });
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex + 1 < data.length) {
        CountDownFoo();
        clicked = false;
        currentIndexSpan.innerText = ++currentIndex + 1;
        question.innerText = data[currentIndex].question;

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
