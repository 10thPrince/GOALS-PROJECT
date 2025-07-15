import express from "express";
import {
    createGoal,
    deleteGoal,
    getGoals,
    updateGoal
} from "../controllers/goalController.js";

const router = express.Router();

router.get('/', getGoals)
router.post('/', createGoal)
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)

export default router