const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  console.log('Received token:', authHeader); // Check if the token is received
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC,{ expiresIn: "90d" }, (err, user) => {
      if (err) {
        console.log('Token verification failed:', err); // Check if there's an error during verification
        res.status(403).json("Token is not valid!");
      } else {
        console.log('Token verified successfully.'); // Log successful verification
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};


const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAdmin,
};
