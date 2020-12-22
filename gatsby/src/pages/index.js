import React from "react";
import useLatestData from "../utils/useLatestData";
import { HomePageGrid } from "../styles/Grids";
import LoadingGrid from "../components/LoadingGrid";
import ItemGrid from "../components/ItemGrid";
import SEO from "../components/SEO";

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On Duty</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now</p>
      )}
      {slicemasters?.length && <ItemGrid items={slicemasters} />}
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Slicemasters On Duty</span>
      </h2>
      <p>Come on by, buy the slice!</p>
      {!hotSlices && <LoadingGrid count={4} />}
      {hotSlices && !hotSlices?.length && <p>Nothing in the case</p>}
      {hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
}

export default function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();

  console.log("env");
  console.log(process.env.NODE_ENV);
  console.log(process.env.URL);
  // console.log(process.env.URL.NETLIFY_SITE_URL);
  console.log(process.env.NETLIFY_ENV);
  console.log(process.env.CONTEXT);
  return (
    <>
      <SEO title="Welcome!" />
      <div className="center">
        <h1>The Best Pizza Downtown!</h1>
        <p>Open 11am to 11pm Every Single Day</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters}></CurrentlySlicing>
          <HotSlices hotSlices={hotSlices}></HotSlices>
        </HomePageGrid>
      </div>
    </>
  );
}
