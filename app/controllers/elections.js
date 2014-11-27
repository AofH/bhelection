var mongoose = require('mongoose');
var Election = mongoose.model('Election');

exports.index = function (req, res){
  res.render('elections/index', {
    title: "BitHound Election Challenge"
  });
}

exports.randomStuff = function(req, res){
  res.render('elections/randomStuff',{
    title: "Random Stuff"
  });
}

exports.general = function (req, res){
  res.render('visualizations/index',{
    title: 'Parliamentary Elections'
  });
}   

exports.map = function (req, res){
  res.render('visualizations/map', {
    title: 'Election Map'
  });
}

