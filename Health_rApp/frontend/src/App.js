import React from 'react';
import SearchProvider from './components/SearchProvider';
import AppointmentBooking from './components/AppointmentBooking';
import CalendarManagement from './components/CalendarManagement';
import SystemAdmin from './components/SystemAdmin';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React App</h1>
      </header>
      <main>
        <SearchProvider />
        <AppointmentBooking />
        <CalendarManagement />
        <SystemAdmin />
      </main>
    </div>
  );
}

export default App;
