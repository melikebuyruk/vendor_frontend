
import { useParams } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchVendor from './components/SearchVendor/searchVendor';
import VendorInfo from './components/VendorInfo/vendorInfo';
import VendorProductInfo from './components/VendorProductInfo/vendorProductInfo';

const App = () => {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<SearchVendor />} />
  <Route path="/vendor" element={<VendorProductInfo />} />
</Routes>

    </Router>
  );
};


export default App;
