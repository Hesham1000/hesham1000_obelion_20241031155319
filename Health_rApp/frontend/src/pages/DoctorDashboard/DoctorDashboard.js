import React, { useState, useEffect } from 'react';
import './DoctorDashboard.css';
import axios from 'axios';

const DoctorDashboard = () => {
  const [availability, setAvailability] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get('https://Health_rApp-backend.cloud-stacks.com/api/doctor/availability');
        setAvailability(response.data);
      } catch (error) {
        console.error('Failed to fetch availability', error);
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://Health_rApp-backend.cloud-stacks.com/api/notifications');
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    fetchAvailability();
    fetchNotifications();
  }, []);

  const handleAvailabilityChange = async (newAvailability) => {
    try {
      const response = await axios.post('https://Health_rApp-backend.cloud-stacks.com/api/doctor/availability', newAvailability, {
        headers: { 'Content-Type': 'application/json' },
      });
      setAvailability(response.data);
    } catch (error) {
      console.error('Failed to update availability', error);
    }
  };

  const handleNotification = async (notification) => {
    try {
      const response = await axios.post('https://Health_rApp-backend.cloud-stacks.com/api/notifications', { notification }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setNotifications((prevNotifications) => [...prevNotifications, response.data.notification]);
    } catch (error) {
      console.error('Failed to create notification', error);
    }
  };

  return (
    <div className="doctor-dashboard">
      <header>
        <h1>Doctor Dashboard</h1>
      </header>
      <section className="calendar-management">
        <h2>Manage Your Calendar</h2>
        <div className="availability">
          <h3>Set Availability</h3>
          <button onClick={() => handleAvailabilityChange(/* new availability data */)}>
            Update Availability
          </button>
        </div>
        <div className="appointment-preferences">
          <h3>Preferred Appointment Times</h3>
          {/* UI elements for setting preferred times */}
        </div>
      </section>
      <section className="notifications">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default DoctorDashboard;
