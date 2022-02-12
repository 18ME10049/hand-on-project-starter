const { verify } = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const accessToken = req.body.header;
  if (!accessToken) return res.json({ error: "User not logged in....." });
  // console.log("In Auth",accessToken,"OUt of Auth");

  try {
    const validToken = verify(accessToken, "Ram");
    req.user = validToken;
    // console.log("in auth" , validToken);
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = Auth;
