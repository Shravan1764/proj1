//app .js has mainly two purposes, first to create an express server and second to config it
//by config we mean what middleware you use and what apis you use
const express = require("express")
const cookieParser = require("cookie-parser")



const app = express()

//express server cannot read json data from the request body by default, so we need to use express.json() middleware to parse the json data from the request body
app.use(express.json())
app.use(cookieParser())

/**
 * - Routes required
 */
const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")

/**
 * - Use Routes
 */

app.get("/", (req, res) => {
    res.send("Ledger Service is up and running")
})
//means all the requests comming at /api/auth will be handled by authRouter
app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRoutes)

module.exports = app