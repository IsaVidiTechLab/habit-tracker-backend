const {Schema, model} = require('mongoose');

const dailyHabitSchema = new Schema({
   habitId: {
       type: Schema.Types.ObjectId,
       ref: 'Habit',
       required: [true, 'Habit is required.']
   },
   completion: {
         type: Boolean,
         default: false
    },
    date: {
        type: Date,
        required: [true, 'Date is required.']
    },
})

const DailyHabit = model('DailyHabit', dailyHabitSchema);
module.exports = DailyHabit;