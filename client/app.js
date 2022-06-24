const socket = io('ws://localhost:8080');

// Listen for messages
socket.on('message', (text) => {
    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el);
});

document.getElementById('message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = document.getElementById('msg-i');

    socket.emit('message', msg.value);
    
    msg.value = "";
});
