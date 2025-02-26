import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
};

const HomePage = async () => {
    const products = await getLatestProducts();

    return (
        <div className="wrapper">
            <ProductList data={products} />
        </div>
    );
};

export default HomePage;
