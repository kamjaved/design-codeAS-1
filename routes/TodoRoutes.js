const express = require("express");
const authController = require("../controllers/authController");
const todo = require("../controllers/todoCtrl");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

router
    .route("/")
    .get(todo.getAllTodo)
    .post(todo.createTodo);

router
    .route("/:id")
    .get(todo.getTodo)
    .patch(todo.updateTodo)
    .delete(todo.deleteTodo);

module.exports = router;
