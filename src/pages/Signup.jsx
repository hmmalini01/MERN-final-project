import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";



function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful ✅");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
  <div className="login-bg">   {/* ✅ ADD THIS */}

    <div className="auth-container fade-in">
      <h1>📝 Signup</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Signup</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>

  </div>
);
}

export default Signup;