describe("E-commerce API", () => {

  let token
  let orderId

  it("Login", () => {
    cy.request("POST", "/auth/login", {
      username: "admin",
      password: "123"
    }).then((res) => {
      token = res.body.token
      cy.log("Token: "+JSON.stringify(token)) 
    })
  })

  it("Criar pedido", () => {
    cy.request({
      method: "POST",
      url: "/orders",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        amount: 100,
        description: "Notebook"
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.description).to.eq("Notebook")
      orderId = res.body.id
    })
  })

it("Listar Pedidos", () => {
    cy.request({
      method: "GET",
      url: `/orders/`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      cy.log(JSON.stringify(res.body)) 
      console.log("LISTA DE PEDIDOS:", res.body)
    })
  })

  it("Checkout", () => {
    cy.request({
      method: "POST",
      url: `/orders/checkout/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.amount).to.eq(100)
      expect(res.body.status).to.eq("CHECKOUT")
    })
  })

  it("Payment", () => {
    cy.request({
      method: "POST",
      url: `/orders/payments/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.amount).to.eq(100)
      expect(res.body.status).to.eq("PAID")
    })
  })

  it("Cancelamento do Pedido", () => {
    cy.request({
      method: "POST",
      url: `/orders/${orderId}/cancel`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.amount).to.eq(100)
      expect(res.body.status).to.eq("CANCELLED")
    })
  })

  it("Buscar Pedido", () => {
    cy.request({
      method: "GET",
      url: `/orders/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      cy.log(JSON.stringify(res.body)) 
    //  console.log("Pedido:", res.body)
    })
  })

    it("Reembolso do Pedido", () => {
    cy.request({
      method: "POST",
      url: `/refunds/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.amount).to.eq(100)
      expect(res.body.status).to.eq("REFUNDED")
    })
  })

})