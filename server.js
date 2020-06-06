const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

const routes = require("./routes/api");
//Db connect
app.use(cors());
const MONGODB_URI =
  "mongodb+srv://sonu:sonu123@cluster0-w9tfl.mongodb.net/mern?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

app.use(express.json()); //make available  req.body
app.use(express.urlencoded({ extended: false })); //how deep nested object

//HTTP request logger
app.use(morgan("tiny"));

app.use("/api", routes);

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
