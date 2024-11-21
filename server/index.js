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


  async function connectToDatabase() {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 50000, // Increased timeout
      });
      console.log("✅ Connected successfully to the database!");
    } catch (err) {
      console.error("❌ Error connecting to the database:", err.message);
      process.exit(1); // Exit the process if the connection fails
    }
  }
  
  // Connect to the database
  connectToDatabase();

app.get('/',(req,res)=>{
res.send("ok!");
});

app.put('/submitattendance', (req, res) => {
    const newAttendance = new Attendance({
        name: "Raj",
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