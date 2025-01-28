(function () {
    'use strict';

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
            transition: all 0.3s ease;
        }
        #knowunityHelper.circle {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: white;
            background-color: #007bff;
            cursor: pointer;
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
    `;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    const helperDiv = document.createElement('div');
    helperDiv.id = 'knowunityHelper';
    helperDiv.innerHTML = `
        <h4>Helpekkkkkkr Interface</h4>
        <p><strong>Current URL:</strong></p>
        <p id="currentUrl">${window.location.href}</p>
        <button id="downloadButton">Download</button>
        <button id="closeButton">Close</button>
        <div id="generatedUrl"></div>
    `;
    document.body.appendChild(helperDiv);

    const updateCurrentUrl = () => {
        const currentUrlElement = document.getElementById('currentUrl');
        currentUrlElement.textContent = window.location.href;
    };

    let lastUrl = window.location.href;
    setInterval(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            updateCurrentUrl();
        }
    }, 500);

    document.getElementById('downloadButton').addEventListener('click', function () {
        const currentUrl = window.location.href;

        const match = currentUrl.match(/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/);
        const extractedId = match ? match[0] : null;

        if (extractedId) {
            const apiUrl = `https://apiedge-eu-central-1.knowunity.com/knows/${extractedId}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(jsonResponse => {
                    const contentUrl = jsonResponse.documents[0].contentUrl;
                    window.open(contentUrl, "_blank");
                })
                .catch(error => {
                    console.error('Fehler beim Abrufen der API-Daten:', error);
                    alert('Serverfehler oder ungültige URL.');
                });
        } else {
            alert('Keine KnowUnity-ID gefunden. Funktioniert nur auf KnowUnity-Seiten.');
        }
    });

    document.getElementById('closeButton').addEventListener('click', function () {
        const helperDiv = document.getElementById('knowunityHelper');
        helperDiv.classList.add('circle');
        helperDiv.textContent = "HI";

        helperDiv.addEventListener('click', function () {
            helperDiv.classList.remove('circle');
            helperDiv.innerHTML = `
                <h4>Helper Interface</h4>
                <p><strong>Current URL:</strong></p>
                <p id="currentUrl">${window.location.href}</p>
                <button id="downloadButton">Download</button>
                <button id="closeButton">Close</button>
                <div id="generatedUrl"></div>
            `;

            document.getElementById('downloadButton').addEventListener('click', function () {
                const currentUrl = window.location.href;
                const match = currentUrl.match(/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/);
                const extractedId = match ? match[0] : null;

                if (extractedId) {
                    const apiUrl = `https://apiedge-eu-central-1.knowunity.com/knows/${extractedId}`;

                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(jsonResponse => {
                            const contentUrl = jsonResponse.documents[0].contentUrl;
                            window.open(contentUrl, "_blank");
                        })
                        .catch(error => {
                            console.error('Fehler beim Abrufen der API-Daten:', error);
                            alert('Serverfehler oder ungültige URL.');
                        });
                } else {
                    alert('Keine KnowUnity-ID gefunden. Funktioniert nur auf KnowUnity-Seiten.');
                }
            });

            document.getElementById('closeButton').addEventListener('click', function () {
                const helperDiv = document.getElementById('knowunityHelper');
                helperDiv.classList.add('circle');
                helperDiv.textContent = "HI";
            });
        });
    });
})();
