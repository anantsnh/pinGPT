// all chats that are pinned
const pinnedChats = {};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'togglePin') {
        const chatId = request.chatId;
        // Toggle the pinned state for the given chat
        pinnedChats[chatId] = !pinnedChats[chatId];

        // Send the updated pinnedChats object to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'updatePins', pinnedChats: pinnedChats });
        });
    }
});
