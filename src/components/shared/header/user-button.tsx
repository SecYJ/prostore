import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutAction } from "@/lib/actions/user.actions";
import { ROUTES } from "@/lib/constants/routes";
import { LogOut, Settings, User, UserIcon } from "lucide-react";
import Link from "next/link";

const UserButton = async () => {
    const session = await auth();

    if (!session) {
        return (
            <Button asChild>
                <Link href={ROUTES.SIGN_IN()}>
                    <UserIcon />
                    Sign In
                </Link>
            </Button>
        );
    }

    const firstInitialName = session.user?.name?.charAt(0).toUpperCase() ?? "U";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="default"
                    className="size-8 rounded-full bg-gray-200 p-0 text-black"
                >
                    {firstInitialName}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="space-y-1.5 font-normal">
                    <div className="text-sm leading-none text-muted-foreground">
                        {session.user?.name}
                    </div>
                    <div className="text-sm leading-none text-muted-foreground">
                        {session.user?.email}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <form action={signOutAction}>
                        <Button
                            className="flex w-full justify-start px-2 py-1.5"
                            variant="ghost"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserButton;
