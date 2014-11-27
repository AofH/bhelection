$(document).ready(function(){
  $('#navbar-random').addClass('active');

  var particles = [];
  var explosionCanvas = document.getElementById("explosion-canvas");
  var explosionContext2D = explosionCanvas.getContext("2d");

  var randomFloat = function(min, max){
    return min + Math.random()*(max-min);
  }

  var update = function(frameDelay){
    explosionContext2D.fillStyle = "#eee";
    explosionContext2D.fillRect(0,0, explosionContext2D.canvas.width, explosionContext2D.canvas.height);

    for(var i = 0; i<particles.length; i++) {
      var particle = particles[i];

      particle.update(frameDelay);
      particle.draw(explosionContext2D);

      //remove empty particles from array
      if(particle.scale === 0){
        particles.splice(i,1);
      }
    }
  }

  var Particle = function(){
    this.scale = 0.5;
    this.x = 0;
    this.y = 0;
    this.radius = 5;
    this.color = "#000";
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleSpeed = 0.5;

    this.update = function(ms){
      this.scale -= this.scaleSpeed * ms / 5000.0;
      
      if(this.scale <= 0) {
        this.scale = 0;
      }

      this.x += this.velocityX * ms / 1000.0;
      this.y += this.velocityY * ms / 1000.0;
    };

    this.draw = function(context2D){
      
      context2D.save();
      context2D.translate(this.x, this.y);
      context2D.scale(this.scale, this.scale);

      context2D.beginPath();
      context2D.arc(0,0, this.radius, 0, Math.PI*2, true);
      context2D.closePath();

      context2D.fillStyle = this.color;
      context2D.fill();

      context2D.restore();
    };
  }

  var createExplosion = function(x, y, size, color){
    var count = 10;
    var minSpeed = 10.0;
    var maxSpeed = 100.0;
    var minScaleSpeed = 4.0;
    var maxScaleSpeed = 8.0;

    for ( var angle = 0; angle < 360; angle += Math.round(360/count))
    {
      var particle = new Particle();
      particle.x = x;
      particle.y = y;

      particle.radius = size;//randomFloat(minSize,maxSize);
      particle.color = color;
      particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);
      var speed = randomFloat(minSpeed, maxSpeed);

      particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
      particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

      particles.push(particle);
    }
  }

  $("#explosion-button").click(function(){
    var province = $("#explosion-province").val();

    $.ajax({
      type:"GET",
      url:"/visualization/votes/group/"+province
    }).done(function (data){
      
      var interval = 0;

      var totalVoteArray = data.map(function(d){ return d.totalVotes; });
      var domainMax = Math.max.apply(Math, totalVoteArray);
      var domainMin = Math.min.apply(Math, totalVoteArray);
      var linearScale = d3.scale.linear()
                                .domain([domainMin, domainMax])
                                .range([10,60]);

      var transformedData = [];
      for (var i = 0; i < totalVoteArray.length; i++){
        transformedData[i] = linearScale(totalVoteArray[i]);
      }
       
      for(var i = 0; i < transformedData.length; i++){
 
        var timeout = function (size, interval){
          setTimeout(function(){
            var x = randomFloat(10,explosionContext2D.canvas.width-10);
            var y = randomFloat(10,explosionContext2D.canvas.height-10);

            createExplosion(x,y, size, "pink");
            createExplosion(x,y, size, "lightblue");
            
          }, interval);
        }
        timeout(transformedData[i], interval);
        interval += 100;
      }
    });
  });

  var frameRate = 60.0;
  var frameDelay = 1000.0/frameRate;

  setInterval(function(){
    update(frameDelay);
  }, frameDelay);

});