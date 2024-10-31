import React, { useState, useEffect } from 'react';
import './SearchProvider.css';

const SearchProvider = () => {
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [appointmentSlots, setAppointmentSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    if (selectedProvider) {
      fetch(`https://Health_rApp-backend.cloud-stacks.com/api/providers/${selectedProvider}/slots`)
        .then(response => response.json())
        .then(data => setAppointmentSlots(data))
        .catch(error => alert('Error fetching appointment slots'));
    }
  }, [selectedProvider]);

  const searchProviders = () => {
    fetch(`https://Health_rApp-backend.cloud-stacks.com/api/providers?specialty=${specialty}&location=${location}`)
      .then(response => response.json())
      .then(data => setProviders(data))
      .catch(error => alert('Error searching for providers'));
  };

  const bookAppointment = () => {
    if (selectedSlot) {
      fetch(`https://Health_rApp-backend.cloud-stacks.com/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerId: selectedProvider, slot: selectedSlot })
      })
        .then(response => response.json())
        .then(data => {
          alert('Appointment booked successfully!');
          fetch('https://Health_rApp-backend.cloud-stacks.com/api/notifications/appointment-booked', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userEmail: 'user@example.com', appointmentDetails: data })
          }).catch(error => alert('Error sending notification'));
        })
        .catch(error => alert('Error booking appointment'));
    }
  };

  return (
    <div className="search-provider">
      <div className="search-criteria">
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
        {providers.map(provider => (
          <div key={provider.id} onClick={() => setSelectedProvider(provider.id)}>
            {provider.name}
          </div>
        ))}
      </div>
      {selectedProvider && (
        <div className="appointment-slots">
          {appointmentSlots.map(slot => (
            <div key={slot} onClick={() => setSelectedSlot(slot)}>
              {slot}
            </div>
          ))}
          <button onClick={bookAppointment}>Book Appointment</button>
        </div>
      )}
    </div>
  );
};

export default SearchProvider;
