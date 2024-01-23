const express = require("express")
const router = express.Router()
const authCtrl = require("../controllers/authController")

router.get("/register", (req, res) => {
    res.send("Register Page")
})

//Creating User
router.post("/register", authCtrl.register)

router.get("/login", (req, res) => {
    res.send("Login page")
})

router.post("/login", authCtrl.login)

module.exports = router