const jwt = require('jsonwebtoken');

const jwtValidator = (req, res, next) => {
  const token = req.header('x-token');
  if(!token) return res.status(401).json({ ok: false, msg: "You are not authorized to access this resource."});

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ ok: false, msg: "You are not authorized to access this resource."});
  }

  next();
}

module.exports = {
  jwtValidator
}