import React, { createContext, useContext, useState, useEffect } from "react";

export const handleLogin = (setShowAlert) => {
  setShowAlert(true);
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

// Airtable API 設置
const token = 'patH4dk6hLPOkA5Qt.2e5d3671ca01ce59aa429a38a038cb4290a2fab8666889c8ae5045f64e8f3b7f';
const baseId = "appkwZaIniGSDuEK5";
const tableName = "WorkHoursTracking";
const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
const authHeader = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

// 取得當前的 ISO 日期時間
const getCurrentTimestamp = () => new Date().toISOString();

// 創建一筆新紀錄並打卡
export const handleClockIn = async (userName) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({
        fields: {
          Name: userName,
          "Clock-In": getCurrentTimestamp(),
        },
      }),
    });
    const data = await response.json();
    console.log("Clock In response:", data);
    // return data.records[0].id; // 返回記錄 ID，用於後續的更新
    return data.id; 
  } catch (error) {
    console.error("Clock In error:", error);
  }
};

// 更新開始休息時間
export const handleStartBreak = async (recordId) => {
  try {
    const response = await fetch(`${apiUrl}/${recordId}`, {
      method: "PATCH",
      headers: authHeader,
      body: JSON.stringify({
        fields: {
          "Start-Break": getCurrentTimestamp(),
        },
      }),
    });
    const data = await response.json();
    console.log("Start Break response:", data);
  } catch (error) {
    console.error("Start Break error:", error);
  }
};

// 更新結束休息時間
export const handleEndBreak = async (recordId) => {
  try {
    const response = await fetch(`${apiUrl}/${recordId}`, {
      method: "PATCH",
      headers: authHeader,
      body: JSON.stringify({
        fields: {
          "End-Break": getCurrentTimestamp(),
        },
      }),
    });
    const data = await response.json();
    console.log("End Break response:", data);
  } catch (error) {
    console.error("End Break error:", error);
  }
};

// 更新下班打卡時間
export const handleClockOut = async (recordId) => {
  try {
    const response = await fetch(`${apiUrl}/${recordId}`, {
      method: "PATCH",
      headers: authHeader,
      body: JSON.stringify({
        fields: {
          "Clock-Out": getCurrentTimestamp(),
        },
      }),
    });
    const data = await response.json();
    console.log("Clock Out response:", data);
  } catch (error) {
    console.error("Clock Out error:", error);
  }
};
