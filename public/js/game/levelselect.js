var levelSelectState = {
  create:function(){
    
    var levelSelect = game.add.text(game.world.centerX, 50,'Select Level',{
      font:'50px Arial',
      fill:'#ffffff',
    });
    levelSelect.anchor.setTo(0.5,0.5);

    var initialXValue = 130;
    var initialYValue = 110;

    // The numbers given in parameters are the indexes of the frames, in this order: over, out, down
    var nunavutButton = game.add.button(game.world.centerX, initialYValue, 'nunavutButton', this.nunavutClick, this, 0, 0, 0);
    nunavutButton.anchor.setTo(0.5, 0);

    var ontarioButton = game.add.button(initialXValue, initialYValue + 80, 'ontarioButton', this.ontarioClick, this, 0, 0, 0);
    var albertaButton = game.add.button(initialXValue + 96, initialYValue + 80, 'albertaButton', this.albertaClick, this, 0, 0, 0);
    var saskButton = game.add.button(initialXValue + 96 *2, initialYValue + 80, 'saskButton', this.saskClick, this, 0, 0, 0);
    var manitobaButton = game.add.button(initialXValue + 96 * 3, initialYValue + 80, 'manitobaButton', this.manitobaClick, this, 0, 0, 0);
   
    var nfldButton = game.add.button(initialXValue, initialYValue + 80 * 2, 'nfldButton', this.nfldClick, this, 0, 0, 0);
    var peiButton = game.add.button(initialXValue + 96, initialYValue + 80 *2, 'peiButton', this.peiClick, this, 0, 0, 0);
    var nsButton = game.add.button(initialXValue + 96 *2, initialYValue + 80 * 2, 'nsButton', this.nsClick, this, 0, 0, 0);
    var nwtButton = game.add.button(initialXValue + 96 * 3, initialYValue + 80 * 2, 'nwtButton', this.nwtClick, this, 0, 0, 0);

    var nbButton = game.add.button(initialXValue, initialYValue + 80 * 3, 'nbButton', this.nbClick, this, 0, 0, 0);
    var yukonButton = game.add.button(initialXValue + 96, initialYValue + 80 * 3, 'yukonButton', this.yukonClick, this, 0, 0, 0);
    var bcButton = game.add.button(initialXValue + 96 *2, initialYValue + 80 * 3, 'bcButton', this.bcClick, this, 0, 0, 0);
    var quebecButton = game.add.button(initialXValue + 96 * 3, initialYValue + 80 * 3, 'quebecButton', this.quebecClick, this, 0, 0, 0);


  },

  nunavutClick:function(){
    console.log("Nunavut");
    this.getLevelData("Nunavut");
  },

  ontarioClick:function(){
    console.log("Ontario");
    this.getLevelData("Ontario");
  },
  albertaClick:function(){
    console.log("Alberta");
    this.getLevelData("Alberta");
  },
  saskClick:function(){
    console.log("Saskatchewan");
    this.getLevelData("Saskatchewan");
  },
  manitobaClick:function(){
    console.log("Manitoba");
    this.getLevelData("Manitoba");
  },

  nfldClick:function(){
    console.log("Newfoundland and Labrador");
    this.getLevelData("Newfoundland and Labrador");
  },
  peiClick:function(){
    console.log("Prince Edward Island");
    this.getLevelData("Prince Edward Island");
  },
  nsClick:function(){
    console.log("Nova Scotia");
    this.getLevelData("Nova Scotia");
  },
  nwtClick:function(){
    console.log("Northwest Territories");
    this.getLevelData("Northwest Territories");
  },
  nbClick:function(){
    console.log("New Brunswick");
    this.getLevelData("New Brunswick");
  },
  yukonClick:function(){
    console.log("Yukon");
    this.getLevelData("Yukon");
  },
  bcClick:function(){
    console.log("British Columbia");
    this.getLevelData("British Columbia");
  },
  quebecClick:function(){
    console.log("Quebec");
    this.getLevelData("Quebec");
  },

  getLevelData:function(province){
    $.ajax({
      type:"POST",
      url:"/game/elected",
      data:{
        province:province
      }
    }).done(function(data){
      game.state.start('play', true ,false, data);
    });
  },


}