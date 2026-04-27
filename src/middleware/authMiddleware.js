const jwt = require("jsonwebtoken")
const { SECRET } = require("../config/jwt")

module.exports = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).send("Sem token")

  const token = auth.split(" ")[1]

  try {
    jwt.verify(token, SECRET)
    next()
  } catch {
    res.status(401).send("Token inválido")
  }
}