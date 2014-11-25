$( document ).ready(function() {
  $('#navbar-map').addClass('active');

  var width = 960;
  var height = 700;

  var svg = d3.select("#map")
              .append('svg')
              .attr("width", width)
              .attr("height", height);

  var currentGroup = 0;
  var maxGroup = 0;


  var setupData = function(province){
    $('#province-title').html(province);

    //Convert province to what is in database
    if(province === "Newfoundland  & Labrador"){
      province = "Newfoundland and Labrador";
    } else if (province === "Yukon Territory"){
      province = "Yukon";
    }

    $.ajax({type:"GET",
            url:"/election/maxGroup",
            data:{province:province}
    }).done(function(data){
      maxGroup = data.parliment;
      currentGroup = data.parliment;
      console.log(data.parliment);

      $('#parliament-group-prev-button').html("<button id=\"prev-button\">Prev</button>");
      $('#parliament-group-title').html("Parliamentary Group "+currentGroup);
      $('#parliament-group-next-button').html("<button id=\"next-button\">Next</button>");

      setButtons();
      loadElectionData(province, currentGroup);

      $("#next-button").click(function(){
        currentGroup++;
        console.log(currentGroup);
        setButtons();
        loadElectionData(province,currentGroup);
      });

      $("#prev-button").click(function(){
        currentGroup--;
        console.log(currentGroup);
        setButtons();
        loadElectionData(province,currentGroup);
      });
    })

    /*
    $.ajax({type:"GET",
           url:"/visualization/provincialData",
           data:{province:province}
    }).done(function(data){

    });*/

  }

  var setButtons = function(){
    $('#parliament-group-title').html("Parliamentary Group "+currentGroup);
    if(currentGroup === maxGroup){
      $("#next-button").prop('disabled', true);
    } else {
      $("#next-button").prop('disabled', false);
    }

    if(currentGroup === 1){
      $("#prev-button").prop('disabled', true);
    } else {
      $("#prev-button").prop('disabled', false);
    }
  }

  var createTable = function(data){
    var table= "<table><thead><tr><th>Riding</th><th>Last Name</th><th>First Name</th><th>Party</th><th>Votes</th><th>Votes (%)</th></tr></thead>";
    table += "\n<tbody>\n";

    for(var i = 0; i < data.length; i++){
      table += "<tr>\n";
      table += "<td>"+data[i].riding+"</td>\n";
      table += "<td>"+data[i].lastname+"</td>\n";
      table += "<td>"+data[i].firstname+"</td>\n";
      table += "<td>"+data[i].party+"</td>\n";
      table += "<td>"+data[i].votes+"</td>\n";
      table += "<td>"+data[i].percentage+"</td>\n";
      table += "</tr>\n";
    }

    table += "</tbody></table>\n"
    return table;
  }

  var loadElectionData = function(province, group){
    $("#next-button").prop('disabled', true);
    $("#prev-button").prop('disabled', true);


    $.ajax({type:"POST",
            url:'/election/groupData',
            data:{province:province, parliament:group}
    }).done(function(data){
      

      var generalElectionData = data.filter(function(d){
        return d.type === "Gen";
      });
      
      var byelectionData = data.filter(function(d){
        return d.type === "B/P";
      });
      if(generalElectionData.length !== 0){
        var genElectionDate = new Date(generalElectionData[0].date);
        $("#parliament-title").html("General Election on " + genElectionDate.format('M jS, Y'));
        $("#parliament-table").html(createTable(generalElectionData));
      } else {
        $("#parliament-title").html("No General Elections Happened");
        $("#parliament-table").html("");
      }

      if(byelectionData.length !== 0){
        var byElectionDate = new Date(byelectionData[0].date);
        $("#by-election-title").html("By-Election on " + byElectionDate.format('M jS, Y'));
        $("#by-election-table").html(createTable(byelectionData));
      } else {
        $("#by-election-title").html("No By-Elections Happened");
        $("#by-election-table").html("");
      }

      $("#")
      setButtons();
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