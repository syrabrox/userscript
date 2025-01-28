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
        #knowunityHelper p {
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
        <p><strong>Current URL:</strong></p>
        <p id="currentUrl">${window.location.href}</p>
        <button id="downloadButton">Download</button>
        <button id="closeButton">Close</button>
        <div id="generatedUrl"></div>
    `;
    document.body.appendChild(helperDiv);

    // Funktion zur Aktualisierung der aktuellen URL
    const updateCurrentUrl = () => {
        const currentUrlElement = document.getElementById('currentUrl');
        currentUrlElement.textContent = window.location.href;
    };

    // URL-Änderungen überwachen
    let lastUrl = window.location.href;
    setInterval(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            updateCurrentUrl();
        }
    }, 500); // Überprüft jede halbe Sekunde, ob sich die URL geändert hat

    // Funktion für den Download-Button
    document.getElementById('downloadButton').addEventListener('click', function () {
        const currentUrl = window.location.href;

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
})