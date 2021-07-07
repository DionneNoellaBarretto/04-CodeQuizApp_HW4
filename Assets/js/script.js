// defining all variables
var title = document.getElementById('title');
var scores = document.getElementById('score');
var timeTracking = document.getElementById('timer');
var playAgain = document.getElementById('tryAgain');
var allScoresList = document.getElementById('HighScorers');
var leaderBoardButton = document.getElementById('viewscores');
var currentQnIndex;
var clearScores = document.getElementById('clear');
var startButton = document.getElementById('startBtn');
var description = document.getElementById('description');
var qnContainerEl = document.getElementById('qn-section');
var qnEl = document.getElementById('qn');
var ansButtonsEl = document.getElementById('ans-buttons');
var submit = document.getElementById('submit');
var userInitials = document.getElementById('initials');
var correctAnsPrompt = document.getElementById('correctAns');
var incorrectAnsPrompt = document.getElementById('incorrectAns');
var userScore = document.getElementById('userScore');
var leaderboard = document.getElementById('leaderboard');
//setting initial time remaining to 100 seconds so 25 questions  from the qnArray can be answered
var timeLeft = 100;
var score = 0;
//empty string/ array
var savedNames = "";
var scoreSaver = [];
var shuffled = [];
var input = document.querySelectorAll('input');
//qn answer array ( for qns referenced sources are https://www.guru99.com/javascript-interview-questions-answers.html & https://github.com/sudheerj/javascript-interview-questions#what-is-a-higher-order-function )
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
        document.getElementById('timer').textContent = 'Time Remaining : ' + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz()
        }
        timeLeft--;
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
    currentQnIndex = 0;
    //unhiding the timer and the qncontainerelement
    qnContainerEl.classList.remove('hide');
    timeTracking.classList.remove('hide');
    initializeQuestion(shuffled);
}

// function to randomize/shuffle question list
function initializeQuestion(shuffledQns) {
    showQn(shuffledQns[currentQnIndex]);
}

// function to clear out the answers from the previous qn presented
function clearoptions() {
    ansButtonsEl.innerHTML = "";
}

// function for listing question with the 4 options as answers
function showQn(currentQnObject) {
    qnEl.textContent = currentQnObject.title;
    //calling the clear answers function to ensure every qn has a new 4 corresponding answer options
    clearoptions();
    var ansbtn = document.createElement('ansbtn');
    ansbtn.textContent = currentQnObject.options[0].text;
    ansbtn.classList.add('btn', 'ans');
    document.getElementById('ans-buttons').appendChild(ansbtn);
    ansbtn.addEventListener('click', function() {
        selectAns(currentQnObject.options[0].correct);
    })
    var ansbtn = document.createElement('ansbtn');
    ansbtn.textContent = currentQnObject.options[1].text;
    ansbtn.classList.add('btn', 'ans');
    document.getElementById('ans-buttons').appendChild(ansbtn);
    ansbtn.addEventListener('click', function() {
        selectAns(currentQnObject.options[1].correct);
    })
    var ansbtn = document.createElement('ansbtn');
    ansbtn.textContent = currentQnObject.options[2].text;
    ansbtn.classList.add('btn', 'ans');
    document.getElementById('ans-buttons').appendChild(ansbtn);
    ansbtn.addEventListener('click', function() {
        selectAns(currentQnObject.options[2].correct);
    })
    var ansbtn = document.createElement('ansbtn');
    ansbtn.textContent = currentQnObject.options[3].text;
    ansbtn.classList.add('btn', 'ans');
    document.getElementById('ans-buttons').appendChild(ansbtn);
    ansbtn.addEventListener('click', function() {
        selectAns(currentQnObject.options[3].correct);
    })
}

// validates and counts answers in multiples of 4 since I have 25 questions in the var qnArraybank for a total of 100 points. for this to be scalable incase I choose to add more qns I've stated that the cumulative possible score of 100 be divided by the length of the qnArray to determine the points for each qn
function selectAns(isCorrect) {
    // if correct increase the score counter by 'score' points 
    if (isCorrect == true) {
        score += (100 / qnArray.length);
        // console.log(qnArray.length);
        // console.log(score);
        incorrectAnsPrompt.classList.add('hide');
        correctAnsPrompt.classList.remove('hide');
    }
    // lest decrease the timer by "score" seconds where score = (100 / qnArray.length) and in this case its 100/25 which is 4 seconds ( similar to the number of points for each correct qn answered in the 75 second time limit)
    else {
        timeLeft -= 5;
        correctAnsPrompt.classList.add('hide');
        incorrectAnsPrompt.classList.remove('hide');
    }
    // once a n is answered increase the counter of the currentQnIndexer to keep track of how many questions have been answered..
    currentQnIndex++;
    //console.log(currentQnIndex);
    // entering an alert prompt logic to let the user know they've finished all the qns from the bank (likely before time) 
    if (currentQnIndex == shuffled.length) {
        alert("Game Over! You have completed all of questions from the qn bank! Click OK to add your score of " + score + " out of a possible score of 100, to the leaderboard!");
        endQuiz();
    } else {
        showQn(shuffled[currentQnIndex]);
    }
}

// function for when the quiz ends what to hide/display
function endQuiz() {
    //its likely that when sec is zeroed out the quiz ends which is why the clock/timer the previously displayed elements are all hidden and now the user is shown their score! 
    // console.log(sec);
    //console.log(score);
    timeLeft = 0;
    timeTracking.classList.add('hide')
    correctAnsPrompt.classList.add('hide');
    incorrectAnsPrompt.classList.add('hide');
    qnContainerEl.classList.add('hide');
    scores.classList.remove('hide');
    leaderBoardButton.classList.remove('hide');
    userInitials.classList.remove('hide');
    userScore.classList.remove('hide');
    //this is all that the user should be shown 
    userScore.textContent = "You've scored " + score + " out of a possible 100!";
    //calls the input styling function
    inputstyle();
}

// "Play Again" listener to call the restart quiz function whihc inturn calls the start quiz function
playAgain.addEventListener('click', function() {
    restartQuiz();
})

// function to restart quiz with a 100 second initialized (reset) timer
function restartQuiz() {
    timeTracking.classList.remove('hide')
    timeLeft = 100;
    score = 0;
    leaderboard.classList.add('hide');
    startQuiz();
}

// listener for leaderboard button being clicked to display on scores history section and hide everything else
leaderBoardButton.addEventListener('click', function() {
    timeTracking.classList.add('hide')
    title.classList.add('hide');
    startButton.classList.add('hide');
    description.classList.add('hide');
    qnContainerEl.classList.add('hide');
    scores.classList.add('hide');
    showScoresOriginal();
});

// saved score history listener
submit.addEventListener('click', function(event) {
    //preventing an unnecessary browser refresh
    event.preventDefault();
    showScoresHistory();
})

 //sets the input field length in the initials form to be as large as the placeholder text length (http://jsfiddle.net/KU5kN/)
 function inputstyle(){
for(i=0; i<input.length; i++){
    input[i].setAttribute('size',input[i].getAttribute('placeholder').length);
}
}

//scoring logic
function addScores(initials, score) {
    var newScore = {
        initials: initials,
        score: score
    }
    scoreSaver.push(newScore);
    localStorage.setItem('scoreSaver', JSON.stringify(scoreSaver));
        //enter Anonymous every time input string is empty

}

//displaying leadeboard scores
function showScoresHistory() {
    savedNames = userInitials.value;
    addScores(savedNames, score);
    scores.classList.add('hide');
    //unhiding the leaderboard
    leaderboard.classList.remove('hide');
    allScoresList.innerHTML = "";
    var displayScores = JSON.parse(localStorage.getItem("scoreSaver"));
    for (i = 0; i < displayScores.length; i++) {
        var newLeader = document.createElement("li");
        newLeader.setAttribute("class", "listOfHighScorers");
        newLeader.append(document.createTextNode(`${displayScores[i].initials} ----- ${displayScores[i].score}`));
        allScoresList.append(newLeader);
    }
}

function showScoresOriginal() {
    savedNames = userInitials.value;
    scores.classList.add('hide');
    leaderboard.classList.remove('hide');
    allScoresList.innerHTML = "";
    var displayScores = JSON.parse(localStorage.getItem("scoreSaver"));
    for (i = 0; i < displayScores.length; i++) {
        var newLeader = document.createElement("li");
        newLeader.setAttribute("class", "listOfHighScorers");
        newLeader.append(document.createTextNode(`${displayScores[i].initials} ----- ${displayScores[i].score}`));
        allScoresList.append(newLeader);
    }
}


// browser local storage for scores is cleared
function clearScoresHistory() {
    localStorage.clear("scoreSaver");
    localStorage.clear("savedNames");
    localStorage.clear("listOfHighScorers");

    //   localStorage.setItem("");
    allScoresList.innerHTML = "";
}
// clear score history listener
clearScores.addEventListener('click', clearScoresHistory)