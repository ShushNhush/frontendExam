import React, { useState, useRef } from "react";
import { BasicButton } from "./templateStyles";

const fruits = [
  "Apple",
  "Apricot",
  "Banana",
  "Blueberry",
  "Cherry",
  "Cantaloupe",
  "Grapes",
  "Guava",
];

const ControlledFilter = () => {
  const [filter, setFilter] = useState("");

  const filteredFruits = fruits.filter((fruit) =>
    fruit.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <div>
      <h3>Controlled Component</h3>
      <input
        type="text"
        placeholder="Filter by starting letter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Fruits</th>
          </tr>
        </thead>
        <tbody>
          {filteredFruits.map((fruit, index) => (
            <tr key={index}>
              <td>{fruit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UncontrolledFilter = () => {
  const inputRef = useRef();

  const [displayedFruits, setDisplayedFruits] = useState(fruits);

  const handleFilter = () => {
    const filterValue = inputRef.current.value;
    const filtered = fruits.filter((fruit) =>
      fruit.toLowerCase().startsWith(filterValue.toLowerCase())
    );
    setDisplayedFruits(filtered);
  };

  return (
    <div>
      <h3>Uncontrolled Component</h3>
      <input
        type="text"
        placeholder="Filter by starting letter"
        ref={inputRef}
      />
      <BasicButton onClick={handleFilter}>Filter</BasicButton>
      <table>
        <thead>
          <tr>
            <th>Fruits</th>
          </tr>
        </thead>
        <tbody>
          {displayedFruits.map((fruit, index) => (
            <tr key={index}>
              <td>{fruit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export {UncontrolledFilter, ControlledFilter}