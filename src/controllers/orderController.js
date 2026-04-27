const { createOrder, getOrders, getOrderById } = require("../db/database")
const service = require("../services/orderService")


exports.create = (req, res) => {
  const order = createOrder(req.body.amount, req.body.description)
  res.json(order)
}

exports.checkout = (req, res) => {
  //const order = getOrders(req.params.id)
  const order = getOrderById(parseInt(req.params.id))
//  console.log("STATUS REAL ID:", order.id)
//  console.log("STATUS REAL ORDER:", order)

  try {
    service.checkout(order)
    res.json(order)
  } catch (e) {
    res.status(400).send(e.message)
  }
}

exports.pay = (req, res) => {
  const order = getOrderById(parseInt(req.params.id))
  try {
    service.pay(order)
    res.json(order)
  } catch (e) {
    res.status(400).send(e.message)
  }
}

exports.cancel = (req, res) => {
  const order = getOrderById(parseInt(req.params.id))
  try {
    service.cancel(order)
    res.json(order)
  } catch (e) {
    res.status(400).send(e.message)
//    res.status(404).send("Pedido não encontrado")
  }
}

exports.list = (req, res) => {
  const orders = getOrders()
  res.json(orders)
}

exports.getById = (req, res) => {
  const id = parseInt(req.params.id)
  const order = getOrderById(id)

  if (!order) {
    return res.status(404).send("Pedido não encontrado")
  }

  res.json(order)

 
}