const startBtn = document.getElementById("start-btn");
const categorySelect = document.getElementById("category");
const difficultySelect = document.getElementById("difficulty");

let questions = []
let currentIndex = 0;
let score = 0;

startBtn.addEventListener("click", () => {
    startBtn.disabled = true; // block clicking on other questions
    startBtn.innerText = 'Loading..';

    const selectedCategory = categorySelect.value
    const selectedDifficulty = difficultySelect.value

    getQuestionsFromAPI(selectedCategory, selectedDifficulty);
});

// API call
async function getQuestionsFromAPI(category, difficulty) {
    numQuestions = 5

    const apiURL = `https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;

    try {
        const results = await fetch(apiURL);
        const data = await results.json()

        questions = data.results
        console.log("data succesfully grabbed", questions);

        document.getElementById('welcome-screen').style.display = 'none'; // hide welcome screen
        document.getElementById('game-screen').style.display = 'block'; // game-screen on

        displayGameScreen();
    }
    catch (error) {
        alert(error);
        console.error("API error");
    }
}

function displayGameScreen() {
    const gameScreen = document.getElementById("game-screen");
    const currentQuestion = questions[currentIndex];
    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];

    shuffleArray(allAnswers); // shuffle so correct answer is not in the last button

    // Show options for quesion
    gameScreen.innerHTML = `
        <h2>Question ${currentIndex + 1} of ${questions.length}</h2>
        <p class="subtitle"><strong>Score: ${score}</strong></p>
        <p class="description">${currentQuestion.question}</p>
        <div id="answers-container">
            ${allAnswers.map(answer => `<button class="answer-btn" style="display:block; margin: 5px 0;">${answer}</button>`).join('')}
        </div>
        
        <hr id="next-question-divider" style="display: none">
        <button id="next-btn" class="primary-btn" style="display: none;">Next Question</button>

        <button id="quit-btn" class="quit-link">Quit Game</button>
    `;

    // Check answer for each question when answered
    const answerButtons = document.querySelectorAll(".answer-btn");
    answerButtons.forEach(button => {
        button.addEventListener("click", event => {
            checkAnswer(button, currentQuestion.correct_answer);
        });
    });

    // When finished with question, click on next button
    document.getElementById("next-btn").addEventListener("click", () => {
        currentIndex++;

        if (currentIndex < questions.length) {
            displayGameScreen();
        } else {
            showGameOverScreen();
        }
    });

    // Quit option 
    document.getElementById("quit-btn").addEventListener("click", () => {
        quitGame();
    });
}

// Check if answer is correct 
function checkAnswer(clickedButton, correctAnswer) {
    const selectedAnswer = clickedButton.innerText;
    const allButtons = document.querySelectorAll(".answer-btn");

    allButtons.forEach(button => {
        button.disabled = true;
    });

    if (selectedAnswer == correctAnswer) {
        clickedButton.classList.add("correct");
        score++;
    } else {
        clickedButton.classList.add("wrong");
        
        allButtons.forEach(button => {
            if (button.innerText == correctAnswer) {
                button.classList.add("correct");
            }
        });
    }

    // Make next button visible after user selects a choice
    const nextBtn = document.getElementById("next-btn");
    nextBtn.style.display = 'block';
    
    // Make divider visible after user selects a choice
    const nextQuestionDivider = document.getElementById("next-question-divider");
    nextQuestionDivider.style.display = 'block';

    // On last question, send to result screen
    if(currentIndex == questions.length - 1) {
        nextBtn.innerText = "See Results";
    }
}

// Show game stats
function showGameOverScreen() {
    const gameScreen = document.getElementById("game-screen");
    const percentage = Math.round((score / questions.length) * 100).toFixed();

    let performanceMessage = '';
    if (score == questions.length) {
        performanceMessage = 'Perfect score! You are a Trivia Master!';
    }
    else if (score >= 3) {
        performanceMessage = 'Great job! You are a Pro!';
    }
    else {
        performanceMessage = 'Better luck next time! You are a Novice!';
    }

    gameScreen.innerHTML = `
        <h2 class="title">Game Over!</h2>
        <p class="subtitle">Your final score is <strong>${score}</strong> out of ${questions.length} (${percentage}%).</p>
        <h3 class="description">${performanceMessage}</h3>
        
        <button id="replay-btn" class="primary-btn" style="margin-top: 20px;">Play Again</button>
    `;
    
    document.getElementById("replay-btn").addEventListener("click", () => {
        location.reload();
    });

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// If user quits games, reset everything
function quitGame() {
    currentIndex = 0;
    score = 0;
    questions = [];

    startBtn.disabled = false;
    startBtn.innerText = 'Start Game';

    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
}
