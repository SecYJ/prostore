import { cn } from "@/lib/utils";

interface Props {
    price: number;
    className?: string;
}

const ProductPrice = ({ price, className }: Props) => {
    const [int, float] = price.toFixed(2).split(".");

    return (
        <p className={cn("text-2xl", className)}>
            <span className="align-super text-xs">$</span>
            <span>{int}</span>
            <span className="align-super text-xs">.{float}</span>
        </p>
    );
};

export default ProductPrice;
