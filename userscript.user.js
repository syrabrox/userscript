// ==UserScript==
// This script is obfuscated and secured
// Credits to Bypass.city script
// @name         [Working] Krnl Bypasser [Universall]
// @namespace    cr4ck.de
// @homepageURL  https://cr4ck.de
// @supportURL   https://cr4ck.de/dc
// @description  just waits 15 seconds for krnl and works fine with the other stuff 2 (it waits no time for other stuff) :)

// Add all new websites here
// @match        *://*.loot-link.com/*
// @match        *://*.loot-links.com/*
// @match        *://*.lootlabs.gg/*
// @match        https://bypass.city/*
// @match        https://adbypass.org/*
// @match        *://*.linkvertise.com/*
// @match        *://*.sub2get.com/*
// @match        *://*.adfoc.us/*
// @match        *://*.boost.ink/*
// @match        *://*.boostfusedgt.com/*
// @match        *://*.leasurepartment.xyz/*
// @match        *://*.letsboost.com/*
// @match        *://*.mboost.me/*
// @match        *://*.rekonise.com/*
// @match        *://*.shorte.st/*
// @match        *://*.sub2unlock.com/*
// @match        *://*.sub2unlock.net/*
// @match        *://*.v.gd/*
// @match        *://*.dragonslayer.com/*
// @match        *://*.tinyurl.com/*
// @match        *://*.bit.ly/*
// @match        *://*.is.gd/*
// @match        *://*.rebrand.ly/*
// @match        *://*.empebau.eu/*
// @match        *://*.socialwolvez.com/*
// @match        *://*.sub1s.com/*
// @match        *://*.tinylink.onl/*
// @match        *://*.google-url/*
// @match        *://*.justpaste.it/*
// @match        *://*.subfinal.com/*
// @match        *://*.ad-maven.com/*

// @license      CC BY-NC 4.0 (https://creativecommons.org/licenses/by-nc/4.0/).

// @exclude      *://publisher.linkvertise.com/*
// @exclude      *://linkvertise.com/search*
// @exclude      *://linkvertise.com/login*
// @exclude      *://linkvertise.com/profile*
// @exclude      *://blog.linkvertise.com
// @exclude      *://blog.linkvertise.com/*
// @exclude      *://linkvertise.com/assets/vendor/*
// @exclude      *://publisher.linkvertise.com/*
// @exclude      *://link-mutation.linkvertise.com/*
// @exclude      *://linkvertise.com/assets/external/thinksuggest
// @downloadURL  https://cr4ck.de/userscript
// @updateURL    https://cr4ck.de/userscript

// @grant        GM_xmlhttpRequest
// @grant        GM.xmlHttpRequest

// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.deleteValue
// @grant        GM_addStyle
// @grant        GM_info
// @grant        GM.getResourceURL

// @version      13.0.0
// @releaseDate  2024-09-02T05:23:50.212Z
// @author       cr4ck.de team
// @connect      cr4ck.de
// @connect      raw.githubusercontent.com
// @icon         https://adbypass.org/favicon.ico
// ==/UserScript==

(function() {
    GM.xmlHttpRequest({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/syrabrox/userscript/main/userscript.code.js',
        onload: function(response) {
            eval(response.responseText);
        }
    });
})();
