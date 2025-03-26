import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import "./styles.css";
import Game from "./Game";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [highScores, setHighScores] = useState([]);

  // Función para obtener puntajes
  const fetchScores = async () => {
    try {
      const scoresQuery = query(collection(db, "scores"), orderBy("score", "desc"), limit(5));
      const snapshot = await getDocs(scoresQuery);
      setHighScores(snapshot.docs.map(doc => doc.data()));
    } catch (error) {
      console.error("Error obteniendo los puntajes:", error);
    }
  };

  useEffect(() => {
    fetchScores(); // Obtener puntajes al cargar la app
  }, []);

  return (
    <div className="container">
      {isPlaying ? (
        <Game onBack={() => setIsPlaying(false)} />
      ) : (
        <>
          <button className="start-button" onClick={() => setIsPlaying(true)}>
            Iniciar Juego 🚗
          </button>
          <button className="info-button" onClick={() => setShowInstructions(true)}>
            Instrucciones
          </button>
          <button className="info-button" onClick={() => setShowAbout(true)}>
            Acerca de
          </button>

          {/* Mostrar puntajes */}
          <h3>🏆 Mejores Puntajes</h3>
          <button className="info-button" onClick={fetchScores}>Actualizar Puntajes</button>
          <ul>
            {highScores.map((entry, index) => (
              <li key={index}>Puntaje: {entry.score}</li>
            ))}
          </ul>
        </>
      )}

      {showInstructions && (
        <div className="info-container">
          <p>
            Instrucciones: Mueve tu coche entre los tres carriles usando las teclas de dirección.
            Evita los obstáculos y acumula puntos.
          </p>
          <button className="close-button" onClick={() => setShowInstructions(false)}>
            Cerrar
          </button>
        </div>
      )}

      {showAbout && (
        <div className="info-container">
          <p>
            Acerca de: Este juego fue desarrollado para simular una carretera con obstáculos.
            Fue creado con React.js.
          </p>
          <button className="close-button" onClick={() => setShowAbout(false)}>
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
