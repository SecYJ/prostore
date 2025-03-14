import AddToCart from "@/components/shared/product/add-to-cart";
import ProductImages from "@/components/shared/product/product-images";
import ProductPrice from "@/components/shared/product/product-price";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getSingleProduct } from "@/lib/actions/product.actions";
import { getUserCart } from "@/lib/queries/cart";
import { Cart } from "@/types";
import { notFound } from "next/navigation";

const ProductDetailPage = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}) => {
    const { slug } = await params;
    const product = await getSingleProduct(slug);

    if (!product) notFound();

    const cart = await getUserCart();

    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-5">
                {/* Images Column */}
                <div className="col-span-2">
                    <ProductImages images={product.images} />
                </div>

                <div className="col-span-2 p-5">
                    <div className="flex flex-col gap-6">
                        <p>
                            {product.brand} {product.category}
                        </p>
                        <h1 className="h3-bold">{product.name}</h1>
                        <p>
                            {product.rating} of {product.numReviews} Reviews
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <ProductPrice
                                price={Number(product.price)}
                                className="w-24 rounded-full bg-green-100 px-5 py-2 text-green-700"
                            />
                        </div>
                    </div>

                    <div className="mt-10">
                        <p className="font-semibold">Description</p>
                        <p>{product.description}</p>
                    </div>
                </div>

                <div>
                    <Card>
                        <CardContent className="p-4">
                            <div className="mb-2 flex justify-between">
                                <div>Price</div>
                                <div>
                                    <ProductPrice
                                        price={Number(product.price)}
                                    />
                                </div>
                            </div>
                            <div className="mb-2 flex justify-between">
                                <div>Status</div>
                                {product.stock > 0 ? (
                                    <Badge variant="outline">In Stock</Badge>
                                ) : (
                                    <Badge variant="destructive">
                                        Out Of Stock
                                    </Badge>
                                )}
                            </div>
                            {product.stock > 0 && (
                                <div className="flex-center">
                                    <AddToCart
                                        cart={cart ?? undefined}
                                        cartItem={{
                                            name: product.name,
                                            price: product.price,
                                            productId: product.id,
                                            image: product.images[0],
                                            qty: 1,
                                            slug: product.slug,
                                        }}
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default ProductDetailPage;
