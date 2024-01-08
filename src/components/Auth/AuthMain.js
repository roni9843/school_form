import React, { useState } from "react";
import styled from "styled-components";

const AuthContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export default function AuthMain({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Both email and password are required");
    } else {
      // Perform login logic here
      // For demonstration purposes, let's just log the credentials
      console.log("Email:", email);
      console.log("Password:", password);

      if (email === "admin" && password === "admin123") {
        setRole("admin");
      }
      if (email === "moderator" && password === "123moderator") {
        setRole("moderator");
      }

      // Reset error message
      setError("");
    }
  };

  return (
    <AuthContainer>
      <h2>Login</h2>
      <InputWrapper>
        <label>User name:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <SubmitButton onClick={handleLogin}>Login</SubmitButton>
    </AuthContainer>
  );
}
