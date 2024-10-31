import React, { useState, useEffect } from 'react';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const [providers, setProviders] = useState([]);
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const response = await fetch('https://Health_rApp-backend.cloud-stacks.com/api/providers');
      const data = await response.json();
      setProviders(data);
    } catch (error) {
      setError('Failed to fetch providers');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://Health_rApp-backend.cloud-stacks.com/api/providers?specialty=${specialty}&location=${location}`);
      const data = await response.json();
      setProviders(data);
    } catch (error) {
      setError('Failed to search providers');
    }
  };

  const handleProviderSelection = async (provider) => {
    setSelectedProvider(provider);
    try {
      const response = await fetch(`https://Health_rApp-backend.cloud-stacks.com/api/providers/${provider.id}/slots`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      setError('Failed to fetch appointments');
    }
  };

  const handleAppointmentBooking = async () => {
    try {
      const response = await fetch('https://Health_rApp-backend.cloud-stacks.com/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providerId: selectedProvider.id,
          slot: selectedTime,
        }),
      });

      if (response.ok) {
        await fetch('https://Health_rApp-backend.cloud-stacks.com/api/notifications/appointment-booked', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: 'user@example.com', // replace with actual user email
            appointmentDetails: {
              provider: selectedProvider.name,
              time: selectedTime,
            },
          }),
        });

        setSelectedTime('');
        alert('Appointment booked successfully!');
      } else {
        throw new Error('Failed to book appointment');
      }
    } catch (error) {
      setError('Failed to book appointment');
    }
  };

  return (
    <div className="patient-dashboard">
      {error && <p className="error">{error}</p>}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by specialty"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="providers-list">
        {providers.map(provider => (
          <div key={provider.id} onClick={() => handleProviderSelection(provider)}>
            <h3>{provider.name}</h3>
            <p>{provider.specialty}</p>
            <p>{provider.location}</p>
          </div>
        ))}
      </div>
      {selectedProvider && (
        <div className="appointment-section">
          <h2>Available Appointments for {selectedProvider.name}</h2>
          {appointments.map(appointment => (
            <div key={appointment.id}>
              <p>{appointment.time}</p>
              <button onClick={() => setSelectedTime(appointment.time)}>Select</button>
            </div>
          ))}
          {selectedTime && (
            <button onClick={handleAppointmentBooking}>Book Appointment</button>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
