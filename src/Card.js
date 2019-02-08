class Card {
	constructor(stage, assetManager, position, number) {
		this._sprite = assetManager.getSprite('spritesheet');
		stage.addChild(this._sprite);
		this._coordinates = position.split(' ');
		this._x = this._coordinates[0];
		this._y = this._coordinates[1];
		this._cardNumber = number;

		this.setupMe();
	}

	// ---------------------------------------------- Public Methods
	setupMe() {
		console.log(this._cardNumber);
		this._sprite.gotoAndStop('card' + this._cardNumber + 'Hide');
		console.log('card' + this._cardNumber + 'Reveal');
		this._sprite.x = this._x;
		this._sprite.y = this._y;
	}

	hideMe() {}

	revealMe() {}

	shakeMe() {}
}
