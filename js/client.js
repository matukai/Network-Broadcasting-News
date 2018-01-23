const net = require('net');

let client = net.createConnection({ port: 6969 , host: `0.0.0.0`}, () => {
  //connect listener
  console.log('client: connected to server!');


//piping data to connection
  process.stdin.pipe(client);
});

//coming into socket
client.on('data', (data) => {
  console.log(data.toString());
});
//harcoded writing to socket
client.write('world\r\n');


// process.stdin.setEncoding('utf8');
// process.stdin.on('readable', () => {
//   const chunk = process.stdin.read();
//   if (chunk !== null) {
//     process.stdout.write(`data: ${chunk}`);
//   }
// });

// process.stdin.on('end', () => {
//   process.stdout.write('end');
// });