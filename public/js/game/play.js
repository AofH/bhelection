var playState = function(){
}

playState.prototype ={
  init: function(provinceElectedData){
    
    this.nextFire = 0;
    this.fireRate = 200;
    this.levels = provinceElectedData;
    
  },

  create:function(){
    
    
    this.currentLevel = 0;
    this.createWorld();

    this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this.player);

    this.emitter = game.add.emitter(0,0,15);
    this.emitter.makeParticles('pixel');
    this.emitter.setYSpeed(-150, 150);
    this.emitter.setXSpeed(-150, 150);
    this.emitter.gravity = 0;

    this.enemyBullets = game.add.group();
    this.enemyBullets.enableBody = true;
    this.enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.enemyBullets.createMultiple(25, 'enemy_bullet');

    this.enemyBullets.setAll('anchor.x', 0.5);
    this.enemyBullets.setAll('anchor.y', 0.5);
    this.enemyBullets.setAll('outOfBoundsKill', true);
    this.enemyBullets.setAll('checkWorldBounds', true);
     
    
    this.spawnEnemies(this.currentLevel);      
   
 
    this.arrows = game.add.group();
    this.arrows.enableBody = true;
    this.arrows.physicsBodyType = Phaser.Physics.ARCADE;
    this.arrows.createMultiple(30, 'arrow', 0, false);
    this.arrows.setAll('anchor.x', 0.5);
    this.arrows.setAll('anchor.y', 0.5);
    this.arrows.setAll('outOfBoundsKill', true);
    this.arrows.setAll('checkWorldBounds', true);


    this.camera.follow(this.player);
   
    this.cursor = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP,
                                       Phaser.Keyboard.DOWN,
                                       Phaser.Keyboard.LEFT,
                                       Phaser.Keyboard.RIGHT
                                      ]);
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);


  },

  update:function(){
    game.physics.arcade.collide(this.player, this.layer);
    game.physics.arcade.overlap(this.enemyBullets, this.layer, this.bulletHitWall, null, this);
    game.physics.arcade.overlap(this.arrows, this.layer, this.arrowHitWall, null, this);
    game.physics.arcade.overlap(this.enemyBullets, this.player, this.enemyBulletHitPlayer, null, this);

    var enemyAlive = false; 

    for(var i = 0; i < this.enemies.length; i++){
      if(this.enemies[i].alive){
        enemyAlive = true;
        game.physics.arcade.collide(this.enemies[i].e, this.layer);
        game.physics.arcade.overlap(this.arrows, this.enemies[i].e, this.arrowHitEnemy, null ,this);

        this.enemies[i].update(this.player);
      }
    }

    if(enemyAlive == false){
      this.playerWon();
    }
    

    this.movePlayer();
  },

  createWorld:function(){
    this.map = game.add.tilemap('map');
    this.map.addTilesetImage('background_tilemap');
    this.map.setCollision(2);

    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
  },

  movePlayer:function(){
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
  
    if(this.cursor.down.isDown && this.cursor.right.isDown){
      this.player.body.velocity.x = 200;
      this.player.body.velocity.y = 200;
      this.player.frame = 1;
    } else if (this.cursor.down.isDown && this.cursor.left.isDown){
      this.player.body.velocity.x = -200;
      this.player.body.velocity.y = 200;
      this.player.frame = 7;
    } else if (this.cursor.up.isDown && this.cursor.right.isDown){
      this.player.body.velocity.x = 200;
      this.player.body.velocity.y = -200;
      this.player.frame = 3;
    } else if (this.cursor.up.isDown && this.cursor.left.isDown){
      this.player.body.velocity.x = -200;
      this.player.body.velocity.y = -200;
      this.player.frame = 5;
    } else if(this.cursor.left.isDown){ //Move the player to the left
      this.player.body.velocity.x = -200;
      this.player.frame = 6;
    } else if (this.cursor.right.isDown ){ //Move Right
      this.player.body.velocity.x = 200;
      this.player.frame = 2;
    } else if (this.cursor.up.isDown){ // Move Up
      this.player.body.velocity.y = -200;
      this.player.frame = 4;
    } else if (this.cursor.down.isDown){ // Move Down
      this.player.body.velocity.y = 200;
      this.player.frame = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.fireArrow(this.player.frame);
    }

  },

  spawnEnemies:function(level){
    this.enemies = [];

    for(var i = 0; i < this.levels.length; i++) {
      var name = this.levels[i].firstname + " " +this.levels[i].lastname;
      this.enemies.push(new Enemy(i, this.game, this.levels[i].votes, name, this.enemyBullets));
    }  
  },

  fireArrow:function(direction){
    if(game.time.now > this.nextFire && this.arrows.countDead() > 0) {
      this.nextFire = game.time.now + this.fireRate;
      var arrow = this.arrows.getFirstExists(false);
      arrow.reset(this.player.x, this.player.y);

      if(direction === 0){ //Down
        arrow.angle = 180;
        arrow.body.velocity.y = 350;
      } else if (direction === 4) { // Up 
        arrow.angle = 0;
        arrow.body.velocity.y = -350;
      } else if (direction === 2){ //right
        arrow.angle = 90;
        arrow.body.velocity.x = 350;
      } else if( direction === 6){ //left
        arrow.angle = 270;
        arrow.body.velocity.x = -350;
      } else if( direction === 3){ //up right
        arrow.angle = 45;
        game.physics.arcade.velocityFromAngle(315, 350,arrow.body.velocity);
        
      } else if( direction === 5){ //up left
        arrow.angle = 315;
        game.physics.arcade.velocityFromAngle(225, 350,arrow.body.velocity);
        
      } else if( direction === 1){ //down right
        arrow.angle = 135;
        game.physics.arcade.velocityFromAngle(45, 350,arrow.body.velocity);
        
      } else if( direction === 7){ //down left
        arrow.angle = 225;
        game.physics.arcade.velocityFromAngle(135, 350,arrow.body.velocity);
        
      }

    }
  },

  bulletHitWall:function(bullet, layer){
    bullet.kill();
  },

  arrowHitWall:function(arrow, layer){
    arrow.kill();
  },

  arrowHitEnemy:function(enemy, arrow){
    arrow.kill();
    var destroyed = this.enemies[enemy.index].damage(5000);
  },

  enemyBulletHitPlayer:function(player, bullet){
    bullet.kill();

    player.kill();

    this.emitter.x = player.x;
    this.emitter.y = player.y;
    this.emitter.start(true, 600, null, 15);

    game.time.events.add(1000, this.startMenu, this);
  },

  startMenu:function(){
    game.state.start('menu');
  },

  playerWon:function(){
    game.state.start('victory');
  }

}