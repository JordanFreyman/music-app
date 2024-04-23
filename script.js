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


// Function to render tracks on the page
function renderTracks(data) {
    const tracksList = document.getElementById('tracksList');

    // Check if tracksList exists
    if (!tracksList) {
        console.error('Tracks list element not found');
        return;
    }

    // Get the albumID from the URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const albumID = urlParams.get('albumID');

    // Find the tracks data
    const tracksData = data.find(item => item.name === 'tracks');

    // Check if the tracks data exists
    if (!tracksData || !tracksData.data) {
        console.error('Tracks data not found');
        return;
    }

    // Filter tracks data for the specific album ID
    const tracksForAlbum = tracksData.data.filter(track => track.ID === albumID);

    // Iterate over each track in the album
    tracksForAlbum.forEach(track => {
        // Create a div element for the track
        const trackDiv = document.createElement('div');
        trackDiv.classList.add('track');

        // Display track number
        const trackNumber = document.createElement('span');
        trackNumber.textContent = `Track ${track.number}: `;
        trackDiv.appendChild(trackNumber);

        // Display track title
        const trackTitle = document.createElement('span');
        trackTitle.textContent = track.track_title;
        trackDiv.appendChild(trackTitle);

        // Display video URL
        const videoUrl = document.createElement('div');
        videoUrl.textContent = `Video URL: ${track.video_url}`;
        trackDiv.appendChild(videoUrl);

        // Display lyrics
        const lyrics = document.createElement('div');
        lyrics.textContent = `Lyrics: ${track.lyrics}`;
        trackDiv.appendChild(lyrics);

        // Append the track div to the tracks list
        tracksList.appendChild(trackDiv);
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
