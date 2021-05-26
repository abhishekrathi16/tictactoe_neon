const background = document.getElementById('background')
const x = 'x';
const o = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const restartButton = document.getElementById('restart-button')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const playerX = document.getElementById('playerX')
const playerO = document.getElementById('playerO')

let box
let turns = false
let player
let j
let node
let element1
let element2

restartButton.addEventListener('click', startGame)

function startGame() {
    background.classList.add('show1')
    background.classList.remove('hide')
    winningMessageElement.classList.remove('show')
    turns = assign()
    // console.log(turns)
    cellElements.forEach(box => {
        box.classList.remove(x)
        box.classList.remove(o)
        box.removeEventListener('click', handleClick)
        box.addEventListener('click', handleClick, { once: true })
    })
}

startGame()

function assign() {
    playerX.onclick = () => {
        background.classList.add("hide")
        turns = false
    }
    playerO.onclick = () => {
        background.classList.add("hide")
        turns = true
    }
}

let c = 0
let d = 0

function handleClick(e) {
    const box = e.target
    const currentClass = turns ? o : x
    placeMark(box, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    }
    else if (isDraw()) {
        endGame(true)
    }
    else {
        // for (i = 0; i <= 8; i=i+1) {
        //     if (currentClass==x) {
        //         element1 = document.getElementById(i)
        //         element1.innerText = 'X'
        //     }
        //     else if (currentClass==o) {
        //         element2 = document.getElementById(i)
        //         element2.innerText = 'O'
        //     }
        // }
        // function reply(clicked_id) {
        //     for (i = 0; i <= clicked_id; i++) {
        //         if (i != clicked_id)
        //             continue
        //         else {
        //             if (currentClass == x) {
        //                 element1 = document.getElementById(i)
        //                 element1.innerText = 'X'
        //                 break
        //             }
        //             else if (currentClass == o) {
        //                 element2 = document.getElementById(i)
        //                 element2.innerText = 'O'
        //                 break
        //             }
        //         }
        //     }
        // }
        swapTurns()
    }

}
function reply(clicked_id){
    element2=document.getElementById(clicked_id)
    if(turns==true)
    {
        element2.innerText='O'
    }
    else
    {
        element2.innerText='X'
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    }
    else {
        winningMessageTextElement.innerText = `${turns ? "O" : "X"} Has Won!`;
    }
    winningMessageElement.classList.add('show')
}
function isDraw() {
    return [...cellElements].every(box => {//we have destructered the cellElements into an array here
        return box.classList.contains(x) || box.classList.contains(o)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    turns = !turns
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}