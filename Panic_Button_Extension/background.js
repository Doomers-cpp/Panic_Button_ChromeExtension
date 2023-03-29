function tarihsilici() {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const now = new Date().getTime();
  const oneDayAgo = now - millisecondsPerDay;

  chrome.browsingData.remove(
    { since: oneDayAgo },
    { appcache: true, cache: true, cookies: true, downloads: true, fileSystems: true, formData: true, history: true, indexedDB: true, localStorage: true, pluginData: true, passwords: true, webSQL: true },
    () => {
      console.log("History deleted.");
    }
  );
}

function yenitab(url) {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.remove(tab.id);
    });
    chrome.tabs.create({ url: url });
  });
}

chrome.commands.onCommand.addListener((command) => {
  chrome.storage.sync.get(["enabled", "predeterminedURL"], (data) => {
    if (command === "panic" && data.enabled) {
      tarihsilici();
      yenitab(data.predeterminedURL || "https://www.youtube.com");
    }
  });
});
