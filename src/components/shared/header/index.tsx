import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { ROUTES } from "@/lib/constants/routes";
import { ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="wrapper grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b">
            <Link href={ROUTES.HOME()} className="">
                <Image
                    src="/images/logo.svg"
                    alt={`${APP_NAME} Logo`}
                    width={48}
                    height={48}
                    priority
                />
                <span className="hidden text-2xl font-bold lg:block">
                    {APP_NAME}
                </span>
            </Link>

            <ModeToggle />
            <Button asChild variant="ghost">
                <Link href={ROUTES.CART()}>
                    <ShoppingBag />
                    Cart
                </Link>
            </Button>
            <Button asChild>
                <Link href={ROUTES.SIGN_IN()}>
                    <User />
                    Sign In
                </Link>
            </Button>
        </header>
    );
};

export default Header;
