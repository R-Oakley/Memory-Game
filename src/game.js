/*
 * Memory Game Implemented in HTML5
 * Special Topics 2019
 * Ryan Oakley
 */

(function() {
	// game variables
	let stage = null;
	let canvas = null;

	// frame rate of game
	const FRAME_RATE = 30;

	// game objects
	let assetManager;
	let cardNumber;
	let firstGuess = null;
	let secondGuess = null;
	let correctMatches = 0;

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
	let introCaption;
	let background;
	let gameOverCaption;

	// ------------------------------------------------------------ Event Handlers
	function onReady(e) {
		console.log('>> setup');
		// kill event listener
		e.remove();
		let i = 1;

		// Randomize the order of the cards
		positions.sort(function(a, b) {
			return Math.random() - 0.5;
		});

		// Construct 16 cards and randomize position
		for (let i = 0; i < 16; i++) {
			if (i == 0) {
				cardNumber = 1;
			} else {
				cardNumber = Math.floor(i / 2) + 1;
			}
			cards.push(new Card(stage, assetManager, positions[i], cardNumber, i));
			cards[i]._sprite.on('cardClicked', onCardClicked);
			cards[i]._sprite.on('cardDisable', onDisableCards);
		}

		// setup event listener to start game
		// background.on('click', onStartGame);

		console.log('>> game ready');
		// startup the ticker
		createjs.Ticker.framerate = FRAME_RATE;
		createjs.Ticker.on('tick', onTick);
	}

	function onCardClicked(e) {
		//! Remove me - Just for seeing when enabling is done
		let count = 1;

		// console.log('I was clicked, I am this card ' + e.index);

		if (firstGuess == null) {
			firstGuess = cards[e.index];
			// console.log('Card Number: ' + firstGuess._cardNumber);
		} else {
			secondGuess = cards[e.index];
			// console.log('Card Number: ' + secondGuess._cardNumber);

			if (firstGuess._cardNumber == secondGuess._cardNumber) {
				console.log('correct guess');
				correctMatches++;
				firstGuess.correctGuess();
				secondGuess.correctGuess();
				firstGuess = null;
				secondGuess = null;
			} else {
				firstGuess.shakeMe();
				secondGuess.shakeMe();
				firstGuess = null;
				secondGuess = null;
				console.log('wrong guess');
			}
		}

		//! This doesn't wait for after the Shake me Animation, Can I fix this?
		cards.forEach(card => {
			card.enableMe();
			count++;

			if (count == 16) {
				console.log('All Clear');
			}
		});

		//! Have to variables, first guess, second guess, make them
		//! equal to the object that caused the event, if the numbers are
		//! the same disable them otherwise flip them back over

		//!Disable clicking on everything during animations?
	}

	// When you first click a card it disables everything
	function onDisableCards(e) {
		cards.forEach(card => {
			card.disableMe();
		});
	}

	function onStartGame(e) {
		// stage.removeChild(introCaption);
		// remove click event on background
		// e.remove();
	}

	function onGameOver(e) {
		// gameOver
		// add listener to reset game when click background
		// background.on('click', onResetGame);
	}

	function onResetGame(e) {
		// kill event listener and add listener to start a new game again
		e.remove();
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

	// ------------------------------------------------------------------------- Main Method
	function main() {
		console.log('>> initializing');

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
