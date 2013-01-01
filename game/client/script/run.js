(function( curl ) {

	var config = {
		paths: {
			game: "script/"
		},
		packages: [
		],
		pluginPath: "script/lib/curl/plugins"
	};
	
	var onGameReady = function (Game, Starfield, TitleScreen) {
		console.info('Game ready to start');
		
		var sprites = {
			ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
			missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
			enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
			enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
			enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
			enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 }
		};
		
		var enemies = {
			basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }
		};
		
		var playGame = function() {
			console.info('Playing the game');
			
			curl(['game/PlayerShip', 'game/GameBoard', 'game/Enemy'])
			.then(function (PlayerShip, GameBoard, Enemy) {
					var board = new GameBoard();
					board.add(new Enemy(enemies.basic));
					board.add(new Enemy(enemies.basic, {x: 200}));
					board.add(new PlayerShip());
					Game.setBoard(3, board);	
				}
			);
		}
		
		var startGame = function() {
			Game.setBoard(0,new Starfield(20,0.4,100,true))
			Game.setBoard(1,new Starfield(50,0.6,100))
			Game.setBoard(2,new Starfield(100,1.0,50));
			Game.setBoard(3,new TitleScreen("Alien Invasion", 
											"Press space to start playing",
											playGame));											
		}
		
		Game.initialize("game",sprites,startGame);
	};
	
	var onError = function (error) {
		console.error('An error occured starting the game.');
		throw error;
	};

	curl(config, [
		'game/Game', 
		'game/Starfield', 
		'game/TitleScreen',
		'domReady!'])
		.then(onGameReady, onError);

})( curl );