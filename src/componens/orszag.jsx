import React, { useEffect, useState } from "react";
import "./Countries.css";
import Loading from "./LoadingSpinner/Loading";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Nem sikerült lekérni az adatokat.");
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCountries = countries.filter((country) =>
    country.name?.common.toLowerCase().includes(searchTerm) ||
    country.region?.toLowerCase().includes(searchTerm)
  );

  if (loading) {
    return <div className="loader"><Loading/></div>;
  }

  if (error) {
    return <div className="error">Hiba történt: {error}</div>;
  }

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
            <p><strong>Főváros:</strong> {country.capital?.[0] || "N/A"}</p>
            <p><strong>Régió:</strong> {country.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
