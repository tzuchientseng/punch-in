import React, { useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  handleClockIn,
  handleStartBreak,
  handleEndBreak,
  handleClockOut,
} from "../utils";

const AttendanceButtons = () => {
  // Reset localStorage data if it's a new day
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    // List of actions to reset
    const actions = ["clockIn", "startBreak", "endBreak", "clockOut"];

    actions.forEach((action) => {
      const actionDate = localStorage.getItem(`${action}Date`);
      if (actionDate !== today) {
        localStorage.removeItem(`${action}Date`);
        localStorage.removeItem(`${action}Performed`);
      }
    });
  }, []);

  const showLoadingPrompt = (message) => {
    Swal.fire({
      title: message,
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const closeLoadingPrompt = () => {
    Swal.close();
  };

  const onClockIn = async () => {
    const clockInPerformed = localStorage.getItem("clockInPerformed") === "true";
    if (clockInPerformed) {
      Swal.fire({
        title: "Notice",
        text: "You have already clocked in today!",
        icon: "warning",
        confirmButtonColor: "#ff9800", // Orange confirm button
      });
      return;
    }

    showLoadingPrompt("Logging in...");

    try {
      const id = await handleClockIn("SunnyTseng");
      if (id) {
        localStorage.setItem("recordId", id);
        localStorage.setItem("clockInPerformed", "true");
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("clockInDate", today);
      }
      // Close the loading prompt before showing the success alert
      closeLoadingPrompt();
      Swal.fire({
        title: "Success",
        text: "Clock in successful!",
        icon: "success",
        confirmButtonColor: "#ff9800",
      });
    } catch (error) {
      // Close the loading prompt before showing the error alert
      closeLoadingPrompt();
      Swal.fire({
        title: "Error",
        text: "An error occurred while clocking in.",
        icon: "error",
        confirmButtonColor: "#ff9800",
      });
    }
    // Remove the finally block since we already handle closing the prompt
  };

  const onStartBreak = () => {
    const startBreakPerformed =
      localStorage.getItem("startBreakPerformed") === "true";
    const recordId = localStorage.getItem("recordId");

    if (startBreakPerformed) {
      Swal.fire({
        title: "Notice",
        text: "You have already started your break today!",
        icon: "warning",
        confirmButtonColor: "#ff9800",
      });
      return;
    }

    if (!recordId) {
      Swal.fire({
        title: "Warning",
        text: "Please clock in first!",
        icon: "warning",
        confirmButtonColor: "#ff9800",
      });
    } else {
      showLoadingPrompt("Recording start break time...");
      handleStartBreak(recordId)
        .then(() => {
          localStorage.setItem("startBreakPerformed", "true");
          const today = new Date().toISOString().split("T")[0];
          localStorage.setItem("startBreakDate", today);
          closeLoadingPrompt();
          Swal.fire({
            title: "Success",
            text: "Start break time recorded!",
            icon: "success",
            confirmButtonColor: "#ff9800",
          });
        })
        .catch((error) => {
          closeLoadingPrompt();
          Swal.fire({
            title: "Error",
            text: "An error occurred while starting break.",
            icon: "error",
            confirmButtonColor: "#ff9800",
          });
        });
    }
  };

  const onEndBreak = () => {
    const endBreakPerformed =
      localStorage.getItem("endBreakPerformed") === "true";
    const recordId = localStorage.getItem("recordId");

    if (endBreakPerformed) {
      Swal.fire({
        title: "Notice",
        text: "You have already ended your break today!",
        icon: "warning",
        confirmButtonColor: "#ff9800",
      });
      return;
    }

    if (!recordId) {
      Swal.fire({
        title: "Warning",
        text: "Please clock in first!",
        icon: "warning",
        confirmButtonColor: "#ff9800",
      });
    } else {
      showLoadingPrompt("Recording end break time...");
      handleEndBreak(recordId)
        .then(() => {
          localStorage.setItem("endBreakPerformed", "true");
          const today = new Date().toISOString().split("T")[0];
          localStorage.setItem("endBreakDate", today);
          closeLoadingPrompt();
          Swal.fire({
            title: "Success",
            text: "End break time recorded!",
            icon: "success",
            confirmButtonColor: "#ff9800",
          });
        })
        .catch((error) => {
          closeLoadingPrompt();
          Swal.fire({
            title: "Error",
            text: "An error occurred while ending break.",
            icon: "error",
            confirmButtonColor: "#ff9800",
          });
        });
    }
  };

  const onClockOut = () => {
    const clockOutPerformed =
      localStorage.getItem("clockOutPerformed") === "true";
    const recordId = localStorage.getItem("recordId");

    if (clockOutPerformed) {
      Swal.fire({
        title: "Notice",
        text: "You have already clocked out today!",
        icon: "warning",
        confirmButtonColor: "#ff9800",
      });
      return;
    }

    if (!recordId) {
      Swal.fire({
        title: "Warning",
        text: "Please clock in first!",
        icon: "warning",
        confirmButtonColor: "#ff9800",
      });
    } else {
      showLoadingPrompt("Recording clock out time...");
      handleClockOut(recordId)
        .then(() => {
          localStorage.setItem("clockOutPerformed", "true");
          const today = new Date().toISOString().split("T")[0];
          localStorage.setItem("clockOutDate", today);
          closeLoadingPrompt();
          Swal.fire({
            title: "Success",
            text: "Clock out time recorded!",
            icon: "success",
            confirmButtonColor: "#ff9800",
          });
        })
        .catch((error) => {
          closeLoadingPrompt();
          Swal.fire({
            title: "Error",
            text: "An error occurred while clocking out.",
            icon: "error",
            confirmButtonColor: "#ff9800",
          });
        });
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Button onClick={onClockIn}>Clock In</Button>
      <Button onClick={onStartBreak}>Start Break</Button>
      <Button onClick={onEndBreak}>End Break</Button>
      <Button onClick={onClockOut}>Clock Out</Button>
    </div>
  );
};

export default AttendanceButtons;

// Styling definitions
const Button = styled.button`
  background-color: #4caf50; /* Green background */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049; /* Background color on hover */
  }
`;
