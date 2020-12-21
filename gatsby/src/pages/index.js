import React from "react";
import useLatestData from "../utils/useLatestData";
import { HomePageGrid } from "../styles/Grids";
import LoadingGrid from "../components/LoadingGrid";

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      <LoadingGrid count={4} />
    </div>
  );
}

function HotSlices({ hotSlices }) {
  return (
    <div>
      <LoadingGrid count={4} />
    </div>
  );
}

export default function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters}></CurrentlySlicing>
        <HotSlices hotSlices={hotSlices}></HotSlices>
      </HomePageGrid>
    </div>
  );
}
