import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('0');

  // Handle number and operator clicks
  const handleClick = (value) => {
    if (value === '.' && input.includes('.')) return; // Prevent multiple decimals
    setInput((prev) =>
      prev === '0' && value !== '.' ? value : prev + value
    );
  };

  // Handle the clear (AC) button
  const handleClear = () => setInput('0');

  // Handle the equal (=) button
  const handleEqual = () => {
    try {
      setInput(eval(input).toString()); // Evaluates the expression
    } catch (err) {
      setInput('Error'); // In case of invalid input
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyboardInput = (event) => {
      const key = event.key;

      if ('0123456789'.includes(key)) {
        handleClick(key);
      } else if (key === '.') {
        handleClick(key);
      } else if (key === 'Enter' || key === '=') {
        handleEqual();
      } else if (key === 'Backspace') {
        handleClear();
      } else if ('+-*/'.includes(key)) {
        handleClick(key);
      }
    };

    window.addEventListener('keydown', handleKeyboardInput);

    return () => {
      window.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [input]);

  // Buttons for the calculator
  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <div className="calculator">
      <div className="display" id="display">{input}</div>
      <div className="buttons">
        <button onClick={handleClear} className="clear" id="clear">AC</button>
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => (btn === '=' ? handleEqual() : handleClick(btn))}
            id={btn === '=' ? 'equals' : btn}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
