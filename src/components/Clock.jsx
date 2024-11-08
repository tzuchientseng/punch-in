import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Homepage = () => {
  const [time, setTime] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const taiwanTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Taipei",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(taiwanTime);
    };

    updateTime(); // Initialize by immediately updating the time
    const timer = setInterval(updateTime, 1000); // Update the time every second

    return () => clearInterval(timer); // Clear the timer to prevent memory leaks
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = (canvas.height / 2) * 0.9; // Adjusted radius to prevent cut off

    const drawClock = () => {
      ctx.save(); // Save the canvas state
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.translate(canvas.width / 2, canvas.height / 2); // Move to center of canvas

      drawFace(ctx, radius);
      drawNumbers(ctx, radius);
      drawTime(ctx, radius);

      ctx.restore(); // Restore the canvas state
    };

    drawClock(); // Initialize by immediately drawing the clock
    const interval = setInterval(drawClock, 1000); // Redraw the clock every second

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper>
      <Title>Clock In</Title>
      <ClockContainer>
        <canvas ref={canvasRef} width="300" height="300"></canvas>
      </ClockContainer>
      <TimeDisplay>{time}</TimeDisplay>
    </Wrapper>
  );
};

export default Homepage;

// Draw the clock face
const drawFace = (ctx, radius) => {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#f4f4f9";
  ctx.fill();
  ctx.lineWidth = radius * 0.05;
  ctx.strokeStyle = "#333";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI); // Center point
  ctx.fillStyle = "#333";
  ctx.fill();
};

// Draw the numbers
const drawNumbers = (ctx, radius) => {
  ctx.font = `${radius * 0.15}px Arial`;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num <= 12; num++) {
    const ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
};

// Draw the hands
const drawTime = (ctx, radius) => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Calculate the angles
  const hourAngle =
    ((hour % 12) * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  const minuteAngle =
    (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  const secondAngle = (second * Math.PI) / 30;

  // Draw the hour hand
  ctx.save();
  ctx.rotate(hourAngle);
  ctx.lineWidth = radius * 0.04;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.5);
  ctx.stroke();
  ctx.restore();

  // Draw the minute hand
  ctx.save();
  ctx.rotate(minuteAngle);
  ctx.lineWidth = radius * 0.05;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#333";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.7);
  ctx.stroke();
  ctx.restore();

  // Draw the second hand
  ctx.save();
  ctx.rotate(secondAngle);
  ctx.lineWidth = radius * 0.02;
  ctx.strokeStyle = "#e63946";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 0.8);
  ctx.stroke();
  ctx.restore();
};

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh; /* Make the container fill the entire viewport height */
  text-align: center;
  // background-color: #f9f9f9;
  padding: 20px;
`;

const ClockContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  width: 100%;
  max-width: 400px;
`;

const TimeDisplay = styled.div`
  font-size: 2rem;
  color: #333;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #444;
  margin-top: 20px;
  font-weight: 700;
  letter-spacing: 1px;
`;
