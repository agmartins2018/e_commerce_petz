describe("Auth API", () => {
  it("Deve realizar login com sucesso", () => {
    cy.request("POST", "/auth/login", {
      username: "admin",
      password: "123"
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body).to.have.property("token")
    })
  })

  it("Deve falhar login inválido", () => {
    cy.request({
      method: "POST",
      url: "/auth/login",
      failOnStatusCode: false,
      body: {
        username: "admin",
        password: "errado"
      }
    }).then((res) => {
      expect(res.status).to.eq(401)
    })
  })
})