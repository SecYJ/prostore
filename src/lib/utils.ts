import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const convertToPlainObject = <T>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
};

export const formatNumberWithDecimal = (value: number) => {
    const [int, float] = value.toString().split(".");
    return `${int}.${float.padEnd(2, "0")}`;
};
