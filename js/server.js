const net = require('net');

//array of requests
let requests = [];

const server = net.createServer((req) => {
  console.log('server: client connected');
  req.setEncoding('utf8');
  //push each request instance into requests array
  requests.push(req);

  //end when client disconnects
  req.on('end', () => {
    console.log('server: client disconnected');
    let index = requests.indexOf(req);
    requests.splice(index,1);
    console.log('INDEX OF REMOVED: ' + index);
    console.log('requests of objects left: ' + requests);
  });

  req.write('enter username');
  req.namespace = {};
  req.namespace.username = null;

  //req is an instance of connection
  req.on('data', function (chunk) {
   
  //if you don't have a username , add that to username
  //namespacing to give property to instance
  
    if(req.namespace.username === null){
      req.namespace.username = chunk.trim()
      console.log(req.namespace)
    }else{
      let username = req.namespace.username;
      requests.filter(element => {
        return element !== req;
      })
      .forEach( function (element) {
        element.write(`${username}:${chunk}`);
      });//end forEach
    };//end else

  });// end req.on('data')

});// end create server


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