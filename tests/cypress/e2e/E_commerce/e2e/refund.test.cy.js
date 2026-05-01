describe("Fluxo E2E - Refunds", () => {
  let token
  let orderId

  before(() => {
    cy.login().then((t) => {
      token = t
    })
  })

  it("Deve criar pedido para reembolso", () => {
    cy.request({
      method: "POST",
      url: "/orders",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        amount: 200,
        description: "Pedido para teste de reembolso"
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.status).to.eq("CREATED")

      orderId = res.body.id
    })
  })

  it("Deve fazer checkout do pedido", () => {
    cy.request({
      method: "POST",
      url: `/orders/checkout/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.status).to.eq("CHECKOUT")
    })
  })

  it("Deve pagar o pedido", () => {
    cy.request({
      method: "POST",
      url: `/orders/payments/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.status).to.eq("PAID")
    })
  })

  it("Deve cancelar o pedido", () => {
    cy.request({
      method: "POST",
      url: `/orders/${orderId}/cancel`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.status).to.eq("CANCELLED")
    })
  })

  it("Deve realizar reembolso", () => {
    cy.request({
      method: "POST",
      url: `/refunds/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.status).to.eq("REFUNDED")
    })
  })
})  
