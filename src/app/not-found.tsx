import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="grid min-h-screen place-content-center gap-2 text-center">
            <h1 className="text-4xl font-bold">Not Found</h1>
            <p className="text-sm text-muted-foreground">
                The page you are looking for does not exist.
            </p>
            <Button asChild>
                <Link href={ROUTES.HOME()}>Go to Home</Link>
            </Button>
        </div>
    );
};

export default NotFoundPage;
