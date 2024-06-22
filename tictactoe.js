//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.
board = [
    '','','',
    '','','',
    '','',''
]
turn = 'X'
winner = false;
tie = false;
const winningCombos = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Top-left to bottom-right diagonal
    [2, 4, 6]  // Top-right to bottom-left diagonal
];

squareEls = document.querySelectorAll('.sqr')
messageEl = document.querySelector('#message')

function init() {
    board = [
        '','','',
        '','','',
        '','',''
    ]
    turn = 'X'
    winner = false
    tie = false
   //console.log('Game has been loaded', board, "Turn:", turn, winner, 'Tie:', tie)                                 
    squareEls.forEach(square => {
        square.textContent = '';
        square.addEventListener('click', handleClick);
    });
    render()
}  
function render() {
    console.log('Render');
     updateBoard();
     updateMessage();
}

function updateBoard() {
    const squareEls = document.querySelectorAll('.sqr')
    board.forEach((value, index) => {
        const square = squareEls[index];
        if(square){
            square.textContent= value;
        }else {
            console.error(`Square element at index ${index} not found.`)
        }
   })
}

function updateMessage() {
    const messageEl = document.getElementById('message')
        if(!winner && !tie){
            messageEl.textContent = `It is ${turn}'s turn`
        }else if(tie){
            messageEl.textContent = 'You have Tied'
        }else if(winner){
            messageEl.textContent = `Congratulations ${turn} You have WON!`
        }else{
            messageEl.textContent = console.error('404 Error')
        }
    }
function handleClick(event) {
    const squareIndex = event.target.id
    console.log(squareIndex)
    // console.log('Why is it not working')
        if(!squareIndex || board[squareIndex] !== '' || winner)return;
        placePiece(squareIndex)
        checkForWinner()
        //checkForTie()
        if(!winner){
            checkForTie()
        }
        if(!winner && !tie){
            switchPlayerTurn()
        }
        render()
    }
function placePiece(index){
    console.log(turn)
    board[index] = turn;

    console.log(board)
}
function checkForWinner() {
    winningCombos.forEach(combo => {
        const [a, b ,c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]){
            winner = true;
        }
    })
}
function checkForTie(){
    if(board.every(cell => cell !== ''))
    tie = true
}
function switchPlayerTurn(){
    if(winner)return;
        turn = turn === 'X' ? 'O' : 'X';
        console.log(turn)
}
function resetGame(){
    board = [
        '','','',
        '','','',
        '','',''
    ]
    turn = 'X'
    winner = false
    tie = false
    render();
}
resetBtnEl = document.querySelector('#reset')

resetBtnEl.addEventListener('click', resetGame)

window.onload = init;
