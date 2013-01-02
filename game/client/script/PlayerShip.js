define(['game/Game', 'game/PlayerMissile', 'game/Sprite'], 
	function (Game, PlayerMissile, Sprite) {
	console.info('Loading PlayerShip module');
	
	var PlayerShip = function() { 
		this.setup('ship', { vx: 0, frame: 0, reloadTime: 0.25, maxVel: 200 });
		
		this.x = Game.width/2 - this.w / 2;
		this.y = Game.height - 10 - this.h;
		this.reload = this.reloadTime;

		this.step = function(dt) {
			this.maxVel = 200; 
			this.step = function(dt) {
				// Set velocity
				if(Game.keys['left']) { this.vx = -this.maxVel; }
				else if(Game.keys['right']) { this.vx = this.maxVel; }
				else { this.vx = 0; }
				
				// Apply velocity
				this.x += this.vx * dt;
				
				// Check bounds
				if(this.x < 0) { this.x = 0; }
				else if(this.x > Game.width - this.w) { 
					this.x = Game.width - this.w; 
				}
				
				this.reload-=dt;
				if(Game.keys['fire'] && this.reload < 0) {
					Game.keys['fire'] = false; 
					this.reload = this.reloadTime;
					this.board.add(new PlayerMissile(this.x,this.y+this.h/2));
					this.board.add(new PlayerMissile(this.x+this.w,this.y+this.h/2));
				}
			}
		}
	};
	
	PlayerShip.prototype = Sprite.GetInstance();
	PlayerShip.prototype.type = Sprite.types.OBJECT_PLAYER;
	
	return PlayerShip;
});