import React from 'react';

export const BoxContent = ({ question, text, result }) => {
  return (
    <div>
      <h2>Questão {question}</h2>
      <p>{text}</p>
      <div>
        <h4>Resultado da consulta:</h4>
        {result ? (
          <pre>{JSON.stringify(result, null, 2)}</pre>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};
