import { createServer } from "node:http";

const port = process.env.PORT || 3000;

createServer((req, res) => {
  res.writeHead(200);
  res.end("OK server alive");
}).listen(port, "0.0.0.0", () => {
  console.log("Server listening on", port);
});
