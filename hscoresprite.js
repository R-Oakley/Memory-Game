(function(window) {
	hscoresprite = function() {
		this.initialize();
	};
	hscoresprite._SpriteSheet = new createjs.SpriteSheet({
		images: ['hscoresprite.png'],
		frames: [
			[0, 0, 15, 28, 0, 0, 0],
			[15, 0, 15, 28, 0, 0, 0],
			[30, 0, 15, 28, 0, 0, 0],
			[45, 0, 15, 28, 0, 0, 0],
			[60, 0, 15, 28, 0, 0, 0],
			[75, 0, 15, 28, 0, 0, 0],
			[90, 0, 15, 28, 0, 0, 0],
			[105, 0, 15, 28, 0, 0, 0],
			[0, 28, 15, 28, 0, 0, 0],
			[15, 28, 15, 28, 0, 0, 0],
			[30, 28, 15, 28, 0, 0, 0],
			[45, 28, 15, 28, 0, 0, 0],
			[60, 28, 15, 28, 0, 0, 0],
			[75, 28, 15, 28, 0, 0, 0],
			[90, 28, 15, 28, 0, 0, 0],
			[105, 28, 15, 28, 0, 0, 0],
			[0, 56, 15, 28, 0, 0, 0],
			[15, 56, 15, 28, 0, 0, 0],
			[30, 56, 15, 28, 0, 0, 0],
			[45, 56, 15, 28, 0, 0, 0],
			[60, 56, 15, 28, 0, 0, 0],
			[75, 56, 15, 28, 0, 0, 0],
			[90, 56, 15, 28, 0, 0, 0],
			[105, 56, 15, 28, 0, 0, 0],
			[0, 84, 15, 28, 0, 0, 0],
			[15, 84, 15, 28, 0, 0, 0],
			[30, 84, 15, 28, 0, 0, 0],
			[45, 84, 15, 28, 0, 0, 0],
			[60, 84, 15, 28, 0, 0, 0]
		],
		animations: {
			H: [0, 0, true],
			i: [1, 1, true],
			g: [2, 2, true],
			h: [3, 3, true],
			S: [4, 4, true],
			c: [5, 5, true],
			o: [6, 6, true],
			r: [7, 7, true],
			e: [8, 8, true],
			':': [9, 9, true],
			L: [10, 10, true],
			a: [11, 11, true],
			d: [12, 12, true],
			n: [13, 13, true],
			'.': [14, 14, true],
			P: [15, 15, true],
			t: [16, 16, true],
			s: [17, 17, true],
			'!': [18, 18, true],
			0: [19, 19, true],
			1: [20, 20, true],
			2: [21, 21, true],
			3: [22, 22, true],
			4: [23, 23, true],
			5: [24, 24, true],
			6: [25, 25, true],
			7: [26, 26, true],
			8: [27, 27, true],
			9: [28, 28, true]
		}
	});
	var hscoresprite_p = (hscoresprite.prototype = new createjs.Sprite());
	hscoresprite_p.Sprite_initialize = hscoresprite_p.initialize;
	hscoresprite_p.initialize = function() {
		this.Sprite_initialize(hscoresprite._SpriteSheet);
		this.paused = false;
	};

	window.hscoresprite = hscoresprite;
})(window);
