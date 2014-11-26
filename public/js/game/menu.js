var menuState = {

  create:function(){
    //Reset the game worlds height and width as the game world doesn't get reset on create
    game.world.width = 640;
    game.world.height = 480;

    var nameLabel = game.add.text(game.world.centerX, -50,'Electorate Wars',{
      font:'50px Arial',
      fill:'#ffffff',
    });
    nameLabel.anchor.setTo(0.5,0.5);
    var tween = game.add.tween(nameLabel);
    tween.to({y:80}, 1000).easing(Phaser.Easing.Bounce.Out).start();

    var startLabel = game.add.text(game.world.centerX, game.world.height - 80,
      'press the up arrow key to start',
      { font:"25px Arial",
        fill:"#ffffff"
    });
    startLabel.anchor.setTo(0.5,0.5);
    game.add.tween(startLabel).to({angle: -2}, 500).to({angle:2},500).loop().start();

    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.start, this);
  },

  start:function(){
    game.state.start('levelselect');
  },
}