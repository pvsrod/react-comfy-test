//if we create a file in a directory and we name it "index.js" that by default becomes the default file
//how do we use that in this case?
//in this case we create and index.js file were we import all the files (pages) in the "pages" directory and then export them (usually with a simpler/more descriptive name)
//and what is the point of doing that?
//by doing that we can then import the pages in any other file by just referencing the directory "./pages" (it will by default look for the index.js file)
// in our case we do this in the "App.js" file (notice we also do the same for the "components" directory)
//and how does that help??
//it really doesn't, we could have just made the import from each of the files in the pages/components directory, but that would mean that we needed to write one import line for each file, by doing it like this we can make all the imports on one line, which makes or code easier to read

import Home from "./HomePage";
import Products from "./ProductsPage";
import SingleProduct from "./SingleProductPage";
import About from "./AboutPage";
import Cart from "./CartPage";
import Error from "./ErrorPage";
import Checkout from "./CheckoutPage";
import PrivateRoute from "./PrivateRoute";
import AuthWrapper from "./AuthWrapper";

export {
	Home,
	Products,
	SingleProduct,
	About,
	Cart,
	Error,
	Checkout,
	PrivateRoute,
	AuthWrapper,
};
