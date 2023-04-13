const words = ['summer', 'winter', 'spring', 'autumn', 'motorbike', 'boat', 'airplane', 'dress', 'restaurant', 'notebook'];

const wordEl = document.querySelector('.word');
const wordSpans = Array.from(wordEl.querySelectorAll('span'));
const correctCountEl = document.querySelector('.correct-count');
const wrongCountEl = document.querySelector('.wrong-count');
const mistakesEl = document.querySelector('.word-mistakes');
const timerEl = document.querySelector('#timer');

let currentWord = '';
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let mistakesCount = 0;
let startTime = 0;
let timerInterval;

function chooseRandomWord() {
    const randomWordIndex = Math.floor(Math.random() * words.length);
    return words[randomWordIndex];
}


function newWord() {
    currentWord = chooseRandomWord();
    currentIndex = 0;
    mistakesCount = 0;
    wordEl.innerHTML = currentWord.split('').map(item => `<span>${item}</span>`).join('');
}

function updateStats() {
    correctCountEl.innerText = correctCount;
    wrongCountEl.innerText = wrongCount;
    mistakesEl.innerText = mistakesCount;
}

function handleKeyPress(event) {
    const currentSpan = wordSpans[currentIndex];
    if (event.key === currentWord[currentIndex]) {
        currentSpan.classList.remove('w');
        currentSpan.classList.add('c');
        currentIndex++;
        if (currentIndex === currentWord.length) {
            clearInterval(timerInterval);
            wordEl.classList.add('c');
            correctCount++;
            updateStats();
            setTimeout(() => {
                wordEl.classList.remove('c');
                newWord();
                startTimer();
            }, 2000);
        }
    } else {
        currentSpan.classList.add('w');
        mistakesCount++;
        updateStats();
    }
}

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const passedTime = currentTime - startTime;
        const seconds = Math.floor(passedTime / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerEl.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }, 1000);
}

newWord();
startTimer();
document.addEventListener('keydown', handleKeyPress);