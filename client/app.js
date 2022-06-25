const socket = io('ws://localhost:8080');

const nColors = 20;
let colorMap = {}

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

// Listen for messages
socket.on('message', (name, message) => {
    if (colorMap[name] == null) {
        hue = randInt(nColors) * (360 / nColors);
        colorMap[name] = hue;
    }
    const el = document.createElement('div');
    el.className = "msg-item";
    
    const profile = document.createElement('div');
    console.log(colorMap[name]);
    profile.style.backgroundColor = `hsl(${colorMap[name]}, 70%, 55%)`;
    profile.className = "profile-img";
    profile.innerText = name;
    el.appendChild(profile);

    const msgbody = document.createElement('div');
    msgbody.className = "msg-body";
    el.appendChild(msgbody);

    const pmsg = document.createElement('p');
    pmsg.innerText = message;
    msgbody.appendChild(pmsg);

    document.getElementById('chat').firstElementChild.appendChild(el);
});

document.getElementById('message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const msg = document.getElementById('msg-i');

    socket.emit('message', msg.value);
    
    msg.value = "";
});
