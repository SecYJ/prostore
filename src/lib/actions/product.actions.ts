"use server";

import { prisma } from "../prisma";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

export const getLatestProducts = async () => {
    const products = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: {
            createdAt: "desc",
        },
    });

    // Convert Prisma Decimal objects to regular JavaScript numbers
    return products.map((product) => ({
        ...product,
        price: parseFloat(product.price.toString()),
        rating: parseFloat(product.rating.toString()),
    }));
};
