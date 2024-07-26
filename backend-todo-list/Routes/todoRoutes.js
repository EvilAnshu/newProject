// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../Controllers/todoController');

router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);
router.get('/todos', todoController.getAllTodos);
router.get('/todos/:id', todoController.getSingleTodo);
module.exports = router;
