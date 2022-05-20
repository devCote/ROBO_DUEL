import React from 'react';

const Card = ({ name, hp }) => {
  return (
    <div className="bg-light-grey dib br3 pa2 ma2 tc bw4 shadow-5">
      <img
        src={`https://robohash.org/set_set2/${name}?size=100x100`}
        alt="img"
      />
      <div>
        <h4>{name}</h4>
        <h3>{hp}hp</h3>
      </div>
    </div>
  );
};

export default Card;
