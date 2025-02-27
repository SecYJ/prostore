"use server";

import { LATEST_PRODUCTS_LIMIT } from "../constants";
import { prisma } from "@/db/prisma";

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

export const getSingleProduct = async (slug: string) => {
    return await prisma.product.findFirst({
        where: {
            slug,
        },
    });
};
