const express = require('express')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'development') {
    app.use(compression())
    app.use(helmet())
} else {
    app.use(cors())
}

app.get('/api/todos', (req, res) => {
    const todos = require('./db/todos.json')
    res.json(todos)
})

app.put('/api/todos/:id', (req, res) => {
    let todos = require('./db/todos.json')
    todos = todos.map(todo => {
        if (todo.id === req.body.id) {
            todo = req.body
        }
        return todo
    })
    fs.writeFileSync('./db/todos.json', JSON.stringify(todos))
    res.json(req.body)
})

app.listen(process.env.PORT || 3000)