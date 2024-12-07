import { z } from "zod";

export const createOrderSchema = z.object({
  client: z
    .string({
      required_error: "Client ID is required",
    })
    .regex(/^[a-f\d]{24}$/i, "Client ID must be a valid MongoDB ObjectId"),
  products: z.array(
    z.object({
      product: z
        .string({
          required_error: "Product ID is required",
        })
        .regex(/^[a-f\d]{24}$/i, "Product ID must be a valid MongoDB ObjectId"),
      quantity: z
        .number({
          required_error: "Quantity is required",
        })
        .int("Quantity must be an integer")
        .positive("Quantity must be greater than zero"),
    })
  ),
  orderDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Order date must be a valid datetime",
    })
    .optional(),
  status: z.enum(["Pendiente", "Processing", "Completed", "Cancelled"]).optional(),
});
