const mongoose = require("mongoose")

const FriendSchema = {
    name: String,
    age: Number
}

const FriendModel = mongoose.model("friend", FriendSchema)

module.exports = FriendModel