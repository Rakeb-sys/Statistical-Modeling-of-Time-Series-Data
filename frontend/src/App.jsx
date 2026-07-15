import React from 'react';
// Import your new custom dashboard component using its relative path
import BirhanEnergiesDashboard from '../Dashboard';

function App() {
  return (
    <div className="app-container">
      {/* Mounting the component here renders it to the DOM */}
      <BirhanEnergiesDashboard />
    </div>
  );
}

export default App;