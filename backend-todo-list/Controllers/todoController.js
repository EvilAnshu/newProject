// controllers/todoController.js
const Todo = require('../Models/todoModel');
const upload = require(".././multer");
const baseUrl = 'http://3000/uploads/';
exports.createTodo = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        try {
            const fileUrl = req.file ? `${baseUrl}${req.file.filename}` : null;
            const todoData = {
                title: req.body.title,
                description: req.body.description,
                file: fileUrl,
                mark: req.body.mark,
                status: req.body.status
            };
            const todo = await Todo.create(todoData);
            res.status(201).json(todo);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    });
};
exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getSingleTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todos = await Todo.findById(id);
        res.status(200).json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};