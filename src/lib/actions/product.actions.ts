"use server";

import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "../prisma";

export const getLatestProducts = async () => {
    const products = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: {
            createdAt: "desc",
        },
    });

    return products.map((product) => ({
        ...product,
        price: product.price.toString(),
        rating: product.rating.toString(),
    }));
};
