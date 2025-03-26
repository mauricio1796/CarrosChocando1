import React, { useState, useEffect } from "react";

const screenWidth = window.innerWidth;
const carWidth = 40;
const laneWidth = screenWidth / 3;

const Game = ({ onBack }) => {
  const [carLane, setCarLane] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const isFast = Math.random() < 0.3;
      setObstacles((prev) => [...prev, { lane: Math.floor(Math.random() * 3), top: 0, speed: isFast ? 25 : 15, points: isFast ? 40 : 10, color: isFast ? "orange" : "red" }]);
    }, 2000);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const moveObstacles = setInterval(() => {
      setObstacles((prev) => {
        return prev
          .map((obs) => {
            const speedMultiplier = 1 + score / 1000;
            const newTop = obs.top + obs.speed * speedMultiplier;

            if (newTop > 500) {
              setScore((prevScore) => prevScore + obs.points);
              return null;
            }
            return { ...obs, top: newTop };
          })
          .filter(Boolean);
      });
    }, 100);

    return () => clearInterval(moveObstacles);
  }, [gameOver, score]);

  useEffect(() => {
    obstacles.forEach((obs) => {
      if (
        obs.lane === carLane &&
        obs.top > 440 && obs.top < 500
      ) {
        setGameOver(true);
      }
    });
  }, [obstacles]);

  const moveLeft = () => {
    if (carLane > 0) setCarLane(carLane - 1);
  };

  const moveRight = () => {
    if (carLane < 2) setCarLane(carLane + 1);
  };

  const restartGame = () => {
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setCarLane(1);
  };

  return (
    <div className="gameContainer">
      <div className="road">
        {[...Array(10)].map((_, index) => (
          <>
            <div key={`center-${index}`} className="laneLine" style={{ top: index * 50, left: screenWidth / 2 - 2.5 }} />
            <div key={`left-${index}`} className="laneLine" style={{ top: index * 50, left: laneWidth / 2 - 2.5 }} />
            <div key={`right-${index}`} className="laneLine" style={{ top: index * 50, left: 2.5 * laneWidth - 2.5 }} />
          </>
        ))}
        <div className="laneBorder" style={{ left: laneWidth - 2.5 }} />
        <div className="laneBorder" style={{ left: 2 * laneWidth - 2.5 }} />
      </div>
      <div className="car" style={{ left: carLane * laneWidth + laneWidth / 2 - carWidth / 2 }} />
      {obstacles.map((obs, index) => (
        <div key={index} className="obstacle" style={{ left: obs.lane * laneWidth + laneWidth / 2 - carWidth / 2, top: obs.top, backgroundColor: obs.color }} />
      ))}
      <p className="score">Puntuación: {score}</p>
      {gameOver && (
        <div className="gameOverContainer">
          <p className="gameOverText">Game Over</p>
          <p className="finalScore">Puntaje Final: {score}</p>
          <button onClick={restartGame} className="retryButton">Volver a Jugar</button>
        </div>
      )}
      <button onClick={moveLeft} className="leftButton">⬅️</button>
      <button onClick={moveRight} className="rightButton">➡️</button>
      <button onClick={onBack} className="backButton">Volver</button>
    </div>
  );
};

export default Game;
