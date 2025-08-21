import Task from '../models/task.js';


export const getTask = async (req, res) => {
    try {
        const Tasks = await Task.find({});
        res.status(200).json(Tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Tasks', error: error.message });
    }
};

export const createTask = async (req, res) => {
    const Task = req.body;
    if (!Task.name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    const newTask = new Task(Task);
    try {
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Task', error: error.message });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const TaskData = req.body;
    try {
        const Task = await Task.findByIdAndUpdate(id, TaskData, { new: true, runValidators: true });
        if (!Task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(Task);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Task', error: error.message });
    }
 };


export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const Task = await Task.findByIdAndDelete(id);
        if (!Task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Task', error: error.message });
    }
};