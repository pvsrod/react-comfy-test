import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
	const { user } = useAuth0();
	if (!user) {
		return <Navigate to='/' />;
	}
	return children;
};
export default PrivateRoute;

//THIS WAS CHANGED/REMOVED WHEN REFACTORING TO REACT ROUTER 6, (I left the comments because the explantion might be relevant, original code is below)
//Notes:
//notice how we recieve the params "{children,...rest}"
//in this case we receive all the "children" and the "rest" of the params
//the children in this case is the <Checkout/> element ("children" is a fixed name)
//the rest of the params, in this case, are "exact path='/checkout'" which were sent in App.js when we defined the PrivateRoute
//do not confuse the rest operator "...rest" with the usual spread operator "..." because it is not the same (they are both JS operators) when we use it while receiving function params (like in this case), the rest operator "...rest" just receives the rest of the parameters that were sent (it doesn't have to be called rest, it could be "...anything" but that is just the convention)
//the "rest" object will contain all the other params that we can then use in the "Route" elment, in this case <Route {...rest}> we are using the spread operator on the "rest" object (before we used the "rest" operator "...rest" to collect all the params, it is the same symbol "..." but it does different things, depending where we use it)

//for the functionality we use the <Route> component, spread all the original params and use the "render" prop to make our redirection, if the use is logged in we redirect to <Checkout> (which was in the "children"), if not we use the Redirect component (in this cse we redirect to the home page '/')

//ORIGINAL CODE
/*import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

//import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children, ...rest }) => {
	//const { myUser } = useUserContext();
	const { user } = useAuth0();
	return (
		<Route
			{...rest}
			render={() => {
				return user ? children : <Redirect to='/'></Redirect>;
			}}
		></Route>
	);
};*/
