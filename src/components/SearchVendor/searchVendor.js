import React, { useState, useEffect } from 'react';
import { handleSearch as fetchSearchResults } from '../../services/userService';
import './searchVendor.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SearchVendor = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => setShowLoading(true), 1000);
    } else {
      setShowLoading(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      performSearch();
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleClick = (vendorId, vendorName) => {
    navigate(`/vendor`, { state: { id: vendorId, name: vendorName } });
  };

  const performSearch = async () => {
    try {
      setError(null);
      setLoading(true);
      const data = await fetchSearchResults(searchTerm);
      setResults(data);
    } catch (err) {
      setError('Error fetching search results. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-vendor-container">
      <h1 className="title">Search Vendors</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Enter vendor name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {showLoading && (
        <div className="loading-animation">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <div className="results-container">
        <h2>Results</h2>
        {results.length > 0 ? (
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={listVariants}
            className="results-list"
          >
            {results.map((vendor) => (
              <motion.li
                key={vendor._id}
                onClick={() => handleClick(vendor._id, vendor.name)}
                className="result-item"
                variants={itemVariants}
              >
                {vendor.name}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          !loading && <p className="no-results"> </p>
        )}
      </div>
    </div>
  );
};

export default SearchVendor;
