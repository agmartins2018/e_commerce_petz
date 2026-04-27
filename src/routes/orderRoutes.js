const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/orderController")
const auth = require("../middleware/authMiddleware")

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Criar pedido
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *                 example: "Compra de notebook"
 *     responses:
 *       200:
 *         description: Pedido criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/checkout/{id}:
 *   post:
 *     summary: Realizar checkout
 *     tags: [Orders]
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
 *         description: Pedido em checkout
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/payments/{id}:
 *   post:
 *     summary: Realizar pagamento
 *     tags: [Orders]
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
 *         description: Pedido pago
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}/cancel:
 *   post:
 *     summary: Cancelar pedido
 *     tags: [Orders]
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
 *         description: Pedido cancelado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Listar pedidos
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Buscar pedido por ID
 *     tags: [Orders]
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
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 */


router.get("/:id", auth, ctrl.getById)
router.get("/", auth, ctrl.list)
router.post("/", auth, ctrl.create)
router.post("/checkout/:id", auth, ctrl.checkout)
router.post("/payments/:id", auth, ctrl.pay)
router.post("/:id/cancel", auth, ctrl.cancel)

module.exports = router