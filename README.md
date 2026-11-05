# Remove Autocomplete for ChatGPT

Small browser tools for ChatGPT users that remove the autocomplete suggestion list that pops up under the chat box.

## What it does
- Removes the ChatGPT autocomplete suggestion list, and keeps removing it when ChatGPT shows it again.
- Comes in three versions. Pick the one that suits you:

| Version | Folder or file | When it runs | Also removes the greeting |
| --- | --- | --- | --- |
| Bookmarklets | `bookmarklets.html` and the code below | When you click the bookmark | No |
| Extension (automatic) | `extension-automatic/` | Every time you open ChatGPT | Yes, the "What's on the agenda today?" line |
| Extension (click to run) | `extension-click-to-run/` | When you click the extension button | No |

- The bookmarklets and the click-to-run extension work until you reload the page. Click again after a reload.

## What you need
- Google Chrome, or another Chromium browser such as Microsoft Edge or Brave, for the two extensions.
- Any modern browser with a bookmarks bar for the bookmarklets.
- Works on `https://chatgpt.com` and `https://chat.openai.com`.

## Install

### Option A: Bookmarklet (copy and paste)
GitHub removes `javascript:` links from pages it shows, so you cannot drag a bookmarklet from this page. Copy the code instead.

1. Show your bookmarks bar. In Chrome or Edge press **Ctrl+Shift+B** (on a Mac, **Cmd+Shift+B**).
2. Right-click the bookmarks bar and choose **Add page...** (Chrome) or **Add Bookmark...** (Firefox).
3. In **Name**, type `ChatGPT Simple`.
4. In **URL**, paste the whole line below, starting with `javascript:`. Copy it exactly, including the two backslashes.

**ChatGPT Simple** (use this first):

```javascript
javascript:(function(){const removeUl=()=>{document.querySelectorAll('ul.w-full.flex-col.p-2\\.5.max-sm\\:px-0.flex').forEach(el=>el.remove());};removeUl();new MutationObserver(removeUl).observe(document.body,{childList:true,subtree:true});})();
```

**ChatGPT Modified** (use this if the first one stops working):

```javascript
javascript:(function(){const removeUl=()=>{document.querySelectorAll('ul.w-full.flex-col').forEach(el=>el.remove());};removeUl();new MutationObserver(removeUl).observe(document.body,{childList:true,subtree:true});})();
```

5. Click **Save**.

**Another way:** download `bookmarklets.html` to your computer and open the file in your browser. The page has two buttons, **ChatGPT Simple** and **ChatGPT Modified**. Drag a button to your bookmarks bar, or right-click it and choose **Bookmark this link**.

### Option B: Extension (automatic or click to run)
1. Download this repository (green **Code** button, then **Download ZIP**) and unzip it.
2. In Chrome, open `chrome://extensions`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked**.
5. Choose the `extension-automatic` folder or the `extension-click-to-run` folder.
6. The extension appears as **ChatGPT: remove autocomplete (automatic)** or **ChatGPT: remove autocomplete (click to run)**.

## How to use
- **Bookmarklet:** open ChatGPT, then click **ChatGPT Simple** (or **ChatGPT Modified**) on your bookmarks bar. After you reload the page, click it again.
- **Extension (automatic):** open ChatGPT. There is nothing to click.
- **Extension (click to run):** open ChatGPT, then click the extension's button in the toolbar (its tooltip says **Remove autocomplete**). You may need to pin it first with the puzzle-piece icon. After you reload the page, click it again. On other websites the button does nothing.

## Safety notes
- These tools only remove page elements from your own screen. They do not change your ChatGPT account, chats, or settings.
- Nothing is sent, stored, or recorded.
- The automatic extension asks for no permissions and runs only on ChatGPT pages.
- The click-to-run extension asks for **scripting** and **activeTab**. These let it run on the current tab only when you click its button.
- **ChatGPT Modified** removes any list with the classes `w-full flex-col`. If something else on the page disappears, use **ChatGPT Simple** instead.
- To undo, reload the page. To remove an extension, click **Remove** on `chrome://extensions`. To remove a bookmarklet, delete the bookmark.

## Troubleshooting
- **The bookmarklet does nothing.** Check that the URL starts with `javascript:` and that you copied the whole line. Some browsers remove `javascript:` when you paste into the address bar, so paste into the bookmark's URL field.
- **It stopped working after a ChatGPT update.** ChatGPT may have changed its class names. Try **ChatGPT Modified**. For the extensions, update the selector in `content.js` or `service_worker.js` to match the new class names (right-click the list and choose **Inspect** to see them).
- **The list came back.** Bookmarklets and the click-to-run extension stop after a page reload. Click them again, or use the automatic extension.
- **The click-to-run button does nothing.** Make sure the tab address starts with `https://chatgpt.com/` or `https://chat.openai.com/`.

## How it works
Each version finds the suggestion list with a CSS selector (`ul.w-full.flex-col.p-2\.5.max-sm\:px-0.flex`, with the dot and colon escaped), removes every match, and then uses a `MutationObserver` to remove the list again whenever ChatGPT adds it back. The automatic extension is a Manifest V3 content script that runs at `document_start`; it also hides the list with CSS so it never flashes, and it removes the greeting line by matching its exact text. The click-to-run extension uses a service worker and `chrome.scripting.executeScript` on the active tab, and it adds only one observer per page even if you click the button many times.

## License

MIT. See [LICENSE](LICENSE).
