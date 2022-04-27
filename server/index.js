const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const FriendModel = require("./Models/Friends");

const app = express("express");
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/SimpleCRUD");

//                                             INSERT DATA

app.post("/insert", async (req, res) => {
  const friend = new FriendModel({ name: req.body.name, age: req.body.age });
  await friend.save();
  res.send(friend)
});

//                                         READ DATA FROM DATABASE

app.get("/read", (req, res) => {
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//                                            UPDATE THE DATA

app.put("/update", async (req, res) => {
  const newAge = req.body.newAge
  const id = req.body.id

  try {
      FriendModel.findById(id, (err,foundFriend) => {
          foundFriend.age = Number(newAge)
          foundFriend.save()
      })
  } catch (err) {
      console.log(err)
  }

  res.send("Value Updated")
});

//                                              DELETE THE DATA

app.delete("/delete/:id", async (req,res) => {
    const id = req.params.id
    await FriendModel.findByIdAndRemove(id).exec()
    res.send("Item deleted")
})

app.listen(3001, () => console.log("Server started at 3001... "));
