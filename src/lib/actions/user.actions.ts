"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInSchema, signUpSchema } from "../validators";
import { hash } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatError } from "../utils";

export const signUpAction = async (_: unknown, formData: FormData) => {
    const formValues = Object.fromEntries(formData.entries());

    try {
        const { name, email, password } = signUpSchema.parse(formValues);

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
        if (isRedirectError(error)) {
            throw error;
        }

        return {
            success: false,
            message: formatError(error),
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
        return { success: false, message: "Invalid email or password" };
    }
};

export const signOutAction = async () => {
    await signOut();
};
