const currentIndexSpan = document.querySelector(".currentIndexSpan");
const QuizLengthSpan = document.querySelector(".QuizLengthSpan");
const question = document.querySelector(".question");
const answersParent = document.querySelector(".answers");
const nextBtn = document.querySelector(".nextBtn");
let currentIndex = 0;
const answers = ["A", "B", "C", "D"];

const getData = async () => {
  try {
    let res = await fetch("data.json");
    let data = await res.json();
    currentIndexSpan.innerText = currentIndex + 1;
    QuizLengthSpan.innerText = data.length;

    answers.map((item) => {
      const answer = document.createElement("button");
      answer.classList.add("answer");
      answersParent.appendChild(answer);
      answer.innerText = data[currentIndex][item];
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex + 1 < data.length) {
        currentIndexSpan.innerText = ++currentIndex + 1;

        let answerBtns = Array.from(document.querySelectorAll(".answer"));

        answers.map((item, index) => {
          answerBtns[index].innerText = data[currentIndex][item];
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

getData();
