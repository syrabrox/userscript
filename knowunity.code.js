(function () {
    const userscript = `
        (function () {
            'use strict';

            const styles = \`
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
                #toggleHelperCircle {
                    position: fixed;
                    top: 10px;
                    right: 10px;
                    z-index: 9998;
                    width: 40px;
                    height: 40px;
                    background-color: #007bff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                #toggleHelperCircle img {
                    width: 24px;
                    height: 24px;
                    filter: brightness(0) invert(1);
                }
            \`;

            const styleElement = document.createElement('style');
            styleElement.innerHTML = styles;
            document.head.appendChild(styleElement);

            const helperDiv = document.createElement('div');
            helperDiv.id = 'knowunityHelper';
            helperDiv.innerHTML = \`
                <h4>Helper Interface</h4><p>v5.0.0</p>
                <p><strong>Current URL:</strong></p>
                <input disabled id="currentUrl"/>
                <button id="downloadButton">Download</button>
                <button id="closeButton">Close</button>
                <div id="generatedUrl"></div>
            \`;

            const toggleHelperCircle = document.createElement('div');
            toggleHelperCircle.id = 'toggleHelperCircle';
            toggleHelperCircle.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/64/64576.png" alt="Toggle Helper">';
            toggleHelperCircle.style.display = 'none';
            const currentUrl = window.location.href;
            document.body.appendChild(toggleHelperCircle);
            document.body.appendChild(helperDiv);

            const updateCurrentUrl = () => {
                const currentUrlElement = document.getElementById('currentUrl');
                currentUrlElement.value = currentUrl; //textContent
            };
            updateCurrentUrl();

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
                    const apiUrl = \`https://apiedge-eu-central-1.knowunity.com/knows/\${extractedId}\`;

                    GM_xmlhttpRequest({
                        method: 'GET',
                        url: apiUrl,
                        onload: function (response) {
                            const jsonResponse = JSON.parse(response.responseText);
                            const contentUrl = jsonResponse.documents[0].contentUrl;

                            // Open the content URL in a new tab
                            GM_openInTab(contentUrl, { active: true });
                        },
                        onerror: function (error) {
                            console.error('Fehler beim Abrufen der API-Daten:', error);
                            alert('Serverfehler oder ungültige URL.');
                        }
                    });
                } else {
                    alert('Keine KnowUnity-ID gefunden. Funktioniert nur auf KnowUnity-Seiten.');
                }
            });

            document.getElementById('closeButton').addEventListener('click', function () {
                const helperDiv = document.getElementById('knowunityHelper');
                if (helperDiv) {
                    helperDiv.style.display = 'none';
                    toggleHelperCircle.style.display = 'flex';
                }
            });

            toggleHelperCircle.addEventListener('click', function () {
                const helperDiv = document.getElementById('knowunityHelper');
                if (helperDiv) {
                    helperDiv.style.display = 'block';
                    toggleHelperCircle.style.display = 'none';
                }
            });
        })();
    `;

    // Erstelle ein <script>-Element und füge den Userscript-Code hinzu
    const script = document.createElement('script');
    script.textContent = userscript;
    document.body.appendChild(script);
})();
