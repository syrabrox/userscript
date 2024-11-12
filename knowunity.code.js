(function() {
    'use strict';

    if (window.location.href.includes("knowunity.de/knows/search")) {
        return;
    }

    if (window.location.href.includes("knowunity.de/knows/")) {
        if (confirm("Do you want to download this Knowunity page?")) {
            const knowunityUrl = encodeURIComponent(window.location.href);
            window.location.href = `https://cr4ck.de/knowunity.html?link=${knowunityUrl}`;
        }
    }
})();
