const {Schema, model} = require('mongoose');

const habitSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    description: {
        type: String,
    },
    color: {
        type: String,
        required: [true, 'Color is required.']
    },
    icon: {
        type: String
    },
    complete: {
        type: Boolean,
        default: false
    },
    areaId:{
        type: Schema.Types.ObjectId,
        ref: 'Areas',
        required: [true, 'Area is required.']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required.']
    }
})

const Habit = model('Habit', habitSchema);
module.exports = Habit;