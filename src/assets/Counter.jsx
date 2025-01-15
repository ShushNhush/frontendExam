import React, { useState } from 'react';

// Counter component
const Counter = ({ label, step }) => {
  // Using state to store the count
  const [count, setCount] = useState(0);

  // Function to increment the count
  const increment = () => setCount(count + step);

  return (
    <div style={{ textAlign: 'center'}}>
      <h2>{label}</h2>
      <p>Current Count: {count}</p>
      <button onClick={increment}>Increase by {step}</button>
    </div>
  );
};

export default Counter;
