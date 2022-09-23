const globalErrorHandler = require("./controllers/error");
const AppError = require("./utils/appError");
const sensexRouter = require("./routes/sensexRoute");
const cors = require("cors");
const connectDB = require("./db/connect");
var bodyParser = require("body-parser");
require("dotenv").config();
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const csrfProtection = csurf({
  cookie: true,
});

// COde for Socket.io
io.on("connection", (socket) => {
  socket.on("stockAdded", (data) => {
    socket.emit("updateStockList", data);
    socket.broadcast.emit("updateStockList", data);
  });
});

// Using Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(csrfProtection, (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken(), { httpOnly: false });
  next();
});

app.get("/", (req, res) => {
  res.send("Server is OK!");
});
app.use("/sensex", sensexRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

const port = 3000;
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  await server.listen(port, () => {
    console.log(`Server is listening on Port ${port}!`);
  });
};

start();
