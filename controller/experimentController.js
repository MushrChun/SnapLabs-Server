/**
 * Created by MushrChun on 22/5/17.
 */
var Experiment = require('../model/Experiment');
var ObjectId = require('mongodb').ObjectId;

exports.getAllExperiments = (req, res) => {
    Experiment.find({}, 'labTitle').exec((err, experiments) => {
        if (err) {
            return res.send(err);
        }
        res.json(experiments);
    });
};

exports.getOneExperiment = (req, res) => {
    var title = req.params.title;
    console.log(title)
    Experiment.findOne({labTitle: title}).exec((err, experiments) => {
        if (err) {
            return res.send(err);
        }
        res.json(experiments);
    });
};

exports.putOneExperiment = (req, res) => {
    var content = req.body;
    var newExp = new Experiment(content);
    newExp.save(function(err, result){
        if(err){
            console.log(err);
            res.json({status: 'fail'});
        }else{
            res.json({status: 'success'});
        }
    });
};