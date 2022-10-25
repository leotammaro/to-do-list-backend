const { getAuth } = require("firebase-admin/auth");

const verifyToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    getAuth()
      .verifyIdToken(authorization || "")
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        res.locals.uid = uid;
        next();
      })
  } catch (error) {
    res.send("unauthorized").status(400);
  }

};

module.exports = { verifyToken };
