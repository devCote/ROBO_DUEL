import React from 'react';

const Card = ({ name, hp, bg }) => {
  return (
    <div className={`dib br2 pa4 tc bw2 shadow-2 ${bg}`} >
      <img
        src={`https://robohash.org/${name}`}
        alt="img"
        className='br-100 dib ba b--grey-04 bg-near-black w4.5 h4.5'
      />
      <div>
        <h4>{name}</h4>
        <h3>{hp}</h3>
      </div>
    </div >
  );
};

export default Card;
