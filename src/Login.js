import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    // Perform any login logic here if needed
    setError(""); // Clear any previous error messages
    navigate('/Todolist');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleLogin(); // Call handleLogin function when form is submitted
  };

  return (
    <div className="container" style={{ marginTop: "10vh" }}>
      <h2>Login to your account</h2>
      <p>Welcome back!</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email address:</label>
          <input
            onChange={e => setEmail(e.target.value)}
            type="email"
            id="email"
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            onChange={e => setPassword(e.target.value)}
            type="password"
            id="password"
            value={password}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">LOG IN</button>
      </form>
    </div>
  );
}
