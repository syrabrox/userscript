// ==UserScript==
// @name         Knowunity Downloader
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Redirect to download page with URL input
// @match        *://knowunity.de/knows/*
// @match        https://cr4ck.de/knowunity
// @match        https://cr4ck.de/knowunity.html
// @grant        none
// ==/UserScript==

(function() {
   //GM.xmlHttpRequest({
        //method: 'GET',
        //url: 'https://github.com/syrabrox/userscript/raw/refs/heads/main/knowunity.code.js',
        //onload: function(response) {
            //eval(response.responseText);
      //}
   

    // Check if on knowunity.de/knows/{xy}
    if (window.location.href.includes("knowunity.de/knows/")) {
        // Prompt the user for download confirmation
        if (confirm("Do you want to download this Knowunity page?")) {
            // Directly execute the URL generation function
            generateUrl(window.location.href);
        }
    }

    // Function to generate the URL
    function generateUrl(knowunityUrl) {
        // Extract Know-ID from Link
        var match = knowunityUrl.match(/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/);
        var extractedId = match ? match[0] : null;

        if (extractedId) {
            // Create API Url
            var apiUrl = 'https://apiedge-eu-central-1.knowunity.com/knows/' + extractedId;

            // Fetch JSON from API Url
            fetch(apiUrl)
                .then(response => response.json())
                .then(jsonResponse => {
                    // Extract Content URL pdf
                    var contentUrl = jsonResponse.documents[0].contentUrl;

                    // Open the content URL in a new tab
                    location.href = contentUrl
                })
                .catch(error => {
                    console.error('Error fetching API data:', error);
                    alert('Server Error');
                });
        } else {
            alert('Invalid KnowUnity link. Make sure that a correct URL or ID is entered.');
        }
    }
   //});
})();
