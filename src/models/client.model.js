import mongoose from 'mongoose';

// Lista de distritos de Lima
const limaDistricts = [
    'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Chaclacayo', 'Chorrillos', 
    'Cieneguilla', 'Comas', 'El Agustino', 'La Molina', 'La Victoria', 
    'Lince', 'Lurigancho', 'Lurín', 'Magdalena del Mar', 'Miraflores', 
    'Pueblo Libre', 'Puente Piedra', 'San Borja', 'San Isidro', 'San Juan de Lurigancho', 
    'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel', 
    'Santiago de Surco', 'Surquillo', 'Villa El Salvador', 'Villa María del Triunfo'
];

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Garantiza que no haya correos duplicados
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        enum: limaDistricts, // Restringe los valores a los distritos de Lima
        required: true, // Si quieres hacerlo obligatorio
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Relación con el usuario que registró el cliente
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Client', clientSchema);
