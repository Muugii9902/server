const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const obData = JSON.parse(data);
  res.status(200).json({ users: obData.employees });
});
app.post("/users", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const newUser = {
    id: `${employees.length + 1}`,
    ...req.body,
  };
  employees.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify({ employees }));
  res.status(201).json({ user: newUser });
});
app.put("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const findIndex = employees.findIndex((user) => user.id === req.params.id);
  console.log("hsdsd", findIndex);
  if (findIndex > -1) {
    employees[findIndex] = { ...employees[findIndex], ...req.body };
    fs.writeFileSync("users.json", JSON.stringify({ employees }));
    res.status(200).json({ user: employees[findIndex] });
  } else {
    res.status(400).json({ message: "no" });
  }
});
app.delete("/users/:id", (req, res) => {
  const data = fs.readFileSync("./users.json", { encoding: "utf8" });
  const { employees } = JSON.parse(data);
  const findIndex = employees.findIndex((user) => user.id === req.params.id);
  console.log("id", req.params.id);
  if (findIndex > -1) {
    const deletedUser = employees.splice(findIndex, 1);
    fs.writeFileSync("users.json", JSON.stringify({ employees }));
    res.status(200).json({ user: deletedUser[0] });
  } else {
    res.status(400).json({ message: "not found " });
  }
});
app.listen(8000, () => {
  console.log("server is running at localhost:8000");
});
