// src/components/CalculatorWidget.js
import React, { useState } from 'react';
import { evaluate } from 'mathjs'; // Use mathjs for safe expression evaluation

const CalculatorWidget = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleInput = (e) => setInput(input + e.target.value);
  const handleClear = () => {
    setInput('');
    setResult(null);
  };
  const handleCalculate = () => {
    try {
      setResult(evaluate(input)); // Safely evaluate the expression
    } catch {
      setResult('Error');
    }
  };

  return (
    <div className="widget">
      <h2>Calculator</h2>
      <input type="text" value={input} readOnly />
      <div>
        <button onClick={handleInput} value="1">1</button>
        <button onClick={handleInput} value="2">2</button>
        <button onClick={handleInput} value="3">3</button>
        <button onClick={handleInput} value="+">+</button>
      </div>
      <div>
        <button onClick={handleInput} value="4">4</button>
        <button onClick={handleInput} value="5">5</button>
        <button onClick={handleInput} value="6">6</button>
        <button onClick={handleInput} value="-">-</button>
      </div>
      <div>
        <button onClick={handleInput} value="7">7</button>
        <button onClick={handleInput} value="8">8</button>
        <button onClick={handleInput} value="9">9</button>
        <button onClick={handleInput} value="*">*</button>
      </div>
      <div>
        <button onClick={handleClear}>C</button>
        <button onClick={handleInput} value="0">0</button>
        <button onClick={handleCalculate}>=</button>
        <button onClick={handleInput} value="/">/</button>
      </div>
      {result !== null && <h3>Result: {result}</h3>}
    </div>
  );
};

export default CalculatorWidget;
