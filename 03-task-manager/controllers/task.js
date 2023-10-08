const Task = require('../models/task');
const asyncWrapper = require('../middlewares/async');
const { createCustomError } = require('../errors/custom-error');

// ! Passing the ASYNC wrapper as an argument

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks })
})

const getTask = asyncWrapper(async (req, res, next) => {
    // Grabbing the ID and setting it as taskID variable
    const { id:taskID } = req.params;
    const task = await Task.findOne({_id: taskID});
    if(!task){
        return next(createCustomError( `No task with id : ${taskID}`, 404))
    }
    res.status(200).json({task});
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
});



const updateTask = asyncWrapper(async (req, res) => {
    const {id:taskID} = req.params;
        // new means that it will return the successful task
        // when updating our validation in our model is not working so to run it we need runValidator 
        const task = await Task.findOneAndUpdate(
            {_id: taskID}, 
            req.body, 
            {new: true, runValidators: true});

        if(!task){
            return next(createCustomError( `No task with id : ${taskID}`, 404))
        }
        res.status(200)
        .json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
    const { id:taskID } = req.params;
        const task = await Task.findOneAndDelete({_id: taskID});
        if(!task){
            return next(createCustomError( `No task with id : ${taskID}`, 404))
        }
        res.status(200).json({task});
        // res.status(200).json({
        //     task: null,
        //     status: 'success'
        // });
})


module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}
