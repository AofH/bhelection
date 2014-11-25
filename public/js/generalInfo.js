$( document ).ready(function() {
  console.log("Loaded");

   $('#navbar-general').addClass('active');


  var createSVG = function(selector, width, height, margins) {
    return d3.select(selector)
             .append('svg')
             .attr("width", width + margins.left + margins.right)
             .attr("height", height + margins.top + margins.bottom)
             .append("g")
             .attr("transform", "translate("+margins.left+","+margins.right+")");
  }

  var createAxis = function(scale, orientation){
    return d3.svg.axis()
                 .scale(scale)
                 .orient(orientation);
  }

  var createGraph = function(data, selector, width, height, margins, barPadding ){
    var generalGroupSVG = createSVG(selector, width, height, margins);

    var xScale = d3.scale.linear()
                         .domain([1, d3.max(data,function(d){return d.parliament; })])
                         .range([1, width - barPadding * 2]);

    var yScale = d3.scale.linear()
                         .domain([0, d3.max(data, function(d){ return d.total; })])
                         .range([height, 0]);

    var xAxis = createAxis(xScale, "bottom");
          
    generalGroupSVG.append("g")
                   .attr("class", "x axis")
                   .attr("transform", "translate(7,"+ (height - barPadding) +")")
                   .call(xAxis);

    var yAxis = createAxis(yScale, "left"); 
                
    generalGroupSVG.append("g")
                   .attr("class", "y axis")
                   .attr("transform", "translate(-5,-8)")
                   .call(yAxis);

    generalGroupSVG.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .style("fill", "steelblue")
      .attr("x", function (d){
        return xScale(d.parliament);
      })
      .attr("width", width / data.length - barPadding)
      .attr("y", function (d){
        return yScale(d.total) - 10;    
      })
      .attr("height",function (d){
        return height - yScale(d.total);
      })
      .append("svg:title")
      .text(function(d){ return d.total });

    $("svg").css("display", "block");
    $("svg").css("margin", "0 auto");
  }

  $.ajax({type:"GET",
          url:"/visualization/entrantsByGroup",
          data: {entrantType: "Gen"},
  }).done(function(data){
    //console.log(data);

    var margin = {left: 40, right:40, top:40, bottom: 40}
    var w = 1000 - margin.left - margin.right;
    var h = 300 - margin.top - margin.bottom;
    var barPadding = 8;

    createGraph(data, "#general-entrants-by-group", w ,h, margin, barPadding);
    
  });


  $.ajax({type:"GET",
          url:"/visualization/entrantsByGroup",
          data: {entrantType: "B/P"},
  }).done(function(data){

    var margin = {left: 40, right:40, top:40, bottom: 40}
    var w = 1000 - margin.left - margin.right;
    var h = 300 - margin.top - margin.bottom;
    var barPadding = 8;

    createGraph(data, "#byelection-entrants-by-group", w, h ,margin, barPadding);
  });


});
