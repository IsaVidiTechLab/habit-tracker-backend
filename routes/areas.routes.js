const router = require("express").Router();
const Area = require("../models/Areas.model");
const mongoose = require("mongoose");

router.get("/areas/:areaId",(req,res)=>{
    const {areaId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(areaId)){
        res.status(400).send({ message : "Specified id is not valid"});
        return;
    }

    Area.findById(areaId)
    .then((area)=>{
        console.log("Retrived Area ", area);
        res.json(area);
    })
    .catch((err)=>{
        console.error("Error while fetching Area ",err);
        res.status(500).send({ error : "failed to retrived Area"})
    })
})

router.get("/areas",(req,res)=>{
    console.log(req.payload)
    Area.find({ userId: req.payload._id})
        .then((area)=>{
            console.log("Retrived Area", area)
            res.json(area)
        })
        .catch((err)=>{
            console.log("Error while fetching Areas ",err)
            res.status(500).send({ error : "failed to retrived Areas"})
        })
})

router.post("/areas",(req,res)=>{
    const { userId , areaName} = req.body;
    const newArea = { userId , areaName};

    Area.create(newArea)
        .then(()=>{
            res.json(newArea)
        })
        .catch((err)=>{
            console.log("Error while creating Area ",err)
            res.status(500).send({ error : "failed to create Area"})
        })
})



module.exports = router;