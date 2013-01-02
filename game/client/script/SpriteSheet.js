
define(function () {

	var SpriteSheet = new function() {

	  this.map = {
		ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
		missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
		enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
		enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
		enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
		enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 }
	  }; 
	  
	  this.load = function(callback) { 
		this.image = new Image();
		this.image.onload = callback;
		this.image.src = 'images/sprites.png';
	  };
	  
	  this.draw = function(ctx,sprite,x,y,frame) {
		var s = this.map[sprite];
		if(!frame) frame = 0;
		ctx.drawImage(this.image,
						 s.sx + frame * s.w, 
						 s.sy, 
						 s.w, s.h, 
						 x,   y, 
						 s.w, s.h);
	  };
	}
	
	return SpriteSheet;
});