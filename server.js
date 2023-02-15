/*server.js*/

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;


app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.html");
});

server.listen(port, hostname, function() {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});