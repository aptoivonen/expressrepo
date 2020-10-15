const express = require("express");
const app = express();
const port = 3000;
const wiki = require("./wiki");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("/secret", (req, res, next) => {
  console.log("Accessing the secret section...");
  next();
});

app.use("/wiki", wiki);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
