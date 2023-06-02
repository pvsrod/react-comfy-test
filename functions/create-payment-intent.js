//domain/.netlify/functions/create-payment-intent
//THIS IS NODE SYNTAX, THIS FILE IS NOT WRITTEN WITH THE SAME SYNTAX AS A REACT FILE, BECAUSE IN A PRODUCTION ENVIRONMENT THIS WOULD BE IN A DIFFERENT SERVER (THE MIDDLE SERVER BETWEEN OR APP/FRONT-END AND STRIPE). IN OUR TEST SCENARIO WE ARE USING NODE AS OUR MIDDLE SERVER
//TO ACCESS OUR .ENV VALUES FROM THIS FILE WE CAN'T JUST USE "process.env" DIRECTLY, SO WE USE THE "dotenv" MODULE (which was included in the dependencies in package.json )
require("dotenv").config(); //this is like an 'include' in react

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
	if (event.body) {
		const { /*cart,*/ shipping_fee, total_amount } = JSON.parse(event.body); //the string we passed in the POST request is in the "body" property of the "event" param (we parse it back into an object)

		const calculateOrderAmount = () => {
			return shipping_fee + total_amount;
		};
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: calculateOrderAmount(),
				currency: "usd",
			});
			return {
				statusCode: 200,
				body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ msg: error.message }),
			};
		}
	}
	return {
		//this "if" and "return" are here only because we are using netlify as our "middle server" between the App and Stripe and we don't want any bugs if we navigate directly to http://localhost:8888/.netlify/functions/create-payment-intent
		statusCode: 200,
		body: "Create Payment Intent",
	};
};
