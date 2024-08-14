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

router.put("/areas/:areaId",(req,res,next) => {
    const {areaId} = req.params;
    const {userId, areaName} = req.body;
    const newReqBody = {userId, areaName}

    Area.findByIdAndUpdate (areaId, newReqBody, {new:true})
    .then((updatedArea)=>{
        res.status(200).json(updatedArea)
    })
    .catch((err)=>{
        next(err)
    })
})

router.delete("/areas/:areaId", (req, res, next) => {
    const {areaId} = req.params;

    Area.findByIdAndDelete(areaId)
    .then(()=>{
        console.log("Area Deleted")
        res.status(204).send({ message : "Area Deleted"})
    })
    .catch((err)=>{
        next(err)
    })
})



module.exports = router;