import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { ROUTES } from "@/lib/constants/routes";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
    title: "Sign Up",
    description: `Sign up to ${APP_NAME}`,
};

const SignUpPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ callbackUrl?: string }>;
}) => {
    const session = await auth();
    const callbackUrl = (await searchParams).callbackUrl ?? ROUTES.HOME();

    if (session) {
        redirect(callbackUrl);
    }

    return (
        <div className="mx-auto w-full max-w-md">
            <Card>
                <CardHeader className="space-y-4">
                    <Link href={ROUTES.HOME()}>
                        <Image
                            src="/images/logo.svg"
                            alt={`${APP_NAME} logo`}
                            width={100}
                            height={100}
                            className="mx-auto"
                        />
                    </Link>
                    <CardTitle className="text-center">Sign Up</CardTitle>
                    <CardDescription className="text-center">
                        Enter information below to sign up
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <SignUpForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default SignUpPage;
