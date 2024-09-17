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

  const renderTable = (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return <p>Sem dados para exibir.</p>;
    }

    const headers = Object.keys(data[0]);

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{item[header] ?? ' - '}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="col-md-6 mb-4 d-flex">
      <div className="card h-100 d-flex flex-column md">
        <div className="card-body d-flex flex-column flex-grow-1">
          <h5 className="card-title">Questão {question}</h5>
          <h6 className="card-subtitle mb-2 text-muted">Descrição da Questão</h6>
          <p className="card-text">{text}</p>

          <button className="btn btn-primary mt-auto mb-2" onClick={handleToggleResult}>
            {showResult ? 'Esconder' : 'Executar'}
          </button>

          {showResult && (
            <>
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <div className="result-container">
                  {Array.isArray(result) ? (
                    renderTable(result)
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
