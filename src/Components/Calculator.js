import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [isScientific, setIsScientific] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isNewCalculation, setIsNewCalculation] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if ((/\d/).test(key)) {
        handleClick(key);
      } else if (['+', '-', '*', '/'].includes(key)) {
        handleClick(key);
      } else if (key === 'Enter') {
        handleCalculate();
      } else if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [input]);

  const handleClick = (value) => {
    if (isNewCalculation) {
      setInput(value);
      setIsNewCalculation(false);
    } else {
      setInput(input + value);
    }
  };

  const handleClear = () => {
    setInput('');
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const result = math.evaluate(input).toString();
      setHistory([...history, `${input} = ${result}`]);
      setInput(result);
      setIsNewCalculation(true);
    } catch (error) {
      setInput('Error');
      setIsNewCalculation(true);
    }
  };

  const handleScientific = (func) => {
    try {
      const result = math[func](math.evaluate(input)).toString();
      setHistory([...history, `${func}(${input}) = ${result}`]);
      setInput(result);
      setIsNewCalculation(true);
    } catch (error) {
      setInput('Error');
      setIsNewCalculation(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="relative bg-gray-800 p-4 rounded-lg shadow-md w-96">
        <div className="mb-4 text-right text-4xl">
          {input || '0'}
        </div>
        {isScientific && (
          <div className="grid grid-cols-5 gap-4 mb-4">
            <button className="btn" onClick={() => handleScientific('sin')}>sin</button>
            <button className="btn" onClick={() => handleScientific('cos')}>cos</button>
            <button className="btn" onClick={() => handleScientific('tan')}>tan</button>
            <button className="btn" onClick={() => handleClick('rad')}>rad</button>
            <button className="btn" onClick={() => handleClick('deg')}>deg</button>
            <button className="btn" onClick={() => handleScientific('log')}>log</button>
            <button className="btn" onClick={() => handleScientific('ln')}>ln</button>
            <button className="btn" onClick={() => handleClick('(')}>(</button>
            <button className="btn" onClick={() => handleClick(')')}>)</button>
            <button className="btn" onClick={() => handleClick('inv')}>inv</button>
            <button className="btn" onClick={() => handleClick('!')}>!</button>
            <button className="btn" onClick={() => handleClick('^')}>^</button>
            <button className="btn" onClick={() => handleScientific('sqrt')}>√</button>
            <button className="btn" onClick={() => handleClick('pi')}>π</button>
            <button className="btn" onClick={() => handleClick('e')}>e</button>
          </div>
        )}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <button className="btn" onClick={() => handleClear()}>AC</button>
          <button className="btn" onClick={() => handleClick('%')}>%</button>
          <button className="btn" onClick={() => handleBackspace()}>&larr;</button>
          <button className="btn" onClick={() => handleClick('/')}>÷</button>

          <button className="btn" onClick={() => handleClick('7')}>7</button>
          <button className="btn" onClick={() => handleClick('8')}>8</button>
          <button className="btn" onClick={() => handleClick('9')}>9</button>
          <button className="btn" onClick={() => handleClick('*')}>×</button>

          <button className="btn" onClick={() => handleClick('4')}>4</button>
          <button className="btn" onClick={() => handleClick('5')}>5</button>
          <button className="btn" onClick={() => handleClick('6')}>6</button>
          <button className="btn" onClick={() => handleClick('-')}>−</button>

          <button className="btn" onClick={() => handleClick('1')}>1</button>
          <button className="btn" onClick={() => handleClick('2')}>2</button>
          <button className="btn" onClick={() => handleClick('3')}>3</button>
          <button className="btn" onClick={() => handleClick('+')}>+</button>

          <button className="btn" onClick={() => handleClick('00')}>00</button>
          <button className="btn" onClick={() => handleClick('0')}>0</button>
          <button className="btn" onClick={() => handleClick('.')}>.</button>
          <button className="rounded-full bg-orange-500 hover:bg-orange-400" onClick={() => handleCalculate()}>=</button>
        </div>
      </div>

      <div className="flex flex-col ml-4">
        <button 
          className="btn mb-4"
          onClick={() => setIsScientific(!isScientific)}
        >
          {isScientific ? 'Basic' : 'Scientific'}
        </button>
        <button 
          className="btn mb-4"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>

        {showHistory && (
          <div className="bg-gray-800 p-4 rounded-lg shadow-md w-64 max-h-96 overflow-y-auto">
            <h2 className="text-lg mb-2">History</h2>
            <ul className="list-disc list-inside">
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
