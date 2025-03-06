"use server";

import { CartItem } from "@/types";

export const addToCart = async (cartItem: CartItem) => {
    return {
        success: true,
        message: "Successfully added to cart",
    };
};
