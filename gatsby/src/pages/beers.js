import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import SEO from "../components/SEO";

const BeerGridStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

function SingleBeer({ beer }) {
  const rating = Math.round(beer.rating.average);
  return (
    <SingleBeerStyles>
      <img src={beer.image} alt={beer.name} />
      <h3>{beer.name}</h3>
      {beer.price}
      <p title={`${rating} out of 5 stars`}>
        {`⭐`.repeat(rating)}
        <span style={{ filter: `grayscale(100%)` }}>
          {`⭐`.repeat(5 - rating)}
        </span>
        <span>({beer.rating.reviews})</span>
      </p>
    </SingleBeerStyles>
  );
}

export default function BeersPage({ data }) {
  const beers = data.beers.nodes;

  return (
    <>
      <SEO title={`Beers! We have ${data.beers.nodes.length} in stock`} />
      <h2 className="center">
        We have {beers.length} Beers Available. Dine in only!
      </h2>
      <BeerGridStyles>
        {beers.map((beer) => (
          <SingleBeer key={beer.id} beer={beer} />
        ))}
      </BeerGridStyles>
    </>
  );
}

export const pageQuery = graphql`
  query {
    beers: allBeer {
      nodes {
        name
        price
        id
        rating {
          reviews
          average
        }
        image
      }
    }
  }
`;
