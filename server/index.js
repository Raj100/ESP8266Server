const express= require('express');
const app = express();
const mongoose = require('mongoose');
const Attendance = require('./models/attendanceSchema');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cors = require('cors');

const url = process.env.url

app.use(express.json());
app.use(cors());

mongoose.connect(url).then((ans) => {
    console.log("Connected Successful to the Database")
  }).catch((err) => {
    console.log("Error in the Connection")
  });

app.put('/submitattendance', (req, res) => {
    const newAttendance = new Attendance({
        name: req.body.name,
        time: req.body.time
    });

    newAttendance.save()
        .then(() => {
            console.log('Attendance saved successfully');
        })
        .catch((err) => {
            console.error('Error saving attendance:', err);
        });
  console.log(req.body);
  res.send('Attendance submitted successfully');
});

app.get('/getattendance', (req, res) => {
    Attendance.find()
        .then((attendance) => {
            res.json(attendance);
        })
        .catch((err) => {
            console.error('Error fetching attendance:', err);
            res.status(500).send('Error fetching attendance');
        });
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});