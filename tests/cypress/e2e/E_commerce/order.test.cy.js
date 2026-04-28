describe("Fluxo E2E - Orders", () => {
  let token
  let orderId

  before(() => {
    cy.login().then((t) => {
      token = t
    })
  })

  it("Deve criar um pedido", () => {
    cy.request({
      method: "POST",
      url: "/orders",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        amount: 100,
        description: "Compra de notebook"
      }
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property("id")
      expect(res.body.status).to.eq("CREATED")

      orderId = res.body.id
    })
  })

  it("Deve realizar checkout", () => {
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

  it("Deve realizar pagamento", () => {
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

  it("Deve cancelar pedido", () => {
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

  it("Deve reembolsar pedido", () => {
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