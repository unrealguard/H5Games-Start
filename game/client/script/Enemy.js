define(['game/Sprite', 'game/Game', 'game/Explosion'], function (Sprite, Game, Explosion) {

	var Enemy = function(blueprint,override) {
		this.merge(this.baseParameters);
		this.setup(blueprint.sprite,blueprint);
		this.merge(override);
	}
	
	Enemy.prototype = Sprite.GetInstance();
	
	Enemy.prototype.type = Sprite.types.OBJECT_ENEMY;
	
	Enemy.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0, 
									   E: 0, F: 0, G: 0, H: 0,
									   t: 0};
							  
	
	Enemy.prototype.step = function(dt) {
		this.t += dt;
		this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);
		this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		
		var collision = this.board.collide(this,Sprite.types.OBJECT_PLAYER);
		if(collision) {
			collision.hit(this.damage);
			this.board.remove(this);
		}
		
		if(this.y > Game.height ||
		   this.x < -this.w ||
		   this.x > Game.width) {
				this.board.remove(this);
		}
	}
	
	Enemy.prototype.hit = function(damage) {
	this.health -= damage;
		if(this.health <=0) {
			if(this.board.remove(this)) {
				this.board.add(new Explosion(this.x + this.w/2, 
								   this.y + this.h/2));
			}
		}
	}
	
	return Enemy;
});