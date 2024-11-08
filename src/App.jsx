import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from "./pages/HomePage";
import { AuthProvider } from "./utils";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<Homepage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
