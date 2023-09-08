import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';


const CountryTable = ({ countries, openModal }) => {
  const [sortedCountries, setSortedCountries] = useState(countries);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  useEffect(() => {
    // Whenever the countries prop changes (e.g., due to search or initial load), update sortedCountries.
    setSortedCountries([...countries]);
  }, [countries]);

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sorted = [...sortedCountries].sort((a, b) => {
      const nameA = a.name.official.toLowerCase();
      const nameB = b.name.official.toLowerCase();
      return newSortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    setSortedCountries(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedCountries = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedCountries.slice(startIndex, endIndex);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Flags</TableCell>
              <TableCell onClick={handleSort}>Country Name</TableCell>
              <TableCell>2 character Country Code</TableCell>
              <TableCell>3 character Country Code</TableCell>
              <TableCell>Native Country Name</TableCell>
              <TableCell>Alternative Country Name</TableCell>
              <TableCell>Country Calling Codes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getPaginatedCountries().map((country) => (
              
              <TableRow key={country.cca2} onClick={() => openModal(country)}>
                <TableCell>
                  <img
                    src={country.flags.png}
                    alt={`${country.name.official} flag`}
                    width="32"
                    height="32"
                  />
                </TableCell>
                <TableCell>{country.name.official}</TableCell>
                <TableCell>{country.cca2}</TableCell>
                <TableCell>{country.cca3}</TableCell>
                <TableCell>{JSON.stringify(country.name.nativeName)}</TableCell>
                <TableCell>{JSON.stringify(country.altSpellings.join(', '))}</TableCell>
                <TableCell>{JSON.stringify(country.idd)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

      {/* Pagination controls */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(sortedCountries.length / rowsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryTable;
