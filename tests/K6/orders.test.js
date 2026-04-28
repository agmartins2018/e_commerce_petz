import http from "k6/http"
import { check, sleep } from "k6"

export const options = {
  stages: [
    { duration: "10s", target: 10 }, // sobe para 10 usuários
    { duration: "20s", target: 20 }, // mantém 20
    { duration: "10s", target: 0 }   // derruba
  ],
  thresholds: {
    http_req_duration: ["p(95)<500"], // 95% < 500ms
    http_req_failed: ["rate<0.01"]    // <1% erro
  }
}

const BASE_URL = "http://localhost:3000"

export default function () {

  // 🔐 LOGIN
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    username: "admin",
    password: "123"
  }), {
    headers: { "Content-Type": "application/json" }
  })

  check(loginRes, {
    "login status 200": (r) => r.status === 200,
    "login tem token": (r) => JSON.parse(r.body).token !== undefined
  })

  const token = JSON.parse(loginRes.body).token

  const headers = {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  }

  // 🛒 CRIAR PEDIDO
  const orderRes = http.post(`${BASE_URL}/orders`, JSON.stringify({
    amount: 100,
    description: "Teste k6"
  }), { headers })

  check(orderRes, {
    "create order 200": (r) => r.status === 200,
    "order tem id": (r) => JSON.parse(r.body).id !== undefined
  })

  const orderId = JSON.parse(orderRes.body).id

  // 🧾 CHECKOUT
  const checkoutRes = http.post(`${BASE_URL}/orders/checkout/${orderId}`, null, { headers })

  check(checkoutRes, {
    "checkout 200": (r) => r.status === 200,
    "status CHECKOUT": (r) => JSON.parse(r.body).status === "CHECKOUT"
  })

  // 💳 PAGAMENTO
  const payRes = http.post(`${BASE_URL}/orders/payments/${orderId}`, null, { headers })

  check(payRes, {
    "payment 200": (r) => r.status === 200,
    "status PAID": (r) => JSON.parse(r.body).status === "PAID"
  })

  sleep(1)
}