import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(41, 222, 222, 0.5);
`;

const AboutContent = styled.div`
  max-width: 800px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 10px;
  color: #333333;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #666666;
`;

const Paragraph = styled.p`
  font-size: 18px;
  margin-bottom: 15px;
  color: #444444;
`;

const Strong = styled.span`
  font-weight: bold;
  color: #222222;
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutContent>
        <Title>About Us</Title>
        <Subtitle>Connecting People Through Communities</Subtitle>
        <Paragraph>
          At Commu Space, we are dedicated to providing a platform that brings people together to connect, share,
          and inspire. Our mission is to create an online space where communities can thrive and individuals can find
          like-minded individuals who share their interests and passions.
        </Paragraph>
        <Paragraph>
          We believe that strong communities can make a positive impact on people's lives. With our user-friendly
          chat and messaging features, you can engage with others, exchange ideas, and build lasting connections.
        </Paragraph>
        <Paragraph>
          Join us on this journey as we continue to grow and evolve. We're excited to have you be a part of the
          Commu Space community!
        </Paragraph>
        <Paragraph>
          For any inquiries or feedback, please contact us at <Strong>info@commuspace.com</Strong>.
        </Paragraph>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;
