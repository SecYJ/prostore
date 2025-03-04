"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpAction } from "@/lib/actions/user.actions";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState, useId } from "react";

const SignUpForm = () => {
    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();
    const confirmPasswordId = useId();
    const [state, action, isPending] = useActionState(signUpAction, null);
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") ?? ROUTES.HOME();

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
                <div className="space-y-1">
                    <Label htmlFor={nameId}>Name</Label>
                    <Input
                        id={nameId}
                        type="text"
                        placeholder="Name"
                        name="name"
                    />
                </div>
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
                <div className="space-y-1">
                    <Label htmlFor={passwordId}>Confirm Password</Label>
                    <Input
                        id={confirmPasswordId}
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                    />
                </div>
                <div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? "Signing Up..." : "Sign Up"}
                    </Button>
                </div>
                {/* {!state?.success && state?.message && (
                    <div className="text-center text-destructive">
                        <p>{state?.message}</p>
                    </div>
                )} */}
                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href={ROUTES.SIGN_IN()}
                        className="border-b border-transparent hover:border-gray-400"
                        target="_self"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
