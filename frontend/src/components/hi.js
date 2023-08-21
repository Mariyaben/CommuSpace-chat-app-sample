import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import { FaPlus, FaCog } from 'react-icons/fa'; 
import './dashboard.css'; 
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { AiOutlineFileImage } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';



const ChatScreenContainer = styled.div`
  height: 79vh;
  width: 180vh;
  display: flex;
  flex-direction: column;
  background-color: #36393f;
  padding: 20px;
`;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ChatTitle = styled.h1`
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  margin: 0;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  color: #36393f

`;

const ChatMessage = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #7289da;
  margin-right: 16px;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  color: #36393f
  

`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const AuthorName = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
`;

const MessageTime = styled.span`
  color: #8e9297;
  font-size: 12px;
`;

const MessageText = styled.p`
  color: #fff;
  font-size: 16px;
  margin: 0;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #36393f

`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  background-color: #40444b;
  color: #36393f
  font-size: 16px;
  padding: 12px;
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
  padding: 12px 16px;
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
  right: 20px;
`;






const Dashboard = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [emojiPickerSelected, setEmojiPickerSelected] = useState('')
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatMessagesRef = useRef(null);

        const [selectedImage, setSelectedImage] = useState(null);
      
        const handleMessageSubmit = (message) => {
          const newMessage = {
            text: message,
            image: selectedImage,
          };
          setMessages([...messages, newMessage]);
          setSelectedImage(null);
        };
      
        const handleImageChange = (event) => {
          const file = event.target.files[0];
          const reader = new FileReader();
      
          reader.onloadend = () => {
            setSelectedImage(reader.result);
          };
      
          if (file) {
            reader.readAsDataURL(file);
          }
        };
      



    useEffect(() => {
        // Simulate messages coming from server
        const newMessages = [
          { id: 1, author: 'John', text: 'Hello there!', time: new Date() },
          { id: 2, author: 'Jane', text: 'Hey John, how are you?', time: new Date() },
          { id: 3, author: 'John', text: 'I\'m doing great, thanks for asking!', time: new Date() },
          { id: 4, author: 'Jane', text: 'Awesome! What have you been up to?', time: new Date() },
          { id: 5, author: 'John', text: 'Not much, just working on some coding projects. How about you?', time: new Date() },
        ];
        setMessages(newMessages);
      }, []);
    
      useEffect(() => {
    // Scroll to bottom of messages when new message is added
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [messages]);
    
  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendButtonClick = () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        author: 'You',
        text: messageInput,
        time: new Date(),
        emoji: showEmojiPicker ? emojiPickerSelected.native : null, // Add emoji property to message object
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
      setShowEmojiPicker(false); // Hide the emoji picker after sending the message
    }
  };
  

  const handleEmojiClick = (emoji) => {
  setEmojiPickerSelected(emoji);
  setMessageInput(`${messageInput}${emoji.native}`);
};

  
  



  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendButtonClick();
    }
  };
    
    
  // Define an array of communities
  const communities = [
    {
      id: 1,
      name: 'Community 1',
      icon: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'Community 2',
      icon: 'https://via.placeholder.com/50',
    },
    {
      id: 3,
      name: 'Community 3',
      icon: 'https://via.placeholder.com/50',
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="left-menu">
        <div className="create-community">
          <FaPlus className="icon" />
          <NavLink to = "/createcommunityminipage" className="signup-image-link3">Create New Community </NavLink>
        </div>
        <div className="community-list">
          {communities.map((community) => (
            <div key={community.id} className="community-item">
              <img src={community.icon} alt={community.name} />
              <span>{community.name}</span>
            </div>
          ))}
        </div>
        <div className="username-settings">
          <img src="https://via.placeholder.com/50" alt="User" />
          <div className="username">Username</div>
          <FaCog className="icon" />
        </div>
      </div>
      <ChatScreenContainer>
        <ChatMessages ref={chatMessagesRef}>
          {messages.map((message) => (
            <ChatMessage key={message.id}>
              <Avatar />
              <MessageContent>
                <MessageHeader>
                  <AuthorName>{message.author}</AuthorName>
                  <MessageTime>{message.time.toLocaleString()}</MessageTime>
                </MessageHeader>
                <MessageText>{message.text}</MessageText>
                {message.image && <img src={message.image} alt="Sent Image" />}
              </MessageContent>
            </ChatMessage>
          ))}
        </ChatMessages>
        <ChatInputContainer>
          <EmojiPickerButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            😃
          </EmojiPickerButton>
          <ChatInput
            type="text"
            placeholder="Type your message here..."
            value={messageInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <div>
            <label htmlFor="file-input">
              <AiOutlineFileImage />
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <button type="submit" onClick={handleSendButtonClick}>
              Send
            </button>
          </div>
        </ChatInputContainer>
        {showEmojiPicker && (
          <EmojiPickerContainer>
            <Picker onSelect={handleEmojiClick} />
          </EmojiPickerContainer>
        )}
      </ChatScreenContainer>
    </div>
  );
  
};

export default Dashboard;
