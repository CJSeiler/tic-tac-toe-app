const tiles = document.getElementsByClassName('tile')
let player1Turn = true
let player1Tiles = []
let player2Tiles = []
const playBtn = document.getElementById('start-game')
const resetBtn = document.getElementById('reset-game')
const message = document.getElementById('message')
let gameWon = false

let wins = [
    ['1', '2', '3'], 
    ['1', '4', '7'], 
    ['1', '5', '9'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['3', '6', '9'],
    ['2', '5', '8'],
    ['3', '5', '7']
]

function createListeners() {
    for(let tile of tiles){
        tile.addEventListener('click', playerChoice)
    }
}

function removeListeners() {
    for(let tile of tiles){
        tile.removeEventListener('click', playerChoice)
    }
}


function playerChoice(event) {
    if(player1Turn){
        event.target.textContent = "X"
        event.target.style.color = "#fcfc12"
        player1Tiles.push(event.target.id)
        message.innerHTML = `<span class="player-text">Player O</span> 's turn`
        document.querySelector(".player-text").style.color = "#fff"
        // message.textContent = "Player O's Turn!"
    } else {
        event.target.textContent = "O"
        event.target.style.color = "#000"
        message.innerHTML = `<span class="player-text">Player X</span> 's turn`
        document.querySelector(".player-text").style.color = "#fcfc12"
        // message.textContent = "Player X's Turn!"
        player2Tiles.push(event.target.id)
    }

    player1Turn = !player1Turn;
    event.target.removeEventListener('click', playerChoice)
    checkWinner()
    checkDraw()
};

playBtn.addEventListener('click', startGame)

function startGame() {
    message.innerHTML = `<span class="player-text">Player X</span> 's turn`
    document.querySelector(".player-text").style.color = "#fcfc12"
    playBtn.style.display = "none"
    createListeners()
}

function checkWinner() {
    let checkPlayerOne = wins.some((ar) => ar.every((e) => player1Tiles.includes(e)))
    let checkPlayerTwo = wins.some((ar) => ar.every((e) => player2Tiles.includes(e)))

    if(checkPlayerOne) {
        message.innerHTML = '<span class="player-text">Player X</span> Wins 🥳'
        document.querySelector(".player-text").style.color = "#fcfc12"
        gameWon = true
    }

    if(checkPlayerTwo) {
        message.innerHTML = '<span class="player-text">Player O</span> Wins 🥳'
        document.querySelector(".player-text").style.color = "#fff"
        gameWon = true
    }

    if(gameWon){
        removeListeners();
        resetBtn.style.display = "inline-block"
    }
}

function checkDraw(){
    if(player1Tiles.length + player2Tiles.length === 9 && gameWon === false) {
        message.textContent = "It's a draw!"
        resetBtn.style.display = "inline-block"
    }
}


resetBtn.addEventListener('click', resetGame)

function resetGame() {
    gameWon = false

    for(let tile of tiles){
        tile.textContent = ''
    }

    createListeners()

    if(player1Turn){
        message.innerHTML = `<span class="player-text">Player X</span> 's turn`
        document.querySelector(".player-text").style.color = "#fcfc12"
    } else {
        message.innerHTML = `<span class="player-text">Player O</span> 's turn`
        document.querySelector(".player-text").style.color = "#000"
    }
    
    player1Tiles = []
    player2Tiles = []

    resetBtn.style.display = "none"
}