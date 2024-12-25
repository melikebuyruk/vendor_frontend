# Vendor Frontend Documentation

## Project Overview

The **Vendor Frontend** is a React-based application designed to provide an intuitive interface for searching and viewing vendor information. This project forms the frontend of a larger system, with the backend handled by a separate project called **Vendor Dashboard**. The application allows users to search for vendors in real-time, view their sales data, and explore detailed analytics about their performance.

### Features

1. **Homepage (SearchVendor):**
   - A real-time search interface for finding vendors.
   - Located in `components/SearchVendor/SearchVendor.js`.
   - Users can type a vendor's name to search dynamically.
   - Clicking on a vendor redirects to the `/vendor` page using React Router.

2. **Vendor Page (/vendor):**
   - Displays detailed information about a selected vendor.
   - Implemented in `components/VendorPage/VendorPage.js`.
   - Combines two sub-components:
     - **VendorProductInfo**: A table showing the total number of products sold by the vendor, along with total earnings.
     - **VendorInfo**: A bar chart displaying the vendor's monthly sales performance.
   - Both components fetch data from APIs using Axios.

3. **API Integration:**
   - All API calls are handled in `services/userService.js` for modular and reusable code.

---

## Project Setup and Installation

### Prerequisites

- **Node.js** and **npm** installed on your system.
- A running instance of the **Vendor Dashboard** backend project.

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd vendor_frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Application:**
   ```bash
   npm start
   ```
   - The application will be available at `http://localhost:3000` by default.

---

## Project Structure

```plaintext
src/
├── components/
│   ├── SearchVendor/
│   │   └── SearchVendor.js   # Real-time vendor search
│   ├── VendorPage/
│   │   └── VendorPage.js     # Displays selected vendor's information
│   ├── VendorInfo/
│   │   └── VendorInfo.js     # Monthly sales bar chart
│   └── VendorProductInfo/
│       └── VendorProductInfo.js # Table showing total products sold and earnings
├── services/
│   └── userService.js        # API calls using Axios
├── App.js                 
├── index.js                 
└── static/
    └── gifs/             
```



## Usage Guide

1. Open the homepage (`/`) to search for vendors in real-time.
2. Select a vendor to navigate to the `/vendor` page.
3. View detailed information:
   - Table of total products sold and earnings.
   - Bar chart of monthly sales performance.

---

## Future Improvements

- Relocate the Search page and VendorPage into a view or route directory. It was my plan but I could not find the needed time.
- CSSa and UI improvments.
- A clean skeleton.
---
