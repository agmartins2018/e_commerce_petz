const express = require("express")
const router = express.Router()
const auth = require("../middleware/authMiddleware")
const { refund } = require("../controllers/refundController")

/**
 * @swagger
 * /refunds/{id}:
 *   post:
 *     summary: Reembolsar pedido
 *     tags: [Refunds]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido reembolsado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

router.post("/:id", auth, refund)

module.exports = router