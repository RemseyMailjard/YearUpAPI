const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello Year Up Class - Here is my Demo API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Import the JSON data
const jsonData = require("./data.json");

app.get("/data", (req, res) => {
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
