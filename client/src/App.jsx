import { useState, useEffect } from 'react'

function App() {
  const [time, setTime] = useState('Loading...');

  // 1. Get the Base URL.
  // Local: http://localhost:3000
  // Azure: https://cicdbackend-g5bxgkfbejcxg0bj.australiacentral-01.azurewebsites.net
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    console.log("Fetching from:", `${API_BASE}/api/time`); // Helps debugging

    // 2. Append '/api/time' to the base URL
    fetch(`${API_BASE}/api/time`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setTime(data.time))
      .catch(err => {
        console.error("Fetch error:", err);
        setTime('Error fetching data. Check Console (F12).');
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>PERN Stack on Azure</h1>
      <p>Database Time: <strong>{time}</strong></p>
      <hr />
      <p><small>Backend URL: {API_BASE}</small></p>
    </div>
  )
}

export default App