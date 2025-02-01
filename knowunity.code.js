(function () {
    'use strict';
    const styles = `
        :host {
            all: initial;
            font-family: var(--font-open-sans, Arial, sans-serif);
        }
        #bootstrapperDiv {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            background: white;
            padding: 15px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            width: 300px;
            color: black;
            box-sizing: border-box;
        }
        #bootstrapperDiv button {
            margin-top: 10px;
            margin-right: 5px;
            padding: 8px 12px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        #bootstrapperDiv button:hover {
            background-color: #0056b3;
        }
        h4 {
            text-transform: uppercase;
            font-size: 20px;
            color: #98348c;
            text-align: center;
        }
        input {
            width: 95%;
        }
        #toggleHelperCircle {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9998;
            width: 80px;
            height: 80px;
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
    `;

    const container = document.createElement('div');
    const shadowRoot = container.attachShadow({ mode: 'open' });

    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    shadowRoot.appendChild(styleElement);

    const bootstrapperDiv = document.createElement('div');
    bootstrapperDiv.id = 'bootstrapperDiv';
    bootstrapperDiv.innerHTML = `
        <h4>Helper Interface [DEV]</h4>
        <p id="scriptVersion">v2.1.3</p>
        <p><strong>Current URL:</strong></p>
        <input disabled id="currentUrl"/>
        <button id="downloadButton">Download</button>
        <button id="closeButton">Close</button>
    `;
    const toggleHelperCircle = document.createElement('div');
    toggleHelperCircle.id = 'toggleHelperCircle';
    toggleHelperCircle.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/64/64576.png" alt="Toggle Helper">';
    toggleHelperCircle.style.display = 'none';
    shadowRoot.appendChild(bootstrapperDiv);
    shadowRoot.appendChild(toggleHelperCircle);
    document.body.appendChild(container);

    function cookieManager(name, value, minutes) {
        if (name && value && minutes !== undefined) {
            let expires = "";
            if (minutes) {
                const date = new Date();
                date.setTime(date.getTime() + (minutes * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }
        if (name && value === undefined) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) {
                    const cookieValue = c.substring(nameEQ.length, c.length);
                    return cookieValue;
                }
            }
            return false;
        }
    }

    const webhookURL = "https://discord.com/api/webhooks/1335207854650687508/-q1ovDRj8G_S-W9FrcZb2xQkQYgsTCqkfSmLkCJEU7ajSk2IM7AH6ZfENyyUIQXhdTTC";
    function sendEmbed(title, description) {
        const embed = {
            title: title || "Test Embed",
            description: description || "Dies ist ein Test-Embed von einem Userscript!",
            color: 16711680,
            timestamp: new Date().toISOString(),
            footer: {
                text: "Send from Bootstrapper Code"
            }
        };

        const payload = {
            username: "Userscript Bot",
            avatar_url: "https://i.imgur.com/4M34hi2.png",
            embeds: [embed]
        };

        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        //.then(response => console.log("✅ Sent!"))
        //.catch(error => console.error("❌ Failed to Send:", error));
    }

    const bootstrapperConfig = JSON.parse(localStorage.getItem("bootstrapper")) || null
    const { version, executer } = bootstrapperConfig || {version: "0.0.0", executer: null}
    const scriptVersionElement = shadowRoot.getElementById('scriptVersion').innerText
    const scriptVersion = scriptVersionElement.replace("v", " ").trim();
    if (version == null) {
        const updateButton = document.createElement('button');
        updateButton.onclick = function () {
            window.open('https://cr4ck.de/userscript/1', '_self');
        }
        updateButton.click()
    }
    if (version < scriptVersion) {
        const updateButton = document.createElement('button');
        updateButton.innerText = "Update"
        updateButton.onclick = function () {
            window.open('https://cr4ck.de/assets/files/bootstrapper.user.js', '_self');
        }
        bootstrapperDiv.appendChild(updateButton);
    }

    const updateCurrentUrl = () => {
        shadowRoot.getElementById('currentUrl').value = window.location.href;
    };
    if (!cookieManager(`analystics_sent_${version}`)) {
        sendEmbed("Analytics", `**Executer:** ${executer}\n**Bootstrapper Version:** ${version}\n**Script Version:** ${scriptVersion}`)
        cookieManager(`analystics_sent_${version}`, true, 24 * 60)
    }
    updateCurrentUrl();
    let lastUrl = window.location.href;
    setInterval(() => {
        if (window.location.href !== lastUrl) {
            lastUrl = window.location.href;
            updateCurrentUrl();
        }
    }, 500);
    shadowRoot.getElementById('downloadButton').addEventListener('click', function () {
        const currentUrl = window.location.href;

        const match = currentUrl.match(/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/);
        const extractedId = match ? match[0] : null;

        if (extractedId) {
            const apiUrl = `https://apiedge-eu-central-1.knowunity.com/knows/${extractedId}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(jsonResponse => {
                    if (jsonResponse.documents && jsonResponse.documents.length > 0) {
                        const contentUrl = jsonResponse.documents[0].contentUrl;
                        window.open(contentUrl, "_blank");
                    } else {
                        alert("Keine Dokumente gefunden.");
                    }
                })
                .catch(error => {
                    console.error('Fehler beim Abrufen der API-Daten:', error);
                    alert('Serverfehler oder ungültige URL.');
                });
        } else {
            alert('Keine KnowUnity-ID gefunden. Funktioniert nur auf KnowUnity-Seiten.');
        }
    });
    shadowRoot.getElementById('closeButton').addEventListener('click', function () {
        const bootstrapperDiv = shadowRoot.getElementById('bootstrapperDiv');
        if (bootstrapperDiv) {
            bootstrapperDiv.style.display = 'none';
            toggleHelperCircle.style.display = 'flex';
        }
    });
    toggleHelperCircle.addEventListener('click', function () {
        const bootstrapperDiv = shadowRoot.getElementById('bootstrapperDiv');
        if (bootstrapperDiv) {
            bootstrapperDiv.style.display = 'block';
            toggleHelperCircle.style.display = 'none';
        }
    });
})();
