import React from 'react';
import './VendorPage.css';
import VendorProductInfo from '../VendorProductInfo/vendorProductInfo';
import VendorInfo from '../VendorInfo/vendorInfo';
import { useNavigate, useLocation } from 'react-router-dom';

const VendorPage = () => {
  const location = useLocation();
  const vendorId = location.state?.id;
  const vendorName = location.state?.name;
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="vendor-product-info-container">
      <button className="home-button" onClick={handleHome}>Home</button>
      <div className="product-sales-table">
        <VendorProductInfo vendorId={vendorId} vendorName={vendorName} />
      </div>
      <div className="vendor-info">
        <VendorInfo id={vendorId} name={vendorName} />
      </div>
    </div>
  );
};

export default VendorPage;
