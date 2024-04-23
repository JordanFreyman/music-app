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

function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
    const fileList = fileInput.files;

    if (fileList.length === 0) {
        console.error('No file selected');
        return;
    }

    const file = fileList[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const data = JSON.parse(event.target.result);
        renderData(data);
    };

    reader.readAsText(file);
}


// Function to render the data on the page
function renderData(data) {
    const dataList = document.getElementById('dataList');

    // Check if dataList exists
    if (!dataList) {
        console.error('Data list element not found');
        return;
    }

    // Iterate over each item in the data
    data.forEach(item => {
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
                // Add click event listener to each row
                row.addEventListener('click', function() {
                    // Redirect to a new page with the tracks for the clicked album
                    const albumID = record.ID; // Assuming there's an ID field in the album data
                    generateTracksPage(albumID); // Generate tracks.html with albumID
                });
                table.appendChild(row);
            });

            // Append the table to the data list
            dataList.appendChild(table);
        }
    });
}

// Function to generate tracks.html with albumID
function generateTracksPage(albumID) {
    // Construct the URL with the albumID parameter
    const tracksURL = `tracks.html?albumID=${albumID}`;

    // Redirect to tracks.html
    window.location.href = tracksURL;
}
// Call the fetchData function when the page loads
window.onload = fetchData;
