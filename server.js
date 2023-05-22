const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./src/user");
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.get("/", (req, res) => {
  res.send("Welcome server");
});
// app.get('/user', (req, res) => {
//     res.send('Welcome server user')
// })

app.get("/users", async (req, res) => {
  try {
    const Users = await user.find({});
    res.status(200).json(Users);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await user.findById(id);
    res.status(200).json(User);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const User = await user.findByIdAndUpdate(id, req.body);
    if(!User) {
        return res.status(404).json({ message: `khong tim thay ${id}` });
    }

    const updateuser = await User.findById(id);
    res.status(200).json(updateuser);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const User = await user.create(req.body);
    res.status(200).json(User);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:admin12345@callapiuser.l0hbpr4.mongodb.net/Node-API?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`connect success mongoose server`);
    app.listen(port, () => {
      console.log(`listening on port${port}`);
    });
  })
  .catch((err) => console.log(err));
