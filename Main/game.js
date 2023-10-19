const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const ScoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [

  {
    question: "What holiday is often associated with colorful eggs, bunnies, and Easter egg hunts?",
    choice1: "Christmas",
    choice2: "Halloween",
    choice3: "Thanksgiving",
    choice4: "Easter",
    answer: 3
  },
  {
    question: "In which country is the Day of the Dead (Dia de los Muertos) celebrated as a multi-day holiday to honor deceased loved ones?",
    choice1: "Italy",
    choice2: "Mexico",
    choice3: "China",
    choice4: "India",
    answer: 1
  },
  {
    question: "During which holiday do Jewish people celebrate the exodus from Egypt, typically with a Passover Seder meal?",
    choice1: "Hanukkah",
    choice2: "Yom Kippur",
    choice3: "Rosh Hashanah",
    choice4: "Passover",
    answer: 4
  },
  {
    question: "What is the traditional Japanese coming-of-age ceremony held for young people who have reached the age of 20?",
    choice1: "Sakura Festival",
    choice2: "Hinamatsuri",
    choice3: "Shichi-Go-San",
    choice4: "Seijin-no-Hi",
    answer: 4
  }

];

// Constant

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;


startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion()
};

getNewQuestion = () => {
  if (availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS) {
    // GO TO THE END PAGE
    return window.location.assign('end.html');
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;
 
  

  //update the progress bar
  progressBarFull.style.width =`${(questionCounter / MAX_QUESTIONS)*75}%` ;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number]


  });
  availableQuestions.splice(questionIndex, 1);
  acceptingAnswer = true;


};
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    //console.log(e.target)
    if (!acceptingAnswer) return;
    acceptingAnswer = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"]
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : "incorrect"
    //console.log(classToApply);

    if (classToApply == "correct") {
      incrementScore(CORRECT_BONUS)
    }
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000)
  });
});
incrementScore = num => {
  score = score += num;
  ScoreText.innerText = score;
}

startGame();

