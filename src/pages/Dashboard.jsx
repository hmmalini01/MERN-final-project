import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../index.css";

// 🔥 Firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

function Dashboard() {
  const location = useLocation();
  const birthYear = parseInt(location.state?.birthYear) || null;

  const [cartoons, setCartoons] = useState([]);
  const navigate = useNavigate();

  // 🔐 Protect Route
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // 📡 Fetch Cartoons
  useEffect(() => {
    fetch("http://localhost:3002/api/cartoons")
      .then((res) => res.json())
      .then((data) => {
        if (!birthYear || isNaN(birthYear)) {
          setCartoons(data);
          return;
        }

        const filtered = data.filter(
          (c) => c.year >= birthYear - 5 && c.year <= birthYear + 10
        );

        setCartoons(filtered);
      })
      .catch((err) => console.error(err));
  }, [birthYear]);

  // ⭐ FAVORITES FUNCTION
  const toggleFavorite = async (id) => {
    try {
      const res = await fetch(`http://localhost:3002/favorites/${id}`, {
        method: "POST",
      });

      const data = await res.json();
      console.log(data);
      alert("Added to favorites ❤️");
    } catch (err) {
      console.error(err);
    }
  };

  // 🚪 Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      {/* 🔥 Header */}
      <div className="dashboard-header">
        <h1>🎬 Welcome {birthYear || "Guest"}!</h1>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* 🎬 Cartoon Grid */}
      <div className="cartoon-grid">
        {cartoons.length === 0 ? (
          <p>No cartoons found 😢</p>
        ) : (
          cartoons.map((show) => (
            <div key={show.id} className="cartoon-card">
              
              {/* ✅ CLICKABLE CONTENT */}
              <Link to={`/show/${show.id}`}>
                <img
                  src={show.image}
                  alt={show.title}
                  className="cartoon-image"
                />

                <h3>{show.title}</h3>
                <p>📅 {show.year}</p>
                <p>🎭 {show.genre}</p>
                <p>{show.description}</p>
              </Link>

              {/* ❤️ FAVORITE BUTTON */}
              <button
                onClick={() => toggleFavorite(show.id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                ❤️ Favorite
              </button>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;