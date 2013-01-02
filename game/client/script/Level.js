define(['game/Sprite', 'game/Enemy'], function (Sprite, Enemy) {

	var Level = function(levelData,callback) {
		this.levelData = [];
		for(var i =0; i<levelData.length; i++) {
			this.levelData.push(Object.create(levelData[i]));
		}
		this.t = 0;
		this.callback = callback;
	}

	var enemies = {
		  straight: { x: 0,   y: -50, sprite: 'enemy_ship', health: 10, 
					  E: 100 },		
		  ltr:      { x: 0,   y: -100, sprite: 'enemy_purple', health: 10, 
					  B: 200, C: 1, E: 200  },
		  circle:   { x: 400,   y: -50, sprite: 'enemy_circle', health: 10, 
					  A: 0,  B: -200, C: 1, E: 20, F: 200, G: 1, H: Math.PI/2 },
		  wiggle:   { x: 100, y: -50, sprite: 'enemy_bee', health: 20, 
					  B: 100, C: 4, E: 100 },
		  step:     { x: 0,   y: -50, sprite: 'enemy_circle', health: 10,
					  B: 300, C: 1.5, E: 60 }
	};
	
	Level.prototype.step = function(dt) {
		var idx = 0, remove = [], curShip = null;
		// Update the current time offset
		this.t += dt * 1000;
		//  Example levelData 
		//   Start, End,  Gap, Type,   Override
		// [[ 0,     4000, 500, 'step', { x: 100 } ]
		while((curShip = this.levelData[idx]) && 
		(curShip[0] < this.t + 2000)) {
			// Check if past the end time 
			if(this.t > curShip[1]) {
			// If so, remove the entry
			remove.push(curShip);
			} else if(curShip[0] < this.t) {
			// Get the enemy definition blueprint
			var enemy = enemies[curShip[3]],
			override = curShip[4];
			// Add a new enemy with the blueprint and override
			this.board.add(new Enemy(enemy,override));
			// Increment the start time by the gap
			curShip[0] += curShip[2];
			}
			idx++;
		}
		// Remove any objects from the levelData that have passed
		for(var i=0,len=remove.length;i<len;i++) {
			var idx = this.levelData.indexOf(remove[i]);
			if(idx != -1) this.levelData.splice(idx,1);
		}
		// If there are no more enemies on the board or in 
		// levelData, this level is done
		if(this.levelData.length == 0 && this.board.cnt[Sprite.types.OBJECT_ENEMY] == 0) {
			if(this.callback) this.callback();
		}
	}
	// Dummy method, doesn't draw anything
	Level.prototype.draw = function(ctx) { }
	
	return Level;
});