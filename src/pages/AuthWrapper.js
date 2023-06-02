//the whole point of this component is to fix a bug
//I did notice this bug when implementing the checkout private route, what happens is that even if we are logged in and we type the url to checkout directly (instead of using any of the checkout buttons), we are redirected to the home page (we should be redirected to the checkout page, we should only be redirected to the home page if we were not logged in)
// The reason for that happening was that the useEffect (the original useEffect that is now commented) in useUserContext (user_context.js) ran once before the user information can be retrieved from Auth0 even if we were logged in, so the isAuthenticated variable was null for a second which caused us to be redirected to the home page
//By the time the "user" is set the privateRoute was already loaded so we are not redirected to the checkout page
//This component will wrap all the routes
//All it does is check  wheter there is an error or the status of Auth0 is still loading, and only when it is finished loading the other components (children) will be loaded, so that way we don't get the bug
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthWrapper = ({ children }) => {
	const { isLoading, error } = useAuth0();
	if (isLoading) {
		return (
			<Wrapper>
				<h1>Loading...</h1>
			</Wrapper>
		);
	}
	if (error) {
		return (
			<Wrapper>
				<h1>{error.message}</h1>
			</Wrapper>
		);
	}
	return <>{children}</>;
};

const Wrapper = styled.section`
	min-height: 100vh;
	display: grid;
	place-items: center;
`;

export default AuthWrapper;
