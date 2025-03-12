import { auth } from "@/auth";
import { getUserCart } from "@/lib/queries/cart";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { getUserById } from "@/lib/actions/user.actions";
import ShippingForm from "./shipping-form";
import { ShippingAddress } from "@/types";

const ShippingAddressPage = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!session || !userId) return null;

    const userCart = await getUserCart();

    if (!userCart || userCart.items.length === 0) redirect(ROUTES.HOME());

    const user = await getUserById(userId);

    return (
        <>
            <ShippingForm address={user.address as ShippingAddress} />
        </>
    );
};

export default ShippingAddressPage;
