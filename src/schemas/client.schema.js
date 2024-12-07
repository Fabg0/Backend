import { z } from "zod";

// Lista de distritos de Lima
const limaDistricts = [
  'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Chaclacayo', 'Chorrillos', 
  'Cieneguilla', 'Comas', 'El Agustino', 'La Molina', 'La Victoria', 
  'Lince', 'Lurigancho', 'Lurín', 'Magdalena del Mar', 'Miraflores', 
  'Pueblo Libre', 'Puente Piedra', 'San Borja', 'San Isidro', 'San Juan de Lurigancho', 
  'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel', 
  'Santiago de Surco', 'Surquillo', 'Villa El Salvador', 'Villa María del Triunfo'
];

export const createClientSchema = z.object({
  name: z.string({
    required_error: "Client name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .regex(/^[0-9]{7,15}$/, "Phone must contain 7 to 15 digits"),
  address: z.string().optional(),  // Address remains optional
  district: z
    .enum(limaDistricts, {
      required_error: "District is required",
    })
  
});
