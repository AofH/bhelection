$( document ).ready(function() {
  $('#navbar-map').addClass('active');

  var width = 960;
  var height = 700;

  var svg = d3.select("#map")
              .append('svg')
              .attr("width", width)
              .attr("height", height);

  var setupData = function(province){
    $('#province-title').html(province);

    //Convert province to what is in database
    if(province === "Newfoundland  & Labrador"){
      province = "Newfoundland and Labrador";
    } else if (province === "Yukon Territory"){
      province = "Yukon";
    }

    $.ajax({type:"GET",
           url:"/visualization/provincialData",
           data:{province:province}
    }).done(function(data){
      console.log(data.length);
      console.log(data);
    });

  }

  //Draw Map
  d3.json("/data/canadaTopo.json", function(error, canada){
    if (error) return console.error(error);
    //console.log(canada);


    var subUnits = topojson.feature(canada, canada.objects.canada);
    console.log(subUnits);

    var projection = d3.geo.albers()
                           .center([10, 60.4])
                           .rotate([100, 0])
                           .parallels([50, 60])
                           .scale(1000)
                           .translate([width/2, height/2]);

    var path = d3.geo.path()
                     .projection(projection);

    svg.selectAll(".subunits")
       .data(topojson.feature(canada, canada.objects.canada).features)
       .enter()
       .append("path")
       .attr("class", function(d) { return "subunit "+d.properties.name; })
       .attr("d", path)
       .on('click', function(d){ 
        console.log(d.properties.name);
        setupData(d.properties.name);
       });

  });



});