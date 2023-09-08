import React, { useState, useEffect } from 'react';
import { TextField, Container, Grid } from '@mui/material';
import './App.css';
import CountryTable from './components/CountryTable';
import CountryModal from './components/CountryModal';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data); // Initially, show all countries
      });
  }, []);

  const openModal = (country) => {
    setSelectedCountry(country);
  };

  const closeModal = () => {
    setSelectedCountry(null);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filter countries based on search term
    const filtered = countries.filter((country) =>
      country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <Container>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <h1>Country Catalog</h1>
          <TextField
            fullWidth
            hiddenLabel
            id="filled-hidden-label-normal"
            // defaultValue="Normal"
            variant="filled"
            placeholder="Search by Country Name"
            onChange={handleSearch}
            value={searchTerm}
          />
          <CountryTable countries={filteredCountries} openModal={openModal} />
          {selectedCountry && (
            <CountryModal country={selectedCountry} closeModal={closeModal} />
          )}
        </Grid>
      </Grid>
    </Container>
    
  );
}

export default App;
