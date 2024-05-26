import { derived, writable} from "svelte/store"

export const products = writable([
		{id: 1, name: "Apple", image: "🍎",	price: 20, quantity: 0},
		{id: 2, name: "Orange", image: "🍊", price: 10, quantity: 0},
		{id: 3, name: "Grapes", image: "🍇", price: 15, quantity: 0},
	])
export const cart = writable([])
export const totalPrice = derived(cart, ($cart) => $cart.reduce((a, b) => +a +b.price  * b.quantity, 0));
export const totalItems = derived(cart, ($cart) => $cart.length && $cart.reduce((sum, item) => sum + item.quantity, 0))
