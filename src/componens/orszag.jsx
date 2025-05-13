import React, { useEffect, useState } from "react";
import "./Countries.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Hiba történt:", err));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    country.name?.common.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <h1 className="title">Országok és zászlóik</h1>
      <div className="search-container">
        <input
          type="text"
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div className="container">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="card">
            <img
              src={country.flags?.png}
              alt={`Zászló: ${country.name?.common}`}
              className="flag"
            />
            <h3>{country.name?.common}</h3>
            <p><strong>Főváros:</strong> {country.capital?.[0]}</p>
            <p><strong>Régió:</strong> {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;