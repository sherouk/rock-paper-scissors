const game = () => {
  let pScore = 0;
  let cScore = 0;

  // Start the game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const matchScreen = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      matchScreen.classList.remove("fadeOut");
      matchScreen.classList.add("fadeIn");
    });
  };

  // Play the match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });

    // Computer options (randomly generate)
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function() {
        // Computer choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          // We call the function to compare choices every time the player clicks
          compareHands(this.textContent, computerChoice);

          // Update images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2100);

        // Add animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");

    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    // Update text
    const winner = document.querySelector(".winner");
    // Check for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It's a tie!";
      return;
    }

    // Check for rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Rock smashes scissors. You win!";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Paper covers rock. The computer wins.";
        cScore++;
        updateScore();
        return;
      }
    }

    // Check for paper
    if (playerChoice === "paper") {
      if (computerChoice === "rock") {
        winner.textContent = "Paper covers rock. You win!";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Scissors cut paper. The computer wins.";
        cScore++;
        updateScore();
        return;
      }
    }

    // Check for scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "paper") {
        winner.textContent = "Scissors cut paper. You win!";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "Rock smashes scissors. The computer wins.";
        cScore++;
        updateScore();
        return;
      }
    }
  };

  // Call all the inner functions
  startGame();
  playMatch();
};

// Start the game (call outer function)
game();