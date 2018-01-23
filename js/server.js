const net = require('net');
let requests = [];
const server = net.createServer((req) => {
  console.log('server: client connected');
  requests.push(req);
  //end when client disconnects
  req.on('end', () => {
    console.log('server: client disconnected');
  });

  //req is an instance of connection
  req.on('data', function (chunk) {
    req.setEncoding('utf8')
    //console.log(chunk.toString());
    //req.write(chunk)
    requests.forEach( function (element) {
      element.write(chunk);
    })
  });
  req.write('server: hello\r\n', );
});

//throw error if server is not found
server.on('error', (err) => {
  throw err;
});

server.listen(6969, function listen() {
  console.log('server bound');
});

server.on('connection', (stream) => {
  console.log('server: someone connected');
});