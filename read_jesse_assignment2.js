/*  Jesse Read
    Project 2
    07/18/13
    Theme: A music-playing application for a mobile device. */

// Input Declarations
var firstRun = true;
// firstRun = false; // Uncomment if "previously run" workflow is desired.
var selectedArtist = "Daft Punk";
var selectedAlbum = "Random Access Memories";
var daftPunkAlbumsDuration = [225, 709, 211, 268, 301, 238, 452]; // Duration in seconds.
var remoteAvailable = false;
// remoteAvailable = true; // Uncomment to enable "full" remote sync.
var artistCount = 526;
// artistCount = 234; // Uncomment if "fully synced" workflow is desired. Requires firstRun = false
var availableArtists;
var numberOfSelectedSongs = 5;

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
        return false;
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
            return true;

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

var selectedSongDurations = function (numberOfAlbumsSelected, albumList) {
    // Initialize internal variables. Check to see if number of albums selected fits in array.
    var selectedAlbumsAvailable = (numberOfAlbumsSelected <= albumList.length), totalDuration = 0, selectedSongs = [];
    if (!selectedAlbumsAvailable) {
        // The number of albums selected is greater than available.
        console.log("More songs than are available for this album were selected. Only available songs will be counted.");
    }
    // Loop through selected songs from album (starting from the beginning). Stop either when number selected is reached or limit of album is reached.
    for (var currentAlbum = 0; (currentAlbum < numberOfAlbumsSelected && currentAlbum < albumList.length);  currentAlbum++) {
        totalDuration += albumList[currentAlbum];
        selectedSongs.push(albumList[currentAlbum]);
        // After adding the seconds to the total duration, output information about the current song's duration.
        console.log("Song #" + (currentAlbum + 1) + " is " + ~~(albumList[currentAlbum] / 60) + " minutes and " + (albumList[currentAlbum] % 60) + " seconds long.");
    }
    return selectedSongs;
};

var totalSongDuration = function (selectedSongList) {
    var totalDuration = 0;
    selectedSongList.forEach(function (song) {
        totalDuration += song;
    });
    return totalDuration;
};

// Execution
// Welcome the user to the application.
welcomeMessage(firstRun);
// Configure music availablility and need to sync count based off start-up.
var allMusicAvailableLocally = (availableArtists >= artistCount);
var musicToSync = (artistCount - availableArtists);
// Check if the music is available to sync, if it can sync, or if a refresh will be attempted instead
var artistSyncing = willSyncBePerformed(allMusicAvailableLocally, remoteAvailable);
// Attempt the sync/refresh
var syncedArtists = syncRemainingArtists(musicToSync);
// Update the available artist count to reflect added artists, if any.
availableArtists = syncedArtists + availableArtists;
// Gather information regarding the selected album and which artist it is by.
var selection = selectionInformation(selectedArtist, selectedAlbum);
// Gather length of selected songs
var selectedSongs = selectedSongDurations(numberOfSelectedSongs, daftPunkAlbumsDuration);
var selectedSongsTotalDuration = totalSongDuration(selectedSongs);

// Begin final results output. Note that rather than include a "true/false" output, I base the output off the boolean so it sounds natural. Additionally, rather than output a list of the returned songs durations, I return the number of songs listened to and utilize an addition function to reference the total duration of the selected songs.
if (artistSyncing) { console.log("\nThanks for listening, I hope you enjoyed the music!\nToday you listened to " + (selectedSongs.length) + " songs for a total duration of " + ~~(selectedSongsTotalDuration / 60) + " minutes and " + (selectedSongsTotalDuration % 60) + " seconds.\nYour most played album continues to be " + selection + ".\nIn this session, an additional " + syncedArtists + " artists were synced to the device."); }
else { console.log("\n Thanks for listening, I hope you enjoyed the music!\nToday you listened to " + (selectedSongs.length) + " songs for a total duration of " + ~~(selectedSongsTotalDuration / 60) + " minutes and " + (selectedSongsTotalDuration % 60) + " seconds.\nYour most played album continues to be " + selection + ".\nIn this session, an artist sync was not completed but a refresh was. This resulted in " + syncedArtists + " artist additions."); }

// Required output
// I decided to include the required standard outputs to ensure credit is received
var debugOutput = function () {
    console.log("");
    console.log("Debug output:");
    console.log("First run of application: " + firstRun);
    console.log("Remote server available: " + remoteAvailable);
    console.log("Number of remote artists: " + artistCount);
    console.log("Number of local artists: " + availableArtists);
    console.log("Artists were synced: " + artistSyncing);
    console.log("Number of synced artists in session: " + syncedArtists);
    console.log("The most selected item was: " + selection);
    console.log("Number of selected songs: " + numberOfSelectedSongs);
    console.log("Selected songs durations: " + selectedSongs);
};
debugOutput(); // Comment out to remove debug output.