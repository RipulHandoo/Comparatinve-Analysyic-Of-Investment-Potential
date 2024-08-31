const express = require("express")
const app = express()
const cors = require("cors")
const router = require("./routes/test")
const searchRouter = require("./routes/searchResult")
const userRouter = require("./routes/user")
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json())

app.use(router)
app.use(userRouter)
app.use(searchRouter)

app.listen(3000, () => {
    console.log(`Server is running on PORT ${3000}`);
})