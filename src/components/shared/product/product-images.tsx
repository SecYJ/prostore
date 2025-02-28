"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="space-y-4">
            <Image
                src={images[currentIndex]}
                width={1000}
                height={1000}
                alt="product image"
                className="min-h-[300px] object-cover object-center"
            />
            <div className="flex gap-2">
                {images.map((image, index) => (
                    <button
                        type="button"
                        key={image}
                        className={cn(
                            "border hover:border-orange-500",
                            index === currentIndex && "border-orange-500",
                        )}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <Image
                            src={image}
                            width={100}
                            height={100}
                            alt="product image"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;
