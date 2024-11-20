import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';


function App() {
  const [count, setCount] = useState(0);
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    axios.get('https://esp-8266-server.vercel.app/getattendance')
      .then(response =>{ console.log(response.data); setAttendance(response.data);})
      .catch(error => console.error(error));
  },[]);

  return (
    <>
      <div>
      </div>
      <h1>Attendance</h1>
      <div className="card">
        {attendance.map((record, index) => (
          <div key={index} className=''>
            <p>Name: {record?.name}</p>
            <p>Time: {record?.time}</p>
          </div>
        ))}
      </div>
      <p className="read-the-docs">
        Made with ❤️ by{' Raj Fahim Alok Agnib '}
      </p>
    </>
  )
}

export default App
