const jwt = require('jsonwebtoken');
const JWT_SECRET = "secrettoken";

const fetchuser = (req, res, next) => {
    //get user token from jwt token (token sent in req header)
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using valid token!" });
    }
    try {
        // verify the token of a user and secret string
        let data = jwt.verify(token, JWT_SECRET);

        // get the user data from token and add it to req object
        req.user = data.user;

        // execute the next middleware
        next()

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using valid token!" });
    }
}

module.exports = fetchuser