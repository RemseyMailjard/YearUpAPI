const express = require("express");
const app = express();
const port = process.env.PORT || 8005;

// Import the JSON data
const jsonData = require("./data.json");

app.get("/", (req, res) => {
  // Send a friendly message with a link to your Demo API
  const message =
    "Hello Year Up Class! Welcome to my Demo API. You can access it at: ";
  const apiEndpoint = "https://yearupdemo.azurewebsites.net/api/users";
  const fullMessage = `${message}<a href="${apiEndpoint}">${apiEndpoint}</a>`;

  // Send the formatted message as a response
  res.send(fullMessage);
});

app.get("/api/users", (req, res) => {
  res.json(jsonData);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
