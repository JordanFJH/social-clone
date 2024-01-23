const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function generateToken(newUser) {
    const payLoad = {
        id: newUser._id,
        username: newUser.username
    }
    return jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: 30 })
}


async function register(req, res) {
    const foundUser = await User.findOne({ username: req.body.username })
    console.log(req.body.username)

    // In case user already exits, do not register
    if (foundUser) {
        return res.status(400).json({ message: "User already exists" })
    }
    try {

        const encryptedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({ ...req.body, password: encryptedPassword })

        const token = generateToken(newUser)

        console.log(token);
        res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        res.send("error")
    }
}

async function login(req, res) {
    // Check if user exists
    const foundUser = await User.findOne({ username: req.body.username })
    if (!foundUser) {
        return res.status(400).json({ message: "User does not exist" })
    }
    try {
        //Check if the password is correct
        const validPassword = await bcrypt.compare(req.body.password, foundUser.password)
        if (validPassword) {
            console.log(foundUser)
            const token = generateToken(foundUser)
            res.status(200).json({ token });
        } else {
            return res.status(400).json({ message: "Bad password" })
        }
    } catch (error) {
        console.log(error)
        res.send("error")
    }
}

module.exports = {
    register,
    login
}