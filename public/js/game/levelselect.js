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
    this.getLevelData("Nunavut");
  },

  ontarioClick:function(){
    this.getLevelData("Ontario");
  },
  albertaClick:function(){
    this.getLevelData("Alberta");
  },
  saskClick:function(){
    this.getLevelData("Saskatchewan");
  },
  manitobaClick:function(){
    this.getLevelData("Manitoba");
  },

  nfldClick:function(){
    this.getLevelData("Newfoundland and Labrador");
  },
  peiClick:function(){
    this.getLevelData("Prince Edward Island");
  },
  nsClick:function(){
    this.getLevelData("Nova Scotia");
  },
  nwtClick:function(){
    this.getLevelData("Northwest Territories");
  },
  nbClick:function(){
    this.getLevelData("New Brunswick");
  },
  yukonClick:function(){
    this.getLevelData("Yukon");
  },
  bcClick:function(){
    this.getLevelData("British Columbia");
  },
  quebecClick:function(){
    this.getLevelData("Quebec");
  },

  getLevelData:function(province){
    $.ajax({
      type:"GET",
      url:"/game/elected/"+province
    }).done(function(data){
      game.state.start('play', true ,false, data);
    });
  },


}