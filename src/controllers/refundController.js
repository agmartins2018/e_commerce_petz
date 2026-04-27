const { getOrders, getOrderById } = require("../db/database")
const { refund } = require("../services/orderService")

exports.refund = (req, res) => {
  const order = getOrderById(parseInt(req.params.id))

  try {
    refund(order)
    res.json(order)
  } catch (e) {
    res.status(400).send(e.message)
  }
}