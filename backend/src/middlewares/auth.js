const { verify } = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const accessToken = req.body.header;
  if (!accessToken) return res.json({ message: "User not logged in....." });

  try {
    const validToken = verify(accessToken, "Ram");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = Auth;
