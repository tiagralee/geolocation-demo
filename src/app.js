const express = require('express')
const router = require('./routes/router');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000
app.use(router)

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))