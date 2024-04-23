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

// Function to render the data on the page
function renderData(data) {
    const dataList = document.getElementById('dataList');

    // Check if dataList exists
    if (!dataList) {
        console.error('Data list element not found');
        return;
    }

    // Clear previous content
    dataList.innerHTML = '';

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

                // Add event listener to each row (album) to show tracks
                row.addEventListener('click', (function(record) {
                    return function(event) {
                        // Debug statement to log the clicked album
                        console.log('Clicked album:', record);
                        // Example: Display an alert with the album title
                        alert('Clicked album: ' + record.album_title);
                    };
                })(record));

                table.appendChild(row);
            });

            // Append the table to the data list
            dataList.appendChild(table);
        }
    });
}
// Call the fetchData function when the page loads
window.onload = fetchData;
