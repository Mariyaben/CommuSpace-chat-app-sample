import React from 'react';
import './Joincommunity.css';

function Joincommunity() {
  return (
    <div className="join-existing-community">
      <div className="join-container">
        <div className="join-header">
          <h1>Join a Server</h1>
        </div>
        <form>
          <div className="join-form">
            <div className="form-group5">
              <label htmlFor="invite-code">Invite Code:</label>
              <input type="text" id="invite-code" name="invite-code" />
            </div>
            <button type="submit6">Join</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Joincommunity;
