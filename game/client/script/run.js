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
			missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }
		};
		
		var playGame = function() {
			console.info('Playing the game');
			
			curl(['game/PlayerShip', 'game/GameBoard'])
			.then(function (PlayerShip, GameBoard) {
					var board = new GameBoard();
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