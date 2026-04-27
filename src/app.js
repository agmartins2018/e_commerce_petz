const express = require("express")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const orderRoutes = require("./routes/orderRoutes")
const refundRoutes = require("./routes/refundRoutes")

const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")

const app = express()

app.use(express.json())

app.use("/auth", authRoutes)
app.use("/orders", orderRoutes)
app.use("/refunds", refundRoutes)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = app