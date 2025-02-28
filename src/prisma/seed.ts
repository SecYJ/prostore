import { prisma } from "@/db/prisma";
import sampleData from "../db/sample-data";

async function main() {
    console.log("Start seeding the database...");

    // Clear existing data (optional)
    await prisma.product.deleteMany({});
    console.log("Cleared existing products");

    // Seed products
    for (const product of sampleData.products) {
        const result = await prisma.product.create({
            data: {
                name: product.name,
                slug: product.slug,
                category: product.category,
                description: product.description,
                images: product.images,
                price: product.price,
                brand: product.brand,
                rating: product.rating,
                numReviews: product.numReviews,
                stock: product.stock,
                isFeatured: product.isFeatured,
                banner: product.banner,
            },
        });
        console.log(`Created product with ID: ${result.id}`);
    }

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error("Error during seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
