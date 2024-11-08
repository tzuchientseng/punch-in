import React, { useEffect } from 'react';
import styled from 'styled-components';

const FailModal = ({ message, onClose }) => {
  // Add event listener for Enter key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Cleanup event listener on component unmount
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalBox>
        <h3>Failed</h3>
        <p>{message || "An error occurred, please try again later."}</p>
        <ButtonContainer>
          <StyledButton onClick={onClose}>OK</StyledButton>
        </ButtonContainer>
      </ModalBox>
    </>
  );
};

export default FailModal;

// Styled components
const ModalBox = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ButtonContainer = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #c9302c;
  }
`;
