import React, { useEffect } from "react";
//import { useParams, useHistory } from "react-router-dom";//BEFORE REFACTORING TO REACT ROUTER 6 (RR6)
import { useParams, useNavigate } from "react-router-dom"; //RR6
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
	Loading,
	Error,
	ProductImages,
	AddToCart,
	Stars,
	PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
	const { id } = useParams(); //we get the product id from the url
	//const history = useHistory(); //this is only for redirecting to home in case of error (before RR6)
	const navigate = useNavigate(); //RR6
	const {
		single_product_loading: loading,
		single_product_error: error,
		single_product: product,
		fetchSingleProduct,
	} = useProductsContext(); //we get what we need from the products context

	//we fetch the product info with a useeffect
	useEffect(() => {
		fetchSingleProduct(`${url}${id}`);
		// eslint-disable-next-line
	}, [id]);

	//this is only to redirect to the main page in case there was an error while fetching the product info
	useEffect(() => {
		if (error) {
			setTimeout(() => {
				//history.push("/");//before RR6
				navigate("/"); //RR6
			}, 3000);
		}
		// eslint-disable-next-line
	}, [error]);

	if (loading) {
		return <Loading />;
	}
	if (error) {
		return <Error />;
	}

	const {
		name,
		price,
		description,
		stock,
		stars,
		reviews,
		id: sku,
		company,
		images,
	} = product;
	return (
		<Wrapper>
			<PageHero title={name} product></PageHero>
			<div className='section section-center page'>
				<Link to='/products' className='btn'>
					back to products
				</Link>
				<div className='product-center'>
					<ProductImages images={images} />
					<section className='content'>
						<h2>{name}</h2>
						<Stars stars={stars} reviews={reviews} />
						<h5 className='price'>{formatPrice(price)}</h5>
						<p className='desc'>{description}</p>
						<p className='info'>
							<span>Availiable : </span>
							{stock > 0 ? "In stock" : "out of stock"}
						</p>
						<p className='info'>
							<span>SKU : </span>
							{sku}
						</p>
						<p className='info'>
							<span>Brand : </span>
							{company}
						</p>
						<hr />
						{stock > 0 && <AddToCart product={product} />}
					</section>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.main`
	.product-center {
		display: grid;
		gap: 4rem;
		margin-top: 2rem;
	}
	.price {
		color: var(--clr-primary-5);
	}
	.desc {
		line-height: 2;
		max-width: 45em;
	}
	.info {
		text-transform: capitalize;
		width: 300px;
		display: grid;
		grid-template-columns: 125px 1fr;
		span {
			font-weight: 700;
		}
	}

	@media (min-width: 992px) {
		.product-center {
			grid-template-columns: 1fr 1fr;
			align-items: center;
		}
		.price {
			font-size: 1.25rem;
		}
	}
`;

export default SingleProductPage;
