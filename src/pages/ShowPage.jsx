import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../index.css";
import bgImage from "../assets/showpage.webp";

function ShowPage() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3002/api/cartoons/${id}`)
      .then(res => res.json())
      .then(data => setShow(data))
      .catch(err => console.error(err));
  }, [id]);

  // ⭐ ADD FUNCTION HERE
  const toggleFavorite = async (id) => {
    try {
      const res = await fetch(`http://localhost:3002/favorites/${id}`, { // ⚠️ FIX PORT
        method: "POST",
      });

      const data = await res.json();
      console.log(data);
      
    } catch (err) {
      console.error(err);
    }
  };

  if (!show) return <p className="loading">Loading...</p>;

  return (
    <div
      className="show-bg"
      style={{ backgroundImage: `url(${show.image})` }}
    >
      <div className="show-page fade-in">
        <img src={show.image} alt={show.title} />

        <h1>{show.title}</h1>

       

        <p className="info">📅 Year: {show.year}</p>
        <p className="info">🎭 Genre: {show.genre}</p>

        <p className="description">{show.description}</p>
      </div>
    </div>
  );
}

export default ShowPage;