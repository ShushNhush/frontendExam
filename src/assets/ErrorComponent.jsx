import React, { useState } from "react";

const ErrorComponent = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("This is a demo error!");
  }

  return (
    <button
      onClick={() => setThrowError(true)}
      style={{
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Cause Error
    </button>
  );
};

export default ErrorComponent;
