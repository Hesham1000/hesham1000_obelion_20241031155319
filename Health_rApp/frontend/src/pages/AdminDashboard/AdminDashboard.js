import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [configurations, setConfigurations] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchAlerts();
    fetchConfigurations();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://Health_rApp-backend.cloud-stacks.com/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get('https://Health_rApp-backend.cloud-stacks.com/api/system-alerts');
      setAlerts(response.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const fetchConfigurations = async () => {
    try {
      const response = await axios.get('https://Health_rApp-backend.cloud-stacks.com/api/configurations');
      setConfigurations(response.data);
    } catch (error) {
      console.error('Error fetching configurations:', error);
    }
  };

  const updateConfiguration = async (key, value) => {
    try {
      await axios.post('https://Health_rApp-backend.cloud-stacks.com/api/configurations', { key, value }, {
        headers: { 'Content-Type': 'application/json' }
      });
      fetchConfigurations();
    } catch (error) {
      console.error('Error updating configuration:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="header">
        <h1>Admin Dashboard</h1>
      </header>
      <div className="content">
        <section className="bookings">
          <h2>Bookings Overview</h2>
          <div className="booking-data">
            {bookings.map(booking => (
              <div key={booking.id}>{booking.details}</div>
            ))}
          </div>
        </section>
        <section className="calendar">
          <h2>Calendar</h2>
          <div className="calendar-view">
            {/* Calendar content */}
          </div>
        </section>
        <section className="system-config">
          <h2>System Configurations</h2>
          <div className="config-options">
            {configurations.map(config => (
              <div key={config.key}>
                {config.key}: {config.value}
                <button onClick={() => updateConfiguration(config.key, config.value)}>Update</button>
              </div>
            ))}
          </div>
        </section>
      </div>
      <aside className="alerts">
        <h2>System Alerts</h2>
        <ul className="alert-list">
          {alerts.map(alert => (
            <li key={alert.id}>{alert.message}</li>
          ))}
        </ul>
      </aside>
      <footer className="footer">
        <button className="manage-access">Manage User Access</button>
        <button className="system-settings">System Settings</button>
      </footer>
    </div>
  );
}

export default AdminDashboard;
