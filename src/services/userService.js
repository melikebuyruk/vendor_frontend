import axios from '../axiosConfig';

export const fetchProductSales = async (vendorId) => {
  try {
    const response = await axios.post('http://localhost:5000/api/vendors/product-sales', {
      vendorId: vendorId,
    });
    return response.data;
  } catch (err) {
    console.error('API Error:', err);
    throw new Error(err.response?.data?.error || 'Error fetching.');
  }
};

export const fetchVendorData = async (vendorId) => {
  try {
    const response = await axios.post('http://localhost:5000/api/vendors/sales', {
      vendorId: vendorId,
    });
    return response.data;
  } catch (err) {
    console.error('API Error:', err);
    throw new Error(err.response?.data?.error || 'Error fetching .');
  }
};

export const handleSearch = async (searchTerm) => {
  try {
    const response = await axios.post('http://localhost:5000/api/vendors/search', {
      name: searchTerm,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    console.error('API Error:', err);
    throw new Error('Error fetching.');
  }
};
