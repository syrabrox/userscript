//(function() {
   // 'use strict';

    // Check if on a search page (do nothing if true)
    if (window.location.href.includes("knowunity.de/knows/search")) {
        return; // Exit script if on search page
    }

    // Check if on a specific knowunity.de/knows/{xy} page
    if (window.location.href.includes("knowunity.de/knows/")) {
        // Prompt the user for download confirmation
        if (confirm("Do you want to download this Knowunity page?")) {
            // Redirect to cr4ck.de with the current URL as a parameter
            const knowunityUrl = encodeURIComponent(window.location.href);
            window.location.href = `https://cr4ck.de/knowunity.html?link=${knowunityUrl}`;
        }
    }
//})();
