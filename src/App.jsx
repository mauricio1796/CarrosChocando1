import React, { useState } from "react";
import "./styles.css";

function Game({ onBack }) {
  return (
    <div className="game-container">
      <h2>Juego en Progreso 🚗</h2>
      <button className="close-button" onClick={onBack}>
        Salir
      </button>
    </div>
  );
}

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="container">
      {isPlaying ? (
        <Game onBack={() => setIsPlaying(false)} />
      ) : (
        <>
          <button className="start-button" onClick={() => setIsPlaying(true)}>
            Iniciar Juego 🚗
          </button>
          <button
            className="info-button"
            onClick={() => setShowInstructions(true)}
          >
            Instrucciones
          </button>
          <button className="info-button" onClick={() => setShowAbout(true)}>
            Acerca de
          </button>
        </>
      )}

      {showInstructions && (
        <div className="info-container">
          <p>
            Instrucciones: Mueve tu coche entre los tres carriles usando las
            teclas de dirección. Evita los obstáculos y acumula puntos.
          </p>
          <button
            className="close-button"
            onClick={() => setShowInstructions(false)}
          >
            Cerrar
          </button>
        </div>
      )}

      {showAbout && (
        <div className="info-container">
          <p>
            Acerca de: Este juego fue desarrollado para simular una carretera
            con obstáculos. Fue creado con React.js.
          </p>
          <button className="close-button" onClick={() => setShowAbout(false)}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
