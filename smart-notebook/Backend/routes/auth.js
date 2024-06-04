const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "secrettoken";

// Route 1 to create new user : POST req, no log in required
router.post("/createuser", [
    //Validate email, name and password 
    body('email', 'Please enter a valid email!').isEmail(),
    body('name', 'Please enter a valid name').isLength({ min: 3 }),
    body('password', 'Please enter a valid password').isLength({ min: 5 })

], async (req, res) => {
    //if there are any errors, return the errors with status code
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    try {
        //check if user with same email id already exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: 'Sorry a user with this email already exist!' });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //create the user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        //send the jwt authentication token to user
        res.json({ authToken });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error!');
    }
})

// Route 2 for login : POST req, no log in required
router.post("/login", [
    // Validate email, name, and password 
    body('email', 'Please enter a valid email!').isEmail(),
    body('password', 'Please enter a valid password').isLength({ min: 5 }),

], async (req, res) => {
    // Initialize success to false
    let success = false;

    // If there are any errors, return the errors with status code
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // Destructure the user input i.e req.body is user input
    const { email, password } = req.body;

    try {
        // Check if the user is already registered or not, fetching the account by the inputted email id
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success, error: 'Invalid credentials!' });
        }

        // Compare the entered password and existing user password
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success, error: 'Invalid credentials!' });
        }

        // If everything is successful, generate and send the jwt authentication token to the user
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error!');
    }
});


// Route 3 to get the details of logged in user : POST req, log in required
router.post("/fetchuser", fetchuser, async (req, res) => {
    try {
        //get the user id which is passed in req object through middleware 'fetchuser'
        let userId = req.user.id;
        // find the user by id and select the fields except password of respective user 
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error!');
    }

})

module.exports = router