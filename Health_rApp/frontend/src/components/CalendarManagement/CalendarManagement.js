import React, { useState, useEffect } from 'react';
import './CalendarManagement.css';
import axios from 'axios';

const CalendarManagement = () => {
  const [availability, setAvailability] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get('https://Health_rApp-backend.cloud-stacks.com/api/doctor/availability');
        setAvailability(response.data.availability);
      } catch (error) {
        console.error('Failed to fetch availability');
      }
    };

    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://Health_rApp-backend.cloud-stacks.com/api/notifications');
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Failed to fetch notifications');
      }
    };

    fetchAvailability();
    fetchNotifications();
  }, []);

  const handleAvailabilityChange = (day, time, isAvailable) => {
    setAvailability((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((slot) => slot.day === day && slot.time === time);
      if (index !== -1) {
        updated[index].isAvailable = isAvailable;
      } else {
        updated.push({ day, time, isAvailable });
      }
      return updated;
    });
  };

  const handleNotification = async (notification) => {
    try {
      await axios.post('https://Health_rApp-backend.cloud-stacks.com/api/notifications', { notification });
      setNotifications((prev) => [...prev, notification]);
    } catch (error) {
      console.error('Failed to create notification');
    }
  };

  const updateCalendar = async () => {
    try {
      await axios.put('https://Health_rApp-backend.cloud-stacks.com/api/doctor/availability', { availability });
    } catch (error) {
      console.error('Failed to update calendar');
    }
  };

  return (
    <div className="calendar-management">
      <div className="availability-section">
        <h2>Set Availability</h2>
        <div className="availability-grid">
          {/* Render availability grid with controls */}
        </div>
      </div>
      <div className="notifications-section">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
      <button onClick={updateCalendar}>Update Calendar</button>
    </div>
  );
};

export default CalendarManagement;
