import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// Define the TypeScript interface for the attendance record
interface AttendanceRecord {
  name: string;
  time: string;
}

function App() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    axios
      .get<AttendanceRecord[]>('https://esp-8266-server.vercel.app/getattendance')
      .then(response => {
        console.log(response.data);
        setAttendance(response.data);
      })
      .catch(error => console.error('Error fetching attendance:', error));
  }, []);

  return (
    <>
      <h1>Attendance</h1>
      <div className="card">
        {attendance.length > 0 ? (
          attendance.map((record, index) => (
            <div key={index} className="attendance-record">
              <p><strong>Name:</strong> {record.name}</p>
              <p><strong>Time:</strong> {record.time}</p>
            </div>
          ))
        ) : (
          <p>No attendance records found.</p>
        )}
      </div>
      <p className="read-the-docs">
        Made with ❤️ by <strong>Raj Fahim Alok Agnib</strong>
      </p>
    </>
  );
}

export default App;
