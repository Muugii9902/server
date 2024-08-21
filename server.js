const express = require("express");
const fs =require("fs");

const app = express();
app.use(express.json());


app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json",{encoding:'utf8'});
  const obData = JSON.parse(data)
  res.status(200).json({ users: obData.users });
});
app.post("/users", (req, res) => {
  const data = fs.readFileSync("./users.json",{encoding:'utf8'});
  const {users} = JSON.parse(data);
  const newUser = {
    id: `${users.length + 1}`,
    name: req.body.name,
    age: req.body.age,
  };
  users.push(newUser);
  fs.writeFileSync(".users.json",JSON.stringify({users}));
  res.status(201).json({ user: newUser });
});
app.put("/users/:userId", (req, res) => {
  const data = fs.readFileSync("./users.json",{encoding:'utf8'});
  const {users} = JSON.parse(data);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.userId)
  );
  if (findIndex > -1) {
    users[findIndex].name = req.body.name;
    fs.writeFileSync(".users.json",JSON.stringify({users}));
    res.status(200).json({ user: users[findIndex],data:"" });
  } else {
    res.status(400).json({ message: "no" });
  }
});
app.delete("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json",{encoding:'utf8'});
  const {users} = JSON.parse(data);
  const findIndex = users.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );
  console.log("id", req.params.id);
  if (findIndex > -1) {
    const deletedUser = users.splice(findIndex, 1);
    fs.writeFileSync(".users.json",JSON.stringify({users}));
    res.status(200).json({ user: deletedUser[0] });
  } else {
    res.status(400).json({ message: "not found " });
  }
});
app.listen(8000, () => {
  console.log("server is running at localhost:8000");
});
