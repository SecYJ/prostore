import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/lib/constants/routes";
import { EllipsisVertical, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

const Menu = () => {
    return (
        <div>
            <div className="hidden items-center gap-2 md:flex">
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
            </div>
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <EllipsisVertical />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>

                        <div className="mt-2 grid justify-items-start gap-4">
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
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Menu;
