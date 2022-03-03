const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.header("auth-token");
  if (!header) return res.status(401).send({message: "Access Denied"});

  try {
    const bearer = header.split(" ");
    const token = bearer[1];
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    req.decoded = verified;
    next();
  } catch (err) {
    res.status(400).send({message: "Invalid Token"});
  }
};
