const questions = [
    {
        Question: "What is the capital city of Kenya",
        Answers: [
            { text: 'Nairobi' , correct: true},
            { text: 'Nakuru' , correct: false},
            { text: 'Nyeri' , correct: false},
            { text: 'Kisumu' , correct: false},
        ]
    },
    {
        Question: "How many counties does Kenya have?",
        Answers: [
            { text: '39' , correct: false},
            { text: '40' , correct: false},
            { text: '47' , correct: true},
            { text: '36' , correct: false},
        ]
    },
    {
        Question: "Which of this is not a city in Kenya",
        Answers: [
            { text: 'Nairobi' , correct: false},
            { text: 'Nakuru' , correct: false},
            { text: 'Nyeri' , correct: true},
            { text: 'Kisumu' , correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.Question;
    currentQuestion.Answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}
function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct == "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
        
    });
    nextButton.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextbutton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbutton();
    }else{
        startQuiz();
    }
});


startQuiz();
