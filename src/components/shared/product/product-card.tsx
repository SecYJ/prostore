import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../../ui/card";
import ProductPrice from "./product-price";
import { Product } from "@/types";

const ProductCard = ({
    images,
    brand,
    name,
    price,
    rating,
    stock,
    slug,
}: Product) => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="items-center p-0">
                <Link href={ROUTES.PRODUCT_DETAIL(slug)}>
                    <Image
                        src={images[0]}
                        alt={name}
                        width={300}
                        height={300}
                        className="size-full object-cover"
                    />
                </Link>
            </CardHeader>
            <CardContent className="grid gap-4 p-4">
                <p className="text-xs">{brand}</p>
                <Link
                    href={ROUTES.PRODUCT_DETAIL(slug)}
                    className="text-sm font-medium"
                >
                    {name}
                </Link>
                <div className="flex items-center justify-between">
                    <p>{rating} Stars</p>
                    {stock > 0 ? (
                        <ProductPrice price={Number(price)} />
                    ) : (
                        <p className="text-destructive">Out of Stock</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
