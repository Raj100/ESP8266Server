const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;