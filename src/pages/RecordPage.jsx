import React from "react";
import styled from "styled-components";

const RecordPage = () => {
    return (
        <PageContainer>
        <Title>-- This page is under construction --</Title>
            <AirtableButton 
                href="https://airtable.com/appkwZaIniGSDuEK5/tblf7maIWYlP22ZW8/viwPPJaZto5cokGjZ?blocks=hide" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                Go to Airtable
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
    height: 100vh;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
`;

const AirtableButton = styled.a`
    padding: 0.75rem 1.5rem;
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
