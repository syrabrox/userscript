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
   // GM.xmlHttpRequest({
        //method: 'GET',
        //url: 'https://github.com/syrabrox/userscript/raw/refs/heads/main/knowunity.code.js',
        //onload: function(response) {
            //eval(response.responseText);
        //}
   // });
    console.log("knowunity downloader")
    // Check if on knowunity.de/knows/{xy}
    if (window.location.href.includes("knowunity.de/knows/")) {
        // Prompt the user for download confirmation
        if (confirm("Do you want to download this Knowunity page?")) {
            // Store the current URL
            const knowunityUrl = window.location.href;

            // Redirect to the download page
            window.location.href = "https://cr4ck.de/knowunity";
            // Store the URL temporarily in sessionStorage to access after redirect
            sessionStorage.setItem("knowunityUrl", knowunityUrl);
        }
    }

    // Check if on cr4ck.de/knowunity or cr4ck.de/knowunity.html
    if (window.location.href === "https://cr4ck.de/knowunity" || window.location.href === "https://cr4ck.de/knowunity.html") {
        window.addEventListener("load", function() {
            const knowunityUrl = sessionStorage.getItem("knowunityUrl");

            if (knowunityUrl) {
                // Use MutationObserver to wait for the input field to load
                const observer = new MutationObserver(() => {
                    const inputField = document.getElementById("knowunity_url");
                    if (inputField) {
                        inputField.value = knowunityUrl;
                        generateUrl(); // Run generateUrl function
                        sessionStorage.removeItem("knowunityUrl"); // Clean up storage
                        observer.disconnect(); // Stop observing once done
                    }
                });

                // Start observing the body for changes to detect the input field
                observer.observe(document.body, { childList: true, subtree: true });
            }
        });
    }
})();
