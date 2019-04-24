class Card {
	constructor(stage, assetManager, position, number, index) {
		// Setup stage
		this._stage = stage;

		// Setup sprite
		this._sprite = assetManager.getSprite('spritesheet');

		// Setup position of the card
		this.setupPosition(position);

		// setup Card number and index property
		this._cardNumber = number;
		this._cardIndex = index;

		// Start card not guessed, not disabled and hidden
		this._guessed = false;
		this._disabled = false;
		this._hidden = true;

		// Custom events
		this._cardClicked = new createjs.Event('cardClicked', true);
		this._cardDisable = new createjs.Event('cardDisable', true);
		this._cardEnable = new createjs.Event('cardEnable', true);

		// Setup click listener
		this._sprite.on('click', this._onClicked, this);
	}

	// ---------------------------------------------- Public Methods

	// Hide the card again and reset appropriate values
	// Dispatch event when finished animation
	hideMe() {
		this._sprite.gotoAndPlay('card' + this._cardNumber + 'Hide');
		this._sprite.on('animationend', e => {
			this._sprite.stop();
			this._hidden = true;
			this._disabled = false;
			this._guessed = false;
			this._sprite.dispatchEvent(this._cardEnable);
			e.remove();
		});
	}

	// Reveal card and play clicked card sound
	// Dispatch event when finished and change hidden state
	revealMe() {
		createjs.Sound.play('cardClickedSound');

		this._sprite.gotoAndPlay('card' + this._cardNumber + 'Reveal');
		this._sprite.on('animationend', e => {
			this._sprite.stop();
			this._hidden = !this._hidden;
			e.remove();
			this._sprite.dispatchEvent(this._cardClicked);
		});
	}

	// Shake the card then go to hide me
	shakeMe() {
		this._sprite.gotoAndPlay('card' + this._cardNumber + 'Shake');
		this._sprite.on('animationend', e => {
			this._sprite.stop();
			this.hideMe();
			e.remove();
		});
	}

	// Set disabled property of card
	disableMe() {
		this._disabled = true;
	}

	// Enable the card and setup click listener again
	// Only enable the card if nots guessed and its hidden
	enableMe() {
		this._sprite.on('click', this._onClicked, this);

		if (!this._guessed && this._hidden) {
			this._disabled = false;
		}
	}

	// Play correct guess animation on this card
	// Dispatch event when animation is finished
	// Set guessed property to true
	correctGuess() {
		this._sprite.gotoAndPlay('card' + this._cardNumber + 'Correct');
		this._sprite.on('animationend', e => {
			this._sprite.stop();
			this._sprite.dispatchEvent(this._cardEnable);
			e.remove();
		});

		this._guessed = true;
	}

	// Set the position of the card
	setupPosition(position) {
		// Get x and y coordinates in separate values
		this._coordinates = position.split(' ');

		// Set the x and y values
		this._sprite.x = this._coordinates[0];
		this._sprite.y = this._coordinates[1];
	}

	// Add card to the stage
	addMe() {
		this._stage.addChild(this._sprite);
	}

	// Remove the card from the stage
	removeMe() {
		this._stage.removeChild(this._sprite);
	}

	// ---------------------------------------------- Event Handlers

	// When card is clicked go here
	_onClicked(e) {
		// If card is disabled just leave the function
		if (this._disabled) {
			e.remove();
			return;
		}

		// Dispatch the disable event so it can't be clicked again
		this._sprite.dispatchEvent(this._cardDisable);

		// This line fixes the property not being recognized after first click
		this._cardClicked.target = null;
		this._cardClicked.index = this._cardIndex;

		// If the card is hidden reveal it
		if (this._hidden) {
			this.revealMe();
		}
	}
}
