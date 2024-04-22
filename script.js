const spaces = document.querySelectorAll(".space");
const p1Element = document.getElementById("player1");
const p2Element = document.getElementById("player2");
const result = document.getElementById("message");
const restart = document.getElementById("restartButton");

const gif0Container = document.getElementById("gif0-container");
const gif1Container = document.getElementById("gif1-container");
const gif2Container = document.getElementById("gif2-container");
const gif3Container = document.getElementById("gif3-container");
const gif4Container = document.getElementById("gif4-container");
const gif5Container = document.getElementById("gif5-container");
const gif6Container = document.getElementById("gif6-container");
const gif7Container = document.getElementById("gif7-container");
const gif8Container = document.getElementById("gif8-container");
const gif9Container = document.getElementById("gif9-container");

let p1 = '<img src="images/x.png">';
let p2 = '<img src="images/o.png">';
let currentPlayer = p1;

// Hide the winner GIF container initially
gif0Container.style.display = "none";
gif1Container.style.display = "none";
gif2Container.style.display = "none";
gif3Container.style.display = "none";
gif4Container.style.display = "none";
gif5Container.style.display = "none";
gif6Container.style.display = "none";
gif7Container.style.display = "none";
gif8Container.style.display = "none";
gif9Container.style.display = "none";


// Call the function to make a move on the board
makeMove();

// Array of all gifs
const winGifs = [
    gif0Container, gif1Container, gif2Container,
    gif3Container, gif4Container, gif5Container, 
    gif6Container, gif7Container, gif8Container
];

// Array that represents all possible ways of winning
// 0 - Group Leader
// 1 - Oluwamark
// 2 - Leo DiCap
// 3 - You Da Best
// 4 - Toothless
// 5 - Family Ties
// 6 - It's The Way You Act
// 7 - Nancy Pelosi
const winLogic = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6],          // Diagonals
];

function checkWinner() {
    // Check for a draw
    // Spread operator ([...]) gets all the values in the `spaces` object
    if ([...spaces].every((space) => space.innerHTML !== "")) {
        result.innerHTML = "It's a draw";
        gif9Container.style.display = "block";
    }

    for(let i=0; i < winLogic.length; i++){
        const [a,b,c] = winLogic[i];
        if (
            spaces[a].innerHTML === currentPlayer &&
            spaces[b].innerHTML === currentPlayer &&
            spaces[c].innerHTML === currentPlayer
        ) {
            if (currentPlayer === p1) {
                result.innerHTML = "Player 1 wins!";
                // Increment the counter for Player 1
                let score1Element = document.getElementById("score1");
                let score1 = parseInt(score1Element.innerHTML);
                if (!isNaN(score1)) {
                    score1++;
                    score1Element.innerHTML = score1;
                } else {
                    score1Element.innerHTML = "1";
                }
            } else {
                result.innerHTML = "Player 2 wins!";
                // Increment the counter for Player 2
                let score2Element = document.getElementById("score2");
                let score2 = parseInt(score2Element.innerHTML);
                if (!isNaN(score2)) {
                    score2++;
                    score2Element.innerHTML = score2;
                } else {
                    score2Element.innerHTML = "1";
                }
            }

            // Display the winner GIF
            winGifs[i].style.display = "block";

            // Disable any further moves after a win
            spaces.forEach((space) => {
                space.removeEventListener("click", handleClick);
            });
        }
    }
}

// Call the function to add event listeners to the restart button
makeRestartButton();

function makeRestartButton() {
    restart.addEventListener("click", () => {
        // Clear the board and reset it to initial state
        spaces.forEach((space) => {
            space.innerHTML = "";
        });

        result.innerHTML = "&nbsp";
        currentPlayer = p1;
        p2Element.style.borderTopColor = 'var(--black)';
        p2Element.style.borderBottomColor = 'var(--black)';
        p1Element.style.borderTopColor = 'var(--turquoise)';
        p1Element.style.borderBottomColor = 'var(--pink)';

        // Hide all winner GIF containers
        winGifs.forEach((gifContainer) => {
            gifContainer.style.display = "none";
        });

        // Hide Draw Gif containers
        gif9Container.style.display = "none";

        // Re-add the event listeners
        makeMove();
    });
}

function handleClick() {
    if (this.innerHTML === "") {
        this.innerHTML = currentPlayer;
        checkWinner();

        // Switch between players
        if(currentPlayer === p1) {
            currentPlayer = p2;
            p1Element.style.borderTopColor = 'var(--black)';
            p1Element.style.borderBottomColor = 'var(--black)';
            p2Element.style.borderTopColor = 'var(--turquoise)';
            p2Element.style.borderBottomColor = 'var(--pink)';
        } else {
            currentPlayer = p1;
            p2Element.style.borderTopColor = 'var(--black)';
            p2Element.style.borderBottomColor = 'var(--black)';
            p1Element.style.borderTopColor = 'var(--turquoise)';
            p1Element.style.borderBottomColor = 'var(--pink)';
        }
    }
}

function makeMove() {
    spaces.forEach((space) => {
        space.addEventListener("click", handleClick);
    });
}
