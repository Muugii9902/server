const express = require("express");
const app = express();
app.use(express.json());
const users = [{ id: 1, name: "naraa", age: 20 }];

app.get("/users", (req, res) => {
  res.status(200).json({ users: users });
});
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});
app.put("/users/userId", (req, res) => {
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req, params.userId)
  );
  res.status("put request is successfully");
});
app.delete("/", (req, res) => {
  res.send("delete request is successfully");
});
app.listen(8000, () => {
  console.log("server is running at localhost:8000");
});
