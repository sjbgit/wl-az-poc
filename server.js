var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var io = require('socket.io')(server);

app.use(express.static('client'));

var slides = [];

var addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://placekitten.com/' + newWidth + '/300',
      text: ['1 - More','2 - Extra','3 - Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
}

for (var i=0; i<4; i++) {
    addSlide();
    console.log('added slide');
}

var slide = { image: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjA2OTA5NTUyMF5BMl5BanBnXkFtZTcwNjMwNzYzMw@@._V1_UY317_CR10,0,214,317_AL_.jpg',
	text: 'CEO of WhiteLine - Betty White'
};

slides.push(slide);

app.get('/api/slides', function(req, res) {
  console.log('sending slides');
  res.send(JSON.stringify(slides));
});

io.on('connection', function(socket) {
  socket.on('message', function(msg) {
    io.emit('message', msg);
    console.log(msg);
  });
  socket.on('disconnect', function () {
    io.emit('message', "User disconnected");
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Chat server running at", addr.address + ":" + addr.port);
});
