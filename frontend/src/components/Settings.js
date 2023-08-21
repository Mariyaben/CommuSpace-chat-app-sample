import React, { useState } from 'react';
import "./settings.css";
function SettingsPage() {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleSaveSettings = () => {
    
  };

  return (
    <div>
      <h2>Settings</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
        Chat Screen Background Color:
        <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
      </label>
      <button classname="btnh" onClick={handleSaveSettings}>Save Settings</button>
    </div>
  );
}

export default SettingsPage;
