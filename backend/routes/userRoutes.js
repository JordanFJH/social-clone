const express = require("express")
const router = express.Router()
const userCtrl = require("../controllers/userController")


// Showing user info
router.get("/", userCtrl.show)


module.exports = router