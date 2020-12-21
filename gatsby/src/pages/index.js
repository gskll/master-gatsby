import React from "react";
import useLatestData from "../utils/useLatestData";

function CurrentlySlicing({ slicemasters }) {
  return <div>CurrentlySlicing</div>;
}

function HotSlices({ hotSlices }) {
  return <div>HotSlices</div>;
}

export default function HomePage() {
  const { hotSlices, slicemasters } = useLatestData();

  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <div>
        <CurrentlySlicing slicemasters={slicemasters}></CurrentlySlicing>
        <HotSlices hotSlices={hotSlices}></HotSlices>
      </div>
    </div>
  );
}
