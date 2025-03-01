"use server";

import { signIn, signOut } from "@/auth";
import { signInSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";

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
