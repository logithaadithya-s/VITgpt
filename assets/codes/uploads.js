const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Load the Excel file
const filePath = path.join(__dirname, '../papers/Book2.xlsx');
const workbook = XLSX.readFile(filePath);

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON format (array of objects)
const jsonData = XLSX.utils.sheet_to_json(worksheet);

// Display the existing data (optional)
console.log('Existing Data:', jsonData);

// New data to be added
const newRow = {
  Name: 'John Doe',  // Assuming your columns are 'Name', 'Age', etc.
  Age: 30,
  City: 'New York'
};

// Add the new row of data
jsonData.push(newRow);

// Convert the updated JSON data back to a worksheet
const updatedWorksheet = XLSX.utils.json_to_sheet(jsonData);

// Replace the old worksheet with the updated one
workbook.Sheets[sheetName] = updatedWorksheet;

// Write the updated workbook back to the file
XLSX.writeFile(workbook, filePath);

console.log('New data added successfully!');
