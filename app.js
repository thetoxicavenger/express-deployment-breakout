const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
    app.use(cors())
} else {
    app.use(compression())
    app.use(helmet())
}

let todos = process.env.NODE_ENV === 'development' ? require('./db/todos.json') : [{ "id": 1, "title": "Brush Teeth", "completed": true }]

app.get('/api/todos', (req, res) => {
    res.json(todos)
})

app.put('/api/todos/:id', (req, res) => {
    todos = todos.map(todo => {
        if (todo.id === req.body.id) {
            todo = req.body
        }
        return todo
    })
    if (process.env.NODE_ENV === 'development') {
        fs.writeFileSync('./db/todos.json', JSON.stringify(todos))
    }
    res.json(req.body)
})

app.listen(3000)