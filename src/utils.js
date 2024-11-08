import React, { createContext, useContext, useState, useEffect } from "react";

export const handleLogin = (setShowAlert) => {
  setShowAlert(true);
};

export const handleLogout = (setShowLogoutConfirm) => {
  setShowLogoutConfirm(true);
};

export const handleAlertSubmit = (password, setIsAuthenticated, setShowAlert, setShowFailModal) => {
  if (password === "open") {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  } else {
    // alert("Wrong Password");
    setShowFailModal(true); 
  }
  setShowAlert(false);
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem("isAuthenticated") === "true"
    );

    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated, 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);



const apiUrl = "https://home.sunnytseng.com/api/work-hours";
const apiKey = "c82c7b5f3a10bc44a58bdfdbb62c7cf7acb29f4f";

// 全局驗證標頭
const authHeader = {
  "X-API-KEY": apiKey,
  "Content-Type": "application/json",
};

// 發送打卡（Clock-In）請求
export const handleClockIn = async () => {
  try {
    const response = await fetch(`${apiUrl}/clock-in/`, {
      method: "POST",
      headers: authHeader,
    });
    if (!response.ok) {
      const errorMessage = `Clock-In failed: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log("Clock-In response:", data);
    return data.id; // 返回記錄 ID
  } catch (error) {
    console.error("Clock-In error:", error);
    throw error; // 傳遞錯誤
  }
};

// 更新開始休息時間（Start-Break）
export const handleStartBreak = async (recordId) => {
  try {
    const response = await fetch(`${apiUrl}/${recordId}/`, {
      method: "PATCH",
      headers: authHeader,
      body: JSON.stringify({ field: "start_break" }),
    });
    if (!response.ok) {
      const errorMessage = `Start-Break update failed: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log("Start-Break response:", data);
    return data;
  } catch (error) {
    console.error("Start-Break error:", error);
    throw error;
  }
};

// 更新結束休息時間（End-Break）
export const handleEndBreak = async (recordId) => {
  try {
    const response = await fetch(`${apiUrl}/${recordId}/`, {
      method: "PATCH",
      headers: authHeader,
      body: JSON.stringify({ field: "end_break" }),
    });
    if (!response.ok) {
      const errorMessage = `End-Break update failed: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log("End-Break response:", data);
    return data;
  } catch (error) {
    console.error("End-Break error:", error);
    throw error;
  }
};

// 更新下班打卡時間（Clock-Out）
export const handleClockOut = async (recordId) => {
  try {
    const response = await fetch(`${apiUrl}/${recordId}/`, {
      method: "PATCH",
      headers: authHeader,
      body: JSON.stringify({ field: "clock_out" }),
    });
    if (!response.ok) {
      const errorMessage = `Clock-Out update failed: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log("Clock-Out response:", data);
    return data;
  } catch (error) {
    console.error("Clock-Out error:", error);
    throw error;
  }
};

// punch-in
export const fetchAllWorkHours = async () => {
  try {
    const response = await fetch(`${apiUrl}/fetch/`, {
        method: 'GET',
        headers: authHeader,
    });
      const result = await response.json();

      if (response.ok && Array.isArray(result)) {
          // console.log('Fetched all work hours:', result);
          return { success: true, data: result };
      } else {
          console.error('Unexpected response format:', result);
          return { success: false, error: 'Unexpected response format' };
      }
  } catch (error) {
      console.error('Error fetching all work hours:', error);
      return { success: false, error: 'Error fetching all work hours' };
  }
};
