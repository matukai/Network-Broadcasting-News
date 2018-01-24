const net = require('net');

//array of requests
let requests = [];

const server = net.createServer((req) => {
  console.log('server: client connected');

  //push each request instance into requests array
  requests.push(req);

  //end when client disconnects
  req.on('end', () => {
    console.log('server: client disconnected');

    let index = requests.indexOf(req);
    requests.splice(index,1);
    console.log('INDEX of REMOVED' + index);
    console.log('requests left' + requests);
  });

  //req is an instance of connection
  req.on('data', function (chunk) {
    req.setEncoding('utf8');
    //console.log(chunk.toString());
    //req.write(chunk)
    
    //filter out the element giving the request
    //return array without the element giving request
    requests.filter(element => {
      return element !== req;
    })
    .forEach( function (element) {
      element.write(chunk);
    });

  });
  //req.write('server: hello\r\n', );
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