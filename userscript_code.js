
  // src/polyfills.ts
  var UserScript = {
    getValue: (key, defaultValue) => {
      return typeof GM_getValue == "undefined" ? GM.getValue(key, defaultValue) : new Promise((resolve) => resolve(GM_getValue(key, defaultValue)));
    },
    setValue: (key, value) => {
      return typeof GM_setValue === "undefined" ? GM.setValue(key, value) : new Promise((resolve) => resolve(GM_setValue(key, value)));
    },
    deleteValue: (key) => {
      return typeof GM_deleteValue === "undefined" ? GM.deleteValue(key) : new Promise((resolve) => resolve(GM_deleteValue(key)));
    },
    addStyle: (css) => {
      return typeof GM_addStyle === "undefined" ? GM.addStyle(css) : new Promise((resolve) => resolve(GM_addStyle(css)));
    },
    xmlHttpRequest: (details) => {
      return typeof GM_xmlhttpRequest === "undefined" ? GM.xmlHttpRequest(details) : GM_xmlhttpRequest(details);
    },
    getResourceURL: (name, fallbackUrl) => {
      return typeof GM_getResourceURL !== "undefined" ? new Promise((resolve) => resolve(GM_getResourceURL(name))) : typeof GM.getResourceUrl !== "undefined" ? GM.getResourceUrl(name) : new Promise((resolve) => resolve(fallbackUrl));
    },
    info: typeof GM_info === "undefined" ? GM.info : GM_info
  };

  // src/config.ts
  var config = {
    version: UserScript.info.script.version,
    buildTime: "9/2/2024, 5:23:50 AM",
    branch: "release",
    release: "bfe0633",
    installed: true,
    releaseTag: "13.0.0 (bfe0633)",
    downloadURL: GM_info.script.downloadURL
  };

  // src/gmWrappedStorage.ts
  var WrappedGet = async (key) => {
    const value = await UserScript.getValue(key);
    return value ? JSON.parse(value) : void 0;
  };
  var WrappedSet = async (key, value) => {
    await UserScript.setValue(key, JSON.stringify(value));
  };

  // src/utils.ts
  var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // src/bypass-city.ts
  var bypassCityListener = async () => {
    if (window.location.hostname !== "bypass.city" && window.location.hostname !== "localhost" && window.location.hostname !== "adbypass.org") {
      return;
    }
    injectScriptInfo();
    sendUserscriptInfoEvent();
    window.addEventListener("bypassComplete", async (event) => {
      const data = event.detail;
      console.log("bypassMessage", data);
      await UserScript.deleteValue("bypass.data");
      await sleep(1);
      WrappedSet("bypass.data", data);
      window.open("https://loot-link.com/", "_self", "noopener,noreferrer");
    });
  };
  var injectScriptInfo = () => {
    const injectJs = `window.scriptInfo = JSON.parse('${JSON.stringify(config)}')`;
    const script = document.createElement("script");
    script.textContent = injectJs;
    document.body.appendChild(script);
  };
  var sendUserscriptInfoEvent = () => {
    const event = new CustomEvent("userScriptInfo", {
      detail: config
    });
    window.dispatchEvent(event);
  };

  // src/notify.scss
  var notify_default = `.notification-tray {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 4000000;
}

.notification {
  position: block;
  margin: 10px;
  padding: 10px;
  padding-right: 20px;
  background-color: #25262b;
  color: white;
  transition: opacity 0.6s; /* 600ms to fade out */
  width: 300px;
  border-radius: 10px; /* Rounded border */
  border: 2px solid #3b5bdb;
  animation: glow 1s ease-in-out infinite alternate;
}

.notification .grid-container {
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
}

.notification .links {
  display: flex;
  justify-content: right;
  align-items: center;
}

.notification .links span {
  padding-bottom: 4px;
  opacity: 0.7;
}

.notification .links a, .notification .links span {
  display: block;
  color: white;
  font-size: 0.8rem;
  padding: 5px;
  margin-bottom: 5px;
}

.grid-item img {
  margin-top: 15px;
  margin-right: 5px;
  width: 32px;
}

.grid-item h3 {
  padding-top: 10px;
  padding-bottom: 3px;
  font-size: 1.5rem;
  color: white;
}

.grid-item p {
  font-style: italic;
  font-size: 1rem;
  color: white;
}
.grid-item p a {
  opacity: 1;
  font-weight: 600;
  text-decoration: underline !important;
  margin-bottom: 8px;
  display: inline-block;
}

.grid-item h3, .grid-item p {
  margin: 0;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px #3b5bdb;
  }
  to {
    box-shadow: 0 0 20px #3b5bdb;
  }
}`;

  // src/notify-element.html
  var notify_element_default = '<div id="bypass-notification" class="notification">\n    <div class="grid-container">\n      <div class="grid-item">\n        <img height="32" id="bypass-logo" alt="B">\n      </div>\n      <div class="grid-item">\n        <h3 id="title"></h3>\n        <p>\n            <span id="text"></span>\n            <a id="help" href="https://cr4ck.de/dc">Get Support on our Discord</a>\n        </p>\n      </div>\n    </div>\n   \n      <div id="links" class="links">\n        <span id="version">Release</span>\n        <span>&#8226;</span>\n        <a  href="https://cr4ck.de/dc">Get Support</a>\n        <span>&#8226;</span>\n        <a href="https://cr4ck.de/privacy">Privacy Policy</a>\n      \n      </div>\n  </div>\n  ';

  // src/logo.svg
  var logo_default = 'data:image/svg+xml,<svg width="1280" height="1280" viewBox="0 0 1280 1280" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M109 180C109 140.788 140.788 109 180 109H1101C1140.21 109 1172 140.788 1172 180V1101C1172 1140.21 1140.21 1172 1101 1172H180C140.788 1172 109 1140.21 109 1101V180Z" fill="%231A1B1E"/>%0A<path d="M611.881 198C1078.56 198 1078.56 733.341 611.881 733.341H407V198H611.881Z" fill="url(%23paint0_linear_1_4)"/>%0A<path d="M611.881 547.659C1078.56 547.659 1078.56 1083 611.881 1083H407V547.659H611.881Z" fill="%231971C2"/>%0A<defs>%0A<linearGradient id="paint0_linear_1_4" x1="684.443" y1="198" x2="684.443" y2="733.341" gradientUnits="userSpaceOnUse">%0A<stop stop-color="%235F3DC4"/>%0A<stop offset="1" stop-color="%235F3DC4" stop-opacity="0"/>%0A</linearGradient>%0A</defs>%0A</svg>%0A';

  // src/notify.ts
  window.scriptStatus = {
    notifyCount: 0
  };
  var BypassElement = class extends HTMLElement {
    static get observedAttributes() {
      return ["text", "title", "is-help"];
    }
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: "open" });
      const div = document.createElement("div");
      div.innerHTML = notify_element_default;
      const style = document.createElement("style");
      style.textContent = notify_default;
      shadow.appendChild(style);
      shadow.appendChild(div);
      shadow.getElementById("bypass-notification").style.opacity = "0";
      shadow.getElementById("version").innerText = config.releaseTag;
      const logoImg = shadow.querySelector("img#bypass-logo");
      logoImg.onload = () => {
        shadow.getElementById("bypass-notification").style.opacity = "1";
      };
      logoImg.src = logo_default;
    }
    connectedCallback() {
      this.updateContent();
    }
    attributeChangedCallback(name, oldValue, newValue) {
      this.updateContent();
    }
    updateContent() {
      const text = this.getAttribute("text") || "";
      const title = this.getAttribute("title") || "";
      const isHelp = this.hasAttribute("is-help");
      const hideLinks = this.hasAttribute("hide-links");
      if (isHelp || hideLinks) {
        this.shadowRoot.getElementById("links").remove();
      }
      this.shadowRoot.getElementById("help").style.display = isHelp ? "block" : "none";
      this.shadowRoot.querySelector("#title").textContent = title;
      this.shadowRoot.querySelector("#text").textContent = text;
    }
  };
  customElements.define("bypass-notification", BypassElement);
  var setupNotifications = () => {
    const style = document.createElement("style");
    style.textContent = notify_default;
    document.head.appendChild(style);
    const tray = document.createElement("div");
    tray.id = "bypass-tray";
    tray.classList.add("notification-tray");
    document.body.appendChild(tray);
  };
  var notify = ({ text, title, isHelp, hideLinks }) => {
    if (!document.getElementById("bypass-tray")) {
      setupNotifications();
    }
    const titleContent = title || "Bypass in progress...";
    const textContent = text || "Please wait while we redirect you";
    const notificationElement = document.createElement("bypass-notification");
    notificationElement.setAttribute("title", titleContent);
    notificationElement.setAttribute("text", textContent);
    if (hideLinks) {
      notificationElement.setAttribute("hide-links", "true");
    }
    if (isHelp) {
      notificationElement.setAttribute("is-help", "true");
    }
    document.getElementById("bypass-tray").appendChild(notificationElement);
  };

  // src/fetch.ts
  var jsonFetch = async (url, options) => {
    return new Promise((resolve, reject) => {
      UserScript.xmlHttpRequest({
        method: options.method,
        data: options.data ? JSON.stringify(options.data) : void 0,
        headers: options.headers,
        url,
        onload: (response) => {
          if (response.responseText && typeof response.responseText === "string") {
            try {
              const data = JSON.parse(response.responseText);
              resolve(data);
            } catch (e) {
              reject();
            }
          } else {
            reject();
          }
        },
        onerror: reject,
        ontimeout: reject,
        onabort: reject,
        timeout: 5e3
      });
    });
  };

  // src/ping.ts
  var ping = async () => {
    try {
      const data = await jsonFetch(
        `${"https://bypass.city"}/.well-known/ping.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return data.ping;
    } catch (e) {
      return false;
    }
  };

  // src/Listener.ts
  var Listener = async () => {
    if (!matchUrl(window.location.href)) {
      return;
    }
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/').slice(0, 3).join('/');
    const bypassData = await WrappedGet("bypass.data");
    if (bypassData) {
      notify({});
      await sleep(2e3);
      const oldUrl = bypassData.url;
      const targetUrl = bypassData.bypassData;
      if(currentUrl.startsWith("https://lootlabs.gg/")){
        window.open(oldUrl, "_self");
        return
      }

      if(currentUrl.startsWith(oldUrl)){
        window.open(targetUrl, "_self");
        await UserScript.deleteValue("bypass.data");
        return
      }
      await sleep(1);
      window.open(targetUrl, "_self");
    } else if (!/(https?:\/\/(loot-link\.com|loot-links\.com|lootlabs\.gg|linkvertise\.com|sub2get\.com|adfoc\.us|boost\.ink|boostfusedgt\.com|leasurepartment\.xyz|letsboost\.com|mboost\.me|rekonise\.com|shorte\.st|sub2unlock\.com|sub2unlock\.net|v\.gd|dragonslayer\.com|tinyurl\.com|bit\.ly|is\.gd|rebrand\.ly|empebau\.eu|socialwolvez\.com|sub1s\.com|tinylink\.onl|google-url\.com|justpaste\.it|subfinal\.com|ad-maven\.com)\/?$)/g.test(window.location.href)) {
      let redirectBase = "https://bypass.city";
      const isPing = await ping();
      if (!isPing) {
        redirectBase = "https://adbypass.org";
      }
      notify({});
      await UserScript.deleteValue("bypass.data");
      const bypassCityUrl = new URL(`${redirectBase}/bypass`);
      bypassCityUrl.searchParams.set("bypass", window.location.href);
      bypassCityUrl.searchParams.set("userscript", "true");
      bypassCityUrl.searchParams.set("userscript-version", config.version);
      window.open(bypassCityUrl.href, "_self");
    }
  };
  var matchUrl = (url) => {
    const regex = /^https?:\/\/(loot-link\.com|loot-links\.com|lootlabs\.gg|linkvertise\.com|sub2get\.com|adfoc\.us|boost\.ink|boostfusedgt\.com|leasurepartment\.xyz|letsboost\.com|mboost\.me|rekonise\.com|shorte\.st|sub2unlock\.com|sub2unlock\.net|v\.gd|dragonslayer\.com|tinyurl\.com|bit\.ly|is\.gd|rebrand\.ly|empebau\.eu|socialwolvez\.com|sub1s\.com|tinylink\.onl|google-url\.com|justpaste\.it|subfinal\.com|ad-maven\.com|cr4ck\.de)/i;
    return regex.test(url)
  };


  // src/main.ts
  (async () => {
    console.info("Userscript", config.version, window.location.href);
    await bypassCityListener();
    await Listener();
  })();
