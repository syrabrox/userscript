(function() {
    'use strict';

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
            const inputField = document.getElementById("knowunity_url");
            if (knowunityUrl && inputField) {
                inputField.value = knowunityUrl;
                generateUrl(); // Run generateUrl function
                sessionStorage.removeItem("knowunityUrl"); // Clean up storage
            }
        });
    }
})();
