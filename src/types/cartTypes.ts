export type deletedProductFromCart = {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
}

export type AddedOrRemovedProductFromCart = {
    quantity: number;
    product: {
        name: string;
        id: string;
        price: string;
    }
}