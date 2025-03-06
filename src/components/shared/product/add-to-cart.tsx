"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/cart.actions";
import { ROUTES } from "@/lib/constants/routes";
import { CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AddToCart = ({ cartItem }: { cartItem: CartItem }) => {
    const router = useRouter();

    const handleAddToCart = async () => {
        const response = await addToCart(cartItem);

        if (!response.success) {
            toast.error(response.message);
            return;
        }

        toast.success(`${cartItem.name} added to cart`, {
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
