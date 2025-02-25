import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
};

const HomePage = () => {
    return (
        <div className="wrapper">
            <ProductList data={sampleData.products} limit={4} />
        </div>
    );
};

export default HomePage;
