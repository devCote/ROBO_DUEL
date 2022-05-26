import { useEffect, useState } from 'react';
import './App.css';
import Player from './Player';
import Card from './Card';

const STATE = {
  loading: 'loading',
  menu: 'menu',
  start: 'start',
  finish: 'finish'
}

function App() {
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();
  const [hp1, setHp1] = useState(100);
  const [hp2, setHp2] = useState(100);
  const [gameState, setGameState] = useState(STATE.loading)

  useEffect(() => {
    if (gameState !== STATE.loading) return
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
        setGameState(STATE.menu)
      });
  }, [gameState]);

  useEffect(() => {
    if (gameState === STATE.menu || gameState === STATE.finish || gameState === STATE.loading) return

    let event1 = setInterval(() => {
      setHp1(hp1 => hp1 - player1.takeDamage())
    }, 500)
    let event2 = setInterval(() => {
      setHp2(hp2 => hp2 - player2.takeDamage())
    }, 500)

    if (hp1 < 0 || hp2 < 0) {
      setGameState(STATE.finish)
      clearInterval(event1)
      clearInterval(event2)
      if (hp1 < 0) setHp1(0)
      else setHp2(0)
    }

    return () => {
      clearInterval(event1)
      clearInterval(event2)
    }
  }, [gameState, hp1, hp2])

  const clickHandle = () => {
    if (gameState === STATE.finish) {
      setHp1(100)
      setHp2(100)
      setGameState(STATE.loading)
      return
    }
    setGameState(STATE.start)
  };

  const lifeCheck = (playerHp, foeHp) => {
    if (foeHp === 0 && playerHp === 0) return 'bg-red'
    else if (foeHp === 0) return 'bg-green'
    else if (playerHp === 0) return 'bg-red'
    else return 'bg-dark-gray'
  }

  return (
    <div className="App">
      <header className="App-header">
        {gameState === STATE.loading ? 'LOADING...' : (
          <>
            <button className={gameState !== STATE.start ? "br-pill bg-white mb4 pa2" : 'dn'} onClick={clickHandle}>
              {gameState === STATE.menu ? 'START GAME' : 'TRY AGAIN'}
            </button>
            <div className="flex justify-between">
              {player1 ?
                <Card
                  className="outline w-25 pa3"
                  name={player1.name}
                  bg={lifeCheck(hp1, hp2)}
                  hp={hp1 > 0 ? hp1 + 'hp' : 'RIP'} /> : null
              }
              <h4 className="w-25 pa3 self-center">VS</h4>
              {player2 ?
                <Card
                  className="outline w-25 pa3"
                  name={player2.name}
                  bg={lifeCheck(hp2, hp1)}
                  hp={hp2 > 0 ? hp2 + 'hp' : 'RIP'} /> : null
              }

            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
