// Selecting DOM elements
let boxes = document.querySelectorAll(".box"); // Selecting all elements with class "box"
let resetBtn = document.querySelector("#reset-btn"); // Selecting the reset button by its ID
let newGameBtn = document.querySelector("#new-btn"); // Selecting the new game button by its ID
let msgContainer = document.querySelector(".msg-container"); // Selecting the message container by its class
let msg = document.querySelector("#msg"); // Selecting the message element by its ID

// Variable to track the current player's turn (true for player O, false for player X)
let turnO = true;

// Variable to track the starting player for each game
let startingPlayerO = true;

// Winning patterns for the tic-tac-toe game
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game state
const resetGame = () => {
    turnO = startingPlayerO; // Set the current player's turn based on the starting player for the game
  enableBoxes(); // Enabling all boxes for the new game
  msgContainer.classList.add("hide"); // Hiding the message container
};

// Adding click event listeners to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerHTML = "O"; // Setting the inner HTML of the box to "O" for player O
      turnO = false; // Switching to player X's turn
      box.style.color = "#18b"; // Setting color for player O's move
    } else {
      box.innerHTML = "X"; // Setting the inner HTML of the box to "X" for player X
      turnO = true; // Switching to player O's turn
      box.style.color = "#f31"; // Setting color for player X's move
    }
    box.disabled = true; // Disabling the box after the move

    checkWinner(); // Checking if there is a winner after each move
  });
});

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes and clear their content
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function to display the winner and disable all boxes
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide"); // Removing the "hide" class to display the message
  disableBoxes(); // Disabling all boxes after a winner is determined
};

// Function to check if there is a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val); // Display the winner if a winning pattern is found
      }
    }
  }
};

// Function to toggle the starting player for each new game
const toggleStartingPlayer = () => {
    startingPlayerO = !startingPlayerO;
}


// Adding click event listeners to the new game and reset buttons
newGameBtn.addEventListener("click", () => {
    resetGame();
    toggleStartingPlayer(); // Toggle the starting player for the next game
});
resetBtn.addEventListener("click", () => {
    resetGame();
    toggleStartingPlayer(); // Toggle the starting player for the next game
});
