import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const convertToPlainObject = <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
};

export const formatNumberWithDecimal = (value: number) => {
    const [int, float] = value.toString().split(".");
    return `${int}.${float.padEnd(2, "0")}`;
};

export const formatError = (error: any): string => {
    if (error instanceof ZodError) {
        return (
            Object.values(error.flatten().fieldErrors).flat().join(", ") + "."
        );
    }

    if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
    ) {
        return "Email already registered";
    }

    return typeof error.message === "string"
        ? error.message
        : JSON.stringify(error);
};
