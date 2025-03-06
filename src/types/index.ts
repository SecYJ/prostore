import { z } from "zod";
import {
    cartItemSchema,
    insertCartSchema,
    insertProductSchema,
} from "../lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
    updatedAt: Date;
    numReviews: number;
};

export type CartItem = z.infer<typeof cartItemSchema>;

export type Cart = z.infer<typeof insertCartSchema>;
