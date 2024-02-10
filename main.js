// main.js
document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const usernameInput = document.getElementById('username-input');

    let username = '';

    // Function to fetch and display messages
    function fetchMessages() {
        // You might want to replace this with your PHP backend endpoint
        fetch('get_messages.php')
            .then(response => response.json())
            .then(data => {
                chatBox.innerHTML = "";
                data.forEach(message => {
                    chatBox.innerHTML += `<p><strong>${message.username}:</strong> ${message.message}</p>`;
                });
            })
            .catch(error => console.error('Error fetching messages:', error));
    }

    // Function to send a message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== "") {
            username = usernameInput.value.trim() || 'Anonymous'; // Default to 'Anonymous' if no name is provided

            // You might want to replace this with your PHP backend endpoint
            fetch('send_message.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, message: message }),
            })
            .then(response => response.json())
            .then(data => {
                // Fetch and display messages after sending
                fetchMessages();
            })
            .catch(error => console.error('Error sending message:', error));

            messageInput.value = "";
        }
    }

    // Fetch and display messages initially
    fetchMessages();

    // Set an interval to update the chat every 5 seconds (adjust as needed)
    setInterval(fetchMessages, 5000);
});
