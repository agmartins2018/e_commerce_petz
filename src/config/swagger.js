const path = require("path")
const swaggerJsdoc = require("swagger-jsdoc")


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API com fluxo completo de pedidos, pagamento e reembolso"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],

    tags: [
      { name: "Auth", description: "Autenticação" },
      { name: "Orders", description: "Gestão de pedidos" },
      { name: "Refunds", description: "Reembolsos" }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        Order: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            amount: {
              type: "number",
              example: 100
            },
            description: {
              type: "string",
              example: "Compra de notebook"
            },
            status: {
              type: "string",
              enum: ["CREATED", "CHECKOUT", "PAID", "CANCELLED", "REFUNDED"],
              example: "CREATED"
            }
          }
        },

        LoginRequest: {
          type: "object",
          properties: {
            username: { type: "string", example: "admin" },
            password: { type: "string", example: "123" }
          }
        },

        LoginResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
          }
        }
      }
    }
  },

//  apis: ["src/routes/*.js"]
  apis: [path.join(__dirname, "../routes/*.js")]

}

module.exports = swaggerJsdoc(options)