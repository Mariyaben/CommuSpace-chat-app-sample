import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import { FaPlus, FaCog } from 'react-icons/fa';
import { ImFilePicture } from 'react-icons/im';
import { Gi3DGlasses } from "react-icons/gi";
import './dashboard.css';
import Picker from '@emoji-mart/react';
import { NavLink } from 'react-router-dom';
import io from 'socket.io-client'; // Import socket.io-client

const ChatScreenContainer = styled.div`
  height: 70vh;
  width: 180vh;
  display: flex;
  flex-direction: column;
  background-color: #434448;
  padding: 20px;  
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftMenu = styled.div`
  width: 200px;
  background-color: #2f3136;
  height: 86vh;

`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 86vh;
  background-color: #434448;
  width: 210vh;
  justify-content: center;
`;

const BigMessage = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  background-image: url(./bg.png); // Make sure the path to your image is correct
  color: white;
  border-radius: 8px;
  height: 86vh;
  width: 177vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoolFont = styled.div`
  font-family: 'YourCoolFont', sans-serif;
  font-size: 30px;
  color: #777777;
`;

const SmallerFont = styled.div`
  font-family: 'YourSmallerFont', sans-serif;
  font-size: 15px;
  color: #999999;
  margin-bottom: 10px; // Add margin to create space below this line

`;

const SmallFont = styled.div`
  font-size: 15px;
  color: #CCCCCC;
`;


const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  color: #36393f;
`;

const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  font-family:cursive;
  margin-bottom: 16px;
  align-items: ${props => props.isCurrentUser ? "flex-end" : "flex-start"};
`;


const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  color: #36393f;
  background-color: ${props => props.isCurrentUser ? "#4da3a4" : "#fff"};
  border-radius: 4px;
  padding: 10px;
  align-self: ${props => props.isCurrentUser ? "flex-end" : "flex-start"};
`;

const Image = styled.img`
  /* Additional styles for the image if needed */
`;


const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const AuthorName = styled.span`
  color: ${props => props.isCurrentUser ? "" : "#000"};
  font-size: 12.6px;
  font-weight: 550;
  margin-right: 8px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const MessageTime = styled.span`
  color: ${props => props.isCurrentUser ? "#fff" : "#8e9297"};
  font-size: 12px;
`;

const MessageText = styled.p`
  color: ${props => props.isCurrentUser ? "#fff" : "#000"};
  font-size: 14px;
  margin: 0;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  width:1000px;
  color: #36393f;
`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  background-color: #40444b;
  color: #36393f;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 16px;

  &:focus {
    outline: none;
  }
`;

const SendButton = styled.button`
  border: none;
  background-color: #7289da;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
`;

const EmojiPickerButton = styled.button`
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 70px;
  right: 10px;
`;



const ENDPOINT = 'http://localhost:5000';

const Dashboard = () => {
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const socket = useRef(null);
  const chatMessagesRef = useRef(null);
  const [communityMessages, setCommunityMessages] = useState({}); // State to store messages for each community

  const handleInputChange = (event) => {
    setMessageContent(event.target.value);
  };
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(imageFile));
  };
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const loggedInUserName = userInfo ? userInfo.userName : "Guest"; // If no user is logged in, show "Guest"
  const [selectedCommunity, setSelectedCommunity] = useState(null); // Add this state
  const SelectedCommunityComponent = ({ community }) => {
    // Add the content specific to the selected community here
  };

  
  const [selectedCommunityIndex, setSelectedCommunityIndex] = useState(null);


  const saveMessageToDatabase = async function(newMessage) {
    try {
      const response = await fetch(`/message/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userInfo.token,
        },
        body: JSON.stringify({
          communityId: newMessage.communityId,
          messageContent: newMessage.text,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Message saved:", data);
      } else {
        console.error("Error saving message to database");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  
  
  const fetchMessagesForCommunity = async function(communityId) {
    try {
      const response = await fetch(`/messages/${communityId}`, { // Use the appropriate endpoint for retrieving messages
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userInfo.token,
        },
        
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Messages for community:", data);
        return data;
      } else {
        console.error("Error fetching messages for community");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  
  
  useEffect(() => {
    socket.current = io(ENDPOINT);
    console.log("Socket connected");
  
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, []);
  

  useEffect(() => {
    if (socket.current) {
      socket.current.on('message', (newMessage) => {
        console.log("Received message:", newMessage);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    }
  }, []);


  const handleSendMessage = () => {
    if (!messageContent.trim() && !selectedImage) {
      return;
    }
  
    const newMessage = {
      author: loggedInUserName,
      text: messageContent,
      image: selectedImage,
      time: new Date(),
      communityId: selectedCommunity._id // Add the communityId to the new message
      // Set the time property to the current time
    };
    
    console.log("Before updating state:", messages);

    setMessages(prevMessages => [...prevMessages, newMessage]);

    console.log("After updating state:", messages);

    if (socket.current) {
      socket.current.emit('message', newMessage);
    }

    saveMessageToDatabase(newMessage);
  
    setMessageContent('');
    setSelectedImage(null);
  };
  

    

  const handleEmojiClick = (emoji) => {
  setMessageContent(`${messageContent}${emoji.native}`);
};

  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
    
    
  // Define an array of communities


  const getUserCommunities = async function() {
    try {
      const response = await fetch("/community/cu", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + userInfo.token // Send the token in the header of the request
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data; // Return the data from the API call
      } else {
        console.error("Error fetching user communities");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

 
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    getUserCommunities()
      .then(data => {
        setCommunities(data)
        console.log("datatype of data : ",typeof data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
  if (selectedCommunity) {
    fetchMessagesForCommunity(selectedCommunity._id);
  }
}, [selectedCommunity]);


 
    
  return (
    <DashboardContainer>
            <LeftMenu>


    <div className="dashboard-container">
      <div className="left-menu">
        <div className="create-community">
          <FaPlus className="icon" />
          <NavLink to = "/createcommunityminipage" className="signup-image-link3">CREATE COMMUNITY </NavLink>
        </div>
        <div className="community-list">
  {Object.values(communities).map((community, index) => ( 
    <div
      key={community._id}
      className={`community-item ${selectedCommunityIndex === index ? "active" : ""}`}
      onClick={() => {
        setSelectedCommunityIndex(index); // Update the selected community index
        setSelectedCommunity(community);
        fetchMessagesForCommunity(community._id); // Fetch messages when a community is selected
      }}
    >
      <img src={community.communityLogo} alt={community.communityName} />
      <span>{community.communityName}</span>
    </div>
  ))}
</div>

        <form className="user-form">
          <div className="username-settings">
            <Gi3DGlasses style={{ color: 'white', fontSize: '24px', backgroundColor: 'b71c83' }}/>
            <div style={{ color: 'b71c83' }} className="username">{loggedInUserName}</div> {/* Display logged-in user's name */}
            <NavLink to="/settings">
              <FaCog style={{ color: 'white'}} className="icon" />
            </NavLink>
          </div>
        </form>
      </div>
</div>
    </LeftMenu>

    <ChatContainer>
       
      <ChatMessages>
        {messages.map((message, index) => {
          console.log("Rendering message:", message);
          return (
          <ChatMessage
            key={index}
            isCurrentUser={message.author === 'You'}
          >
            <MessageContent isCurrentUser={message.author === 'You'}>
              <MessageHeader>
              <AuthorName isCurrentUser={message.author === 'You' || message.author === loggedInUserName}>
  {message.author}
</AuthorName>

                <MessageTime>
                  {message.time.toLocaleTimeString()}
                </MessageTime>
              </MessageHeader>
              {message.image && (
                <img
                  src={message.image}
                  alt="message"
                  style={{ maxWidth: '100%' }}
                />
              )}
              <MessageText>{message.text}</MessageText>
            </MessageContent>
          </ChatMessage>
          );
          })}
        <div ref={chatMessagesRef}></div>
      </ChatMessages>
      {selectedCommunity ? (
          <ChatInputContainer>
            <ChatInput
              type="text"
              placeholder="Type your message here..."
              value={messageContent}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <label htmlFor="file-upload">
              <ImFilePicture style={{ color: 'white', fontSize: '24px' }} />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <EmojiPickerButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              😃
            </EmojiPickerButton>
            <SendButton style={{ backgroundColor: '#4da3a4', color: 'white' }} onClick={handleSendMessage}>
              <FaPaperPlane />
            </SendButton>
            {showEmojiPicker && (
              <EmojiPickerContainer>
                <Picker onSelect={handleEmojiClick} />
              </EmojiPickerContainer>
            )}
          </ChatInputContainer>
        ) : (
          <BigMessage>
      <CoolFont>COMMU SPACE</CoolFont>
      <SmallerFont>CONNECT INSPIRE</SmallerFont>
      <SmallFont>Select a community to begin chat</SmallFont>
    </BigMessage>
        )}
      </ChatContainer>
    </DashboardContainer>
  );
};

export default Dashboard;