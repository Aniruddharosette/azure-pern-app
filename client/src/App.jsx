import { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState('Loading...');
  const [students, setStudents] = useState([]);
  const [studentError, setStudentError] = useState('');

  // Base URL (Local or Azure)
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    // ---- Fetch Server Time ----
    fetch(`${API_BASE}/api/time`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setTime(data.time))
      .catch(err => {
        console.error('Time fetch error:', err);
        setTime('Error fetching time');
      });

    // ---- Fetch Students ----
    fetch(`${API_BASE}/api/students`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setStudents(data.students))
      .catch(err => {
        console.error('Students fetch error:', err);
        setStudentError('Error fetching students');
      });

  }, [API_BASE]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>PERN Stack on Azure</h1>

      <p>
        Database Time: <strong>{time}</strong>
      </p>

      <hr />

      {/* Students Section */}
      <h2>Students</h2>

      {studentError && <p style={{ color: 'red' }}>{studentError}</p>}

      {students.length === 0 && !studentError ? (
        <p>Loading students...</p>
      ) : (
        <ul>
          {students.map(student => (
            <li key={student.id}>
              {student.id} — {student.name}
            </li>
          ))}
        </ul>
      )}

      <hr />

      <p>
        <small>Backend URL: {API_BASE}</small>
      </p>
    </div>
  );
}

export default App;
