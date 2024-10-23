// src/components/CalculatorWidget.js
import React, { useState } from 'react';
import { evaluate } from 'mathjs'; // Use mathjs for safe evaluation

const CalculatorWidget = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleInput = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  const handleCalculate = () => {
    try {
      setResult(evaluate(input));
    } catch {
      setResult('Error');
    }
  };

  return (
    <div className="widget calculator-widget">
      <h2>Calculator</h2>
      <input type="text" value={input} readOnly />
      <div className="calculator-grid">
        {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'C', '0', '=', '/'].map((button) => (
          <button
            key={button}
            onClick={() =>
              button === 'C'
                ? handleClear()
                : button === '='
                ? handleCalculate()
                : handleInput(button)
            }
          >
            {button}
          </button>
        ))}
      </div>
      {result !== null && <h3>Result: {result}</h3>}
    </div>
  );
};

export default CalculatorWidget;
