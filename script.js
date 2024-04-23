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

    // Clear dataList before rendering new data
    dataList.innerHTML = '';

    // Iterate over each item in the data
    data.forEach(item => {
        console.log("Item:", item); // Log the current item
        // Check if the item is an album with data
        if (item.type === 'album' && item.data) {
            // Create a clickable album element
            const albumElement = document.createElement('div');
            albumElement.classList.add('album');
            albumElement.textContent = `${item.data.artist} - ${item.data.title}`;
            // Add click event listener to navigate to tracks.html
            albumElement.addEventListener('click', () => {
                // Navigate to tracks.html with album ID as query parameter
                window.location.href = `tracks.html?album_id=${item.data.id}`;
            });
            // Append the album element to the data list
            dataList.appendChild(albumElement);
        }
    });
}
// Call the fetchData function when the page loads
window.onload = fetchData;
