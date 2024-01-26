import React, { useState, useEffect } from 'react';

function Locker() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await fetch('/api/time/current_time');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurrentTime(data.current_time);
      } catch (error) {
        console.error('Error fetching current time:', error);
      }
    };

    fetchCurrentTime();
  }, []);

  return (
    <div>
      <h1>Locker App</h1>
      <p>Current Time: {currentTime}</p>
      {/* Autres contenus du locker */}
    </div>
  );
}

export default Locker;
