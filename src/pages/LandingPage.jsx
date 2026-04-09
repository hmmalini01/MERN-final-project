import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

function LandingPage() {
  const [birthYear, setBirthYear] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (birthYear) {
      navigate("/dashboard", { state: { birthYear } });
    }
  };

  return (
    <div className="landing-bg">

      <div className="landing fade-in">
        <h1>🎬 Cartoon Nostalgia Time Machine</h1>
        <p>✨ Step Into Your Childhood ✨</p>

        <input
          type="number"
          placeholder="Enter Birth Year"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
        />

        <button onClick={handleSubmit}>Go</button>
      </div>

    </div>
  );
}

export default LandingPage;