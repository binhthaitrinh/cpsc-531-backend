module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authoriztion denied" });
  }

  try {
    const arr = token.split("-");
    req.user = arr[0];
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
