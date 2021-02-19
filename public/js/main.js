const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-container');
const roomName = document.getElementById('chatroom-name');
const userList = document.getElementById('user-list');

// Get username and room
const { username, room, password } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// join room 
socket.emit('joinRoom', { username, room, password });

// check password
socket.on('notauth', () => {
    alert("Wrong Password");
});

// get room and users 
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// Message retrieval from server
socket.on('message', message => {
    outputMessage(message);

    //Scroll Down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//When user sends a message

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    //Send message to server
    socket.emit('chatMessage', msg);

    //Clearing input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM 

function outputMessage(message) {
    const li = document.createElement('li');
    li.classList.add('chat-left');
    li.innerHTML = `<div class="chat-avatar">
                        <div class="chat-name">${message.username}</div>
                    </div>
                    <div class="chat-text">${message.text}</div>
                    <div class="chat-hour">${message.time}<span class="fa fa-check-circle"></span></div>`;
    document.getElementById('chat-box').appendChild(li);
}

// add room name to dom 
function outputRoomName(room) {
    roomName.innerText = room;
}

// add users to dom 
function outputUsers(users) {
    userList.innerHTML = `
        ${users.map(user => `<li class="person">
                                        <p class="name-time">
                                            <span class="name">${user.username}</span>
                                        </p>
                                    </li>`).join('')}
    `
    ;
}