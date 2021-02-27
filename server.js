const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Comment this line when deploying to Heroku
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Budget", { 
  useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
       useFindAndModify: false
     });

// routes
app.use(require("./routes/api.js"));

app.listen(process.env.PORT || 3000, () => {
  console.log("App running on port 3000!");
});