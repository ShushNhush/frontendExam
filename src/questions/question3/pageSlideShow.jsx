import styled from "styled-components";
import { useState } from "react";
import {
  Page,
  Header,
  HeaderButton,
  MainContent,
  QuestionTitle,
} from "../../assets/templateStyles";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // Import a highlight.js style
import "../../basic.css";
import Counter from "../../assets/Counter";
import Slide from "../../assets/Slide";

const counterComponent = `
\`\`\`javascript
const Counter = ({ label, step }) => {
  
const [count, setCount] = 
  useState(0);

const increment = () => 
    setCount(count + step);

return (
  <div style={{ 
textAlign: 'center', margin: '20px' }}>
      <h2>{label}</h2>
      <p>Current Count: {count}</p>
      <button onClick={increment}>
      Increase by {step}</button>
    </div>
  );
};
\`\`\`
`;
const importCounter = `
\`\`\`javascript
<Counter label={"Counter 1"} step={1}/>
<Counter label={"Counter 2"} step={5}/>
\`\`\`
`;

function page() {
 
  const [choice, setChoice] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleQuestionClick = (option) => {
    setChoice(option);
    setCurrentSlide(0); // Reset to the first slide when switching questions
  };

  const slides = {
    1: [
      
      <Slide key="q1-slide1" content=

        {<>
          <QuestionTitle>What is the package.json</QuestionTitle>
         <p>
                  <strong>Props (short for properties)</strong> are a way to
                  pass data from a parent component to a child component in
                  React. they are <strong>read only</strong> meaning a component
                  cannot modify its own props.
                  <br />
                  <br />
                  
                </p>
        </>}
      >
        

      </Slide>
      ,
      <Slide key="q1-slide2" content={<>
      <QuestionTitle>What is the package.json</QuestionTitle>
      <strong>Key features</strong>
        <ul>
                  <li>
                    <strong>Data Flow:</strong> Props enable a unidirectional
                    (parent-to-child) data flow.
                  </li>
                  <li>
                    <strong>Customizable Components:</strong> Allow components
                    to be dynamic and reusable
                  </li>
                  <li>
                    <strong>children Prop:</strong> A special prop used to pass
                    child elements or components to a parent component
                  </li>
                </ul>
      </>}>
        
      </Slide>,
    ],
    2: [
      <div key="q2-slide1">
        <QuestionTitle>What are props and state in React</QuestionTitle>
        <p>
          <strong>Props</strong> (short for properties) are a way to pass data...
        </p>
      </div>,
      <div key="q2-slide2">
        <p>
          <strong>State</strong> is an object in a React component that holds
          information...
        </p>
      </div>,
    ],
    3: [
      <div key="q3-slide1">
        <QuestionTitle>Question 3 Coming Soon</QuestionTitle>
        <p>Placeholder content for Question 3.</p>
      </div>,
    ],
  };

  const handleNext = () => {
    if (currentSlide < slides[choice].length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };


  return (
    <>
      <Page>
        <Header>
          <HeaderButton onClick={() => handleQuestionClick(1)}>
            Question 1
          </HeaderButton>
          <HeaderButton onClick={() => handleQuestionClick(2)}>
            Question 2
          </HeaderButton>
          <HeaderButton onClick={() => handleQuestionClick(3)}>
            Question 3
          </HeaderButton>
        </Header>
        <MainContent>
          {slides[choice][currentSlide]}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", gridRow: "4 / -1", gridColumn: "1 / -1" }}>
            <button onClick={handlePrevious} disabled={currentSlide === 0}>
              Previous
            </button>
            <button onClick={handleNext} disabled={currentSlide === slides[choice].length - 1}>
              Next
            </button>
          </div>
        </MainContent>
      </Page>
    </>
  );
}

export default page;
