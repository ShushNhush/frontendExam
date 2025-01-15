import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { BasicButton } from "./templateStyles";

const PromiseDemo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
 
  const handleFetchData = () => {
    setLoading(true); 
    setError(null);
    setData(null); 

    const fetchData = new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; 
        if (success) {
          resolve(<ThumbsUp />);
        } else {
          reject(<ThumbsDown />);
        }
      }, 2000); 
    });

    fetchData
      .then((response) => {
        setData(response); 
        setLoading(false); 
      })
      .catch((err) => {
        setError(err); 
        setLoading(false); 
      });
  };

  return (
    <div>
      
      {loading && <p>Pending...</p>}
      {error && <p style={{ color: "red" }}>Rejected: {error}</p>}
      {data && <p style={{color: "green"}}>Fulfilled: {data}</p>}
      <BasicButton onClick={handleFetchData}>Fetch Data</BasicButton>
    </div>
  );
};

export default PromiseDemo;
