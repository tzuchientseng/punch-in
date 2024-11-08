import React from 'react';
import styled from 'styled-components';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <>
      <Overlay onClick={onCancel} />
      <ModalBox>
        <h3>Are you sure you want to log out?</h3>
        <ButtonContainer>
          <StyledButton onClick={onConfirm}>Yes</StyledButton>
          <StyledButton onClick={onCancel}>No</StyledButton>
        </ButtonContainer>
      </ModalBox>
    </>
  );
};

export default LogoutModal;

// Styled components for modal and overlay
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
  gap: 10px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;
