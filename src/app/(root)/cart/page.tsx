import { getUserCart } from "@/lib/queries/cart";
import CartTable from "./cart-table";

export const metadata = {
    title: "Shopping Cart",
};

const CartPage = async () => {
    const cart = await getUserCart();

    return (
        <>
            <CartTable cart={cart ?? undefined} />
        </>
    );
};

export default CartPage;
