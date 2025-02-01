(function () {
    const userscript = `
        (function () {
            'use strict';

            const styles = \`
	    	:root{
      		    --primary-color: #98348c;
                    --primary-color-dark: #7a196f;
                    --secondary-color: #65a0f1;
                    --secondary-color-dark: #4990f3;
                    --secondary-color-darker: #2b3f5f;
                    --gradient-from: rgba(245,36,229,.8);
                    --gradient-to: rgba(80,162,248,.8);
                    --gradient-degree: 45deg;
                    --blue-background-color: #143767;
                    --blue-background-color: #65a0f1;
                    --light-blue-background-color: #88baff;
                    --gray-background-color: #fafafa;
                    --white-background-color: #fff;
                    --headline: #18191a;
                    --caption: #c2c7cc;
                    --text-light-gray: #616366;
                    --text-gray: #919599;
                    --text-dark: #3d3e40;
                    --gray: #9b9b9b;
                    --gray-dark: #6d6d6d;
                    --red: #dc3545;
                    --green: #35dc80;
                    --red-dark: #ff5f6f;
                    --yellow: #dfaa0c;
                    --navbar-height: 70px;
                    --border-radius-small: 2px;
                    --border-radius-large: 8px;
                    --border-radius-huge: 30px;
                    --font-poppins: "Poppins",sans-serif;
                    --font-open-sans: "Open Sans",sans-serif;
                    --font-inter: "Inter",sans-serif;
                }
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
		    color: black;
      		    box-sizing: border-box;
    		    font-family: var(--font-open-sans);
    		    font-size: 18px;
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
		h1, h2, h3, h4, h5, p {
    		    overflow-wrap: break-word;
		}
		#knowunityHelper h4 {
                    text-transform: uppercase;
    		    font-size: 20px;
    		    color: var(--primary-color);
    		    text-align: center;
                }
                #knowunityHelper p {
                    margin: 10px 0;
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
                <h4>Helper Interface</h4>
		<p id="scriptVersion">v2.0.6</p>
                <p><strong>Current URL:</strong></p>
                <input disabled id="currentUrl"/>
                <button id="downloadButton">Download</button>
                <button id="closeButton">Close</button>
            \`;

            const toggleHelperCircle = document.createElement('div');
            toggleHelperCircle.id = 'toggleHelperCircle';
            toggleHelperCircle.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/512/64/64576.png" alt="Toggle Helper">';
            toggleHelperCircle.style.display = 'none';
            const currentUrl = window.location.href;
	    document.body.appendChild(toggleHelperCircle);
            document.body.appendChild(helperDiv);

	    const bootstrapperVersion = localStorage.getItem("bootstrapperVersion");
	    const scriptVersionElement = document.getElementById('scriptVersion').innerText
	    const scriptVersion = scriptVersionElement.replace("v", " ").trim();
            if(bootstrapperVersion == null){
	        const updateButton = document.createElement('button');
                updateButton.innerText = "Update"
                updateButton.onclick = function() {
                	window.open('https://cr4ck.de/userscript/1', '_self');
            	}
		updateButton.click()
             }
	     if (bootstrapperVersion < scriptVersion){
              	const updateButton = document.createElement('button');
                updateButton.innerText = "Update"
                updateButton.onclick = function() {
                	window.open('https://cr4ck.de/assets/files/knowunity.user.js', '_self');
            	}
		helperDiv.appendChild(updateButton);
	     }

            const updateCurrentUrl = () => {
                const currentUrlElement = document.getElementById('currentUrl');
                currentUrlElement.value = currentUrl;
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
    const script = document.createElement('script');
    script.textContent = userscript;
    document.body.appendChild(script);
})();
