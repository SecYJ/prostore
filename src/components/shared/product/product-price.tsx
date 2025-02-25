interface Props {
    price: number;
}

const ProductPrice = ({ price }: Props) => {
    const [int, float] = price.toFixed(2).split(".");

    return (
        <p>
            <span className="align-super text-xs">$</span>
            <span className="text-2xl">{int}</span>
            <span className="align-super text-xs">.{float}</span>
        </p>
    );
};

export default ProductPrice;
