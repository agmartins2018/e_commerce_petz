const jwt = require("jsonwebtoken")
const { SECRET } = require("../config/jwt")

exports.login = (req, res) => {
  const { username, password } = req.body

  if (username === "admin" && password === "123") {
    const token = jwt.sign({ user: username }, SECRET, { expiresIn: "1h" })
    return res.json({ token })
  }

  res.status(401).send("Credenciais inválidas")
}