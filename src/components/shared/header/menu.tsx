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
import { EllipsisVertical, ShoppingBag } from "lucide-react";
import Link from "next/link";
import UserButton from "./user-button";

const Menu = async () => {
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
                <UserButton />
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
                            <UserButton />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
};

export default Menu;
