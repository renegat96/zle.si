var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var users = [];
var nicknames = [];

server.listen(8080);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.get('/client.js', function(req, res) {
    res.sendfile(__dirname + '/client.js');
});

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
        users[i].get('nickname', function(err, nick) {
            nicknames.push(nick);
        });
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

io.sockets.on('connection', function (socket) {
    //socket.set('index', index, function() {
    //    console.log(index);
    //    socket.emit('index', { index: index });
    //});
    console.log('shit');
    addUser(socket);
    socket.on('disconnect', function() {
        disconnectUser(socket);
    });
    socket.on('setNickname', function(nickname) {
        socket.set('nickname', nickname, function() {
            updateUsers();
        });
    });
    
    socket.on('publish', function(msg) {
        socket.get('nickname', function(err, nick) {
            console.log(nick, msg);
            sendMessage({nick: nick, messageText: msg});
        });
    });
});

