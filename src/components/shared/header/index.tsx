import { APP_NAME } from "@/lib/constants";
import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";

const Header = () => {
    return (
        <header className="wrapper grid grid-cols-[1fr_auto] items-center gap-4 border-b">
            <Link href={ROUTES.HOME()} className="flex items-center gap-2">
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

            <Menu />
        </header>
    );
};

export default Header;
