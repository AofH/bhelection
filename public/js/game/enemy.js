Enemy = function(index, game, health, name, bullets){


  var zones = [];
  zones[1] = {minX: 50, maxX: 230, minY:170, maxY:1430 }; //left
  zones[2] = {minX: 170, maxX: 670, minY:50, maxY:180 }; //top
  zones[3] = {minX: 1320, maxX: 1550, minY:170, maxY:1430 }; //right
  
  var zone = Math.floor((Math.random() * 3) + 1);
  var x = (Math.random() * zones[zone].maxX) + zones[zone].minX;
  var y = (Math.random() * zones[zone].maxY) + zones[zone].minY; 

  this.game = game;
  this.health = health;
  this.name = name;
  this.bullets = bullets;
  this.fireRate = 1000;
  this.nextFire = 0;
  this.alive = true;
  
  this.e = game.add.sprite(x,y,'enemy');
  this.e.anchor.set(0.5);
  this.e.index = index;

  game.physics.enable(this.e, Phaser.Physics.ARCADE);
  this.e.body.immovable = false;
  this.e.body.collideWorldBounds = true;
  this.e.body.bounce.setTo(1,1);

  this.e.angle = game.rnd.angle();

  game.physics.arcade.velocityFromRotation(this.e.rotation, 100, this.e.body.velocity);
};

Enemy.prototype.damage = function(damage){
  this.health -= damage;

  if(this.health <= 0){
    this.alive = false;
    this.e.kill();
    return true;
  }

  return false;
}

Enemy.prototype.update = function(player){
  if(this.game.physics.arcade.distanceBetween(this.e, player) < 300){
    if(this.game.time.now > this.nextFire && this.bullets.countDead() > 0){
      this.nextFire = this.game.time.now + this.fireRate;
      var bullet = this.bullets.getFirstDead();
      bullet.reset(this.e.x, this.e.y);
      bullet.rotation = this.game.physics.arcade.moveToObject(bullet, player, 200);
    }
  }

  this.e.rotation = this.game.physics.arcade.angleBetween(this.e, player) - Math.PI/5.5;
}