/*
 * Memory Game Implemented in HTML5
 * Special Topics 2019
 * Ryan Oakley
 */

(function() {
	//points constants
	const CORRECT_GUESS = 100;
	const CONSECUTIVE_GUESS = 250;
	const FIRST_GUESS = 500;

	// game variables
	let stage = null;
	let canvas = null;
	let cardNumber;
	let correctMatches = 0;
	let totalPoints = 0;
	let firstGuess = true;
	let consecutiveGuesses = 0;
	let highScore;
	let cookieManager;

	// frame rate of game
	const FRAME_RATE = 30;

	// game objects
	let assetManager;
	let userInterface;
	let firstCard = null;
	let secondCard = null;

	const cards = new Array();
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

	//! Make these
	// let introCaption;
	let gameOverCaption;
	let btnNewGame;
	let currentState;
	let cardCount = 1;

	const gameState = {
		setup: 0,
		ready: 1,
		running: 2,
		over: 3,
		resetting: 4
	};

	// ------------------------------------------------------------ Event Handlers
	function onReady(e) {
		//! Move this to the Userinterface
		btnNewGame = assetManager.getSprite('fontsprites');
		btnNewGame.gotoAndStop('btnNewGame');
		btnNewGame.x = 700;
		btnNewGame.y = 400;
		stage.addChild(btnNewGame);

		console.log('>> setup');
		// kill event listener
		e.remove();

		// Setup Cards
		setUpCards();

		userInterface = new UserInterface(stage, assetManager);
		userInterface.highScore = highScore;

		// setup event listener to start game
		btnNewGame.on('click', onStartGame);

		onDisableCards();

		currentState = gameState.ready;
		console.log('>> game ready');

		// startup the ticker
		createjs.Ticker.framerate = FRAME_RATE;
		createjs.Ticker.on('tick', onTick);
	}

	function onCardClicked(e) {
		// console.log('I was clicked, I am this card ' + e.index);

		if (firstCard == null) {
			firstCard = cards[e.index];
			// console.log('Card Number: ' + firstGuess._cardNumber);
			onEnableCards();
		} else {
			secondCard = cards[e.index];
			// console.log('Card Number: ' + secondGuess._cardNumber);

			if (firstCard._cardNumber == secondCard._cardNumber) {
				// If first guess is right give bonus
				if (firstGuess) {
					totalPoints += FIRST_GUESS;
					console.log('First Guess was right, bonus points given!');
				}

				consecutiveGuesses++;
				if (consecutiveGuesses > 1) {
					totalPoints += CONSECUTIVE_GUESS;
					console.log('Correct Consecutive Guesses Made, Bonus Points Given!');
				}

				// Give points for correct guess
				totalPoints += CORRECT_GUESS;
				console.log('Correct Guess Made, Points Given');

				correctMatches++;
				firstCard.correctGuess();
				secondCard.correctGuess();
				firstCard = null;
				secondCard = null;

				if (correctMatches == 8) {
					console.log('You Won!');

					if (totalPoints > highScore) {
						cookieManager.setCookie('bracketMemory', totalPoints);
						userInterface.highScore = totalPoints;
						console.log('I did this');
					}
					onGameOver();
				}

				console.log('You Have: ' + totalPoints + ' Total Points!');
				userInterface.score = totalPoints;
			} else {
				firstCard.shakeMe();
				secondCard.shakeMe();
				firstCard = null;
				secondCard = null;

				consecutiveGuesses = 0;
				console.log('wrong guess');
			}

			// Reflect if you have made your first guess
			if (firstGuess) {
				firstGuess = false;
			}
		}

		//! Have to variables, first guess, second guess, make them
		//! equal to the object that caused the event, if the numbers are
		//! the same disable them otherwise flip them back over
	}

	// When you first click a card it disables everything
	function onDisableCards(e) {
		cards.forEach(card => {
			card.disableMe();
		});
	}

	function onEnableCards(e) {
		// If the game is currently running flip cards
		if (currentState == gameState.running) {
			cards.forEach(card => {
				card.enableMe();
				// console.log('I am doing this');
			});
		}

		// If reset was hit log this
		if (currentState == gameState.resetting || currentState == gameState.over) {
			// console.log('Card ' + cardCount + ' is ready');
			cardCount++;

			if (cardCount == 17) {
				cardCount = 1;
				resetCardPositions();
				onStartGame(e);
			}
		}
	}

	function onStartGame(e) {
		// Reset Points and guesses
		correctMatches = 0;
		totalPoints = 0;
		firstGuess = true;
		consecutiveGuesses = 0;
		userInterface.score = totalPoints;
		firstCard = null;
		secondCard = null;

		if (currentState != gameState.resetting) {
			if (currentState == gameState.ready) {
				//Show cards
				cards.forEach(card => {
					card.addMe();
				});
			}

			// Remove the New game button
			stage.removeChild(btnNewGame);
			//Add Restart Button
			userInterface.showRestartBtn();

			// remove click event on background
			e.remove();
		}

		// Change current game state
		currentState = gameState.running;

		userInterface._btnRestart.on('restartClicked', onResetGame);

		console.log('I was clicked');
		onEnableCards();
	}

	function onGameOver(e) {
		currentState = gameState.over;

		// gameOver
		stage.addChild(btnNewGame);
		btnNewGame.on('click', onNewGame);

		//Hide Restart Button
		userInterface.hideRestartBtn();
	}

	function onNewGame(e) {
		e.remove();

		cards.forEach(card => {
			card.hideMe();
		});

		// Remove the New game button
		stage.removeChild(btnNewGame);
		//Add Restart Button
		userInterface.showRestartBtn();
	}
	function onResetGame(e) {
		console.log('I am restarting');
		e.remove();

		currentState = gameState.resetting;
		cards.forEach(card => {
			card.hideMe();
		});

		// kill event listener and add listener to start a new game again
		// e.remove();
		// background.on('click', onStartGame);
		// adjust caption on screen
		// stage.removeChild(gameOverCaption);
		// stage.addChild(introCaption);
	}

	function onTick(e) {
		// TESTING FPS
		document.getElementById('fps').innerHTML = createjs.Ticker.getMeasuredFPS();

		// update the stage!
		stage.update();
	}

	// ------------------------------------------------------------------------- Public Methods
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
			cards.push(new Card(stage, assetManager, positions[i], cardNumber, i));
			cards[i]._sprite.on('cardClicked', onCardClicked);
			cards[i]._sprite.on('cardDisable', onDisableCards);
			cards[i]._sprite.on('cardEnable', onEnableCards);
		}
	}

	function resetCardPositions() {
		console.log('I got here');
		// Randomize the position of the cards
		positions.sort(function(a, b) {
			return Math.random() - 0.5;
		});

		// console.log(positions);
		// Set new random position on cards
		for (let i = 0; i < 16; i++) {
			cards[i].setupPosition(positions[i]);
		}
	}

	// ------------------------------------------------------------------------- Main Method
	function main() {
		console.log('>> initializing');
		currentState = gameState.setup;

		cookieManager = new CookieManager();

		if (cookieManager.getCookie('bracketMemory') == undefined) {
			highScore = 0;
			cookieManager.setCookie('bracketMemory', highScore);
			console.log('There was no cookie: ' + highScore);
		} else {
			highScore = Number(cookieManager.getCookie('bracketMemory'));
			console.log('i got this from a cookie: ' + highScore);
		}

		// get reference to canvas
		canvas = document.getElementById('myCanvas');
		// set canvas to as wide/high as the browser window
		canvas.width = 1000;
		canvas.height = 600;
		// create stage object
		stage = new createjs.StageGL(canvas);
		stage.setClearColor('#1A1A1A');
		stage.enableMouseOver(10);

		// construct preloader object to load spritesheet and sound assets
		assetManager = new AssetManager(stage);
		stage.on('allAssetsLoaded', onReady);

		// load the assets
		assetManager.loadAssets(manifest);
	}

	main();
})();
