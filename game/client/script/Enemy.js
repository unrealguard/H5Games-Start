define(['game/Sprite', 'game/Game'], function (Sprite, Game) {

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
		if(this.y > Game.height ||
		   this.x < -this.w ||
		   this.x > Game.width) {
				this.board.remove(this);
		}
	}
	
	return Enemy;
});