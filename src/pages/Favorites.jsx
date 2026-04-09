import { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/favorites")
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>❤️ My Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet</p>
      ) : (
        favorites.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <img src={item.image} width="200" alt={item.title} />
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;