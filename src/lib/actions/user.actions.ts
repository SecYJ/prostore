"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInSchema, signUpSchema } from "../validators";
import { hash } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { ZodError } from "zod";

export const signUpAction = async (_: unknown, formData: FormData) => {
    const formValues = Object.fromEntries(formData.entries());

    try {
        const { name, email, password } = signUpSchema.parse(formValues);

        const existingUser = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (existingUser) {
            return { success: false, message: "User already exists" };
        }

        const hashedPassword = await hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        await signIn("credentials", {
            email,
            password,
        });

        return { success: true, message: "User created successfully" };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                success: false,
                message: error.flatten().fieldErrors,
            };
        }

        if (isRedirectError(error)) {
            throw error;
        }
        console.error(error);
        return {
            success: false,
            message: "Invalid email or password",
        };
    }
};

export const signInAction = async (_: unknown, formData: FormData) => {
    const formValues = Object.fromEntries(formData.entries());

    try {
        const validatedFields = signInSchema.parse(formValues);

        await signIn("credentials", {
            ...validatedFields,
        });

        return { success: true, message: "Signed in successfully" };
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        console.error(error);
        return { success: false, message: "Invalid email or password" };
    }
};

export const signOutAction = async () => {
    await signOut();
};
