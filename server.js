import cookieParser from 'cookie-parser'
import express from 'express'

import { todoService } from './services/todo.service.js'
import { loggerService } from './services/logger.service.js'

const app = express()

// Express Config:
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

// Express Routing:
// Get Todo (READ)
app.get('/api/todo/:todoId', (req, res) => {
    const { todoId } = req.params

    todoService.get(todoId)
        .then(todo => res.send(todo))
        .catch(err => {
            loggerService.error('Cannot get todo', err)
            res.status(400).send('Cannot get todo')
        })
})

// Get Todos (READ)
app.get('/api/todo', (req, res) => {
    const filterBy = { 
        isPagingUsed: req.query.isPagingUsed || true,
        pageSize: req.query.pageSize || 5,
        pageIdx: req.query.pageIdx || 0,
        title: req.query.title || '',
        isActive: req.query.isActive || null, 
        sortBy: req.query.sortBy || '',
        isDescending: req.query.isDescending || false, 
    }

    todoService.query(filterBy)
        .then(todos => res.send(todos))
        .catch(err => {
            loggerService.error('Cannot get todos', err)
            res.status(400).send('Cannot get todos')
        })
})

// Save Todos (UPDATE)
app.put('/api/todo/:todoId', (req, res) => {
    const { _id, title, isActive, createdAt } = req.body
    const todoToSave = {
        _id,
        title,
        isActive,
        createdAt,
    }

    todoService.save(todoToSave)
        .then(savedTodo => {
            loggerService.info('Todo saved!', savedTodo)
            res.send(savedTodo)
        })
        .catch(err => {
            loggerService.error('Cannot save todo', err)
            res.status(400).send('Cannot save todo')
        })
})

// Save Todos (CREATE)
app.post('/api/todo/', (req, res) => {
    const { _id, title, isActive, createdAt } = req.body
    const todoToSave = {
        _id,
        title,
        isActive,
        createdAt
    }
    todoService.save(todoToSave)
        .then(savedTodo => {
            loggerService.info('Todo saved!', savedTodo)
            res.send(savedTodo)
        })
        .catch(err => {
            loggerService.error('Cannot save todo', err)
            res.status(400).send('Cannot save todo')
        })
})

// Remove Todo (READ)
app.delete('/api/todo/:todoId', (req, res) => {
    const { todoId } = req.params

    todoService.remove(todoId)
        .then(() => {
            loggerService.info(`Todo ${todoId} removed`)
            res.send(`Todo ${todoId} removed`)
        })
        .catch(err => {
            loggerService.error('Cannot remove todo', err)
            res.status(400).send('Cannot remove todo')
        })
})

const port = 3030
app.listen(port, () =>
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`))