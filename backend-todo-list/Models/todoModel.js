// models/todoModel.js
const mongoose = require('mongoose');


const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    file: String,
    mark: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    status: { type: String, default: "incomplete" }
  }, { timestamps: true,versionKey:false });

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
