import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
	const { loginWithRedirect, logout, user } = useAuth0();

	const [myUser, setMyUser] = useState(null);

	/*useEffect(() => {
		if (isAuthenticated) {
			setMyUser(user); //the user returned by useAuth0 is an object, but in this case we just care wether there is a user or not, since we won't use any of the info inside of 'user'
		} else {
			setMyUser(false); //in the tutorial he set it to 'false' but I'm not sure why since 'null' is also a falsy value
		}
	}, [isAuthenticated]);*/

	//this replaced the above useEffect to  get rid of some bugs
	useEffect(() => {
		setMyUser(user);
	}, [user]);

	return (
		<UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
			{children}
		</UserContext.Provider>
	);
};
// make sure use
export const useUserContext = () => {
	return useContext(UserContext);
};
