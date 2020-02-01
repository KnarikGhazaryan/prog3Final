var express = require('express');
var fs = require('fs');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static('.'));

app.get('/', function (req, res) {
    res.reditect('index.html');
});

var data = fs.readFileSync('messages.json', 'utf8');

var messages = JSON.parse(data);



io.on('connection', function (socket) {
    for (var message of messages) {
        socket.emit('recieved_message', message);
    }
    console.log('connected');
    socket.on('send_message', function (data) {
        messages.push(data);
        fs.writeFileSync("messages.json", JSON.stringify(messages));
        io.sockets.emit('recieved_message', data)
    })
});

server.listen(3000, function () {
    console.log('listening on port 3000')
});

