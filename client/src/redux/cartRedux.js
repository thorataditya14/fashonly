import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		products: [],
		quantity: 0,
		total: 0
	},
	reducers: {
		addProduct: (state, action) => {
			const itemInCart = state.products.find((item) => item._id === action.payload._id);
			if (itemInCart) {
				itemInCart.quantity += action.payload.quantity
			} else {
				state.products.push({ ...action.payload, quantity: action.payload.quantity });
				state.quantity += 1;
			}
		},
		incrementQuantity: (state, action) => {
			const item = state.products.find((item) => item._id === action.payload);
			item.quantity++;
		},
		decrementQuantity: (state, action) => {
			const item = state.products.find((item) => item._id === action.payload);
			if (item.quantity === 1) {
				item.quantity = 1
			} else {
				item.quantity--;
			}
		},
		removeProduct: (state, action) => {
			const removeItem = state.products.filter((item) => item._id !== action.payload);
			state.products = removeItem;
			state.quantity -= 1;
		}
	}
});


export default cartSlice.reducer;

export const {
	addProduct,
	incrementQuantity,
	decrementQuantity,
	removeProduct
} = cartSlice.actions;