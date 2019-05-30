const express = require('express')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

const app = express()

if (process.env.NODE_ENV !== 'development') {
    app.use(compression())
    app.use(helmet())
} else {
    app.use(cors())
}

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(process.env.PORT || 3000)