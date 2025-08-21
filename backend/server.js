import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import TaskRoutes from './routes/task.js';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/tasks', TaskRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running at http://localhost:' + PORT);
});

//McXVFigormkYdOPz