import { auth } from "@/auth";
import { getUserCart } from "@/lib/queries/cart";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { getUserById } from "@/lib/actions/user.actions";

const ShippingAddressPage = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!session || !userId) return null;

    const userCart = await getUserCart();

    if (!userCart || userCart.items.length === 0) redirect(ROUTES.HOME());

    const user = await getUserById(userId);

    return (
        <div>
            <h1>Shipping Address</h1>
        </div>
    );
};

export default ShippingAddressPage;
