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

export const signInSchema = z.object({
    callbackUrl: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});

export const signUpSchema = z
    .object({
        name: z
            .string()
            .min(3, { message: "Name must be at least 3 characters" }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string().min(6, {
            message: "Confirm password must be at least 6 characters",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export const cartItemSchema = z.object({
    productId: z.string().min(1, "Product id is required"),
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    qty: z.number().int().nonnegative("Quantity must be a positive number"),
    image: z.string().min(1, "Image is required"),
    price: currency,
});

export const insertCartSchema = z.object({
    items: z.array(cartItemSchema),
    itemsPrice: currency,
    totalPrice: currency,
    shippingPrice: currency,
    taxPrice: currency,
    sessionCartId: z.string().min(1, "Session cart id is required"),
    userId: z.string().optional().nullable(),
});
