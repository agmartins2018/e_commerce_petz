const express = require("express")
const router = express.Router()
const { login } = require("../controllers/authController")

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Token JWT
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */

router.post("/login", login)

module.exports = router