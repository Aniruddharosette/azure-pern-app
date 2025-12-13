import { useState, useEffect } from 'react'

function App() {
  const [time, setTime] = useState('Loading...');

  // REPLACE THIS URL LATER with your actual Azure Backend URL
  // For local dev, it might be http://localhost:3000/api/time
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/time";

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTime(data.time))
      .catch(err => setTime('Error fetching data'));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>PERN Stack on Azure</h1>
      <p>Database Time: <strong>{time}</strong></p>
    </div>
  )
}

export default App