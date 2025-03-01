"use client";

import { signInAction } from "@/lib/actions/user.actions";
import { useActionState, useId } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";
import { useSearchParams } from "next/navigation";

const SignInForm = () => {
    const emailId = useId();
    const passwordId = useId();
    const [state, action, isPending] = useActionState(signInAction, null);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? ROUTES.HOME();

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label htmlFor={emailId}>Email</Label>
                    <Input
                        id={emailId}
                        type="email"
                        placeholder="Email"
                        name="email"
                    />
                </div>
                <div className="space-y-1">
                    <Label htmlFor={passwordId}>Password</Label>
                    <Input
                        id={passwordId}
                        type="password"
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? "Signing In..." : "Sign In"}
                    </Button>
                </div>
                {!state?.success && state?.message && (
                    <div className="text-center text-destructive">
                        <p>{state?.message}</p>
                    </div>
                )}
                <div className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                        href={ROUTES.SIGN_UP()}
                        className="border-b border-transparent hover:border-gray-400"
                        target="_top"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default SignInForm;
