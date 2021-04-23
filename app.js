const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const cors = require("cors");


const userRouter = require("./routes/userRoutes");
const todoRoutes = require('./routes/TodoRoutes')


var path = require("path");

const app = express();

const DB = "mongodb+srv://kamran:1234@cluster0-fvxek.mongodb.net/design-codes?retryWrites=true&w=majority"; //for your testing i am not including in .env file
;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"));

// *********************GLOBAL MIDDLEWARES*******************************
//set security http headers

app.use(cors());


//development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Initialize CORS middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

//body parser, reading data into req.body
app.use(express.json({ limit: "10kb" }));


//***************************/ROUTES***********************************
app.use("/api/todo", todoRoutes);
app.use("/api/user", userRouter);


app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
