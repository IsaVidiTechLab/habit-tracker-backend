const router = require("express").Router();
const Habit = require("../models/Habit.model");
const mongoose = require("mongoose");



//GET all habits
router.get("/habits", (req, res) => {
    console.log(req.payload)
    Habit.find({ userId: req.payload._id })
        .then((habits) => {
            console.log("Retrived Habits", habits)
            res.json(habits)
        })
        .catch((err) => {
            console.log("Error while fetching Habits ", err)
            res.status(500).send({ error: "failed to retrived Habits" })
        })
})

//GET a habit by id
router.get("/habits/:habitId", (req, res) => {
    const { habitId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(habitId)) {
        res.status(400).send({ message: "Specified id is not valid" });
        return
    }

    Habit.findById(habitId)
        .then((habit) => {
            console.log("Retrived Habit ", habit);
            res.json(habit);
        })
        .catch((err) => {
            console.error("Error while fetching Habit ", err);
            res.status(500).send({ error: "failed to retrived Habit" })
        })

});

//POST a habit
router.post("/habits", (req, res) => {
    const { userId, name, description, color, icon, areaId } = req.body;
    const newHabit = { userId, name, description, color, icon, areaId };

    Habit.create(newHabit)
        .then(() => {
            res.json(newHabit)
        })
        .catch((err) => {
            console.log("Error while creating Habit ", err)
            res.status(500).send({ error: "failed to create Habit" })
        })
})

//PUT a habit
router.put("/habits/:habitId", (req, res, next) => {
    const { habitId } = req.params;
    const { userId, name, description, color, icon, areaId } = req.body;
    const newReqBody = { userId, name, description, color, icon, areaId }

    Habit.findByIdAndUpdate(habitId, newReqBody, { new: true })
        .then((updatedHabit) => {
            res.status(200).json(updatedHabit)
        })
        .catch((err) => {
            console.log("Error while updating Habit ", err)
            res.status(500).send({ error: "failed to update Habit" })
        })
})

//DELETE a habit
router.delete("/habits/:habitId", (req, res) => {
    const { habitId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(habitId)) {
        res.status(400).send({ message: "Specified id is not valid" });
        return
    }

    Habit.findByIdAndDelete(habitId)
        .then(() => {
            res.json({ message: "Habit deleted successfully" });
        })
        .catch((err) => {
            console.log("Error while deleting Habit ", err)
            res.status(500).send({ error: "failed to delete Habit" })
        })
})

module.exports = router;