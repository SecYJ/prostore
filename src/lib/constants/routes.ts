export const ROUTES = {
    HOME: () => "/",
    CART: () => "/cart",
    SIGN_IN: () => "/sign-in",
    SIGN_UP: () => "/sign-up",
    PRODUCTS: () => "/products",
    PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
    SHIPPING_ADDRESS: () => "/shipping-address",
};
