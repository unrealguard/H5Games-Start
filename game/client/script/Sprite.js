define(['game/SpriteSheet'], function (SpriteSheet) {

	var Sprite = function() { }
	
	Sprite.prototype.setup = function(sprite,props) {
		this.sprite = sprite;
		this.merge(props);	
		this.frame = this.frame || 0;
		this.w =  SpriteSheet.map[sprite].w;
		this.h =  SpriteSheet.map[sprite].h;
	}
	
	Sprite.prototype.types = {
		OBJECT_PLAYER: 1,
		OBJECT_PLAYER_PROJECTILE: 2,
		OBJECT_ENEMY: 4,
		OBJECT_ENEMY_PROJECTILE: 8,
		OBJECT_POWERUP: 16	
	};
	
	Sprite.prototype.merge = function(props) {
		if(props) {
			for (var prop in props) {
				this[prop] = props[prop];
			}
		}
	}
	
	Sprite.prototype.draw = function(ctx) {
		SpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
	}
	
	Sprite.prototype.hit = function(damage) {
		this.board.remove(this);
	}
	
	// Use GetInstance so we can expose types as static property and user must initialize
	// a new Sprite and doesn't have direct access to this object.
	return {
		GetInstance: function () {
			return new Sprite();
		},
		types: Sprite.prototype.types
	};
});