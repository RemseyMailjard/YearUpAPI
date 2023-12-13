const express = require("express");
const app = express();
const port = process.env.PORT || 8005;

// Import the JSON data
const jsonData = require("./data.json");

app.get("/", (req, res) => {
  // Friendly message
  const message = "Hello Year Up Class! Welcome to my Demo API.";

  // List of API endpoints and their descriptions
  const apiEndpoints = {
    "All Users": "https://yearupdemo.azurewebsites.net/api/users",
    "User by ID": "https://yearupdemo.azurewebsites.net/api/users/:id",
    "Users by Group Name":
      "https://yearupdemo.azurewebsites.net/api/users/group/:groupname",
    "Users by Coding Nickname":
      "https://yearupdemo.azurewebsites.net/api/users/nickname/:nickname",
    "Update User":
      "https://yearupdemo.azurewebsites.net/api/users/:id (PUT request)",
    "Delete User":
      "https://yearupdemo.azurewebsites.net/api/users/:id (DELETE request)",
  };

  // Generate HTML list of endpoints
  let endpointsHtml = "<ul>";
  for (const [description, url] of Object.entries(apiEndpoints)) {
    endpointsHtml += `<li>${description}: <a href="${url}">${url}</a></li>`;
  }
  endpointsHtml += "</ul>";

  // Combine message and endpoints list
  const fullMessage = `<p>${message}</p>${endpointsHtml}`;

  // Send the formatted message as a response
  res.send(fullMessage);
});s

app.get("/api/users", (req, res) => {
  res.json(jsonData);
});

// Get User by ID
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = jsonData.find((u) => u.ID === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// Get Users by Group Name
app.get("/api/users/group/:groupname", (req, res) => {
  const groupName = req.params.groupname;
  const groupUsers = jsonData.filter((u) => u.Groupname === groupName);
  res.json(groupUsers);
});

// Get Users by Coding Nickname
app.get("/api/users/nickname/:nickname", (req, res) => {
  const nickname = req.params.nickname;
  const usersWithNickname = jsonData.filter(
    (u) => u.CodingNickname === nickname
  );
  res.json(usersWithNickname);
});

// Update User Information
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedInfo = req.body;
  let userIndex = jsonData.findIndex((u) => u.ID === userId);
  if (userIndex !== -1) {
    jsonData[userIndex] = { ...jsonData[userIndex], ...updatedInfo };
    res.json(jsonData[userIndex]);
  } else {
    res.status(404).send("User not found");
  }
});

// Delete a User
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = jsonData.findIndex((u) => u.ID === userId);
  if (userIndex !== -1) {
    jsonData.splice(userIndex, 1);
    res.send("User deleted successfully");
  } else {
    res.status(404).send("User not found");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
