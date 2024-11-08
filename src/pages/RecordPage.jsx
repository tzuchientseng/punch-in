import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fetchAllWorkHours } from "../utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const RecordPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(new Date().getMonth());
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchAllWorkHours();
                if (response.success) {
                    setData(response.data)
                }
                // console.log({response})
                // console.log({data})
            } catch (error){
                Swal.fire({
                    title: "Error",
                    text: `An error occurred: ${error.message}`,
                    icon: "error",
                    confirmButtonText: "Retry",
                    confirmButtonColor: "#FFA500",
                });
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [])
    
    const filteredData = data.filter((record) => {
        const recordDate = new Date(record.clock_in);
        return recordDate.getMonth() === currentPage;
    });
    
    const formatDate = (isoDate) => {
        if (!isoDate) return "None";
        // return new Date(isoDate).toLocaleDateString("en-US", { timeZone: "Asia/Taipei" });
        return new Date(isoDate).toLocaleDateString("zh-TW", { timeZone: "Asia/Taipei" });
    };
    
    const formatTime = (isoDate) => {
        if (!isoDate) return "None";
        return new Date(isoDate).toLocaleTimeString("zh-TW", { timeZone: "Asia/Taipei" });
    };
    
    const calculateWorkHours = (record) => {
        // Check if clock_in exists
        if (!record.clock_in) {
            return "--"; // No clock_in, return placeholder
        }
        const clockIn = new Date(record.clock_in);

        // Check if clock_out exists
        if (!record.clock_out) {
            return "--"; // No clock_out, return placeholder
        }
        const clockOut = new Date(record.clock_out);
        let breakDuration = 0;

        // Calculate break duration only if both start_break and end_break exist
        if (record.start_break && record.end_break) {
            const startBreak = new Date(record.start_break);
            const endBreak = new Date(record.end_break);
            breakDuration = endBreak - startBreak;
        }

        // Calculate total work time
        const totalWorkTime = (clockOut - clockIn - breakDuration) / (1000 * 60 * 60);
        return totalWorkTime.toFixed(2);
    };

    const handlePrevMonth = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : 11));
    };

    const handleNextMonth = () => {
        setCurrentPage((prev) => (prev < 11 ? prev + 1 : 0));
    };

    if (loading) {
        return <BouncingText>Loading...</BouncingText>
    }

    return (
        <PageContainer>
            <Title>Time Clock Records</Title>
            <PaginationControls>
                <PaginationButton onClick={handlePrevMonth}>
                    <FaArrowLeft />
                </PaginationButton>
                <span>{new Date(0, currentPage).toLocaleString("zh-TW", { month: "long" })}</span>
                <PaginationButton onClick={handleNextMonth}>
                    <FaArrowRight />
                </PaginationButton>
            </PaginationControls>
            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Clock in </th>
                            <th>Start Break</th>
                            <th>End Break</th>
                            <th>Clock Out</th>
                            <th>Work Hours</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((record) => (
                                <tr key={record.id}>
                                    <td>{formatDate(record.clock_in)}</td>
                                    <td>{formatTime(record.clock_in)}</td>
                                    <td>{formatTime(record.start_break)}</td>
                                    <td>{formatTime(record.end_break)}</td>
                                    <td>{formatTime(record.clock_out)}</td>
                                    <td>{calculateWorkHours(record)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                               <td colSpan="7">No records found.</td> 
                            </tr>
                        )}
                    </tbody>
                </Table>
            </TableContainer>
            <AirtableButton 
                href="https://home.sunnytseng.com/clock" 
                target="_blank" 
                rel="noopener noreferrer"
            >
               Edit
            </AirtableButton>
        </PageContainer>
    );
}

export default RecordPage;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    text-align: center;
`;

const AirtableButton = styled.a`
    padding: 0.75rem 1.5rem;
    margin: 20px;
    font-size: 1rem;
    color: white;
    background-color: #3a7ca5;
    border: none;
    border-radius: 4px;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.1s ease;

    &:hover {
        background-color: #2b6d96;
        transform: translateY(-4px);
    }
`;

const Title = styled.h1`
    font-size: 2rem;
    // margin-bottom: 1.5rem;
    color: #333;
`;

const TableContainer = styled.div`
    overflow-x: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 70%;
    padding: 20px; /* Add padding around the table */
    // margin: 20px auto; /* Center align and add margin */

    @media (max-width: 768px) {
        padding: 15px; /* Reduce padding slightly for smaller screens */
        width: 100%; /* Use full width on small screens */
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 1rem; /* Increase font size */
    th,
    td {
        border: 1px solid #ddd;
        padding: 14px; /* Add padding inside cells */
        text-align: center;
    }

    th {
        background-color: #f7f7f7;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    tr:hover {
        background-color: #f1f1f1;
    }

    @media (max-width: 768px) {
        th,
        td {
            font-size: 0.7rem; /* Slightly smaller font for small screens */
            padding: 7px;
        }
    }
`;

const PaginationControls = styled.div`
    // display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;

    span {
        margin: 0 15px;
    }
`;

const PaginationButton = styled.button`
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #007bff;
    }

    &:focus {
        outline: none;
    }
`;

// 定義跳動動畫
const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
`;

// 使用 Styled Component 定義帶有 bounce 動畫的文字
const BouncingText = styled.p`
    font-size: 1.5em;
    text-align: center;
    padding-top: 20%;
    color: #333;
    animation: ${bounce} 1.4s infinite;
`;
