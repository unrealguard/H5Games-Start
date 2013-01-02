define(['game/Sprite'], function (Sprite) {

	var PlayerMissile = function(x,y) {	
		this.setup('missile',{ vy: -700,  damage: 10 });
		
		// Center the missile on x
		this.x = x - this.w/2; 
		// Use the passed in y as the bottom of the missile
		this.y = y - this.h; 
	};
	
	PlayerMissile.prototype = Sprite.GetInstance();
	PlayerMissile.prototype.type = Sprite.types.OBJECT_PLAYER_PROJECTILE;
	
	PlayerMissile.prototype.step = function(dt)  {
		this.y += this.vy * dt;
		var collision = this.board.collide(this, Sprite.types.OBJECT_ENEMY);
		
		if(collision) {
			collision.hit(this.damage);
			this.board.remove(this);
		} else if(this.y < -this.h) { 
			this.board.remove(this); 
		}
	};
	
	return PlayerMissile;

});