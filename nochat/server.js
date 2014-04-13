var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
// magic!!!
server.listen(8080);

var users = [];
var nicknames = [];
// vars.

//magic
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/client.js', function(req, res) {
    res.sendfile(__dirname + '/client.js');
});
//magic

function addUser(socket) {
    users.push(socket);
    updateUsers();
}

function disconnectUser(socket) {
    for (var i = 0; i < users.length; ++i) {
        if (users[i] == socket) {
            users.splice(i, 1);
            updateUsers();
            return;
        }
    }
    updateUsers();
}

function updateUsers() {
    console.log(users.length);
    nicknames = [];
    for (var i = 0; i < users.length; i++) {
        nicknames.push(users[i].nick);
    }
    for (var i = 0; i < users.length; i++) {
        users[i].emit('users', nicknames);
    }
}

function sendMessage(data) {
    for (var i = 0; i < users.length; ++i) {
        users[i].emit('msg', data);
    }
}

io.sockets.on('connection', function (socket) { // magic
    addUser(socket);
    socket.on('disconnect', function() {
        disconnectUser(socket);
    });
    socket.on('setNickname', function(nickname) {
        socket.nick = nickname;
        updateUsers();
    });
    
    socket.on('publish', function(msg) {
        console.log(socket.nick, msg);
        var data = 
            { nick: socket.nick
            , messageText: msg
            };
        sendMessage(data);
    });
});

