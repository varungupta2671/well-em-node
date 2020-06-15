var express=require('express');
var router=express.Router();
var patients=require('../models/patients');

router.post('/',function(req,res,next){
    const prod=new patients({
        hid:req.body.hid,
        aadharid:req.body.aadharid,
        name:req.body.name,
        age:req.body.age,
        bg:req.body.bg,
        weight:req.body.weight,
        height:req.body.height,
        dob:req.body.dob,
        sex:req.body.sex,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address,
        city:req.body.city
    });
    prod.save(function(err,result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

router.get('/',function(req,res,next){
    patients.find(function(err,docs){
        if(err){
            res.json(err);
        }
        else{
            res.json(docs);
        }
    });
});

router.delete('/:hid',function(req,res,next){
    patients.deleteOne({hid:req.params.hid},function(err,result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

module.exports=router;