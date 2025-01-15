// SpreadRestDemo.jsx
import React, { useEffect, useState } from 'react';
import './SpreadRestDemo.css';  // We'll create this CSS file separately

const SpreadRestDemo = () => {
  // Same state management as before
  const [fruits, setFruits] = useState(['apple', 'banana', 'orange']);

  const [newNumber, setNewNumber] = useState('');
  const [person, setPerson] = useState({
    name: 'John',
    age: 25
  });
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

  const handleAddNumber = () => {
    if (newNumber) {
      setNumbers([...numbers, newNumber]);
      setNewNumber('');
    }
  };

  const handleUpdatePerson = (field, value) => {
    setPerson({
      ...person,
      [field]: value
    });
  };

  const calculateTotal = (...nums) => {
    return nums.reduce((sum, num) => sum + num, 0);
  };
  

  return (
    <div className="spread-rest-demo">
      {/* Array Spread Section */}
      <section className="demo-section">
        <h2>Spread Operator with Arrays</h2>
        <div className="input-group">
          <input
            type="number"
            value={newNumber}
            onChange={(e) => setNewNumber(Number(e.target.value) || '')}
            placeholder="Enter a number"
          />
          <button onClick={() => handleAddNumber()}>Add Number</button>
        </div>
        <div className="code-display">
          <code>
            [...numbers, newNumber] = [{numbers.join(', ')}]
          </code>
        </div>
      </section>

      {/* Object Spread Section */}
      <section className="demo-section">
        <h2>Spread Operator with Objects</h2>
        <div className="input-group">
          <input
            type="text"
            value={person.name}
            onChange={(e) => handleUpdatePerson('name', e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={person.age}
            onChange={(e) => handleUpdatePerson('age', e.target.value)}
            placeholder="Age"
          />
        </div>
        <div className="code-display">
          <code>
            {`{...person, newField} = `}
            {JSON.stringify(person, null, 2)}
          </code>
        </div>
      </section>

      {/* Rest Parameters Section */}
      <section className="demo-section">
        <h2>Rest Parameters</h2>
        <div className="code-display">
          <code>
            calculateTotal(...numbers) = {calculateTotal(...numbers)}
          </code>
          <p className="note">
            Using rest parameters to sum: [{numbers.join(', ')}]
          </p>
        </div>
      </section>

    </div>
  );
};

export default SpreadRestDemo;