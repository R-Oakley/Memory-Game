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

	//! Make these
	let introCaption;
	let background;
	let gameOverCaption;

	// ------------------------------------------------------------ Event Handlers
	function onReady(e) {
		console.log('>> setup');
		// kill event listener
		e.remove();

		// construct game objects

		// setup event listener to start game
		// background.on('click', onStartGame);

		console.log('>> game ready');
		// startup the ticker
		createjs.Ticker.framerate = FRAME_RATE;
		createjs.Ticker.on('tick', onTick);
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
