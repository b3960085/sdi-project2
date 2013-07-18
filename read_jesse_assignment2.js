/*  Jesse Read
    Project 2
    07/18/13
    Theme: A music-playing application for a mobile device. */

// Input Declarations
var firstRun = true;
// firstRun = false; // Uncomment if "previously run" workflow is desired.
var selectedArtist = "Daft Punk";
var selectedAlbum = "Random Access Memories";
var daftPunkAlbums = ["Homework", "Discovery", "Daft Club", "Human After All", "TRON: Legacy", "TRON: Legacy R3CONF1GUR3D", "Random Access Memories"];
var remoteAvailable = false;
// remoteAvailable = true; // Uncomment to enable "full" remote sync.
var artistCount = 526;
// artistCount = 234; // Uncomment if "fully synced" workflow is desired. Requires firstRun = false
var availableArtists;

// Pre-execution variable definitions
// Check to see if all music is synced and how much needs to be synced.
var allMusicAvailableLocally = (availableArtists >= artistCount);
var musicToSync = (artistCount - availableArtists);

// Function Declarations
// Procedure
var welcomeMessage = function (firstLaunch) {
    "use strict";
    if (firstLaunch) {
        // True, first time the application has been launched. Display welcome.
        console.log("Welcome to your new streaming music app! Since this is your first launch, the application will now sync artist and album information from your server.");
        availableArtists = 0;
    } else {
        // False, welcome user back and display collection size.
        console.log("Welcome back! You currenty have 234 artists available. Enjoy!");
        availableArtists = 234;
    }
};

var willSyncBePerformed = function (musicIsLocal, remoteAvailablilty) {
    // Check need for sync and if remote is available
    if (!musicIsLocal && remoteAvailablilty) {
        // True, music needs to be sync and is able to be synced
        console.log("There are " + (artistCount - availableArtists) + " artists available remotely. A sync will be performed.");
        return true;
    }
    if (allMusicAvailableLocally && remoteAvailablilty) {
        // All music is available locally and the server is available for refresh.
        console.log("All music appears synced locally, a check-in with the server will be performed to refresh artist information.");
    } else {
        if (musicIsLocal) {
            // All music is available locally, but the remote is partially available.
            console.log("All music appears synced locally, but the remote server appears to be experiencing problems. A check-in will be attempted anyways.");
            return false;
        }
        if (!musicIsLocal) {
            // All music is not available locally, but the remote is only partially available.
            console.log("Additional music is available on the server, but it is currently experiencing issues. Only 24 additional artists are able to be synced at this time.");
            musicToSync = 24;
            return false;

        }
    }
};

var syncRemainingArtists = function (artistsToSync) {
    // Set remaining artists to be synced initial count and declare sync counter.
    var remainingArtists = artistsToSync, artistsSynced = 0;
    // While there are artists remaining (or a zero-sync in the case of a pre-synced library)
    while (remainingArtists >= 0) {
        // Remove one from to-be-synced count
        remainingArtists--;
        // If the remaining artist count is negative, this denotes that a "zero-sync" was performed.
        if (remainingArtists < 0) {
            console.log("Synced artist information, no additional artists available.");
            // Break to prevent further alteration of artists synced for return.
            break;
        }
        // If the loop has continued, increment the artist synced count and output status.
        artistsSynced++;
        // if (remainingArtists % 10 === 0 || remainingArtists === -1) // Uncomment to reduce output to every 10 artists synced;
        {
            // If there are no remaining artists, output the completed sync count.
            if (remainingArtists === 0) {
                console.log("Available sync complete, " + artistsSynced + " artists synced.");
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
};

var selectionInformation = function (selectedArtist, selectedAlbum) {
    var artistName = selectedArtist;
    var albumName = selectedAlbum;
    return (albumName + " by " + artistName);
};

// Execution
// Welcome the user to the application.
welcomeMessage(firstRun);
// Check if the music is available to sync, if it can sync, or if a refresh will be attempted instead
var willSync = willSyncBePerformed(allMusicAvailableLocally, remoteAvailable);
// Attempt the sync/refresh
var synchedArtists = syncRemainingArtists(musicToSync);
// Update the available artist count to reflect added artists, if any.
availableArtists = synchedArtists + availableArtists;
// Gather information regarding the selected album and which artist it is by.
var selection = selectionInformation(selectedArtist, selectedAlbum);