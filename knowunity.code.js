// ==UserScript==
// @name         KnowUnity & Cr4ck Helper
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Zeigt ein Interface mit statischem Titel, Beschreibung und Aktionen auf KnowUnity und cr4ck.de an.
// @author       Dein Name
// @match        https://knowunity.de/*
// @match        https://knowunity.de/app/knows/*
// @match        https://cr4ck.de/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Style für das Interface
    const styles = `
        #knowunityHelper {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            background: white;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            font-family: Arial, sans-serif;
            width: 300px;
        }
        #knowunityHelper button {
            margin-top: 10px;
            margin-right: 5px;
            padding: 8px 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        #knowunityHelper button:hover {
            background-color: #0056b3;
        }
        #knowunityHelper p, #knowunityHelper h4 {
            margin: 10px 0;
        }
        #generatedUrl span {
            color: blue;
            text-decoration: underline;
            cursor: pointer;
        }
    `;

    // Style-Element einfügen
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    // Interface-Div erstellen
    const helperDiv = document.createElement('div');
    helperDiv.id = 'knowunityHelper';
    helperDiv.innerHTML = `
        <h4>Helper Interface</h4>
        <p>This script provides an Interface to download PDF</p>
        <label for="currentUrl">Current URL:</label>
        <input type="text" id="currentUrl" value="${window.location.href}" readonly>
        <button id="downloadButton">Download</button>
        <button id="closeButton">Close</button>
        <div id="generatedUrl"></div>
    `;
    document.body.appendChild(helperDiv);

    // Funktion für den Download-Button
    document.getElementById('downloadButton').addEventListener('click', function () {
        const currentUrl = document.getElementById('currentUrl').value;

        // Extrahiere Know-ID aus der URL (nur für KnowUnity)
        const match = currentUrl.match(/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/);
        const extractedId = match ? match[0] : null;

        if (extractedId) {
            // API-URL erstellen
            const apiUrl = `https://apiedge-eu-central-1.knowunity.com/knows/${extractedId}`;

            // API-Daten abrufen
            fetch(apiUrl)
                .then(response => response.json())
                .then(jsonResponse => {
                    // Content URL extrahieren
                    const contentUrl = jsonResponse.documents[0].contentUrl;

                    // URL anzeigen
                    const generatedUrlDiv = document.getElementById('generatedUrl');
                    generatedUrlDiv.innerHTML = `Content URL: <span id="contentUrl" onclick="window.open('${contentUrl}', '_blank')">${contentUrl}</span>`;
                })
                .catch(error => {
                    console.error('Fehler beim Abrufen der API-Daten:', error);
                    alert('Serverfehler oder ungültige URL.');
                });
        } else {
            alert('Keine KnowUnity-ID gefunden. Funktioniert nur auf KnowUnity-Seiten.');
        }
    });

    // Funktion für den Close-Button
    document.getElementById('closeButton').addEventListener('click', function () {
        const helperDiv = document.getElementById('knowunityHelper');
        if (helperDiv) {
            helperDiv.remove(); // Entfernt das Interface
        }
    });
})();
