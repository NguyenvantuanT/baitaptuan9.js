

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema ({

    name: {
        type: String,
    },
    age: {
        type: String,
    },
    password: {
        type: String,
    },
  
})


let User = mongoose.model("User", UserSchema);

module.exports = {User}