/*
 * Memory Game Implemented in HTML5
 * Special Topics 2019
 * Ryan Oakley
 */

(function() {
	//Points Constants
	const CORRECT_GUESS = 100;
	const CONSECUTIVE_GUESS = 250;
	const FIRST_GUESS = 500;

	// Game Variables
	let stage = null;
	let canvas = null;
	let cardNumber;
	let correctMatches = 0;
	let totalPoints = 0;
	let firstGuess = true;
	let consecutiveGuesses = 0;
	let highScore;
	let currentState;
	let cardCount = 1;
	const positions = [
		'100 100',
		'200 100',
		'300 100',
		'400 100',
		'100 200',
		'200 200',
		'300 200',
		'400 200',
		'100 300',
		'200 300',
		'300 300',
		'400 300',
		'100 400',
		'200 400',
		'300 400',
		'400 400'
	];

	// Frame Rate of Game
	const FRAME_RATE = 30;

	// Game Objects
	let assetManager;
	let cookieManager;
	let userInterface;
	let firstCard = null;
	let secondCard = null;
	const cards = new Array();

	// game state object
	const gameState = {
		setup: 0,
		ready: 1,
		running: 2,
		over: 3,
		resetting: 4
	};

	// ------------------------------------------------------------ Event Handlers
	function onReady(e) {
		console.log('>> setup');
		// kill event listener
		e.remove();

		// Setup Cards
		setUpCards();

		userInterface = new UserInterface(stage, assetManager);
		userInterface.highScore = highScore;

		// setup event listener to start game
		// btnNewGame.on('click', onStartGame);
		userInterface._btnNewGame.on('newGameClicked', onStartGame);

		onDisableCards();

		currentState = gameState.ready;
		console.log('>> game ready');

		// startup the ticker
		createjs.Ticker.framerate = FRAME_RATE;
		createjs.Ticker.on('tick', onTick);
	}

	function onCardClicked(e) {
		// If first card is null assign it this card and then enable cards again
		if (firstCard == null) {
			firstCard = cards[e.index];
			onEnableCards();
		} else {
			// If its the second guess assign the card to second card
			secondCard = cards[e.index];

			// If the two card numbers match do the following
			if (firstCard._cardNumber == secondCard._cardNumber) {
				// If first guess is true give bonus
				if (firstGuess) {
					totalPoints += FIRST_GUESS;
					console.log('First Guess was right, bonus points given!');
				}

				// Increment consecutive guesses
				consecutiveGuesses++;

				// If there are consecutive guess assign points
				if (consecutiveGuesses > 1) {
					totalPoints += CONSECUTIVE_GUESS;
					console.log('Correct Consecutive Guesses Made, Bonus Points Given!');
				}

				// Give points for correct guess
				totalPoints += CORRECT_GUESS;
				console.log('Correct Guess Made, Points Given');

				// Increment correct matches count
				correctMatches++;

				// Mark both cards as correct guessed
				firstCard.correctGuess();
				secondCard.correctGuess();

				// Reset both first and second card objects
				firstCard = null;
				secondCard = null;

				// If correct matches is 8 then you won and do the following
				if (correctMatches == 8) {
					console.log('You Won!');

					// Play the win sound
					createjs.Sound.play('winSound');

					// If total points is more than high score then change it
					if (totalPoints > highScore) {
						cookieManager.setCookie('bracketMemory', totalPoints);
						userInterface.highScore = totalPoints;
					}

					// Go to game over function
					onGameOver();
				} else {
					// Play the correct guess sound if the game isn't over
					createjs.Sound.play('correctSound');
				}

				console.log('You Have: ' + totalPoints + ' Total Points!');
				userInterface.score = totalPoints;
			} else {
				// Play the wrong guess sound
				createjs.Sound.play('wrongSound');

				// Play the shake animation on both cards
				firstCard.shakeMe();
				secondCard.shakeMe();

				// Reset both first and second card objects
				firstCard = null;
				secondCard = null;

				// Reset the consecutive guesses to 0
				consecutiveGuesses = 0;
				console.log('wrong guess');
			}

			// Reflect if you are on first guess or not
			if (firstGuess) {
				firstGuess = false;
			}
		}
	}

	// Disable all the cards and the restart button
	function onDisableCards(e) {
		userInterface.disableRestartBtn();

		cards.forEach(card => {
			card.disableMe();
		});
	}

	// Enable all the cards and the restart button
	function onEnableCards(e) {
		userInterface.enableRestartBtn();

		cards.forEach(card => {
			card.enableMe();
		});

		// If game is resetting or over reset the card positions and run start game
		if (currentState == gameState.resetting || currentState == gameState.over) {
			cardCount++;

			if (cardCount == 17) {
				cardCount = 1;
				resetCardPositions();
				onStartGame(e);
			}
		}
	}

	// Start the game and do the following
	function onStartGame(e) {
		// Reset Points and guesses and other variables
		correctMatches = 0;
		totalPoints = 0;
		firstGuess = true;
		consecutiveGuesses = 0;
		userInterface.score = totalPoints;
		firstCard = null;
		secondCard = null;

		// Play New Game Sound
		createjs.Sound.play('gameStartSound');

		// If the game isn't resetting
		if (currentState != gameState.resetting) {
			// If the game state is ready then add the cards to the stage
			if (currentState == gameState.ready) {
				//Show cards
				cards.forEach(card => {
					card.addMe();
				});
			}

			// Remove the New game button
			userInterface.hideNewGameBtn();

			//Add Restart Button
			userInterface.showRestartBtn();

			// Remove click event on New Game Button
			e.remove();
		}

		// Enable all the cards
		onEnableCards();

		// Add the event listener to restart button
		userInterface._btnRestart.on('restartClicked', onResetGame);

		// Change current game state
		currentState = gameState.running;
	}

	// When game is over do the following
	function onGameOver(e) {
		// Change the game state to over
		currentState = gameState.over;

		// Show new game button and add event listener
		userInterface.showNewGameBtn();
		userInterface._btnNewGame.on('newGameClicked', onNewGame);

		//Hide Restart Button
		userInterface.hideRestartBtn();
	}

	// WHen new game starts
	function onNewGame(e) {
		// Remove event listener
		e.remove();

		// Hide all the cards
		cards.forEach(card => {
			card.hideMe();
		});

		// Remove the New game button
		userInterface.hideNewGameBtn();

		//Add Restart Button
		userInterface.showRestartBtn();
	}

	// If game is reset
	function onResetGame(e) {
		console.log('I am restarting');

		// Remove the event listener
		e.remove();

		// Change the current game state to resetting
		currentState = gameState.resetting;

		// Hide all the cards
		cards.forEach(card => {
			card.hideMe();
		});
	}

	// Game ticker, update fps and update stage
	function onTick(e) {
		// TESTING FPS
		document.getElementById('fps').innerHTML = createjs.Ticker.getMeasuredFPS();

		// update the stage!
		stage.update();
	}

	// ------------------------------------------------------------------------- Public Methods

	// Setup the cards on game load
	function setUpCards() {
		// Randomize the order of the cards
		positions.sort(function(a, b) {
			return Math.random() - 0.5;
		});

		// Construct 16 cards and randomize position
		for (let i = 0; i < 16; i++) {
			if (i == 0) {
				cardNumber = 1;
			} else {
				//! Change this back to commented out, just for testing
				cardNumber = Math.floor(i / 2) + 1;
				// cardNumber = 1;
			}
			// Push card to card array and setup event listeners
			cards.push(new Card(stage, assetManager, positions[i], cardNumber, i));
			cards[i]._sprite.on('cardClicked', onCardClicked);
			cards[i]._sprite.on('cardDisable', onDisableCards);
			cards[i]._sprite.on('cardEnable', onEnableCards);
		}
	}

	// Reset the card positions
	function resetCardPositions() {
		// Randomize the position of the cards
		positions.sort(function(a, b) {
			return Math.random() - 0.5;
		});

		// Set new random position on cards
		for (let i = 0; i < 16; i++) {
			cards[i].setupPosition(positions[i]);
		}
	}

	// ------------------------------------------------------------------------- Main Method
	function main() {
		console.log('>> initializing');

		// Set current game state to setup
		currentState = gameState.setup;

		// Construct Cookie Manager object
		cookieManager = new CookieManager();

		// If no cookie is found set high score to 0 and set cookie to that score
		// Otherwise load high score from the cookie value retrieved
		if (cookieManager.getCookie('bracketMemory') == undefined) {
			highScore = 0;
			cookieManager.setCookie('bracketMemory', highScore);
		} else {
			highScore = Number(cookieManager.getCookie('bracketMemory'));
		}

		// Get reference to canvas
		canvas = document.getElementById('myCanvas');

		// Set canvas to as wide/high as the browser window
		canvas.width = 1000;
		canvas.height = 600;

		// Create stage object
		stage = new createjs.StageGL(canvas);
		stage.setClearColor('#1A1A1A');
		stage.enableMouseOver(10);

		// Construct preloader object to load spritesheet and sound assets
		assetManager = new AssetManager(stage);
		stage.on('allAssetsLoaded', onReady);

		// Load the assets
		assetManager.loadAssets(manifest);
	}

	main();
})();
