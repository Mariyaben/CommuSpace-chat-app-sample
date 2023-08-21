import React, { useState, useEffect } from 'react';
import PopupMessage from './PopupMessage'; // Update the path to the PopupMessage component
import "./community.css";
import "./popup.css"; // Add this line to import the new CSS file
import axios from 'axios';



function Createcommunityminipage() {
  const [communityName, setCommunityName] = useState('');
  const [idea, setIdea] = useState('');
  const [userInfo, setUserInfo] = useState(null); 
  const [showPopup, setShowPopup] = useState(false); // State to control the popup
  const [userCreatedCommunities, setUserCreatedCommunities] = useState([]);
// State to hold user information

  useEffect(() => {
    // Fetch user information from local storage
    const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userInfo) {
      console.log("User information not available");
      return;
    }

    const requestData = {
      communityName: communityName,
      idea: idea,
      creator: userInfo._id,
      participants: [userInfo._id], 
    };

    try {
      const response = await axios.post('/community/create', requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      console.log('Community created:', response.data);
      setUserCreatedCommunities([...userCreatedCommunities, response.data]); // Update the state with the new community
      setShowPopup(true); // Show the popup
      // Redirect or update UI as needed
    } catch (error) {
      console.error('Error creating community:', error);
      // Handle error as needed
    }
  }

  return (
    <div className="create-community-container">
      <div className="create-community-mini-page">
        <h2>Create Community</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="communityName">Community Name</label>
            <input
              type="text"
              className="form-control"
              id="communityName"
              value={communityName}
              onChange={(event) => setCommunityName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="idea">Description</label>
            <textarea
              className="form-control"
              id="idea"
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Community</button>
        </form>
      </div>
      {showPopup && (
        <PopupMessage
        message="Community created successfully"
        communityName={communityName} // Pass the communityName to the PopupMessage component
        redirectTo="/dashboard" // Update the path as needed
      />
    )}
  </div>
  );
}

function CreateCommunityPageWrapper() {
  return (
    <div className="create-community-page-wrapper">
      <Createcommunityminipage />
    </div>
  );
}

export default CreateCommunityPageWrapper;