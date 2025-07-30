import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

//@desc Register User
//@route POST /api/users
//@access Public
export const register = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please fill in all Fileds');
    }

    // check if user exist

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400)
        throw new Error('User Already exist!')
    }

    //Hash the password

    const hashedPassword = await bcrypt.hash(password, 10)

    //Create User
    const newUser = {
        name,
        email,
        password: hashedPassword
    }

    const user = await User.create(newUser);

    if (user) {
        res.status(201).json({
            message: 'User Registerd successful!!',
            data: user,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
})

//@desc Authenticate USer
//@route POST /api/users/login
//@access Public
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error('Please fill in all Fileds');
    }

    // check if user exist

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400)
        throw new Error('User Do not exist! Please register!!')
    }

    //password match
    if (await bcrypt.compare(password, user.password)) {
        res.status(200).json({
            user, message: 'User Logged In Successfully!',
            token: generateToken(user._id)
        })
    }
    res.status(400)
    throw new Error('Invalid CreadentialS')
})

//@desc get user data
//@route GET /api/users/me
//@access Private
export const getUsers = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

//generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}