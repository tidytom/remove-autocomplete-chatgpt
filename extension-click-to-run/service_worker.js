chrome.action.onClicked.addListener(async (tab) => {
  // only run on ChatGPT
  if (
    !tab.url ||
    (!tab.url.startsWith("https://chatgpt.com/") &&
     !tab.url.startsWith("https://chat.openai.com/"))
  ) {
    return;
  }

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const removeUl = () => {
        document
          .querySelectorAll('ul.w-full.flex-col.p-2\\.5.max-sm\\:px-0.flex')
          .forEach((el) => el.remove());
      };
      removeUl();
      // Only add one observer per page, even if the button is clicked again.
      if (window.__removeAutocompleteObserver) return;
      window.__removeAutocompleteObserver = new MutationObserver(removeUl);
      window.__removeAutocompleteObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });
});
