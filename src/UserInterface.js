class UserInterface {
	constructor(stage, assetManager) {
		this._stage = stage;
		this._sprite = assetManager.getSprite('fontsprites');

		this._overlay = assetManager.getSprite('fontsprites');
		this._overlay.gotoAndStop('overlay');
		this._overlay.x = -1;
		this._overlay.y = -1;
		this._stage.addChild(this._overlay);

		this._btnRestart = assetManager.getSprite('fontsprites');
		this._btnRestart.gotoAndStop('btnRestart');
		this._btnRestart.x = 700;
		this._btnRestart.y = 400;
		this._btnRestart.disabled = false;
		this._btnRestart.on('click', this._onRestartClicked, this);

		//! Move this to the Userinterface
		this._btnNewGame = assetManager.getSprite('fontsprites');
		this._btnNewGame.gotoAndStop('btnNewGame');
		this._btnNewGame.x = 700;
		this._btnNewGame.y = 400;
		stage.addChild(this._btnNewGame);
		this._btnNewGame.on('click', this._onNewGameClicked, this);

		this._score = new createjs.BitmapText('Score: 0 Pts', assetManager.getSpriteSheet('fontsprites'));
		this._score.x = 175;
		this._score.y = 535;
		this._score.letterSPacing = -15;
		this._stage.addChild(this._score);

		this._highScore = new createjs.BitmapText('High Score: Loading..', assetManager.getSpriteSheet('hscoresprite'));
		this._highScore.x = 600;
		this._highScore.y = 330;
		this._highScore.letterSPacing = -15;

		this._stage.addChild(this._highScore);

		// Custom events
		this._restartClicked = new createjs.Event('restartClicked', true);
		this._newGameClicked = new createjs.Event('newGameClicked', true);
	}

	// get set
	set score(value) {
		this._score.text = 'Score: ' + String(value) + ' Pts';
	}

	set highScore(value) {
		this._highScore.text = 'High Score: ' + String(value) + ' Pts';
	}

	showRestartBtn() {
		this._stage.addChild(this._btnRestart);
	}

	hideRestartBtn() {
		this._stage.removeChild(this._btnRestart);
	}

	disableRestartBtn() {
		this._btnRestart.disabled = true;
	}

	enableRestartBtn() {
		this._btnRestart.disabled = false;
	}

	showNewGameBtn() {
		this._stage.addChild(this._btnNewGame);
	}

	hideNewGameBtn() {
		this._stage.removeChild(this._btnNewGame);
	}

	_onRestartClicked() {
		if (!this._btnRestart.disabled) {
			this._btnRestart.dispatchEvent(this._restartClicked);
		}
	}

	_onNewGameClicked() {
		this._btnNewGame.dispatchEvent(this._newGameClicked);
	}
}
