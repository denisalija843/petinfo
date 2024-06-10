import React, { useState, useEffect } from "react";

export default function App() {
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);
  const [birds, setBirds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://freetestapi.com/api/v1/dogs")
      .then((response) => response.json())
      .then((data) => setDogs(data))
      .catch((error) => console.error("Error fetching dogs:", error));

    fetch("https://freetestapi.com/api/v1/cats")
      .then((response) => response.json())
      .then((data) => setCats(data))
      .catch((error) => console.error("Error fetching cats:", error));

    fetch("https://freetestapi.com/api/v1/birds")
      .then((response) => response.json())
      .then((data) => setBirds(data))
      .catch((error) => console.error("Error fetching birds:", error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="App">
      <Logo />
      <Search onSearchChange={handleSearchChange} />
      <div className="pet-sections">
        <Main title="Dogs" data={filterPets(dogs, searchQuery)} />
        <Main title="Cats" data={filterPets(cats, searchQuery)} />
        <Main title="Birds" data={filterPets(birds, searchQuery)} />
      </div>
      <Footer />
      <Social />
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>PetInfo🐕</h1>
    </div>
  );
}

function Search({ onSearchChange }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search pets..."
      onChange={onSearchChange}
    />
  );
}

function Main({ title, data }) {
  const [showAllDogs, setShowAllDogs] = useState(false);
  const [showAllCats, setShowAllCats] = useState(false);
  const [showAllBirds, setShowAllBirds] = useState(false);

  const toggleShowAll = (category) => {
    switch (category) {
      case "dogs":
        setShowAllDogs(!showAllDogs);
        break;
      case "cats":
        setShowAllCats(!showAllCats);
        break;
      case "birds":
        setShowAllBirds(!showAllBirds);
        break;
      default:
        break;
    }
  };

  const petsToShow = () => {
    if (title === "Dogs") {
      return showAllDogs ? data : data.slice(0, 6);
    } else if (title === "Cats") {
      return showAllCats ? data : data.slice(0, 6);
    } else if (title === "Birds") {
      return showAllBirds ? data : data.slice(0, 6);
    }
  };

  return (
    <div className="main">
      <h2>{title}</h2>
      <div className="pet-grid">
        {petsToShow().map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
      <div className="show-more-btn">
        {data.length > 6 && (
          <button onClick={() => toggleShowAll(title.toLowerCase())}>
            {title === "Dogs" && !showAllDogs
              ? "Show More Dogs"
              : title === "Cats" && !showAllCats
              ? "Show More Cats"
              : title === "Birds" && !showAllBirds
              ? "Show More Birds"
              : "Show Less"}
          </button>
        )}
      </div>
    </div>
  );
}

function PetCard({ pet }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className="pet-card">
      <img src={pet.image} alt={pet.name} onClick={togglePopup} />
      <h3>{pet.name}</h3>
      <p>Origin: {pet.origin}</p>
      {isPopupOpen && (
        <div className="popup">
          <h3>{pet.name}</h3>
          <img src={pet.image} alt={pet.name}></img>
          <p>Origin: {pet.origin}</p>
          <p>Description: {pet.description}</p>
          <p>Temperament: {pet.temperament}</p>
          <p>Color: {pet.colors}</p>
          <p>{pet.species}</p>
          {/* Add other information here */}
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="company-info">
          <h3>Contact Us</h3>
          <p>
            <strong>🏠Location:</strong> Tirana, Albania
          </p>
          <p>
            <strong>✉Email:</strong> contact@petinfo.com
          </p>
          <p>
            <strong>📞Phone:</strong> +355 123457890
          </p>
        </div>
        <div className="about-company">
          <h3>About Us</h3>
          <p>
            Welcome to Petinfo! At PetInfo, we're not just passionate about
            pets; we're obsessed! From the furry cuddles of a kitten to the
            playful antics of a puppy, we understand the unique bond between
            humans and their animal companions. Our journey began with a simple
            belief: every pet deserves the best.
          </p>
        </div>
      </div>
      <p className="copyright">&copy; PetInfo All rights reserved.</p>
    </footer>
  );
}

function Social() {
  return (
    <div className="social-media">
      <h3>Follow Us</h3>
      <div className="social-icons">
        <Button label="TikTok" link="https://tiktok.com" />
        <Button label="Twitter" link="https://twitter.com" />
        <Button label="Instagram" link="https://instagram.com" />
        <Button label="Facebook" link="https://facebook.com" />
      </div>
    </div>
  );
}

function Button({ label, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className="social-button">{label}</button>
    </a>
  );
}

function filterPets(pets, query) {
  return pets.filter((pet) =>
    pet.name.toLowerCase().includes(query.toLowerCase())
  );
}
