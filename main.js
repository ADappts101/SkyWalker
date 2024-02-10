// main.js
document.addEventListener('DOMContentLoaded', function () {
    const chatBox = document.getElementById('chat-box');
    const messageInput = document.getElementById('message-input');
    const usernameInput = document.getElementById('username-input');

    let username = '';
    const auth = firebase.auth();

    // Function to fetch and display messages
    function fetchMessages() {
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
            username = auth.currentUser ? auth.currentUser.email : 'Anonymous';

            fetch('send_message.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, message: message }),
            })
            .then(response => response.json())
            .then(data => {
                fetchMessages();
            })
            .catch(error => console.error('Error sending message:', error));

            messageInput.value = "";
        }
    }

    // Function to sign up a user
    function signup() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up:", user);
            })
            .catch((error) => {
                console.error("Error signing up:", error.message);
            });
    }

    // Function to log in a user
    function login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User logged in:", user);
            })
            .catch((error) => {
                console.error("Error logging in:", error.message);
            });
    }

    // Function to log out the current user
    function logout() {
        auth.signOut()
            .then(() => {
                console.log("User signed out");
            })
            .catch((error) => {
                console.error("Error signing out:", error.message);
            });
    }

    // Listen for authentication state changes
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in
            console.log("User is signed in:", user);
            fetchMessages();
        } else {
            // User is signed out
            console.log("User is signed out");
        }
    });
});
