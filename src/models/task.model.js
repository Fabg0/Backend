import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    estado: { // Campo agregado
        type: String,
        enum: ['pendiente', 'en progreso', 'completado'],
        default: 'pendiente',
    },
}, {
    timestamps: true,
});

export default mongoose.model("Task", taskSchema);
