const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
const connectDB = require("./models/db");
const userRouter = require("./routes/userRoutes");
app.use(cors());
app.use(express.json());

//Import the user Route
app.use("/user", userRouter);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to Home Page" });
});

//mongodb connection
connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
