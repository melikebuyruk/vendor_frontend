
import { useParams } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchVendor from './components/SearchVendor/searchVendor';
import VendorPage from './components/VendorPage/VendorPage';

const App = () => {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<SearchVendor />} />
  <Route path="/vendor" element={<VendorPage />} />
</Routes>

    </Router>
  );
};


export default App;
