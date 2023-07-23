var grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];
let currentPlayer = 'x';
let turnindicator = document.getElementById('turnIndicator');

handleBar();
setRandomStart();
setPoints();
switchTurnIndicator();

document.addEventListener('DOMContentLoaded', () => {
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            removeBanner();
            if (item.classList.contains('unused')) {
                item.classList.remove('unused');
                item.classList.add(`used-${currentPlayer}`);
                item.textContent = currentPlayer.toUpperCase();
                
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
                switchTurnIndicator();
            }
        });
    });
});

function handleClick(row, col) {

    // Set the clicked position in the grid array
    grid[row][col] = currentPlayer; // Assuming 'x' for demonstration purposes

    // Log the grid array for demonstration
    var winner = checkWin();
    if(winner == null) return;
    if(winner == 'u') {
        setCookie('last-win', "u", 1);
    } else if(winner == 'x') {
        setCookie('score-x', (parseInt(getPoint('x')) + 1), 7);
        setCookie('last-win', "x", 1);
    } else {
        setCookie('score-o', (parseInt(getPoint('o')) + 1), 7);
        setCookie('last-win', "o", 1);
    }
    location.reload();
}

function setPoints() {
    var scoreElement = document.getElementById(`score-x`);
    
    scoreElement.innerText = (getCookie('score-x') == null) ? 0: getCookie('score-x');

    var scoreElementO = document.getElementById(`score-o`);

    scoreElementO.innerText = (getCookie('score-o') == null) ? 0: getCookie('score-o');
}

function addPoint(player) {
    // Get the current score element
    var scoreElement = document.getElementById(`score-${player}`);

    // Get the current score value
    var score = scoreElement.innerText;

    score++;
    
    scoreElement.innerText = score;
}

function getPoint(player) {
    var scoreElement = document.getElementById(`score-${player}`);

    // Get the current score value
    var score = scoreElement.innerText;
    return score
}

function checkWin() {
    // Check rows
    for (let row = 0; row < 3; row++) {
        if (grid[row][0] !== null &&
            grid[row][0] === grid[row][1] &&
            grid[row][0] === grid[row][2]) {
            return grid[row][0];
        }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if (grid[0][col] !== null &&
            grid[0][col] === grid[1][col] &&
            grid[0][col] === grid[2][col]) {
            return grid[0][col];
        }
    }

    // Check diagonals
    if (grid[0][0] !== null &&
        grid[0][0] === grid[1][1] &&
        grid[0][0] === grid[2][2]) {
        return grid[0][0];
    }

    if (grid[0][2] !== null &&
        grid[0][2] === grid[1][1] &&
        grid[0][2] === grid[2][0]) {
        return grid[0][2];
    }

    // Check unentschieden
    if (grid[0][0] !== null &&
        grid[0][1] !== null &&
        grid[0][2]!== null &&
        grid[1][0]!== null &&
        grid[1][1]!== null &&
        grid[1][2]!== null &&
        grid[2][0]!== null &&
        grid[2][1]!== null &&
        grid[2][2]!== null)
        return 'u';

        return null; // No winner
}

function setCookie(name, value, days = 7) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

function switchTurnIndicator() {
    if(currentPlayer === "x") {
        turnindicator.innerText = 'X';
        turnindicator.style.color = "#FF6961";
    } else {
        turnindicator.innerText = 'O';
        turnindicator.style.color = "#87CEEB";
    }
}

function setRandomStart() {
    var random_boolean = Math.random() < 0.5;
    if(random_boolean) {
        currentPlayer = 'o';
    } else {
        currentPlayer = 'x';
    }
}

function handleBar() {
    var banner = document.getElementById('bannerCon');
    var cookie = getCookie('last-win');
    if(cookie == null) {
        removeBanner();
        return;
    } else if (cookie === 'r') {
        banner.innerText = 'Punkte wurden zurückgesetzt!';
    } else if (cookie === 'u') {
        banner.innerText = 'UNENTSCHIEDEN';
    } else if (cookie === 'x') {
        banner.innerText = 'X';
        banner.style.color = "#FF6961";
    } else if (cookie === 'o') {
        banner.innerText = 'O';
        banner.style.color = "#87CEEB";
    }

    setTimeout(function(){
        removeBanner();
    }, 2000);
}

var removedBanna = false;
function removeBanner() {
    if(!removedBanna) {
        removedBanna = true;
        var banner = document.getElementById('bannerCon');
        banner.remove();
    }
}


//SCORE

function resetScore() {
    setCookie('score-x', 0, 7);
    setCookie('score-o', 0, 7);
    setCookie('last-win', 'r', 1);
    location.reload();
}


var showing = false;
function show() {
    console.log("hov");
    if(!showing) {
        showing = true;
        var reset = document.getElementById('reload');
        reset.style.display = "block";
    }
        
}

function hide() {
    console.log("hovn't");
    if(showing) {
        showing = false;
        var reset = document.getElementById('reload');
        reset.style.display = "none";
    }
}