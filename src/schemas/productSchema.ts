import { z } from "zod"
import ErrorMessage from "../consts/ErrorMessages";

export const productSchema = z.object({

    name: z.string().min(2, ErrorMessage.productNameSizeError),
    price: z.string().min(7, ErrorMessage.productPriceSizeError),
    size: z.array(z.string({ required_error: ErrorMessage.productSizeError })),
    photo: z.array(z.string()),
    colorName: z.string().min(3, ErrorMessage.productColorNameSizeError),
    colorHex: z.string().min(4, ErrorMessage.productColorHexMinSizeError).max(7, ErrorMessage.productColorHexMaxSizeError),
    frete: z.string(),
    category: z.array(z.string().min(1, ErrorMessage.productCategoryError)),

});





