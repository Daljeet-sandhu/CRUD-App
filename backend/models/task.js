import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }

}, {
    timestamps: true
}
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;