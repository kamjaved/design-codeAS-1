const { promisify } = require("util");
const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

exports.signup = catchAsync(async (req, res, next) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
        company: req.body.company
    });

    res.json({ user });

    next();
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    //1. Check if email and password exist
    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }

    //2. check if user exist and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password", 401));
    }

    //3. if everything is ok, send token to client

    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
    );
});

exports.protect = catchAsync(async function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return next(
            new AppError("You are not logged in! Please login to get access", 401)
        );
    }
    //2. Verification of the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    //3. Check if user still exists
    const currentUser = await User.findById(decoded.user.id);

    if (!currentUser) {
        return next(
            new AppError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );
    }

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You do not have permission to perform this action", 403)
            );
        }

        next();
    };
};

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};

exports.getUser = factory.getOne(User);



