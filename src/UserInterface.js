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
		console.log('I am enabled');
	}

	_onRestartClicked() {
		if (!this._btnRestart.disabled) {
			this._btnRestart.dispatchEvent(this._restartClicked);
		}
	}
}
