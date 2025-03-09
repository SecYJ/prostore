"use server";

import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { CartItem } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ROUTES } from "@/lib/constants/routes";
import { convertToPlainObject, formatError, round2 } from "@/lib/utils";
import { cartItemSchema, insertCartSchema } from "@/lib/validators";
import { produce } from "immer";

const calculatePrice = (cartItems: CartItem[]) => {
    // Calculate the total price of all items in the cart
    const itemsPrice = cartItems.reduce(
        (acc, item) => acc + Number(item.price) * item.qty,
        0,
    );

    // Calculate tax (15%)
    const taxPrice = itemsPrice * 0.15;

    // Calculate shipping price (free if items price > 100, otherwise $10)
    const shippingPrice = itemsPrice > 100 ? 0 : 10;

    // Calculate total price (items + tax + shipping)
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    // Return all prices with 2 decimal places
    return {
        itemsPrice: round2(itemsPrice).toString(),
        taxPrice: round2(taxPrice).toString(),
        shippingPrice: round2(shippingPrice).toString(),
        totalPrice: round2(totalPrice).toString(),
    };
};

export const addToCart = async (cartItem: CartItem) => {
    try {
        const sessionCartId = (await cookies()).get("sessionCartId")?.value;
        const session = await auth();
        const userId = session?.user?.id ?? null;
        const validItem = cartItemSchema.parse(cartItem);
        const product = await getProductById(validItem.productId);

        if (!product) throw new Error("Product not found");

        const userCart = await getUserCart();

        // Check if there's enough stock before adding to cart
        if (product.stock < validItem.qty) {
            throw new Error("Stock is not enough");
        }

        // If the item is already in the cart, check if the total quantity exceeds the stock
        if (userCart) {
            const existingItem = userCart.items.find(
                (item) => item.productId === validItem.productId,
            );

            if (
                existingItem &&
                existingItem.qty + validItem.qty > product.stock
            ) {
                throw new Error("Stock is not enough");
            }
        }

        if (!userCart) {
            // Create a new cart if none exists
            const newCart = insertCartSchema.parse({
                items: [validItem],
                ...calculatePrice([validItem]),
                sessionCartId,
                userId,
            });

            await prisma.cart.create({
                data: newCart,
            });
        } else {
            // Use Immer to update the existing cart
            const updatedItems = produce(userCart.items, (draft) => {
                const existingItemIndex = draft.findIndex(
                    (item) => item.productId === validItem.productId,
                );

                if (existingItemIndex !== -1) {
                    // Update quantity of existing item
                    draft[existingItemIndex].qty += 1;
                } else {
                    // Add new item to cart
                    draft.push(validItem);
                }
            });

            // Update the cart with the new items
            await prisma.cart.update({
                where: {
                    id: userCart.id,
                },
                data: {
                    items: updatedItems,
                    ...calculatePrice(updatedItems),
                },
            });
        }

        revalidatePath(ROUTES.PRODUCT_DETAIL(validItem.slug));

        const isItemAlreadyExist = userCart?.items.some(
            (item) => item.productId === validItem.productId,
        );

        return {
            success: true,
            message: `${product.name} ${isItemAlreadyExist ? "updated in" : "added to"} cart`,
        };
    } catch (error) {
        console.log("error", error);

        return {
            success: false,
            message: formatError(error),
        };
    }
};

export const getUserCart = async () => {
    const session = await auth();
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;

    if (!sessionCartId) throw new Error("Cart session not found");

    const userId = session?.user?.id ?? null;
    const cart = await prisma.cart.findFirst({
        where: userId ? { userId } : { sessionCartId },
    });

    if (!cart) return null;

    return convertToPlainObject({
        ...cart,
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),
    });
};

export const getProductById = async (id: string) => {
    const product = await prisma.product.findFirst({
        where: { id },
    });

    return product;
};
