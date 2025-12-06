const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/crudDB")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

// Model
const User = mongoose.model("User", UserSchema);

// Create User
app.post("/create", async (req, res) => {
    const data = new User(req.body);
    await data.save();
    res.send({ message: "User Created", data });
});

// Read Users
app.get("/users", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// Update User
app.put("/update/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: "User Updated" });
});

// Delete User
app.delete("/delete/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: "User Deleted" });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});