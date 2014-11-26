var loadState = {
  preload: function(){
    //Add a loading label to the screen
    var loadingLabel = game.add.text(game.world.centerX, 150, 'Loading...',{
      font:"30px Arial",
      fill:"#ffffff"
    });
    loadingLabel.anchor.setTo(0.5,0.5);

    //Display the progress bar
    var progressBar = game.add.sprite(game.world.centerX, 200,'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    game.load.setPreloadSprite(progressBar);

    //Load the various assets here
    game.load.spritesheet('nunavutButton', '/assets/buttons/nunavut_button.png', 86, 70);
    game.load.spritesheet('ontarioButton', '/assets/buttons/ontario_button.png', 86, 70);
    game.load.spritesheet('albertaButton', '/assets/buttons/alberta_button.png', 86, 70);
    game.load.spritesheet('saskButton', '/assets/buttons/sask_button.png', 86, 70);
    game.load.spritesheet('manitobaButton', '/assets/buttons/manitoba_button.png', 86, 70);
    game.load.spritesheet('nfldButton', '/assets/buttons/nfld_button.png', 86, 70);
    game.load.spritesheet('peiButton', '/assets/buttons/pei_button.png', 86, 70);
    game.load.spritesheet('nsButton', '/assets/buttons/ns_button.png', 86, 70);
    game.load.spritesheet('nwtButton', '/assets/buttons/nwt_button.png', 86, 70);
    game.load.spritesheet('nbButton', '/assets/buttons/nb_button.png', 86, 70);
    game.load.spritesheet('yukonButton', '/assets/buttons/yukon_button.png', 86, 70);
    game.load.spritesheet('bcButton', '/assets/buttons/bc_button.png', 86, 70);
    game.load.spritesheet('quebecButton', '/assets/buttons/quebec_button.png', 86, 70);

    game.load.spritesheet('player', '/assets/eight_frame_test_char.png', 20, 20);
    game.load.image('enemy', '/assets/enemy.png');
    game.load.image('enemy_bullet', '/assets/enemy_bullet.png');
    game.load.image('arrow', '/assets/arrow.png');
    game.load.image('pixel', '/assets/pixel.png');

    game.load.image("background_tilemap", "/assets/background_tilemap.png");
    game.load.tilemap("map", '/assets/collesseum.json', null, Phaser.Tilemap.TILED_JSON);

  },

  create:function(){
    game.state.start('menu'); 
  }

}