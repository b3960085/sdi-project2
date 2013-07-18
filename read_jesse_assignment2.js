/*  Jesse Read
    Project 2
    07/18/13
    Theme: A music-playing application for a mobile device. */

// Variable Declaration
var firstRun = true;
// firstRun = false; // Uncomment if "previously run" workflow is desired.
var selectedArtist = "Daft Punk";
var selectedAlbum = "Random Access Memories";
var daftPunkAlbums = ["Homework", "Discovery", "Daft Club", "Human After All", "TRON: Legacy", "TRON: Legacy R3CONF1GUR3D", "Random Access Memories"];
var allMusicAvailable;
var artistCount = 526;
// artistCount = 234; // Uncomment if "fully synced" workflow is desired. Requires firstRun = false
var availableArtists;

// Function Declarations
// Procedure
var welcomeMessage = function(firstLaunch) {
    if (firstLaunch) {
        // True, first time the application has been launched. Display welcome.
        console.log("Welcome to your new streaming music app! Since this is your first launch, the application will now sync artist and album information from your server.");
        availableArtists = 0;
    } else {
        // False, welcome user back and display collection size.
        console.log("Welcome back! You currenty have 234 artists available. Enjoy!");
        availableArtists = 234;
    }
}

// Execution
// Welcome the user to the application.
welcomeMessage(firstRun);
