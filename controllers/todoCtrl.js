const Todo = require("../model/todoModel");
const factory = require("./handlerFactory");

exports.createTodo = factory.createOne(Todo);
exports.getAllTodo = factory.getAll(Todo);
exports.getTodo = factory.getOne(Todo);
exports.updateTodo = factory.updateOne(Todo);
exports.deleteTodo = factory.deleteOne(Todo);
