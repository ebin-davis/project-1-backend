const express = require("express");
const { signUp,login,getAllUsers } = require("../controller/userController");
const {verifyToken}=require("../middlewares/Auth")
const router = express.Router();

router.post("/signup", signUp);
router.post("/login",login);
router.get("/allusers",verifyToken,getAllUsers);
module.exports=router