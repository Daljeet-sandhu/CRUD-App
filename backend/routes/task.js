import express from 'express';
import moongoose from 'mongoose';
import { getTask, createTask, updateTask, deleteTask } from '../controllers/task.js';

const router = express.Router();


router.get('/', getTask);


router.post('/',createTask);


router.put('/:id', updateTask);


router.delete('/:id', deleteTask);


export default router;