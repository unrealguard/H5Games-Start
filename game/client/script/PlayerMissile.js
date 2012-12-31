define(['game/SpriteSheet'], function (SpriteSheet) {

	var PlayerMissile = function(x,y) {	
		this.w = SpriteSheet.map['missile'].w;
		this.h = SpriteSheet.map['missile'].h;
		
		// Center the missile on x
		this.x = x - this.w/2; 
		// Use the passed in y as the bottom of the missile
		this.y = y - this.h; 
		this.vy = -700;
	};
	
	PlayerMissile.prototype.step = function(dt)  {
		this.y += this.vy * dt;
		if(this.y < -this.h) { this.board.remove(this); }
	};
	
	PlayerMissile.prototype.draw = function(ctx)  {
		SpriteSheet.draw(ctx,'missile',this.x,this.y);
	};
	
	return PlayerMissile;

});