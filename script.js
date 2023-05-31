const boxes = document.querySelectorAll('.box');
const rstbtn = document.getElementById('resetbutton');
const hiddentext = document.querySelector('.hiddentext');

let options = ['','','','','','','','',''];
let currentPlayer = 'X';
let running = false

function initialize() {
    boxes.forEach(box => box.addEventListener("click", writemark));
    rstbtn.addEventListener("click", resetgame);
    running = true;
}

function writemark() {
    const cellIndex = this.getAttribute('cellIndex');

    if (options[cellIndex] != '' || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();

    if (checkWinner()) {
        running = false;
        hiddentext.textContent = `The winner is ${currentPlayer}`;
    }

    changePlayer();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
}

function checkWinner() {
    for (let i = 0; i < options.length - 2; i++) {
        if (options[i] === options[i+1] && options[i+1] === options[i+2] && options[i] != '') {
            return true;
        } else if (options[i] === options[i+3] && options[i+3] === options[i+6] && options[i] != '') {
            return true;
        }
    }

    if (options[0] === options[4] && options[4] === options[8] && options[0] != ''){
        return true;
    } else if (options[2] === options[4] && options[4] === options[6] && options[2] != '') {
        return true;
    }

    return false;
}   

function resetgame() {
    currentPlayer = 'X';
    options = ['','','','','','','','',''];
    boxes.forEach(box => box.textContent = "");
    running = true;
    hiddentext.textContent = '';
}


initialize();