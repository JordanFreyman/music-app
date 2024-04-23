

const fs = require('fs');
const jsonData = require('C:/Users/jfrey/Documents/GitHub/music-app/music.json');

// Function to generate HTML content for the tracks
function generateTracksHTML(tracks) {
    let htmlContent = '<!DOCTYPE html>\n<html>\n<head>\n<title>Tracks</title>\n</head>\n<body>\n<h1>Tracks</h1>\n<ul>\n';

    tracks.forEach(track => {
        htmlContent += `<li>${track.track_title} - ${track.number}</li>\n`;
    });

    htmlContent += '</ul>\n</body>\n</html>';

    return htmlContent;
}

// Extract track data from JSON
const tracksData = jsonData.find(item => item.type === 'table' && item.name === 'tracks').data;

// Generate HTML content for tracks
const tracksHTML = generateTracksHTML(tracksData);

// Write HTML content to tracks.html
fs.writeFile('tracks.html', tracksHTML, err => {
    if (err) {
        console.error('Error writing tracks.html:', err);
        return;
    }
    console.log('tracks.html created successfully.');
});


// Function to fetch data from the JSON file
function fetchData() {
    console.log("Fetching data...");
    fetch('music.json')
        .then(response => {
            console.log("Response:", response); // Log the response
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Data:", data); // Log the fetched data
            renderData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}
// Call the fetchData function when the page loads
window.onload = function() {
    console.log("Page loaded, fetching data...");
    fetchData();
};


// Function to render the data on the page
function renderData(data) {
    const dataList = document.getElementById('dataList');

    // Check if dataList exists
    if (!dataList) {
        console.error('Data list element not found');
        return;
    }

    // Iterate over each item in the data
    // Iterate over each item in the data
data.forEach(item => {
    console.log("Item:", item); // Log the current item
    // Check if the item is a table with data
    if (item.type === 'table' && item.data) {
        // Create a table element
        const table = document.createElement('table');
        table.classList.add('data-table'); // Add a class for styling if needed

// Create table header
const headerRow = document.createElement('tr');
Object.keys(item.data[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key === 'IMAGE_NAME' ? 'IMAGE' : key; // Change the header text
    headerRow.appendChild(th);
});
table.appendChild(headerRow);


        // Create table rows for each record
        item.data.forEach(record => {
            const row = document.createElement('tr');
            Object.entries(record).forEach(([key, value]) => {
                const td = document.createElement('td');
                if (key === 'IMAGE_NAME') {
                    const img = document.createElement('img');
                    img.src = value;
                    img.alt = 'Image';
                    img.style.maxWidth = '100px'; // Adjust as needed
                    td.appendChild(img);
                } else {
                    td.textContent = value;
                }
                row.appendChild(td);
            });
            table.appendChild(row);
        });

        // Append the table to the data list
        dataList.appendChild(table);
    }
});

}

// Call the fetchData function when the page loads
window.onload = fetchData;
