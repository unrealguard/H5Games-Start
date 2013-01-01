define(['game/SpriteSheet', 'game/Game'], function (SpriteSheet, Game) {

	var Enemy = function(blueprint,override) {
		var baseParameters =  { A: 0, B: 0, C: 0, D: 0, 
							  E: 0, F: 0, G: 0, H: 0 }
							  
		// Set all the base parameters to 0
		for (var prop in baseParameters) {
			this[prop] = baseParameters[prop];
		}
		
		// Copy of all the attributes from the blueprint
		for (prop in blueprint) {
			this[prop] = blueprint[prop];
		}
		
		// Copy of all the attributes from the override, if present
		if(override) {
			for (prop in override) {
				this[prop] = override[prop];
			}
		}
		this.w = SpriteSheet.map[this.sprite].w;
		this.h = SpriteSheet.map[this.sprite].h;
		this.t = 0;
	}
	
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
  
	Enemy.prototype.draw = function(ctx) {
		SpriteSheet.draw(ctx,this.sprite,this.x,this.y);
	}
	
	return Enemy;
});