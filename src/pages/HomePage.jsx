import React, { useState } from 'react';
import Clock from '../components/Clock.jsx';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../utils.js';
import styled from 'styled-components';
import LoginModal from '../components/Auth/LoginModal.jsx';
import LogoutModal from '../components/Auth/LogoutModal.jsx';
import FailModal from '../components/Auth/FailModal.jsx'; // Import FailModal
import { handleLogin, handleLogout, handleAlertSubmit } from '../utils.js';
import RecordPage from './RecordPage.jsx';
import AttendanceButtons from '../components/AttendanceButtons.jsx';

const Homepage = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);

  const location = useLocation();


  return (
    <>
      {/* Authentication Area */}
      <div className="d-flex justify-content-end">
        {isAuthenticated && (
          <NavLinks>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/record">Record</StyledLink>
          </NavLinks>
        )}

        {/* Auth Button */}
        {/* "transient prop" by prefixing the prop with a $ */}
        <StyledAuthButton
          $isAuthenticated={isAuthenticated}
          onClick={() =>
            isAuthenticated ? handleLogout(setShowLogoutConfirm) : handleLogin(setShowAlert)
          }
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </StyledAuthButton>
      </div>

      {/* Show Login Modal */}
      {showAlert && (
        <LoginModal
          onSubmit={(password) => handleAlertSubmit(password, setIsAuthenticated, setShowAlert, setShowFailModal)}
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* Show Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutModal
          onConfirm={() => {
            setIsAuthenticated(false);
            setShowLogoutConfirm(false);
          }}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}

      {/* Show Error Modal */}
      {showFailModal && (
        <FailModal
          message="Incorrect password. Please try again."
          onClose={() => setShowFailModal(false)}
        />
      )}

      {/* Display Routes */}
      {isAuthenticated && (
        <Routes>
          <Route path="/record" element={<RecordPage />} />
        </Routes>
      )}

      {/* Show Clock component only on the root path ("/") */}
      {location.pathname === '/' && <Clock />}

      {/* Show AttendanceButtons only when authenticated and on the root path ("/") */}
      {isAuthenticated && location.pathname === '/' && <AttendanceButtons />}
    </>
  );
};

export default Homepage;

// Styled authentication button
const StyledAuthButton = styled.button`
  padding: 10px;
  margin: 4px;
  background-color: ${({ $isAuthenticated }) => ($isAuthenticated ? '#FF6347' : '#008CBA')};
  height: 45px; /* 強制控制高度 bootsrap 會影響 Logout */
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: ${({ $isAuthenticated }) => ($isAuthenticated ? '#FF4500' : '#007bb5')};
    transform: scale(1.07);
  }
`;

const NavLinks = styled.div`
  margin: 10px;
  display: flex;
  gap: 8px;
  margin-right: auto;
`;

const StyledLink = styled(Link)`
  border-radius: 10px;
  background-color: #f0f0f0;
  text-decoration: none;
  padding: 10px 15px;
  color: #3a7ca5;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.4s ease;

  &:hover {
    color: #2b6d96;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #e7f1f8;
    transform: translateY(-1px);
  }
`;
