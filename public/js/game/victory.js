victoryState = {
  create:function(){
    //Reset the game worlds height and width as the game world doesn't get reset on create
    game.world.width = 640;
    game.world.height = 480;

    var victoryLabel = game.add.text(game.world.centerX, 50, 'You Are Victorious!!',{
      font:'50px Arial',
      fill: '#ffffff'
    });
    victoryLabel.anchor.setTo(0.5,0.5);

    var playAgainLabel = game.add.text(game.world.centerX, game.world.height - 80,
      'press up arrow to play again',
      {
        font:"25px Arial",
        fill:"#ffffff"
    });
    playAgainLabel.anchor.setTo(0.5,0.5);

    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.start, this);
  },

  start:function(){
    game.state.start('levelselect');
  }
}