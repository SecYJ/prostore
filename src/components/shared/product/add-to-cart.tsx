"use client";

import { Button } from "@/components/ui/button";
import { addToCart, decrementCartItemQty } from "@/lib/actions/cart.actions";
import { ROUTES } from "@/lib/constants/routes";
import { formatNumberWithDecimal } from "@/lib/utils";
import { Cart, CartItem } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const AddToCart = ({ cartItem, cart }: { cartItem: CartItem; cart?: Cart }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = () => {
        startTransition(async () => {
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
        });
    };

    const handleRemoveFromCart = () => {
        startTransition(async () => {
            const response = await decrementCartItemQty(cartItem.productId);

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success(response.message, {
                action: {
                    label: null,
                    onClick: () => router.push(ROUTES.CART()),
                },
            });
        });
    };

    const exist = cart?.items.find(
        (item) => item.productId === cartItem.productId,
    );

    if (!exist) {
        return (
            <Button
                className="w-full"
                type="button"
                onClick={handleAddToCart}
                disabled={isPending}
            >
                <Plus />
                checkout
            </Button>
        );
    }

    return (
        <div className="space-x-2">
            <Button
                type="button"
                onClick={handleRemoveFromCart}
                variant="outline"
                disabled={isPending}
            >
                <Minus className="size-4" />
            </Button>
            <span>{exist.qty}</span>
            <Button
                type="button"
                onClick={handleAddToCart}
                variant="outline"
                disabled={isPending}
            >
                <Plus className="size-4" />
            </Button>
        </div>
    );
};

export default AddToCart;
