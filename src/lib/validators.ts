import { z } from "zod";

const currency = z
    .string()
    .refine(
        (value) => /^\d+(\.\d{2})?$/.test(value),
        "Price must have exactly two decimal places",
    );

export const insertProductSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    slug: z.string().min(3, { message: "Slug must be at least 3 characters" }),
    category: z
        .string()
        .min(3, { message: "Category must be at least 3 characters" }),
    brand: z
        .string()
        .min(3, { message: "Brand must be at least 3 characters" }),
    description: z
        .string()
        .min(3, { message: "Description must be at least 3 characters" }),
    stock: z.coerce.number(),
    images: z
        .array(z.string())
        .min(1, { message: "Product must have at least one image" }),
    isFeatured: z.boolean(),
    banner: z.string().nullable(),
    price: currency,
});
