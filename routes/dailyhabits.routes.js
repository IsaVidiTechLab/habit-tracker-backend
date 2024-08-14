const router = require("express").Router();
const DailyHabit = require("../models/DailyHabit.model");
const mongoose = require("mongoose");

//GET all daily habits
router.get("/dailyhabits", (req, res) => {
    console.log(req.payload)
    DailyHabit.find({ userId: req.payload._id })
        .then((dailyhabits) => {
            console.log("Retrived Daily Habits", dailyhabits)
            res.json(dailyhabits)
        })
        .catch((err) => {
            console.log("Error while fetching Daily Habits ", err)
            res.status(500).send({ error: "failed to retrived Daily Habits" })
        })
})

//GET a daily habit by id
router.get("/dailyhabits/:dailyHabitId", (req, res) => {
    const { dailyHabitId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dailyHabitId)) {
        res.status(400).send({ message: "Specified id is not valid" });
        return
    }

    DailyHabit.findById(dailyHabitId)
        .then((dailyHabit) => {
            console.log("Retrived Daily Habit ", dailyHabit);
            res.json(dailyHabit);
        })
        .catch((err) => {
            console.error("Error while fetching Daily Habit ", err);
            res.status(500).send({ error: "failed to retrived Daily Habit" })
        })

});

//POST a daily habit
router.post("/dailyhabits", (req, res) => {
    const { habitId, completion, date } = req.body;
    const newDailyHabit = { habitId, completion, date };

    DailyHabit.create(newDailyHabit)
        .then(() => {
            res.json(newDailyHabit)
        })
        .catch((err) => {
            console.log("Error while creating Daily Habit ", err)
            res.status(500).send({ error: "failed to create Daily Habit" })
        })
})

//PUT a daily habit
router.put("/dailyhabits/:dailyHabitId", (req, res) => {
    const { dailyHabitId } = req.params;
    const { habitId, completion, date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(dailyHabitId)) {
        res.status(400).send({ message: "Specified id is not valid" });
        return
    }

    DailyHabit.findByIdAndUpdate(dailyHabitId, { habitId, completion, date }, { new: true })
        .then((updatedDailyHabit) => {
            res.json(updatedDailyHabit)
        })
        .catch((err) => {
            console.log("Error while updating Daily Habit ", err)
            res.status(500).send({ error: "failed to update Daily Habit" })
        })
})

//DELETE a daily habit
router.delete("/dailyhabits/:dailyHabitId", (req, res) => {
    const { dailyHabitId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(dailyHabitId)) {
        res.status(400).send({ message: "Specified id is not valid" });
        return
    }

    DailyHabit.findByIdAndDelete(dailyHabitId)
        .then(() => {
            res.json({ message: `Daily Habit with id ${dailyHabitId} is deleted` })
        })
        .catch((err) => {
            console.log("Error while deleting Daily Habit ", err)
            res.status(500).send({ error: "failed to delete Daily Habit" })
        })
})

module.exports = router;