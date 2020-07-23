const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const opts = {toJSON: {virtuals: true}};

const workoutSchema = new Schema ({
    day: {
        type: Date,
        default: Date.now()
    },
    exercises: [
        {
            type: {
                type: String,
                trim: true, 
                required: 'Enter an exercise type'
            },
            name: {
                type: String,
                trime: true,
                required: "Enter an exercise name"
            },
            duration: {
                type: Number,
                required: 'Please enter a duration in minutes'
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }
    ]
}, opts);

const Workout = mongoose.model('Workout', workoutSchema);

// Addition of a virtual property which is not stored in MongoDB to hold the total exercise duration
workoutSchema.virtual('totalDuration').get(function (){
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
})

module.exports = Workout;