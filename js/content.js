// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Find all chat elements
    const chatElements = document.querySelectorAll('a.flex.py-3.px-3.items-center.gap-3.relative.rounded-md');

    // Iterate through chat elements and add a star icon to each
    chatElements.forEach(chatElement => {
        // Create the star icon element
        const starIcon = document.createElement('div');
        starIcon.className = 'chat-gpt-star';

        // Add event listener for star icon click
        starIcon.addEventListener('click', event => {
            event.preventDefault();
            const chatId = chatElement.getAttribute('data-chat-id');
            // Send a message to the background script
            chrome.runtime.sendMessage({ action: 'togglePin', chatId: chatId });
        });

        // Insert the star icon between the SVG and the text name
        const textElement = chatElement.querySelector('.flex-1.text-ellipsis');
        chatElement.insertBefore(starIcon, textElement);
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'updatePins') {
            const pinnedChats = request.pinnedChats;

            // Iterate through chat elements and update their pinned state
            chatElements.forEach(chatElement => {
                const chatId = chatElement.getAttribute('data-chat-id');

                if (pinnedChats[chatId]) {
                    chatElement.classList.add('pinned-chat');
                } else {
                    chatElement.classList.remove('pinned-chat');
                }
            });

            // Need to implement sorting based on pinned
        }
    });

});
