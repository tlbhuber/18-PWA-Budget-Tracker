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
// mongoose.connect("mongodb://localhost/Budget", {useNewUrlParser: true, useFindAndModify: false});

// Comment this line out when pushing to gitHub (Uncomment when deploying to Heroku)
    mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost/Budget',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      }
    );

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});