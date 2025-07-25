import asyncHandler from 'express-async-handler'
import Goal from '../models/goalsModel.js';

//@desc get goals
//@route GET /api/goals
//@access Private
export const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find();

    res.status(200).json({count: goals.length, data: goals})
})

//@desc create goal
//@route POST /api/goals
//@access Private
export const createGoal = asyncHandler(async(req, res) => {
    
    const {text} = req.body;
    
    if(!text){
        res.status(400)
        throw new Error('Please insert the valeu in text')
    }

    const newGoal = {
        text
    }
    const goal = await Goal.create(newGoal)

    res.status(200).json(goal);
})

//@desc update goal
//@route PUT /api/goals/:id
//@access Private
export const updateGoal = asyncHandler(async(req, res) => {
    const {id} = req.params;

    const {text} = req.body;

    if(!text){
        res.status(400)
        throw new Error('Please fill in the field Text!!')
    }

    const newGoal = {
        text
    }
    const updatedGoal = await Goal.findByIdAndUpdate(id, newGoal, {
        new: true
    });

    if(!updatedGoal){
        res.status(404)
        throw new Error('Invalid Id.Please provide valid ID!')
    }
    res.status(200).json({message: "Success",data: updatedGoal})
})

//@desc delete goal
//@route DELETE /api/goals/:id
//@access Private
export const deleteGoal = asyncHandler(async(req, res) => {
    const {id} = req.params;

    const goal = await Goal.findById(id);

    if(!goal){
        res.status(404)
        throw new Error("Invalid Id. Please provide a valid ID!!")
    }

    await Goal.findByIdAndDelete(id);

    res.status(200).json({message: "Goal deletd Succcessfully", id})
})


