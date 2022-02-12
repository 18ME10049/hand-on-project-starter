// import React from 'react';
const { verify } = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  //   console.log("Auth: ", req.body);
  const accessToken = req.body.header;
  //   console.log(accessToken);
  if (!accessToken) return res.json({ error: "User not logged inoopopop" });
  try {
    const validToken = verify(accessToken, "RamTeriGangaMeli");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = Auth;
