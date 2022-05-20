import { useEffect, useState } from 'react';
import './App.css';
import Player from './Player';
import Card from './Card';

function App() {
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [hp1, setHp1] = useState(100);
  const [hp2, setHp2] = useState(100);

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((result) => {
        setPlayer1(
          new Player(
            `${result.results[0].name.first} ${result.results[0].name.last}`
          )
        );
      });
    fetch('https://randomuser.me/api/')
      .then((response) => response.json())
      .then((result) => {
        setPlayer2(
          new Player(
            `${result.results[0].name.first} ${result.results[0].name.last}`
          )
        );
      });
  }, []);

  const clickHandle = () => {
    player1.takeDamage();
    setHp1(player1.hp);
    player2.takeDamage();
    setHp2(player1.hp);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="br-pill bg-grey" onClick={clickHandle}>
          START GAME
        </button>
        <div className="fl w-100">
          {player1 ? <Card className="" name={player1.name} hp={hp1} /> : null}
          <h4>VS</h4>
          {player2 ? <Card className="" name={player2.name} hp={hp2} /> : null}
        </div>
      </header>
    </div>
  );
}

export default App;
