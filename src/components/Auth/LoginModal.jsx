import React, { useState } from 'react';
import styled from 'styled-components';

const LoginModal = ({ onSubmit, onClose }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(password);
    setPassword(""); // Clear the password input field
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <AlertBox>
        <form onSubmit={handleSubmit}>
          <h3>Please enter your password:</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ marginTop: '10px' }}>
            <StyledButton type="submit">Submit</StyledButton>
          </div>
        </form>
      </AlertBox>
    </>
  );
};

export default LoginModal;

// Styled components for alert box and overlay
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

const AlertBox = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
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

  /*
原本的程式碼：使用 onKeyDown 監聽 Enter 鍵，但因為事件觸發順序，password 狀態可能未更新，導致驗證失敗。
修改後的程式碼：使用 <form> 的 onSubmit 事件，確保在提交時 password 狀態已更新，解決了密碼驗證的問題。
附加說明：

React 的狀態更新：在同一個事件循環中，狀態更新是非同步的。使用表單的 onSubmit 可以避免這個問題。
可讀性和維護性：使用表單元素處理提交行為是更符合 HTML 標準的做法，也提高了程式碼的可讀性。

  const handleSubmit = () => {
    onSubmit(password);
    setPassword(""); // Clear the password input field
  };

  const handleKeyDown = (e) => { // addEventListener on 'Enter'
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <AlertBox>
        <h3>Please enter your password:</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div style={{ marginTop: '10px' }}>
          <StyledButton onClick={handleSubmit}>Submit</StyledButton>
        </div>
      </AlertBox>
    </>
  );
};
*/
