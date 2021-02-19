const users = [];

// Add user to chat

function roomExists(user) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].room === user.room) {
            return true;
        }
    }
    return false;
}

function passwordAuth(user) {
    for (var i = 0; i < users.length; i++) {
        if ((users[i].room === user.room) && (users[i].password === user.password) ) {
            return true;
        }
    }
    return false;
}


function userJoin(id, username, room, password) {
    const user = { id, username, room, password };
    if (roomExists(user)) {
        if (passwordAuth(user)) {
            users.push(user);
            return user;
        } else {
            return -1;
        }
    } else {
        users.push(user);
        return user;
    }
}

// get current user 

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// user leaves the chat 

function userLeave(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

// get room users 
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};