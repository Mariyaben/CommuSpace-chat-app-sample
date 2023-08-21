import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';
import { FaPlus, FaCog } from 'react-icons/fa';
import './dashboard.css';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
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
  color: #36393f;
`;

const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  align-items: ${props => props.isCurrentUser ? "flex-end" : "flex-start"};
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
  color: #36393f;
  background-color: ${props => props.isCurrentUser ? "#7289da" : "#fff"};
  border-radius: 4px;
  padding: 10px;
  align-self: ${props => props.isCurrentUser ? "flex-end" : "flex-start"};
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const AuthorName = styled.span`
  color: ${props => props.isCurrentUser ? "#fff" : "#000"};
  font-size: 14px;
  font-weight: 500;
  margin-right: 8px;
`;

const MessageTime = styled.span`
  color: ${props => props.isCurrentUser ? "#fff" : "#8e9297"};
  font-size: 12px;
`;

const MessageText = styled.p`
  color: ${props => props.isCurrentUser ? "#fff" : "#000"};
  font-size: 16px;
  margin: 0;
`;

const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #36393f;
`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  background-color: #40444b;
  color: #36393f;
  font-size: 16px;
  padding: 12px;
  border-radius: 4px;
  margin-right: 16px;

  &:focus {
    outline: none;
  }
`;

const ChatMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const SendButton = styled.button`
  border: none;
  background-color: #7289da;
  color: #fff;
  `;
