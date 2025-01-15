import React, { useState } from "react";
import { BasicButton } from "./templateStyles";

function ItemTransfer() {
  const [table1Items, setTable1Items] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);

  const [table2Items, setTable2Items] = useState([
    { id: 4, name: 'Item 4' },
    { id: 5, name: 'Item 5' }
  ]);

  const moveItemToTable2 = (id) => {
    const itemToMove = table1Items.find(item => item.id === id);
    setTable1Items(table1Items.filter(item => item.id !== id));
    setTable2Items([...table2Items, itemToMove]);
  };

  const moveItemToTable1 = (id) => {
    const itemToMove = table2Items.find(item => item.id === id);
    setTable2Items(table2Items.filter(item => item.id !== id));
    setTable1Items([...table1Items, itemToMove]);
  };

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <div>
      <h3>Table 1</h3>
      <table >
        <thead style={{backgroundColor: "#333", height: "40px", color: "white"}}>
          <tr>
            <th style={{width: "60px"}}>Item</th>
            <th style={{width: "100px"}}>Action</th>
          </tr>
        </thead>
        <tbody >
          {table1Items.map(item => (
            <tr key={item.id}>
              <td style={{border: "1px solid #333", padding: "5px" }}>{item.name}</td>
              <td style={{border: "1px solid #333", padding: "5px" }}>
                <BasicButton onClick={() => moveItemToTable2(item.id)}>Move to Table 2</BasicButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div>
      <h3>Table 2</h3>
      <table>
        <thead style={{backgroundColor: "#333", height: "40px", color: "white"}}>
          <tr>
          <th style={{width: "60px"}}>Item</th>
          <th style={{width: "100px"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {table2Items.map(item => (
            <tr key={item.id}>
              <td style={{border: "1px solid #333", padding: "5px" }}>{item.name}</td>
              <td style={{border: "1px solid #333", padding: "5px" }}>
                <BasicButton onClick={() => moveItemToTable1(item.id)}>Move to Table 1</BasicButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ItemTransfer;
