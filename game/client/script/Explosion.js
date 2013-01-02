define(['game/Sprite'], function(Sprite) {

	var Explosion = function(centerX,centerY) {
		this.setup('explosion', { frame: 0 });
		this.x = centerX - this.w/2;
		this.y = centerY - this.h/2;
		this.subFrame = 0;
	};
	Explosion.prototype = Sprite.GetInstance();
	
	Explosion.prototype.step = function(dt) {
		this.frame = Math.floor(this.subFrame++ / 3);
		if(this.subFrame >= 36) {
			this.board.remove(this);
		}
	};
	
	return Explosion;
});