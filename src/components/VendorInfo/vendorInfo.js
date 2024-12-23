import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from '../../axiosConfig';
import './vendorInfo.css';

const VendorInfo = ({ id }) => {
  const [vendorData, setVendorData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setError(null);
          setLoading(true);
         const response = await axios.post('http://localhost:5000/api/vendors/sales', {
         vendorId: id,
        })
        setVendorData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching vendor information.');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVendorData();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'black' }}>{error}</p>;

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
