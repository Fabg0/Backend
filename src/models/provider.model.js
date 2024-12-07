import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The provider name is required'],
        trim: true, // Elimina espacios en blanco innecesarios
    },
    ruc: {
        type: String,
        required: [true, 'The RUC is required'],
        unique: true, // Asegura que el RUC sea único
        match: [/^\d{11}$/, 'RUC must have 11 digits'], // Validación para RUC peruano
    },
    phone: {
        type: String,
        required: false,
        match: [/^\d{9}$/, 'Phone must have 9 digits'], // Validación para teléfonos peruanos
    },
    email: {
        type: String,
        required: true,
        unique: true, // Asegura que el email sea único
        match: [/\S+@\S+\.\S+/, 'Email is not valid'], // Validación de formato de email
    },
    address: {
        type: String,
        required: false,  // Cambiado a no obligatorio
        trim: true,
      },      
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Relación con el usuario que creó el proveedor
        required: true,
    },
}, {
    timestamps: true, // Genera automáticamente `createdAt` y `updatedAt`
});

export default mongoose.model('Provider', providerSchema);
