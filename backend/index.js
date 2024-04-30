const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./src/db/dbconnection");
const config = require("./src/config/config");
const cors = require("cors");
const routes = require("./src/routes/v1");
const path = require("path");
// require("./src/helpers/cron");
// require("./src/middlewares/upload");
// const { Server } = require("socket.io");
const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());



app.use(express.static(path.resolve(__dirname, `./src/public`)));
// io.on("connection", (socket) => {
//   socket.on("notification", (message) => {
//     console.log('Received notification:', message);
//     io.emit("notification", message);
//   });
//     // Handle disconnection
//     socket.on('disconnect', () => {
//       console.log('User disconnected');
//     });
//   });

io.on('connection', (socket) => {
  // console.log('A user connected');

  // Handle disconnection
  socket.on('disconnect', () => {
    // console.log('User disconnected');
  });

  // Handle notification event
  socket.on('sendNotification', (data) => {
    // console.log('Notification received:', data);
    // Broadcast the notification to all connected clients
    io.emit('receiveNotification', data);
  });
});

app.use(express.static(path.resolve(__dirname, `./src/views`)));

app.use("/v1", routes);
app.use(
  "/public/doctorImg",
  express.static(path.join(__dirname, "./src/public/doctorImg"))
);

app.use(
  "/public/patientImag",
  express.static(path.join(__dirname, "./src/public/patientImag"))
);

app.use(
  "/public/specialistImg",
  express.static(path.join(__dirname, "./src/public/specialistImg"))
);

app.use(
  "/public/countryflag",
  express.static(path.join(__dirname, "./src/public/countryflag"))
);

app.use(express.static(path.resolve("./src/views/index.html")));

connectDB();

server.listen(config.port, () => {
  console.log("server listing the port " + config.port);
});
