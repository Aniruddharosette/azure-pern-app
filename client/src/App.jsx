import { useState, useEffect } from 'react'

function App() {
  const [time, setTime] = useState('Loading...');

  // 1. Get the Base URL (Localhost locally, Azure Domain in Prod)
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    // 2. We append the specific endpoint path here
    fetch(`${API_BASE}/api/time`) 
      .then(res => res.json())
      .then(data => setTime(data.time))
      .catch(err => {
        console.error(err);
        setTime('Error fetching data');
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>PERN Stack on Azure</h1>
      <p>Database Time: <strong>{time}</strong></p>
      <small>Connected to: {API_BASE}</small>
    </div>
  )
}

export default App