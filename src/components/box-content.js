import React, { useState } from 'react';
import './box-content.css';

export const BoxContent = ({ question, text, result, loading, onExecute }) => {
  const [showResult, setShowResult] = useState(false);

  const handleToggleResult = () => {
    if (!showResult) {
      onExecute();
    }
    setShowResult(!showResult);
  };

  const handleReprocess = () => {
    onExecute();
    setShowResult(true);
  };

  return (
    <div className="col-md-3 mb-4 d-flex">
      <div className="card h-100 d-flex flex-column">
        <div className="card-body d-flex flex-column flex-grow-1">
          <h5 className="card-title">Questão {question}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Descrição da Questão</h6>
          <p className="card-text">{text}</p>

          <button className="btn btn-primary mt-auto mb-2" onClick={handleToggleResult}>
            {showResult ? 'Esconder' : 'Executar'}
          </button>

          {showResult && (
            <>
              <h6>Resultado da consulta:</h6>
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <div className="result-container">
                  {result ? (
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                  ) : (
                    <p>Erro ao carregar os dados.</p>
                  )}
                </div>
              )}
              <button className="btn btn-secondary mt-2" onClick={handleReprocess}>
                Reprocessar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
