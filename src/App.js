import './App.css';
import { useState } from 'react';
import { question } from './service/questions';
import { BoxContent } from './components/box-content';
import { questionsContent } from './questions-content';

function App() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});

  const loadQuestionResult = async (number) => {
    setLoading(prevLoading => ({
      ...prevLoading,
      [number]: true,
    }));

    try {
      const response = await question(number);
      setResults(prevResults => ({
        ...prevResults,
        [number]: response.data,
      }));
    } catch (error) {
      console.error(`Erro ao carregar a resposta da questão ${number}`, error);
      setResults(prevResults => ({
        ...prevResults,
        [number]: 'Erro ao carregar os dados',
      }));
    } finally {
      setLoading(prevLoading => ({
        ...prevLoading,
        [number]: false,
      }));
    }
  };

  return (
    <div className="container text-center">
      <h1 className="p-5">Projeto de Banco de Dados</h1>
      <div className="row">
        {questionsContent.map((item, index) => (
          <BoxContent
            key={index}
            question={item.question}
            text={item.text}
            result={results[item.question]}
            loading={loading[item.question]}
            onExecute={() => loadQuestionResult(item.question)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
