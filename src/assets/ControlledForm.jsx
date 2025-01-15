import React, { useState } from "react";
import { BasicButton } from "./templateStyles";

function ControlledForm({formData, setFormData, handleSubmit}) {
  

  const handleChange = (e) => {
    
    setFormData(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData || ""}
          onChange={handleChange}
        />
      </label>
        <br />
      <BasicButton type="submit">Submit</BasicButton>
    </form>
  );
}

export default ControlledForm;
