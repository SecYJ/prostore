import { ROUTES } from "@/lib/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../../ui/card";
import ProductPrice from "./product-price";

interface Props {
    image: string;
    brand: string;
    name: string;
    price: number;
    rating: number;
    stock: number;
    slug: string;
}

const ProductCard = ({
    image,
    brand,
    name,
    price,
    rating,
    stock,
    slug,
}: Props) => {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader className="items-center p-0">
                <Link href={ROUTES.PRODUCT_DETAIL(slug)}>
                    <Image
                        src={image}
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
                        <ProductPrice price={price} />
                    ) : (
                        <p className="text-destructive">Out of Stock</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
