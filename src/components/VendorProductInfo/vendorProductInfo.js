import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import './vendorProductInfo.css';
import VendorInfo from '../VendorInfo/vendorInfo';
import { useNavigate, useLocation } from 'react-router-dom';

const VendorProductInfo = () => {
  const location = useLocation();
  const vendorId = location.state?.id;
  const vendorName = location.state?.name;

  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchProductSales = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/vendors/product-sales', {
          vendorId: vendorId,
        });
        setSalesData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching product sales. Please try again later.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (vendorId) {
      fetchProductSales();
    }
  }, [vendorId]);

  return (
    <div className="vendor-product-info-container">
      <button className="home-button" onClick={handleHome}>Home</button>
      <div className="product-sales-table">
        <h1>{vendorName} Product Sales</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'black' }}>{error}</p>}
        {!loading && !error && (
          salesData.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Total Quantity Sold</th>
                  <th>Total Sales</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((product, index) => (
                  <tr key={index}>
                    <td>{product.productName}</td>
                    <td>{product.totalQuantity}</td>
                    <td>${product.totalSales.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No sales data available for this vendor.</p>
          )
        )}
      </div>
      <div className="vendor-info">
        <VendorInfo id={vendorId} name={vendorName} />
      </div>
    </div>
  );
};

export default VendorProductInfo;
