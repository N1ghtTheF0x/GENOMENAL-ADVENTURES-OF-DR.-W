const express = require("express")
const { join } = require("path")

const app = express()

app.use(express.static(join(__dirname,"docs")))

app.listen(8080)