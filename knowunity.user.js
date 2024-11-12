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
    GM.xmlHttpRequest({
        method: 'GET',
        url: 'https://github.com/syrabrox/userscript/raw/refs/heads/main/knowunity.code.js',
        onload: function(response) {
            eval(response.responseText);
        }
    });
})();
