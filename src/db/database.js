let orders = []
let idCounter = 1

function createOrder(amount, description) {
  const order = { id: idCounter++, amount, description, status: "CREATED" }
  orders.push(order)
  return order
}

function getOrders() {
  return orders
}

function getOrderById(id) {
  return orders.find(o => o.id === id)
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById
}