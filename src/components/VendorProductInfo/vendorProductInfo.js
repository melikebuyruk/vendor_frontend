import React, { useState, useEffect } from 'react';
import { fetchProductSales } from '../../services/userService';
import './vendorProductInfo.css';
import { useNavigate } from 'react-router-dom';
import loadingGif from '../../static/gifs/loading.gif';

const VendorProductInfo = ({ vendorId, vendorName }) => {
  const [salesData, setSalesData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  useEffect(() => {
    const getProductSales = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchProductSales(vendorId);
        setSalesData(data);
      } catch (err) {
        setError(err.message || 'Error fetching product sales. Please try again later.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (vendorId) {
      getProductSales();
    }
  }, [vendorId]);

  return (
    <div className="vendor-product-info-container">
      <button className="home-button" onClick={handleHome}>Home</button>
      <div className="product-sales-table">
        <h1>{vendorName} Product Sales</h1>
        {loading && (
          <div className="loading-container">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
          </div>
        )}
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
    </div>
  );
};

export default VendorProductInfo;
