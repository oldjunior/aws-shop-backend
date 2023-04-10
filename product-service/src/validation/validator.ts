import { productSchema } from './schema';

export const validateProduct = (product) => {
  if (Object.keys(product).length !== productSchema.length) return false;

  for (const item of productSchema) {
    if (typeof product[item.key] !== item.type) return false;
  }

  return true;
};
