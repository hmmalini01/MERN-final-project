import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful 🎉");
      setTimeout(() => navigate("/landing"), 1500); // navigate after toast shows
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="login-bg">
      <div className="auth-container fade-in">
        <h1>🔐 Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {/* Add spacing between button and link */}
        <p className="new-user">
          New user? <Link to="/signup">Signup</Link>
        </p>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Login;
