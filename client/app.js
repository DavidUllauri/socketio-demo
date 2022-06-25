const socket = io('ws://localhost:8080');

const nColors = 20;
let colorMap = {}
let roomID = '';

function randInt(max) { return Math.floor( Math.random() * max ); }

let hue = randInt(nColors) * (360 / nColors);

function addDynamicStyles() {
    document.querySelector('button').style.color = `hsl(${hue}, 70%, 55%)`;
    
    const css = `button:hover{ background-color: hsl(${hue}, 70%, 55%); color: #000 !important; cursor: pointer; }`
    let style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}
addDynamicStyles();

function appendMessage(name, message) {
    if (colorMap[name] == null) {
        hue = randInt(nColors) * (360 / nColors);
        colorMap[name] = hue;
    }

    const el = document.createElement('div');
    const profile = document.createElement('div');
    const msgbody = document.createElement('div');
    const pmsg = document.createElement('p');
    const chat = document.getElementById('chat');
    
    el.className = "msg-item";
    el.appendChild(profile);
    el.appendChild(msgbody);

    profile.style.backgroundColor = `hsl(${colorMap[name]}, 70%, 55%)`;
    profile.className = "profile-img";
    profile.innerText = name;

    msgbody.className = "msg-body";
    msgbody.appendChild(pmsg);

    pmsg.innerText = message;

    chat.firstElementChild.appendChild(el);
    chat.scrollTop= chat.scrollHeight;
}

// Listen for messages
socket.on('receive-message', (name, message) => {
    appendMessage(name, message);
});

document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('msg-i');
    socket.emit('send-message', msg.value, roomID);
    msg.value = "";
});

document.getElementById('room-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const room = document.getElementById('room-i');
    socket.emit('join-room', room.value);
    roomID = room.value;
    room.value = "";
});
