import { prisma } from "@/db/prisma";
import sampleData from "../db/sample-data";

async function main() {
    console.log("Start seeding the database...");

    const tablesToBeDelete = [
        prisma.product.deleteMany(),
        prisma.user.deleteMany(),
        prisma.account.deleteMany(),
        prisma.session.deleteMany(),
        prisma.verificationToken.deleteMany(),
    ];

    // Clear existing data (optional)
    await Promise.all(tablesToBeDelete);
    console.log("Cleared existing products");

    // Seed products
    await prisma.product.createMany({
        data: sampleData.products,
    });

    await prisma.user.createMany({
        data: sampleData.users,
    });

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
