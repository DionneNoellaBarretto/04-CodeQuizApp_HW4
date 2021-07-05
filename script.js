// defining all variables
var scores = document.getElementById('score');
var clock = document.getElementById('timer');
var tryAgain = document.getElementById('play-again');
var allScoresList = document.getElementById('leaders');
var leaderBoardButton = document.getElementById('highscores');
var currentQuestionIndex;
var clearScores = document.getElementById('clear');
var startButton = document.getElementById('start-btn');
var description = document.getElementById('description');
var qnContainerEl = document.getElementById('qn-section');
var qnEl = document.getElementById('qn');
var ansButtonsEl = document.getElementById('ans-buttons');
var submit = document.getElementById('submit');
var userInitials = document.getElementById('initials');
var correctAnsPost = document.getElementById('correctAns');
var incorrectAnsPost = document.getElementById('incorrectAns');
var userScore = document.getElementById('user-score');
var leaderboard = document.getElementById('leaderboard');
//setting initial time remaining to 90 seconds
var sec = 75;
var score = 0;
var shuffled = [];
var namesToKeep = "";
var scoresToKeep = [];
//qn answer array ( for the qn bank referenced https://www.guru99.com/javascript-interview-questions-answers.html & https://github.com/sudheerj/javascript-interview-questions#what-is-a-higher-order-function )
var qnArray = [{
        title: 'JavaScript only runs if it is stored in its own .js file.',
        options: [
            { text: 'True', correct: false },
            { text: 'False', correct: true },
        ],
    }, {
        title: 'Accessing a let or const variable before its declaration (within its scope) causes a _____. ',
        options: [
            { text: 'ScopeError', correct: false },
            { text: 'SyntaxError', correct: false },
            { text: 'UnexpectedError', correct: false },
            { text: 'ReferenceError', correct: true },
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
            { text: 'Web API', correct: false },
            { text: 'HTML', correct: false },
            { text: 'JavaScript', correct: true },
        ],
    }, {
        title: 'Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution.',
        options: [
            { text: 'False', correct: false },
            { text: 'True', correct: true },
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
        title: 'let, const and var are used to declare and initialize variables?',
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


// start button listener triggered upon click
startButton.addEventListener('click', startQuiz);

// function to randomize a question from the questions array serving as input ( total of 25 questions)
function shuffleArray(inputArray) {
    for (var i = 0; i < inputArray.length; i++) {
        var rand = Math.floor(Math.random() * inputArray.length);
        var temp = inputArray[i];
        inputArray[i] = inputArray[rand];
        inputArray[rand] = temp;
    }
    return inputArray;
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

// when start button is clicked, hide all other elements apart from the shuffled random question and its options 
function startQuiz() {
    timer();
    startButton.classList.add('hide');
    description.classList.add('hide');
    leaderBoardButton.classList.add('hide');
    // calling the shuffleArray function to randomize the qns defined in the qnArray var uptop
    shuffled = shuffleArray(qnArray);
    currentQuestionIndex = 0;
    qnContainerEl.classList.remove('hide');
    initializeQuestion(shuffled);
}

// function to randomize question list
function initializeQuestion(shuffledQuestions) {
    showQn(shuffledQuestions[currentQuestionIndex]);
}

// function to clear out the answer
function clearoptions() {
    ansButtonsEl.innerHTML = "";
}

// function for listing question with the 4 options as answers
function showQn(currentQuestionObject) {
    qnEl.textContent = currentQuestionObject.title;
    clearoptions();
    var ansbtn = document.createElement('ansbtn');
    ansbtn.textContent = currentQuestionObject.options[0].text;
    ansbtn.classList.add('btn', 'ans');
    document.getElementById('ans-buttons').appendChild(ansbtn);
    ansbtn.addEventListener('click', function() {
        selectAns(currentQuestionObject.options[0].correct);
    })
    var ansbtn = document.createElement('ansbtn');
    ansbtn.textContent = currentQuestionObject.options[1].text;
    ansbtn.classList.add('btn', 'ans');
    document.getElementById('ans-buttons').appendChild(ansbtn);
    ansbtn.addEventListener('click', function() {
        selectAns(currentQuestionObject.options[1].correct);
    })
    var ansbtn = document.createElement('ansbtn');
    ansbtn.textContent = currentQuestionObject.options[2].text;
    ansbtn.classList.add('btn', 'ans');
    document.getElementById('ans-buttons').appendChild(ansbtn);
    ansbtn.addEventListener('click', function() {
        selectAns(currentQuestionObject.options[2].correct);
    })
    var ansbtn = document.createElement('ansbtn');
    ansbtn.textContent = currentQuestionObject.options[3].text;
    ansbtn.classList.add('btn', 'ans');
    document.getElementById('ans-buttons').appendChild(ansbtn);
    ansbtn.addEventListener('click', function() {
        selectAns(currentQuestionObject.options[3].correct);
    })
}

// validates and counts answers in multiples of 4 since I have 25 questions in the bank for a total of 100 points
function selectAns(isCorrect) {
    if (isCorrect == true) {
        score += 4;
        incorrectAnsPost.classList.add('hide');
        correctAnsPost.classList.remove('hide');
    } else {
        sec -= 4;
        correctAnsPost.classList.add('hide');
        incorrectAnsPost.classList.remove('hide');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex == shuffled.length) {
        alert("You have completed all of questions! Click OK for your score!");
        endQuiz();
    } else {
        showQn(shuffled[currentQuestionIndex]);
    }
}

// ends the quiz/shows and stores score
function endQuiz() {
    sec = 0;
    clock.classList.add('hide')
    correctAnsPost.classList.add('hide');
    incorrectAnsPost.classList.add('hide');
    qnContainerEl.classList.add('hide');
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

// function to restart quiz with a 75 second initialized (reset) timer
function startAgain() {
    clock.classList.remove('hide')
        //if not set then the last known value of the timer is where the quiz will resume from 
    sec = 75;
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
    qnContainerEl.classList.add('hide');
    scores.classList.add('hide');
    showScoresOriginal();
});