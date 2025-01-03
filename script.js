const currentIndexSpan = document.querySelector(".currentIndexSpan");
const QuizLengthSpan = document.querySelector(".QuizLengthSpan");
const question = document.querySelector(".question");

const getData = async () => {
  try {
    let res = await fetch("data.json");
    let data = await res.json();
  } catch (error) {
    console.log(error);
  }
};
