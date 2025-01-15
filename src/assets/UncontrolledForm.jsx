import React from "react";
import { BasicButton } from "./templateStyles";

function UncontrolledForm({inputRef, handleSubmit}) {


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="input" ref={inputRef} />
      </label>
      
      <br />
      <BasicButton type="submit">Submit</BasicButton>
    </form>
  );
}

export default UncontrolledForm;
