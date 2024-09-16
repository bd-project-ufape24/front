import './App.css';
import { useEffect, useState } from 'react';
import { question } from './service/questions';
import { BoxContent } from './components/box-content';
import { questionsContent } from './questions-content';

function App() {
  const [results, setResults] = useState({});

  const loadQuestionResult = async (number) => {
    try {
      const response = await question(number);
      setResults(prevResults => ({
        ...prevResults,
        [number]: response.data
      }));
    } catch (error) {
      console.error(`Erro ao carregar a resposta da questão ${number}`, error);
      setResults(prevResults => ({
        ...prevResults,
        [number]: 'Erro ao carregar os dados'
      }));
    }
  };

  useEffect(() => {
    questionsContent.forEach(q => loadQuestionResult(q.question));
  }, []);

  return (
    <div className="App">
      <h1>Projeto de Banco de Dados</h1>

      {questionsContent.map((item, index) => (
        <BoxContent
          key={index}
          question={item.question}
          text={item.text}
          result={results[item.question]}
        />
      ))}
    </div>
  );
}

export default App;
