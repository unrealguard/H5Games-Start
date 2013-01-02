define(['game/SpriteSheet'], function (SpriteSheet) {
	console.info('Loading Game module');
	
	var Game = new function () {

		this.initialize = function(canvasElementId, callback) {
			this.canvas = document.getElementById(canvasElementId);
			this.width = this.canvas.width;
			this.height= this.canvas.height;
			// Set up the rendering context
			this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
			if(!this.ctx) { throw "Please upgrade your browser to play"; }
			
			// Set up input
			this.setupInput();
			// Start the game loop
			this.loop(); 
			// Load the sprite sheet and pass forward the callback.
			SpriteSheet.load(callback);
		};
		
		// Handle Input
		var KEY_CODES = {65:'left', 68:'right', 37:'left', 39:'right', 32 :'fire' };
		this.keys = {};
		
		this.setupInput = function() {
		
			window.addEventListener('keydown',function(e) {
				if(KEY_CODES[event.keyCode]) {
					   Game.keys[KEY_CODES[event.keyCode]] = true;
					   e.preventDefault();
				}
			}, false);
			
			window.addEventListener('keyup',function(e) {
				if(KEY_CODES[event.keyCode]) {
					Game.keys[KEY_CODES[event.keyCode]] = false; 
					e.preventDefault();
				}
			}, false);
		}
		
		// Game Loop
		var boards = [];
		this.loop = function() { 
			var dt = 30/1000;
			for(var i=0, len = boards.length;i<len;i++) {
				if(boards[i]) { 
					boards[i].step(dt);
					boards[i] && boards[i].draw(Game.ctx);
				}
			}
			setTimeout(Game.loop,30);
		};
		
		// Change an active game board
		this.setBoard = function(num,board) { boards[num] = board; };		
	}
	
	return Game;
});