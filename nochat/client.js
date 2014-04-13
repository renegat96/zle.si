var nick = prompt("Gosho, napishi si imeto");

var socket = io.connect('http://192.168.1.115'); // ПРОМЕНИ ТОЗИ АДРЕС НА СВОЕТО IP, за да могат други да се свързват към теб
socket.emit('setNickname', nick);
socket.on('users', function(nicknames) {
    console.log(nicknames);
});

socket.on('msg', function(data) {
    var messages = document.getElementById('messages');
    var text =
        data.nick + " wrote " + data.messageText;
    messages.innerHTML += "<pre>" + text + "</pre>";
    messages.innerHTML += "<br/>";
});

function submit() {
    var msg = document.getElementById('msg').value;
    console.log(msg);
    document.getElementById('msg').value = "";
    socket.emit('publish', msg);
}
