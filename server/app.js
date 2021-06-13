const express = require("express");
const port = 8181;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const game =require("./routes/games")
const connect = mongoose
  .connect(
    "mongodb://localhost/my_app",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    console.log("successful connection to mongodb")
  )
  .catch((err) => {
    console.error(err);
  });
app.use(cors());
app.use(express.json());
app.use("/api/games",game)



const http = require("http").Server(app);

http.listen(port, () => {
  console.log(`server run on port ${port}`);
});