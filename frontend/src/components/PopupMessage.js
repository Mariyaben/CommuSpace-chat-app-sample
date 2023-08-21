import React, { useState, useEffect } from 'react';

function PopupMessage({ message, communityName, redirectTo }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (redirectTo) {
        window.location.href = redirectTo;
      }
    }, 3000); // Display the popup for 3 seconds

    return () => clearTimeout(timer);
  }, [redirectTo]);

  return isVisible ? (
    <div className="popup-container">
      <div className="popup-box">
        <p>{message}</p>
        <p>Community: {communityName}</p>
      </div>
    </div>
  ) : null;
}

export default PopupMessage;
