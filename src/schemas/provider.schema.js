import { z } from "zod";

export const createProviderSchema = z.object({
  name: z.string({
    required_error: "Provider name is required",
  }),
  ruc: z
    .string({
      required_error: "RUC is required",
    })
    .min(11, "RUC must have 11 characters") // Ajusta según la longitud del RUC en tu país
    .max(11, "RUC must have 11 characters"), // Ajusta según la longitud del RUC en tu país
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .min(7, "Phone number must have at least 7 digits") // Ajusta según el formato de teléfono
    .max(15, "Phone number cannot exceed 15 digits"), // Ajusta según el formato de teléfono
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"), // Verifica que el email sea válido
    address: z.string({
      required_error: "Address is required",
    }),    
});
