class Card {
	constructor(stage, assetManager, position, number, index) {
		this._stage = stage;

		this._sprite = assetManager.getSprite('spritesheet');
		stage.addChild(this._sprite);
		this._coordinates = position.split(' ');
		this._x = this._coordinates[0];
		this._y = this._coordinates[1];
		this._cardNumber = number;
		this._cardIndex = index;

		this._hidden = true;

		// this._cardClicked = new createjs.Event('card' + number);
		this._cardClicked = new createjs.Event('cardClicked', true);
		this._sprite.on('click', this._onClicked, this);

		this.setupMe();
	}

	// ---------------------------------------------- Public Methods
	setupMe() {
		// console.log(this._cardNumber);
		this._sprite.gotoAndStop('card' + this._cardNumber + 'Reveal');
		// console.log('card' + this._cardNumber + 'Reveal');
		this._sprite.x = this._x;
		this._sprite.y = this._y;
	}

	//! Do I need this? Shake Me will do the same thing?
	hideMe() {
		this._sprite.gotoAndPlay('card' + this._cardNumber + 'Hide');
		this._sprite.on('animationend', e => {
			this._sprite.stop();
			e.remove();
		});
	}

	revealMe() {
		this._sprite.gotoAndPlay('card' + this._cardNumber + 'Reveal');
		this._sprite.on('animationend', e => {
			this._sprite.stop();
			e.remove();
		});
	}

	shakeMe() {}

	disableMe() {}

	// ---------------------------------------------- Event Handlers
	_onClicked() {
		// console.log('Card ' + this._cardNumber + ' clicked');
		//! This line fixes the property not being recognized after first click
		this._cardClicked.target = null;
		this._cardClicked.index = this._cardIndex;
		// this._stage.dispatchEvent(this._cardClicked);
		this._sprite.dispatchEvent(this._cardClicked);
		if (this._hidden) {
			this.revealMe();
		} else {
			this.hideMe();
		}

		this._hidden = !this._hidden;
	}
}
