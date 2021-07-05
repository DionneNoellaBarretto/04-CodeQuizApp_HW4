// defining all variables
var scores = document.getElementById('score');
var clock = document.getElementById('timer');
var userScore = document.getElementById('user-score');
var leaderboard = document.getElementById('leaderboard');
var clearScores = document.getElementById('clear');
var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var submit = document.getElementById('submit');
var userInitials = document.getElementById('initials');
var tryAgain = document.getElementById('play-again');
var allScoresList = document.getElementById('leaders');
var leaderBoardButton = document.getElementById('high-scores');
var currentQuestionIndex;
var rightAnsPost = document.getElementById('rightAns');
var wrongAnsPost = document.getElementById('wrongAns');
var sec = 60;
var score = 0;
var shuffled = [];
var namesToKeep = "";
var scoresToKeep = [];


// start button listener triggered upon click
startButton.addEventListener('click', startQuiz);

// function to randomize a question from the questions array
function shuffleArray(passedArray) {
    for (var i = 0; i < passedArray.length; i++) {
        var rand = Math.floor(Math.random() * passedArray.length);
        var temp = passedArray[i];
        passedArray[i] = passedArray[rand];
        passedArray[rand] = temp;
    }
    return passedArray;
}

// quiz timer function
function timer() {
    var timer = setInterval(function() {
        document.getElementById('timer').textContent = 'Time Remaining : ' + sec;
        if (sec <= 0) {
            clearInterval(timer);
            endQuiz()
        }
        sec--;
    }, 1000);
}


// start button/hide elements/run quiz pt.1
function startQuiz() {
    timer();
    startButton.classList.add('hide');
    description.classList.add('hide');
    leaderBoardButton.classList.add('hide');
    shuffled = shuffleArray(questionArray);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    initializeQuestion(shuffled);
}

// randomized question listing
function initializeQuestion(shuffledQuestions) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// answer clearing
function clearoptions() {
    answerButtonsEl.innerHTML = "";
}

// question progression/run quiz pt.2
function showQuestion(currentQuestionObject) {
    questionEl.textContent = currentQuestionObject.title;
    clearoptions();
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[0].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function() {
        selectAnswer(currentQuestionObject.options[0].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[1].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function() {
        selectAnswer(currentQuestionObject.options[1].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[2].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function() {
        selectAnswer(currentQuestionObject.options[2].correct);
    })
    var answerbtn = document.createElement('answerbtn');
    answerbtn.textContent = currentQuestionObject.options[3].text;
    answerbtn.classList.add('btn', 'answer');
    document.getElementById('answer-buttons').appendChild(answerbtn);
    answerbtn.addEventListener('click', function() {
        selectAnswer(currentQuestionObject.options[3].correct);
    })
}

// validates and counts answers/provides feedback
function selectAnswer(isCorrect) {
    if (isCorrect == true) {
        score += 10;
        wrongAnsPost.classList.add('hide');
        rightAnsPost.classList.remove('hide');
    } else {
        sec -= 10;
        rightAnsPost.classList.add('hide');
        wrongAnsPost.classList.remove('hide');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex == shuffled.length) {
        alert("You have completed all of questions! Click OK for your score!");
        endQuiz();
    } else {
        showQuestion(shuffled[currentQuestionIndex]);
    }
}

// ends the quiz/shows and stores score
function endQuiz() {
    sec = 0;
    clock.classList.add('hide')
    rightAnsPost.classList.add('hide');
    wrongAnsPost.classList.add('hide');
    questionContainerEl.classList.add('hide');
    scores.classList.remove('hide');
    leaderBoardButton.classList.remove('hide');
    userScore.textContent = 'Your total was ' + score + ' out of 100!';
}


// scores history saved
submit.addEventListener('click', function(event) {
    event.preventDefault();
    showScoresHistory();
})

function addScores(initials, score) {
    var newScore = {
        initials: initials,
        score: score
    }
    scoresToKeep.push(newScore);
    localStorage.setItem('scoresToKeep', JSON.stringify(scoresToKeep));
}

// function to restart quiz
function startAgain() {
    clock.classList.remove('hide')
    sec = 60;
    score = 0;
    leaderboard.classList.add('hide');
    startQuiz();
}

// "try again" listener
tryAgain.addEventListener('click', function() {
    startAgain();
})

// clear/save/show scores
function clearScoresHistory() {
    //   localStorage.removeItem('scoresToKeep');
    localStorage.clear("scoresToKeep");
    localStorage.clear("namesToKeep");
    localStorage.clear("listOfLeaders");


    //   localStorage.setItem("");
    allScoresList.innerHTML = "";
}
clearScores.addEventListener('click', clearScoresHistory)

function showScoresHistory() {
    namesToKeep = userInitials.value;
    addScores(namesToKeep, score);
    scores.classList.add('hide');
    leaderboard.classList.remove('hide');
    allScoresList.innerHTML = "";
    var displayScores = JSON.parse(localStorage.getItem("scoresToKeep"));
    for (i = 0; i < displayScores.length; i++) {
        var newLeader = document.createElement("li");
        newLeader.setAttribute("class", "listOfLeaders");
        newLeader.append(document.createTextNode(`${displayScores[i].initials} ----- ${displayScores[i].score}`));
        allScoresList.append(newLeader);
    }
}

function showScoresOriginal() {
    namesToKeep = userInitials.value;
    scores.classList.add('hide');
    leaderboard.classList.remove('hide');
    allScoresList.innerHTML = "";
    var displayScores = JSON.parse(localStorage.getItem("scoresToKeep"));
    for (i = 0; i < displayScores.length; i++) {
        var newLeader = document.createElement("li");
        newLeader.setAttribute("class", "listOfLeaders");
        newLeader.append(document.createTextNode(`${displayScores[i].initials} ----- ${displayScores[i].score}`));
        allScoresList.append(newLeader);
    }
}
leaderBoardButton.addEventListener('click', function() {
    startButton.classList.add('hide');
    description.classList.add('hide');
    questionContainerEl.classList.add('hide');
    scores.classList.add('hide');
    showScoresOriginal();
});


// questions/answers ( google searched some of these and also referenced https://www.guru99.com/javascript-interview-questions-answers.html)
var questionArray = [{
        title: 'JavaScript only runs if it is stored in its own .js file.',
        options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true },
        ],
    }, {
        title: 'This is valid in javascript? \r\n var x=1, y=2 \r\n z= \r\n x+y;',
        options: [
            { text: 'False', correct: false },
            { text: 'True', correct: true },
        ],
    }, {
        title: 'Netscape is the software company that developed JavaScript.',
        options: [
            { text: 'False', correct: false },
            { text: 'True', correct: true },
        ],
    }, {
        title: '________ is a client-side and server-side scripting language.',
        options: [
            { text: 'CSS', correct: false },
            { text: 'Web API', correct: true },
            { text: 'HTML', correct: false },
            { text: 'JavaScript', correct: false },
        ],
    }, {
        title: 'One might say JavaScript is in the code as the',
        options: [
            { text: 'Content Layer', correct: false },
            { text: 'Behavior Layer', correct: true },
            { text: 'Annoying Layer', correct: false },
            { text: 'Presentation Layer', correct: false },
        ],
    }, {
        title: 'isNan function returns true if the argument is not a number; otherwise, it is false.',
        options: [
            { text: 'False', correct: false },
            { text: 'True', correct: true },
        ],
    }, {
        title: 'To use JavaScript, a browser needs',
        options: [
            { text: 'Nothing Special (No One of Consequence)', correct: false },
            { text: 'A Passport (License)', correct: false },
            { text: 'An Interpreter (Scripting Engine)', correct: true },
            { text: 'A Primary Key (Identifier)', correct: false },
        ],
    }, {
        title: 'When running, JavaScript directly modifies HTML code.',
        options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true },
        ],
    }, {
        title: '________ keyword refers to the object from where it was called.',
        options: [
            { text: 'that', correct: false },
            { text: 'this', correct: true },
            { text: 'NaN', correct: false },
            { text: 'var', correct: false },
        ],
    }, {
        title: 'Each instruction or step in JavaScript is a',
        options: [
            { text: 'Statement', correct: true },
            { text: 'Comment', correct: false },
            { text: 'Parameter', correct: false },
            { text: 'Lucky Guess', correct: false },
        ],
    }, {
        title: 'Bits of information stored for use in a script that might change every time it is run are',
        options: [
            { text: 'Variables', correct: true },
            { text: 'Constants', correct: false },
            { text: 'Vectors', correct: false },
            { text: 'Bytes', correct: false },
        ],
    }, {
        title: '________ is called a strict equality operator, which returns true when the two operands have the same value without conversion.',
        options: [
            { text: '=', correct: false },
            { text: '===', correct: true },
            { text: '==', correct: false },
            { text: '!=', correct: false },
        ],
    }, {
        title: 'To use information in a script, each "bit" must be ______ and had a value ______.',
        options: [
            { text: 'Updated/Applied', correct: false },
            { text: 'Declared/Assigned', correct: true },
            { text: 'Identified/Calculated', correct: false },
            { text: 'Addressed/Strummed', correct: false },
        ]
    }, {
        title: 'JavaScript data types include: Arrays, Objects, Undefined, Null,',
        options: [
            { text: 'Prime, Useful, Pointed', correct: false },
            { text: 'Assigned, Aligned, Refined', correct: false },
            { text: 'Numeric, Strings, Boolean', correct: true },
            { text: 'Sugar, Salt, Fat', correct: false },
        ]
    }, {
        title: 'Values in an array are accessed by the script as if they are in a numbered list.',
        options: [
            { text: 'True', correct: true },
            { text: 'False', correct: false },
        ]
    }, {
        title: '______ is a number in JavaScript which can be derived by dividing negative number by zero.',
        options: [
            { text: 'Negative Infinity', correct: true },
            { text: 'NaN', correct: false },
            { text: 'Modulo', correct: false },
            { text: 'Infinity', correct: false },
        ]
    }, {
        title: 'Output of (3+2+"7") is 57?',
        options: [
            { text: 'True', correct: true },
            { text: 'False', correct: false },
        ]
    }, {
        title: 'JavaScript supports automatic type conversion',
        options: [
            { text: 'False', correct: false },
            { text: 'True', correct: true },
        ],
    }, {
        title: 'An expression evaluates to a single ______ and relies on ______.',
        options: [
            { text: 'Entity/Order', correct: false },
            { text: 'Result/Evaluators', correct: false },
            { text: 'Page/Comparison', correct: false },
            { text: 'Value/Operators', correct: true },
        ]
    }, {
        title: '______ value is used to represent no value or no object.',
        options: [
            { text: 'Empty', correct: false },
            { text: '0', correct: false },
            { text: 'NaN', correct: false },
            { text: 'Null', correct: true },
        ]
    }, {
        title: 'JavaScript has a concept-level scope',
        options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true },
        ]
    }, {
        title: '______ in Javascript allows DOM elements to be nested inside each other such that if the handler of the child is clicked, the handler of the parent will also work as if it were clicked too.',
        options: [
            { text: 'Cascade', correct: false },
            { text: 'Iteration', correct: false },
            { text: 'Propogation', correct: false },
            { text: 'Event Bubbling', correct: true },
        ]
    },

];