const tiles = document.getElementsByClassName("tile")
let playerTurn = "X"
let playerXTiles = []
let playerOTiles = []
const startBtn = document.getElementById("startGameBtn")
const message = document.getElementById("message")
let gameWon = false

const wins = [
    ['1', '2', '3'], 
    ['1', '4', '7'], 
    ['1', '5', '9'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['3', '6', '9'],
    ['2', '5', '8'],
    ['3', '5', '7']
]

startBtn.addEventListener('click', startGame)
addTileListeners()

function addTileListeners() {
    for(let tile of tiles) {
        tile.addEventListener('click', playerChoice)
        tile.disabled = false
    }
}

function removeTileListeners() {
    for(let tile of tiles){
        tile.removeEventListener('click', playerChoice)
    }
}

function showResetBtn() {
    // converts original button to a reset button by changing text content and event listener
    startBtn.removeEventListener("click", startGame)
    startBtn.addEventListener("click", resetGame)
    startBtn.textContent = "Let's Play Again!"
    startBtn.style.visibility = "visible"
}

function playerChoice(e) {
    
    if(playerTurn === "X"){
        e.target.textContent = "X"
        e.target.style.color = "#fcfc12"
        playerXTiles.push(e.target.id)
        message.innerHTML = `<span class="player-text">Player O's</span> turn`
        document.querySelector(".player-text").style.color = "#000"
    } else {
        e.target.textContent = "O"
        e.target.style.color = "#000"
        message.innerHTML = `<span class="player-text">Player X's</span> turn`
        document.querySelector(".player-text").style.color = "#fcfc12"
        playerOTiles.push(e.target.id)
    }

    // changes player turn to the opposite player and allows the loser to go first on reset
    playerTurn = playerTurn === "X" ? "O" : "X"

    // prevents tiles from being reselected after already chosen
    e.target.disabled = true

    checkWinner()
    checkDraw()
}

function startGame() {
    message.innerHTML = `<span class="player-text">Player X</span> 's turn`
    document.querySelector(".player-text").style.color = "#fcfc12"
    startBtn.style.visibility = "hidden"
}

function checkWinner() {
    let playerXWins = wins.some((ar) => ar.every((e) => playerXTiles.includes(e)))
    let playerOWins = wins.some((ar) => ar.every((e) => playerOTiles.includes(e)))

    if(playerXWins) {
        message.innerHTML = '<span class="player-text">Player X</span> Wins 🥳'
        document.querySelector(".player-text").style.color = "#fcfc12"
        gameWon = true
    }

    if(playerOWins) {
        message.innerHTML = '<span class="player-text">Player O</span> Wins 🥳'
        document.querySelector(".player-text").style.color = "#000"
        gameWon = true
    }

    if(gameWon){
        removeTileListeners()
        showResetBtn()
    }
}

function checkDraw(){
    if(playerXTiles.length + playerOTiles.length === 9 && gameWon === false) {
        message.textContent = "It's a draw!"
        showResetBtn()
    }
}

function resetGame() {
    gameWon = false

    for(let tile of tiles){
        tile.textContent = ""
    }

    addTileListeners()

    if(playerTurn === "X"){
        message.innerHTML = `<span class="player-text">Player X's</span> turn`
        document.querySelector(".player-text").style.color = "#fcfc12"
    } else {
        message.innerHTML = `<span class="player-text">Player O's</span> turn`
        document.querySelector(".player-text").style.color = "#000"
    }
    
    playerXTiles = []
    playerOTiles = []

    startBtn.style.visibility = "hidden"
}