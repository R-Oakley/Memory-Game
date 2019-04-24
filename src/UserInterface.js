class UserInterface {
	constructor(stage, assetManager) {
		// Setup the stage
		this._stage = stage;

		// Set up the overlay
		this._overlay = assetManager.getSprite('fontsprites');
		this._overlay.gotoAndStop('overlay');
		this._overlay.x = -1;
		this._overlay.y = -1;
		this._stage.addChild(this._overlay);

		// Setup the Restart Button
		this._btnRestart = assetManager.getSprite('fontsprites');
		this._btnRestart.gotoAndStop('btnRestart');
		this._btnRestart.x = 700;
		this._btnRestart.y = 400;
		this._btnRestart.disabled = false;
		this._btnRestart.on('click', this._onRestartClicked, this);

		// Setup the New Game Button
		this._btnNewGame = assetManager.getSprite('fontsprites');
		this._btnNewGame.gotoAndStop('btnNewGame');
		this._btnNewGame.x = 700;
		this._btnNewGame.y = 400;
		stage.addChild(this._btnNewGame);
		this._btnNewGame.on('click', this._onNewGameClicked, this);

		// Setup the Score text
		this._score = new createjs.BitmapText('Score: 0 Pts', assetManager.getSpriteSheet('fontsprites'));
		this._score.x = 175;
		this._score.y = 535;
		this._score.letterSPacing = -15;
		this._stage.addChild(this._score);

		// Setup the High Score text
		this._highScore = new createjs.BitmapText('High Score: Loading..', assetManager.getSpriteSheet('hscoresprite'));
		this._highScore.x = 600;
		this._highScore.y = 330;
		this._highScore.letterSPacing = -15;
		this._stage.addChild(this._highScore);

		// Custom events
		this._restartClicked = new createjs.Event('restartClicked', true);
		this._newGameClicked = new createjs.Event('newGameClicked', true);
	}

	// Set the Score value
	set score(value) {
		this._score.text = 'Score: ' + String(value) + ' Pts';
	}

	// Set the High Score value
	set highScore(value) {
		this._highScore.text = 'High Score: ' + String(value) + ' Pts';
	}

	// Show the Restart Button
	showRestartBtn() {
		this._stage.addChild(this._btnRestart);
	}

	// Hide the Restart Button
	hideRestartBtn() {
		this._stage.removeChild(this._btnRestart);
	}

	// Disable the Restart Button
	disableRestartBtn() {
		this._btnRestart.disabled = true;
	}

	// Enable the Restart Button
	enableRestartBtn() {
		this._btnRestart.disabled = false;
	}

	// Show the New Game Button
	showNewGameBtn() {
		this._stage.addChild(this._btnNewGame);
	}

	// Hide the New Game Button
	hideNewGameBtn() {
		this._stage.removeChild(this._btnNewGame);
	}

	// When the Restart Button is clicked dispatch event if not disabled
	_onRestartClicked() {
		if (!this._btnRestart.disabled) {
			this._btnRestart.dispatchEvent(this._restartClicked);
		}
	}

	// When the New Game Button is clicked dispatch event
	_onNewGameClicked() {
		this._btnNewGame.dispatchEvent(this._newGameClicked);
	}
}
