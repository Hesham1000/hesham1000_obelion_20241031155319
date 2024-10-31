import React, { useState, useEffect } from 'react';
import './SystemAdmin.css';

function SystemAdmin() {
  const [bookings, setBookings] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [configurations, setConfigurations] = useState({});

  useEffect(() => {
    fetch('https://Health_rApp-backend.cloud-stacks.com/api/bookings')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(() => {});

    fetch('https://Health_rApp-backend.cloud-stacks.com/api/system-alerts')
      .then(response => response.json())
      .then(data => setSystemAlerts(data))
      .catch(() => {});

    fetch('https://Health_rApp-backend.cloud-stacks.com/api/configurations')
      .then(response => response.json())
      .then(data => setConfigurations(data))
      .catch(() => {});
  }, []);

  const handleConfigChange = (key, value) => {
    setConfigurations(prev => ({ ...prev, [key]: value }));
    fetch('https://Health_rApp-backend.cloud-stacks.com/api/configurations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    })
      .then(response => response.json())
      .catch(() => {});
  };

  return (
    <div className="system-admin">
      <section className="bookings-overview">
        <h2>Bookings Overview</h2>
        <ul>
          {bookings.map(booking => (
            <li key={booking.id}>{booking.details}</li>
          ))}
        </ul>
      </section>
      <section className="system-configurations">
        <h2>System Configurations</h2>
        <div>
          <label htmlFor="userAccess">User Access</label>
          <input
            type="text"
            id="userAccess"
            value={configurations.userAccess || ''}
            onChange={e => handleConfigChange('userAccess', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="systemSettings">System Settings</label>
          <input
            type="text"
            id="systemSettings"
            value={configurations.systemSettings || ''}
            onChange={e => handleConfigChange('systemSettings', e.target.value)}
          />
        </div>
      </section>
      <section className="system-alerts">
        <h2>System Alerts</h2>
        <ul>
          {systemAlerts.map(alert => (
            <li key={alert.id}>{alert.message}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default SystemAdmin;
