"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/cart.actions";
import { ROUTES } from "@/lib/constants/routes";
import { formatNumberWithDecimal } from "@/lib/utils";
import { CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCart = ({ cartItem }: { cartItem: CartItem }) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        const response = await addToCart({
            ...cartItem,
            price: formatNumberWithDecimal(Number(cartItem.price)),
        });

        if (!response.success) {
            toast.error(response.message);
            return;
        }

        toast.success(response.message, {
            action: {
                label: "Go To Cart",
                onClick: () => router.push(ROUTES.CART()),
            },
        });
    };

    return (
        <Button className="w-full" type="button" onClick={handleAddToCart}>
            checkout
        </Button>
    );
};

export default AddToCart;
