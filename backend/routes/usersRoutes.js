import express from "express";
import {
    getUsers,
    login,
    register
} from "../controllers/usersController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/', register)
router.post('/login', login) 
router.get('/me', protect, getUsers)

export default router