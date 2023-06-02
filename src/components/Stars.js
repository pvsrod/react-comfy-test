import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ stars, reviews }) => {
	//this is a function that displays the stars, each star is a span whit the image of either a full, half or empty star, we display them one by one. First we create an array of 5 elements, we don't care about the element themselves but the index. If you want to understand the logic better you can check how this will be done manually by coding each span/star at bottom of the page
	const tempStars = Array.from({ length: 5 }, (_, index) => {
		const number = index + 0.5;
		return (
			<span key={index}>
				{stars >= index + 1 ? (
					<BsStarFill />
				) : stars >= number ? (
					<BsStarHalf />
				) : (
					<BsStar />
				)}
			</span>
		);
	});

	return (
		<Wrapper>
			<div className='stars'>{tempStars}</div>
			<p className='reviews'>({reviews} customer reviews)</p>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	span {
		color: #ffb900;
		font-size: 1rem;
		margin-right: 0.25rem;
	}
	p {
		margin-left: 0.5rem;
		margin-bottom: 0;
	}
	margin-bottom: 0.5rem;
`;
export default Stars;

// {/* star */}
// <span>
// 	{stars >= 1 ? <BsStarFill /> : stars >= 0.5 ? <BsStarHalf /> : <BsStar />}
// </span>;
// {/* end of star */}

// {/* star */}
// <span>
// 	{stars >= 2 ? <BsStarFill /> : stars >= 1.5 ? <BsStarHalf /> : <BsStar />}
// </span>;
// {/* end of star */}

// {/* star */}
// <span>
// 	{stars >= 3 ? <BsStarFill /> : stars >= 2.5 ? <BsStarHalf /> : <BsStar />}
// </span>;
// {/* end of star */}

// {/* star */}
// <span>
// 	{stars >= 4 ? <BsStarFill /> : stars >= 3.5 ? <BsStarHalf /> : <BsStar />}
// </span>;
// {/* end of star */}

// {/* star */}
// <span>
// 	{stars === 5 ? <BsStarFill /> : stars >= 4.5 ? <BsStarHalf /> : <BsStar />}
// </span>;
// {/* end of star */}
