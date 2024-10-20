const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...cardValues, ...cardValues]; 


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


let flippedCards = [];
let matchedCards = [];

const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');


function initializeGame() {
   
    cards = shuffle(cards);
    gameBoard.innerHTML = '';

    cards.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.textContent = value;

        card.appendChild(cardContent);
        gameBoard.appendChild(card);

        
        card.addEventListener('click', () => flipCard(card));
    });

    
    flippedCards = [];
    matchedCards = [];
}


function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flip')) {
        card.classList.add('flip');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}


function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
       
        matchedCards.push(card1, card2);
        flippedCards = [];

        
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('You win!'), 500);
        }
    } else {
        
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}


restartButton.addEventListener('click', initializeGame);


initializeGame();