// ==UserScript==
// @name         Helper Interface
// @namespace    cr4ck Team
// @version      2.0.0
// @description  Redirect to download page with URL input
// @match        https://knowunity.de/*
// @match        https://knowunity.de/app/knows/*
// @match        https://cr4ck.de/*
// @match        https://cr4ck.de/knowunity
// @match        https://cr4ck.de/knowunity.html
// @updateURL    https://cr4ck.de/knowunity
// @downloadURL  https://cr4ck.de/knowunity
// @grant        GM.xmlHttpRequest
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
