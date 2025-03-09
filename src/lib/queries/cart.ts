import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { CartItem } from "@/types";
import { produce } from "immer";
import { cookies } from "next/headers";

interface UpdatedPrice {
    itemsPrice: string;
    taxPrice: string;
    shippingPrice: string;
    totalPrice: string;
}

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

// export const updateCartItemQty = async (
//     id: string,
//     updatedPrice: UpdatedPrice,
// ) => {
//     const cart = await getUserCart();
//     if (!cart) throw new Error("Cart not found");

//     const newCart = produce(cart.items, (draft) => {
//         return draft.filter((item) => item.productId !== id);
//     });

//     await prisma.cart.update({
//         where: { id: cart.id },
//         data: {
//             items: newCart,
//             ...updatedPrice,
//         },
//     });
// };
