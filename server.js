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
app.put("/users/:userId", (req, res) => {
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.userId)
  );
  if (findIndex > -1) {
    users[findIndex].name = req.body.name;
    res.status(200).json({ user: users[findIndex] });
  } else {
    res.status(400).json({ message: "no" });
  }
});
app.delete("/users/:id", (req, res) => {
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  console.log("id", req.params.id);
  if (findIndex > -1) {
    const deletedUser = users.splice(findIndex, 1);
    res.status(200).json({ user: deletedUser[0] });
  } else {
    res.status(400).json({ message: "not found " });
  }
});
app.listen(8000, () => {
  console.log("server is running at localhost:8000");
});
