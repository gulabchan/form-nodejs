const http = require("http");
const fs = require("fs");

const server = http.createServer(function (req, res) {
  if (req.method === "POST") {
    let body = "";
    req.on("data", function (chunk) {
      body += chunk.toString();
    });
    req.on("end", function () {
      const data = JSON.parse(body);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        `<h1>Submitted Values:</h1><p>Name: ${data.name}</p><p>Email: ${data.email}</p>`
      );
      res.end();
    });
  } else {
    fs.readFile("./index.html", function (err, data) {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
});

server.listen(process.env.PORT || 3000, function () {
  console.log("Server running on port 3000");
});
