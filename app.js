const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Year Up Class - Here is my Demo API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
