const { createOrder, getOrders, getOrderById } = require("../db/database")

function checkout(order) {
 // console.log("STATUS REAL1:", order.status)

  if (!order) {
    throw new Error("Pedido não encontrado")
  }

  if (order.status !== "CREATED") {
    throw new Error("Pedido não pode ir para checkout")
  }

  order.status = "CHECKOUT"
}

function pay(order) {
  if (!order) {
    throw new Error("Pedido não encontrado")
  }
  if (order.status !== "CHECKOUT") 
    throw Error("Pedido Não está em checkout")
  
  order.status = "PAID"
}

function cancel(order) {
  if (!order) {
    throw new Error("Pedido não encontrado")
  }
  
  if (order.status !== "PAID") 
    throw Error("Para Cancelar é preciso que o pedido esteja Pago")
  
  order.status = "CANCELLED"
}

function refund(order) {
  if (!order) {
    throw new Error("Pedido não encontrado")
  }
  if (order.status !== "CANCELLED") 
    throw Error("Pedido Precisa estar cancelado")
  
  order.status = "REFUNDED"
}

module.exports = { checkout, pay, cancel, refund }