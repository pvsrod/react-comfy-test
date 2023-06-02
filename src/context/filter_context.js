//Note that we could have had only one products context, but we created a separate context for the filters so it will be easier to manage each file
//the gotcha is that now we will have to transfer the products from the products_context (because that's where we fetched them) to this filter_context
//how do we do that?
//first we set up or filter_context and our reducer (A)
//we next wrap our app in the new FilterProvider context (it has to be inside the ProductsProvider as we need to access the products), we do this on "index.js"
//next we can get the "products" from the productsContext (B)
//we can then load those products to ourfilter_context through an action LOAD_PRODUCTS with a useEffect (C)
//next we need to handle the LOAD_PRODUCTS action in the filter_reducer
import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
	LOAD_PRODUCTS,
	SET_GRIDVIEW,
	SET_LISTVIEW,
	UPDATE_SORT,
	SORT_PRODUCTS,
	UPDATE_FILTERS,
	FILTER_PRODUCTS,
	CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
	filtered_products: [], //will contain the filtered products
	all_products: [], //will contain the original array of products
	grid_view: true,
	sort: "price-lowest", //contains the current 'sort' option, by default is by the lowest price, note that this corresponds to the 'value' we gave to each option in 'Sort.js'
	//filters
	filters: {
		text: "",
		company: "all",
		category: "all",
		color: "all",
		min_price: 0,
		max_price: 0, //this value will be set once we load the products in LOAD_PRODUCTS, it will be the highest price of all the products
		price: 0, //same as above
		shipping: false,
	},
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
	const { products } = useProductsContext(); //B

	const [state, dispatch] = useReducer(reducer, initialState); //A

	//C
	useEffect(() => {
		dispatch({ type: LOAD_PRODUCTS, payload: products });
	}, [products]); //we pass products in the dependency array because it is initially empty, so it needs to change once the products are fetched

	//this useEffect runs everytimethe user changes the 'sort by' option, but it also runs whenever 'products' changes (why?, because initialy products is empty so we need it to run once the products are fetched)
	useEffect(() => {
		dispatch({ type: FILTER_PRODUCTS });
		dispatch({ type: SORT_PRODUCTS });
	}, [products, state.sort, state.filters]);

	const setGridView = () => {
		dispatch({ type: SET_GRIDVIEW });
	};
	const setListView = () => {
		dispatch({ type: SET_LISTVIEW });
	};

	//this function will run everytime the user changes the 'sort by' option and it will dispatch the action that changes the 'sort' state value
	const updateSort = (e) => {
		//const name = e.target.name;
		const value = e.target.value;
		dispatch({ type: UPDATE_SORT, payload: value });
	};

	//we will call this function everytime a filter is changed
	const updateFilters = (e) => {
		let name = e.target.name; //in this case the name of the control matches the name of the property in the state value, that is why we get it, so we know which property to update in the filters{}
		let value = e.target.value;
		if (name === "category") {
			value = e.target.textContent;
		} //the ".value" prop does not work on buttons, that is why in the category we access it differently
		if (name === "color") {
			value = e.target.dataset.color; //to access the data attribute we created for this buttons we use the "dataset" property and the name of the data attribute without the "data-", in our case the name was "data-color" so we use ".color" (if there is a "-" in the name it will be replaced automatically by camel casing e.g if the create the data attributte as "data-color-test" we will later access it with "dataset.colorTest")
		}
		if (name === "price") {
			value = Number(value); //in the case of the price we just transform it into a number because by default an "input" type returns a string
		}
		if (name === "shipping") {
			value = e.target.checked; //there is no value prop in checkboxes
		}

		dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
	};

	const clearFilters = () => {
		dispatch({ type: CLEAR_FILTERS });
	};

	return (
		<FilterContext.Provider
			value={{
				...state,
				setGridView,
				setListView,
				updateSort,
				updateFilters,
				clearFilters,
			}}>
			{children}
		</FilterContext.Provider>
	);
};
// make sure use
export const useFilterContext = () => {
	return useContext(FilterContext);
};
