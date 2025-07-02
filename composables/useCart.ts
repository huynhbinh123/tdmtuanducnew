// ~/composables/useCart.ts
import { ref } from "vue";
import type { Ref } from "vue";

interface CartItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

const cart = ref<CartItem[]>([]);

export function useCart(): Ref<CartItem[]> {
  return cart;
}