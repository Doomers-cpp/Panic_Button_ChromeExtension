document.addEventListener("DOMContentLoaded", () => {
  const enableToggle = document.getElementById("enableToggle");
  const urlInput = document.getElementById("urlInput");

  chrome.storage.sync.get(["enabled", "predeterminedURL"], (data) => {
    enableToggle.checked = data.enabled || false;
    urlInput.value = data.predeterminedURL || "";
  });

  enableToggle.addEventListener("change", () => {
    chrome.storage.sync.set({ enabled: enableToggle.checked });
  });

  urlInput.addEventListener("change", () => {
    chrome.storage.sync.set({ predeterminedURL: urlInput.value });
  });
});
