// Component: CalculatorWidget - A simple calculator for basic arithmetic operations
const CalculatorWidget = () => {
  // State for managing input expression and result
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  // Appends the clicked button's value to the input
  const handleInput = (value) => {
    setInput((prev) => prev + value);
  };

  // Clears the input and result
  const handleClear = () => {
    setInput('');
    setResult(null);
  };

  // Evaluates the input expression and sets the result
  const handleCalculate = () => {
    try {
      setResult(evaluate(input));
    } catch {
      setResult('Error'); // Handles invalid expressions
    }
  };

  // Render the calculator UI
  return (
    <div className="widget calculator-widget">
      <h2>Calculator</h2>
      <input type="text" value={input} readOnly /> {/* Displays the input */}
      <div className="calculator-grid">
        {/* Render calculator buttons */}
        {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'C', '0', '=', '/'].map((button) => (
          <button
            key={button}
            onClick={() =>
              button === 'C'
                ? handleClear() // Clears input and result
                : button === '='
                ? handleCalculate() // Calculates the result
                : handleInput(button) // Appends input
            }
          >
            {button}
          </button>
        ))}
      </div>
      {result !== null && <h3>Result: {result}</h3>} {/* Displays the result */}
    </div>
  );
};

export default CalculatorWidget; // Export the component
