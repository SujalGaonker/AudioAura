// Function to play a song and log it to history
function playSong(song, buttonElement = null) {
    var audio = document.getElementById('audio-player');
    audio.src = song;
    audio.play();

    // Save the current playing button for next/prev navigation
    if (buttonElement) {
        currentSongButton = buttonElement; // Save the button element
    }

    // Log song to history (via AJAX request to PHP)
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "log_history.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("song_name=" + song);
}

// Function to play the previous song in the HTML list
function playPrevious() {
    if (currentSongButton && currentSongButton.previousElementSibling) {
        let prevButton = currentSongButton.previousElementSibling;
        if (prevButton.tagName === 'BUTTON') {
            let song = prevButton.getAttribute('onclick').match(/'([^']+)'/)[1]; // Extract song name from button's onclick
            playSong(song, prevButton); // Play the previous song
        }
    }
}

// Function to play the next song in the HTML list
function playNext() {
    if (currentSongButton && currentSongButton.nextElementSibling) {
        let nextButton = currentSongButton.nextElementSibling;
        if (nextButton.tagName === 'BUTTON') {
            let song = nextButton.getAttribute('onclick').match(/'([^']+)'/)[1]; // Extract song name from button's onclick
            playSong(song, nextButton); // Play the next song
        }
    }
}

// Save reference to the currently playing song's button
let currentSongButton = null;

// Modify playSong button clicks to pass the button element
document.querySelectorAll('.invert').forEach(button => {
    button.addEventListener('click', function() {
        let song = this.getAttribute('onclick').match(/'([^']+)'/)[1]; // Extract song name from onclick
        playSong(song, this); // Pass the button element
    });
});
// Check if the user is logged in by retrieving session data from the server
function checkLogin() {
    fetch('session.php') // Retrieve session data from the back-end
        .then(response => response.json())
        .then(data => {
            const usernameDisplay = document.getElementById('usernameDisplay');
            const loginButton = document.getElementById('loginButton');

            if (data.loggedIn) {
                // User is logged in, show the username next to the login button
                usernameDisplay.textContent = `Hello, ${data.username}!`;
                loginButton.style.display = 'none'; // Hide the login button
                // Optionally, you can add a logout button next to the username
                usernameDisplay.innerHTML += ` <button id="logoutButton" class="invert" onclick="logout()">Logout</button>`;
            } else {
                // User is not logged in, clear the username display
                usernameDisplay.textContent = '';
            }
        })
        .catch(error => console.error('Error fetching session data:', error));
}

// Log out by calling the logout.php script
function logout() {
    fetch('logout.php', { method: 'POST' }) // Ensure method is POST
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                window.location.reload(); // Reload the page to reset the UI
                
            } else {
                alert('Logout failed: ' + data.message); // Debugging information
            }
        })
        .catch(error => console.error('Error during logout:', error)); // Catch fetch errors
}

// Check login status
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

const loginButton = document.getElementById('loginButton');
const accountLink = document.getElementById('accountLink');

if (loginButton && accountLink) {
    if (isLoggedIn) {
        loginButton.style.display = 'none';
        accountLink.style.display = 'inline';
    } else {
        loginButton.style.display = 'inline';
        accountLink.style.display = 'none';
    }
}

// // Logout function for account.html
// function logout() {
//     localStorage.setItem('isLoggedIn', 'false');
//     window.location.href = 'index.html'; // Redirect to login page after logout
// }

// Assuming you have stored the username in local storage after login
window.onload = function() {
    const usernameDisplay = document.getElementById('usernameDisplay');
    const username = localStorage.getItem('username'); // Retrieve username from local storage

    if (username) {
        usernameDisplayy.textContent = `Welcome, ${username}`; // Display username
    } else {
        usernameDisplayy.textContent = 'Welcome, Guest'; // Default message if no username
    }
};

// Load history and check login when the page is loaded
window.onload = function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_history.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById('history-list').innerHTML = xhr.responseText;
        }
    };
    checkLogin();
    xhr.send();
};