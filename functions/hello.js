//this is just a test file to check if netlify is setup correctly
//we first create the "netlify.toml" file in the root, which is a netlify config file and basically just points to the directory where we will create our functions (the directory doesn't have to be called "functions", it can be called wathever we want, but it just make sense to called that in this case)
//once this is done you might need to restart the server (npm run dev)
//if we then navigate to:
// domain/.netlify/functions/hello
//we should see our "hello world", because now our function is availiable
//note: the domain in this case is http://localhost:8888 since we are running our dev netlify server
//http://localhost:8888/.netlify/functions/hello

//the below is "nodejs" code
exports.handler = async function (event, context) {
	return {
		statusCode: 200, //success
		body: "Hello world",
	};
};

//In a production environment this functions would be on a server (not on the front end) and through this functions our App will comunicate with Stripe (there is always a server in between the comunication for security, node js is acting as our server in this case)
