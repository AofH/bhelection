var mongoose = require('mongoose');
var Election = mongoose.model('Election');

function sendError(res, statusCode, msg){
  res.statusCode = 404;
  res.send(msg);
}

function validProvince(province){
  var validProvinces = ["Ontario", "Nova Scotia", "Nunavut", "Alberta",
                        "Saskatchewan", "Manitoba", "Newfoundland and Labrador",
                        "Prince Edward Island", "Northwest Territories",
                        "New Brunswick", "Yukon", "British Columbia", "Quebec"];

  if(validProvinces.indexOf(province) === -1){
    return false;
  }
  return true;
}

exports.entrantsByGroup = function(req, res){
  if(req.params.type !== "Gen" && req.params.type !== "B/P"){
    sendError(res, 404, "Error: Invalid Election group type");
  }

  var entrantType = req.params.type;
  
  var options = {groupFunctions: [
    {$match: {
      type:entrantType
    }},
    {$group: {
      _id:{ parliment:'$parliment' },
      total:{$sum:1}
    }},
    {$project:{
      parliament:"$_id.parliment",
      total: true,
      _id:false
    }},
    {$sort:{
      parliament:1
    }},
  ]};

  Election.groupBy(options, function (err, results){
    if (err) return sendError(res, "500", "Error: Database had a problem querying"); 
    res.json(results);
  });   
}

exports.occupationOfEntrants = function(req, res){

  if(req.params.num < 0) {
    sendError(res, 404, "Error: Invalid limit entered");
  }
   
  limit = JSON.parse(req.params.num); 
  
  var options = {groupFunctions: [
    {$match:{
      occupation: {$ne: ""}
    }},
    {$group: {
      _id:{ occupation:"$occupation"},
      total:{$sum:1}
    }},
    {$project: {
      occupation:"$_id.occupation",
      total:true,
      _id:false
    }},
    {$match:{
      total: {$gt : 1}
    }},
    {$sort:{
      total:-1
    }},
    {$limit:limit }
  ]};

  Election.groupBy(options, function (err, results){
    if(err) { return sendError(res, 500, "Error: Database had a problem querying"); }
    res.json(results);
  });
}

/*
exports.provincialElectionData = function(req, res){
  var validProvinces = ["Ontario", "Nova Scotia", "Nunavut", "Alberta",
                        "Saskatchewan", "Manitoba", "Newfoundland and Labrador",
                        "Prince Edward Island", "Northwest Territories",
                        "New Brunswick", "Yukon", "British Columbia", "Quebec"];

  if(validProvinces.indexOf(req.params.province) === -1){
    sendError(res, 404, "Error: Invalid Province entered");
  }
  var province = req.params.province;
  var options = {criteria: {province:province}};
  
  Election.list(options, function(err, results){
    if(err){ return sendError(res, 500, "Error: Database had a problem querying"); }
    res.json(results);
  });
} */


exports.totalVotesByGroup = function(req, res){
  if(!validProvinces(req.params.province)){
    sendError(res, 404, "Error: Invalid Province entered");
  }
  var province = req.params.province;
  
  var options = { groupFunctions:[
    {$match:{
      province:province
    }},
    {$group:{
      _id:{ province: "$province", parliament:"$parliment"},
      totalVotes:{$sum:"$votes"}
    }},
    {$project:{
      province:"$_id.province",
      parliament: "$_id.parliament",
      totalVotes:true,
      _id:false
    }},
    {$sort:{
      parliament:1
    }},
  ]};

  Election.groupBy(options, function (err, results){
    if(err) { return sendError(res, 404, "Error: Database had a problem querying"); }
    res.json(results);
  });
}

exports.electedByProvince = function(req,res){
  if(!validProvinces(req.params.province)){
    sendError(res, 404, "Error: Invalid Province entered");
  }                        
  var province = req.params.province;
  
  var options = { groupFunctions:[
    {$match:{
      province:province,
      elected:1,
      type:"Gen",
      votes:{$ne:"accl."}
    }},
    {$sort:{
      votes:-1
    }},
    {$limit: 20}
  ]};

  Election.groupBy(options, function(err, results){
    if(err){ return sendError(res, 404, "Error: Database had a problem querying"); }
    res.json(results);
  });
}

exports.parties = function(req, res){
  var options = { groupFunctions:[
    {$group:{
      _id:{party:"$party"},
      total:{$sum: 1}
    }},
    {$project:{
      party:"$_id.party",
      total:true,
      _id:false
    }},
    {$match:{
      total: {$gt : 99}
    }},
    {$sort:{
      total:-1
    }}
  ]};

  Election.groupBy(options, function(err,results){
    if(err){ return sendError(res, 404, "Error: Database had a problem querying"); }
    res.json(results);
  }); 
}

exports.electedOfficialsByParties = function(req, res){
  var options = { groupFunctions:[
    {$match:{
      elected:1
    }},
    {$group:{
      _id:{party:"$party"},
      total:{$sum: 1}
    }},
    {$project:{
      party:"$_id.party",
      total:true,
      _id:false
    }},
    /*{$match:{
      total: {$gt : 99}
    }},*/
    {$sort:{
      total:-1
    }}
  ]};

  Election.groupBy(options, function(err, results){
    if(err){ return sendError(res, 404, "Error: Database had a problem querying"); }
    res.json(results);
  });
}

exports.getGroupDataByProvince = function(req, res){
  if(!validProvince(req.params.province)){
    sendError(res, 404, "Error: Invalid Province entered");
  }

  if(req.params.parliament < 0){
    sendError(res, 404, "Error: Invalid Parliament Group Entered");
  }

  var province = req.params.province;
  var parliament = JSON.parse(req.params.group);
  
  var options = { groupFunctions:[
    {$match:{
      province:province, 
      parliment: parliament
    }},
    {$sort:{
      type: -1,
      riding: -1,
      date: -1
    }}, 
  ]};

  Election.groupBy(options, function(err, results){
    if(err) { return sendError(res, 404, "Error: Database had a problem querying"); }
    res.json(results);
  });
}

//TODO change the error responding statement
exports.maxGroup = function(req, res){
  
  if(!validProvince(req.params.province)){
    sendError(res, 404, "Error: Invalid Province entered");
  }

  var province = req.params.province;
  var options = {province:province};
  Election.findMaxGroup(options, function(err, maxGroup){
    if(err){ return sendError(res, 404, "Error: Database had a problem querying"); }
    res.json(maxGroup);
  });
}
