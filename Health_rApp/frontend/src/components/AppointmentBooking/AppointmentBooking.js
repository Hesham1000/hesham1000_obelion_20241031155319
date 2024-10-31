import React, { useState, useEffect } from 'react';
import './AppointmentBooking.css';
import axios from 'axios';

function AppointmentBooking() {
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (selectedProvider) {
      fetchAvailableSlots(selectedProvider.id);
    }
  }, [selectedProvider]);

  const searchProviders = async () => {
    try {
      const response = await axios.get('https://Health_rApp-backend.cloud-stacks.com/api/providers', {
        params: { specialty, location },
      });
      setProviders(response.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  const fetchAvailableSlots = async (providerId) => {
    try {
      const response = await axios.get(`https://Health_rApp-backend.cloud-stacks.com/api/providers/${providerId}/slots`);
      setAvailableSlots(response.data);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const bookAppointment = async () => {
    try {
      const response = await axios.post('https://Health_rApp-backend.cloud-stacks.com/api/appointments', {
        providerId: selectedProvider.id,
        slot: selectedSlot.time,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setReminders([...reminders, selectedSlot]);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="appointment-booking">
      <div className="search-section">
        <input
          type="text"
          placeholder="Specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={searchProviders}>Search</button>
      </div>
      <div className="provider-list">
        {providers.map((provider) => (
          <div
            key={provider.id}
            onClick={() => setSelectedProvider(provider)}
            className={selectedProvider === provider ? 'selected' : ''}
          >
            {provider.name}
          </div>
        ))}
      </div>
      {selectedProvider && (
        <div className="appointment-slots">
          {availableSlots.map((slot) => (
            <div
              key={slot.id}
              onClick={() => setSelectedSlot(slot)}
              className={selectedSlot === slot ? 'selected' : ''}
            >
              {slot.time}
            </div>
          ))}
        </div>
      )}
      {selectedSlot && (
        <button onClick={bookAppointment}>Book Appointment</button>
      )}
      <div className="reminders">
        {reminders.map((reminder, index) => (
          <div key={index}>{reminder.time}</div>
        ))}
      </div>
    </div>
  );
}

export default AppointmentBooking;
