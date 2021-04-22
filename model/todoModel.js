const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please Insert Title!"]
    },
    desc: {
        type: String,
    },

});


module.exports = Todos = mongoose.model("Todos", TodoSchema);
