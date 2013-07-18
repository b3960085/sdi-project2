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

var isSyncNecessary = function(localArtistCount, remoteArtistCount) {
    // If provided number of artists is less than available, start syncing.
    if (localArtistCount < remoteArtistCount) {
        // True, there are less artists and a sync should be performed
        console.log("Additional artists available. Beginning background sync of " + (remoteArtistCount - localArtistCount) + " remaining artists.");
        return false;
    } else {
        // False, no sync required.
        console.log("All " + localArtistCount + " available artists are synced locally, but a backgrond sync will occur to double check.");
        return true;
    }
}

var syncRemainingArtists = function(currentArtistCount) {
    // Set remaining artists to be synced to initial count.
    var remainingArtists = artistCount - currentArtistCount;
    // Initialize a counter variable.
    var artistsSynced = 0;
    // While there are artists remaining (or a zero-sync in the case of a pre-synced library)
    while (remainingArtists >= 0) {
        // Remove one from to-be-synced count
        remainingArtists--;
        // If the remaining artist count is negative, this denotes that a "zero-sync" was performed.
        if (remainingArtists < 0) {
            console.log("Synced artist information, no additional artists found.");
            // Break to prevent further alteration of artists synced for return.
            break;
        }
        // If the loop has continued, increment the artist synced count and output status.
        artistsSynced++;
        // if (remainingArtists % 10 === 0 || remainingArtists === -1) // Uncomment to reduce output to every 10 artists synced;
        {
            // If there are no remaining artists, output the completed sync count.
            if (remainingArtists === 0) {
                console.log("Sync complete, " + artistsSynced + " artists synced.");
                // The break is to prevent the "zero-sync" outputting to the console.
                break;
            } else {
                // Simple counting output.
                console.log(artistsSynced + " artists synced. " + remainingArtists + " remaining.");
            }
        }
    }
    // Return the number of artists synced
    return artistsSynced;
}

var selectionInformation = function(selectedArtist, selectedAlbum) {
    var artistName = selectedArtist;
    var albumName = selectedAlbum;
    return (albumName + " by " + artistName);
}

// Execution
// Welcome the user to the application.
welcomeMessage(firstRun);
allMusicAvailable = isSyncNecessary(availableArtists, artistCount);
var synchedArtists = syncRemainingArtists(availableArtists);
availableArtists = synchedArtists + availableArtists;
var selection = selectionInformation(selectedArtist, selectedAlbum);