const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/schema");

(exports.signUp = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    console.log(username, phone, email, password);
    if (!username || !password || !phone || !email) {
      return res
        .status(400)
        .json({ message: "Please Input Username, Password,Phone number,Email" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      phone,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User Created Successfully", newUser });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Error creating user" });
  }
}),
  (exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Please Input Email and Password" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email and password" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      return res
        .status(200)
        .json({ message: "Login Successful", data: user, token });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Error during login" });
    }
  }),
  (exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      return res.status(200).json({ users });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ message: "Error fetching users" });
    }
  });
