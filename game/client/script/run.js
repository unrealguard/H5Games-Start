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
	
		var level1 = [
		 // Start,    End, Gap,  Type,   Override
		  [ 0,       4000, 500, 'step' ],
		  [ 6000,   13000, 800, 'ltr' ],
		  [ 12000,  16000, 400, 'circle' ],
		  [ 18200,  20000, 500, 'straight', { x: 150 } ],
		  [ 18200,  20000, 500, 'straight', { x: 100 } ],	
		  [ 18400,  20000, 500, 'straight', { x: 200 } ],
		  [ 22000,  25000, 400, 'wiggle', { x: 300 }],
		  [ 22000,  25000, 400, 'wiggle', { x: 200 }]
		];
		
		var playGame = function() {
			console.info('Playing the game');
			
			curl(['game/PlayerShip', 'game/GameBoard', 'game/Level'])
			.then(function (PlayerShip, GameBoard, Level) {
					var board = new GameBoard();
					board.add(new PlayerShip());
					board.add(new Level(level1,winGame));
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
		
		var winGame = function() {
			Game.setBoard(3,new TitleScreen("You win!", 
										  "Press fire to play again",
										  playGame));
		}
		
		var loseGame = function() {
			Game.setBoard(3,new TitleScreen("You lose!", 
										  "Press fire to play again",
										  playGame));
		}
		
		Game.initialize("game", startGame);
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