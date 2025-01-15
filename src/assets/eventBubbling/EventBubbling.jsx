import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./event.css";

function EventBubbling() {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent additional manual bubbling

    const target = e.currentTarget;

    // Sequentially highlight each parent element in the bubbling phase
    let delay = 0;
    let currentElement = target;

    while (currentElement) {
      // Ensure there are classes in the currentElement
      if (currentElement.classList.length > 0) {
        // Check if the class name starts with 'div-' (use classList[0] safely)
        if (currentElement.classList[0].startsWith("div-")) {
          const current = currentElement; // Capture the current element for the timeout closure

          setTimeout(() => {
            current.style.backgroundColor = "lightgreen";
            setTimeout(() => {
              current.style.backgroundColor = "white"; // Reset background color
            }, 500); // Hold the highlight for 500ms
          }, delay);

          delay += 500; // Increment delay for the next parent
        }
      }

      currentElement = currentElement.parentElement; // Move to the parent element
    }
  };

  return (
    <>
      <div>
        <div
          className="div-1"
          onClick={(e) => handleClick(e, 1)}
          style={{ backgroundColor: "white" }}
        > 
          <div
            className="div-2"
            onClick={(e) => handleClick(e, 2)}
            style={{ backgroundColor: "white" }}
          >
            <div
              className="div-3"
              onClick={(e) => handleClick(e, 3)}
              style={{ backgroundColor: "white" }}
            >
              <div
                className="div-4"
                onClick={(e) => handleClick(e, 4)}
                style={{ backgroundColor: "white" }}
              >
                <div
                  className="div-5"
                  onClick={(e) => handleClick(e, 5)}
                  style={{ backgroundColor: "white" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventBubbling;
