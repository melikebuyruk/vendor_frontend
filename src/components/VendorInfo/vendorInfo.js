import React, { useState, useEffect } from 'react';
import { fetchVendorData } from '../../services/userService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './vendorInfo.css';
import loadingGif from '../../static/gifs/loading.gif';

const VendorInfo = ({ id }) => {
  const [vendorData, setVendorData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getVendorData = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchVendorData(id);
        setVendorData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching vendor data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getVendorData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  if (error) {
    return <p style={{ color: 'black' }}>{error}</p>;
  }

  return (
    <div className="vendor-info-container">
      {vendorData.length > 0 ? (
        <div>
          <h2>Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={vendorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value.toFixed(2)}`} />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Bar dataKey="totalSales" className="recharts-bar" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p>No vendor data available.</p>
      )}
    </div>
  );
};

export default VendorInfo;
