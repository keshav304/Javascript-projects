const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving',
    'keywords',
    'descriptive',
    'related',
    'freecodecamp'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// set difficulty to valur in local storage else medium
let difficulty = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';

// set difficulty to selected item
difficultySelect.value = localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') : 'medium';

//focus on texr on start
text.focus();


// start counting down
const timeInterval = setInterval(updateTime, 1000);


// Genrate random word

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM

function addWordToDOM() {
    // making randomword global so it can be accessed in other functions
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//update score and add to dom
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + "s";

    if (time === 0) {
        clearInterval(timeInterval);

        //endgame
        gameOver();
    }
}

// game over, show end screen 
function gameOver() {
    endgameEl.innerHTML = `
    <h1> Time ran out </h1>

    <p> your final score is ${score}</p>
    <button onclick= "location.reload()"> Reload </button>
    `
    endgameEl.style.display = 'flex';
}

addWordToDOM()

// event listners

//typing
text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        //clear the input value
        e.target.value = '';
        if (difficulty === 'hard') {
            time += 2;
        } else if (difficulty === 'medium') {
            time += 3;
        }
        else {
            time += 4;
        }
        updateTime();
    }
});


// settings button click

settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
})

// settings select

settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
    
})