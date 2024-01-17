import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GoogleSheetForm = () => {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    // Fetch data from Google Sheet
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1nqyn0NiCVNsvUbx29jjaACEUKHZDIq2AAmDht3CsF_Q/values/Responses?key=AIzaSyDS0v6viCHbX14CNGlLIO_JExTxvCTF2SA');
        setSheetData(response.data); // Assuming the response is an array of rows
        console.log("get request to google sheet",response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Fetch data on component mount

  const handleInputChange = (rowIndex, columnName, value) => {
    // Update the sheetData state when an input field changes
    const updatedSheetData = [...sheetData];
    updatedSheetData[rowIndex][columnName] = value;
    setSheetData(updatedSheetData);
  };

  const handleSubmit = async () => {
    try {
      // Send the updated data back to the Google Sheet
      await axios.post('https://sheets.googleapis.com/v4/spreadsheets/1nqyn0NiCVNsvUbx29jjaACEUKHZDIq2AAmDht3CsF_Q/values/Responses?key=AIzaSyDS0v6viCHbX14CNGlLIO_JExTxvCTF2SA', { data: sheetData });
      console.log('Data successfully updated!');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {sheetData.map((row, rowIndex) => (
          <div key={rowIndex}>
            {/* Render form fields for each column */}
            <label>
              Client:
              <input
                type="text"
                value={row.Client}
                onChange={(e) => handleInputChange(rowIndex, 'Client', e.target.value)}
              />
            </label>
            <label>
              Client:
              <input
                type="text"
                value={row.Client}
                onChange={(e) => handleInputChange(rowIndex, 'Client', e.target.value)}
              />
            </label>
            {/* Repeat for other columns */}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default GoogleSheetForm;