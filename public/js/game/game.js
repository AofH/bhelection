var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-div');
//var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game-div');
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('levelselect', levelSelectState);
game.state.add('play', playState);
game.state.add('victory', victoryState);

game.state.start('boot');
