"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { addToCart, decrementCartItemQty } from "@/lib/actions/cart.actions";
import { ROUTES } from "@/lib/constants/routes";
import { formatCurrency } from "@/lib/utils";
import { Cart } from "@/types";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const title = <h1 className="h2-bold py-4">cart-table</h1>;

const CartTable = ({ cart }: { cart?: Cart }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    if (!cart || cart.items.length === 0) {
        return (
            <>
                {title}
                <div>
                    Cart is empty. <Link href="/">Go Shopping</Link>
                </div>
            </>
        );
    }

    return (
        <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-center">
                                Quantity
                            </TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cart.items.map((item) => (
                            <TableRow key={item.slug}>
                                <TableCell className="font-medium">
                                    <Link
                                        className="flex items-center gap-2"
                                        href={ROUTES.PRODUCT_DETAIL(item.slug)}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.slug}
                                            width={50}
                                            height={50}
                                        />
                                        <span>{item.name}</span>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center justify-center gap-2">
                                        <Button
                                            disabled={isPending}
                                            onClick={() =>
                                                startTransition(async () => {
                                                    await decrementCartItemQty(
                                                        item.productId,
                                                    );
                                                })
                                            }
                                        >
                                            {isPending ? (
                                                <Loader className="size-4 animate-spin" />
                                            ) : (
                                                <Minus className="size-4" />
                                            )}
                                        </Button>
                                        <span>{item.qty}</span>
                                        <Button
                                            disabled={isPending}
                                            onClick={() =>
                                                startTransition(async () => {
                                                    await addToCart(item);
                                                })
                                            }
                                        >
                                            {isPending ? (
                                                <Loader className="size-4 animate-spin" />
                                            ) : (
                                                <Plus className="size-4" />
                                            )}
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    $
                                    {(Number(item.price) * item.qty).toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Card>
                {/* NOTE: gap-4 might be brad's mistake */}
                <CardContent className="gap-4 p-4">
                    <div className="pb-3 text-xl">
                        Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)})
                        <span className="font-bold">
                            {formatCurrency(cart.itemsPrice)}
                        </span>
                    </div>
                    <Button
                        className="w-full"
                        disabled={isPending}
                        onClick={() =>
                            startTransition(() => {
                                router.push(ROUTES.SHIPPING_ADDRESS());
                            })
                        }
                    >
                        Proceed to Checkout
                        {isPending ? (
                            <Loader className="size-4 animate-spin" />
                        ) : (
                            <ArrowRight className="size-4" />
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default CartTable;
