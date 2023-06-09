import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/cart_reducer";
import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	TOGGLE_CART_ITEM_AMOUNT,
	CLEAR_CART,
	COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorage = () => {
	let cart = localStorage.getItem("cart");
	if (cart) {
		return JSON.parse(localStorage.getItem("cart"));
	} else {
		return [];
	}
};

const initialState = {
	cart: getLocalStorage(),
	total_items: 0, //number of total items in the cart
	total_amount: 0, //total value of the items in the cart
	shipping_fee: 534, //for items that don't include free shipping this is the fixed shipping fee ($5.34)
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	//add to cart
	const addToCart = (id, color, amount, product) => {
		dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
	};
	//remove item
	const removeItem = (id) => {
		dispatch({ type: REMOVE_CART_ITEM, payload: id });
	};
	//toggle amount
	const toggleAmount = (id, value) => {
		dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
	};
	//clear cart
	const clearCart = () => {
		dispatch({ type: CLEAR_CART });
	};

	useEffect(() => {
		//we save the cart content on local storage so we don't have to add items everytime we want to test something (this is not neccessary)
		localStorage.setItem("cart", JSON.stringify(state.cart));
		//Every time the cart changes we calculate the total items and the total amount (price)
		dispatch({ type: COUNT_CART_TOTALS });
	}, [state.cart]);

	return (
		<CartContext.Provider
			value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}>
			{children}
		</CartContext.Provider>
	);
};
// make sure use
export const useCartContext = () => {
	return useContext(CartContext);
};
