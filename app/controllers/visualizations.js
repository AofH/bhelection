var mongoose = require('mongoose');
var Election = mongoose.model('Election');


exports.index = function (req, res){
  res.render('visualizations/index',{
    title: 'Parliamentary Elections'
  });
}   

exports.map = function (req, res){
  res.render('visualizations/map', {
    title: 'Election Map'
  });
}

exports.entrantsByGroup = function(req, res){
  var entrantType = req.query.entrantType;
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

  //Todo: change the error return later
  Election.groupBy(options, function (err, results){
    if (err) return res.render('500'); 
    res.json(results);
  });   
}

exports.occupationOfEntrants = function(req, res){

  var limit = 10;
  
  if(Object.keys(req.query).length > 0 ){
    limit = JSON.parse(req.query.limit);
  } 
  
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

  //Todo: change the error return later
  Election.groupBy(options, function (err, results){
    if(err) {
      console.log(err);
       return res.render('500');
    }
    res.json(results);
  });
}

exports.provincialElectionData = function(req, res){
  var province = req.query.province;
  //province = "Ontario";
  var options = {criteria: {province:province}};
  //Todo: change the error return later
  Election.list(options, function(err, results){
    if(err){
      console.log(err);
      return res.render('500');
    }
    res.json(results);
  });
}
