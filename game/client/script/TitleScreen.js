define(['game/Game'], function (Game) {
	var TitleScreen = function TitleScreen(title,subtitle,callback) {
			this.step = function(dt) {
				if(Game.keys['fire'] && callback) callback();
			};
			this.draw = function(ctx) {
			ctx.fillStyle = "#FFFFFF";
			ctx.textAlign = "center";
			ctx.font = "bold 40px bangers";
			ctx.fillText(title,Game.width/2,Game.height/2);
			ctx.font = "bold 20px bangers";
			ctx.fillText(subtitle,Game.width/2,Game.height/2 + 40);
		};
	};
	
	return TitleScreen;
});