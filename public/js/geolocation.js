navigator.geolocation.getCurrentPosition(showPosition, showError);

function showPosition(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude,+" "+longitude);
    document.getElementById('location').innerText = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('location').innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').innerText = "An unknown error occurred.";
            break;
    }
}
function getCityName(latitude, longitude) {
    const apiKey = 'YOUR API';  // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === "OK") {
                const results = data.results;
                const addressComponents = results[0].address_components;
                const city = addressComponents.find(component => component.types.includes("locality")).long_name;
                document.getElementById('location').innerText += `, City: ${city}`;
            } else {
                document.getElementById('location').innerText += ', City not found';
            }
        })
        .catch(error => {
            console.error('Error fetching city name:', error);
            document.getElementById('location').innerText += ', Error fetching city name';
        });
}