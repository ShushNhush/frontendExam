import styled from "styled-components";
import { useState } from "react";
import {
  Page,
  Header,
  HeaderButton,
  MainContent,
  QuestionTitle,
  BasicButton
} from "../../assets/templateStyles";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // Import a highlight.js style
import DemoButton from "../../assets/DemoButton";
import "../../basic.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Greeting from "../../assets/Greeting";
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Box, StepBack, Import } from 'lucide-react';
import Modal from "../../assets/modal/Modal";

const transpiledJSX = `
\`\`\`javascript
function Greeting(props) {
  const { name } = props;

return React.createElement(
"div",
null,
React.createElement("h1", null, Hello, '$'{name}!),
React.createElement(
"p", null, "Welcome to the React world!")
  );
}

export default Greeting;
\`\`\`
`;

const ticTacToe = `
\`\`\`javascript
const buttons = 
    document.querySelectorAll(".t1");

const click = 
    document.querySelector("#buttons");

const winner = 
    document.querySelector("#winner");
\`\`\`
`

const htmlScript = `
\`\`\`javascript
<script src="script.js"></script>
\`\`\`
`;

const jsxDemo = `
\`\`\`javascript
function Greeting({ name }) {

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to the React world!</p>
    </div>
  );
}

export default Greeting;
\`\`\`
`;

const gridCSS = `
\`\`\`css
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, 1fr);
\`\`\`
`

const highorder1 = `
    
\`\`\`javascript
// A higher-order function that takes a function as an argument
function operateOnNumbers(a, b, operation) {
// 'operation' is a function passed as an argument
    return operation(a, b);
}


const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

// We can pass different operations to get different results
console.log(operateOnNumbers(5, 3, add));      
// Output: 8
console.log(operateOnNumbers(5, 3, multiply)); 
// Output: 15
\`\`\`
`

const highOrder2 = `
\`\`\`javascript  
// Example 2: Using built-in higher-order functions
const products = [
    { name: 'Laptop', price: 999, inStock: true },
    { name: 'Phone', price: 599, inStock: false },
    { name: 'Tablet', price: 399, inStock: true }
];

// map is a higher-order function that transforms each element
const productNames = products.map(product => product.name);
console.log(productNames); // ['Laptop', 'Phone', 'Tablet']

// filter is a higher-order function that selects elements
const availableProducts = products.filter(product => product.inStock);
console.log(availableProducts); // [{ name: 'Laptop'... }, { name: 'Tablet'... }]

// reduce is a higher-order function that accumulates values
const totalValue = products.reduce((sum, product) => sum + product.price, 0);
console.log(totalValue); // 1997
\`\`\`
`


const GridExampleContainer = styled.div`
    
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    background-color: #333333;
    height: 50vh;
    width: 50vw;
    border: 2px solid #fff; /* Border around the entire grid container */
    grid-gap: 2px;

    background-image: 
    linear-gradient(to right, #fff 1px, transparent 1px), 
    linear-gradient(to bottom, #fff 1px, transparent 1px);
  background-size: 33.33% 33.33%; /* Define the size of the grid cells */

`

const GridItem = styled.div`
display: flex;
  border: 1px solid #ffffff; /* White border for visibility */
  background-color: #145DA0;
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
  justify-content: ${({ justify }) => justify};
  align-items: center;
  width: 100%;
  height: 100%;
`;


function page() {
  const [choice, setChoice] = useState(1);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState("");

  const handleClick = (option) => {
    setChoice(option);
  };

  const navigate = useNavigate();

  const [position, setPosition] = useState({ column: 2, row: 2 });
  const [justifyContent, setJustifyContent] = useState('center');

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setModalOpen(true);
  };

  const justifySnippet = `
\`\`\`css
justify-content: ${justifyContent};
\`\`\`
`


  const moveItem = (direction) => {
    setPosition((prevPosition) => {
      const newPosition = { ...prevPosition };
      if (direction === 'left' && prevPosition.column > 1) {
        newPosition.column -= 1;
      } else if (direction === 'right' && prevPosition.column < 3) {
        newPosition.column += 1;
      } else if (direction === 'up' && prevPosition.row > 1) {
        newPosition.row -= 1;
      } else if (direction === 'down' && prevPosition.row < 3) {
        newPosition.row += 1;
      }
      return newPosition;
    });
  };
  return (
    <>
      <Page>
        <Header>
          <HeaderButton onClick={() => handleClick(1)}>
          <StepBack onClick={() => navigate("/")} style={{ position: "absolute", left: "5px"}} size={40} />
            Question 1</HeaderButton>
          <HeaderButton onClick={() => handleClick(2)}>Question 2</HeaderButton>
          <HeaderButton onClick={() => handleClick(3)}>Question 3</HeaderButton>
        </Header>
        <MainContent>
          {choice === 1 ? (
            <>
                          <QuestionTitle>Show some examples of higher order function. Explain the benefits of doing that.</QuestionTitle>
            
                          <div>
          
          <h3>Higher-order functions</h3>
          <p>
          higher-order functions, are a powerful concept in JavaScript that comes from functional programming. Think of higher-order functions as "function factories" or "function managers" - they either create new functions or manage how other functions work.

          <br /><br />
          <strong>A higher-order function is simply a function that either:</strong>
          </p>
         
          <ul>
              <li>Takes one or more functions as arguments, and/or</li> <br />
              <li>Returns a function as its result</li>
          </ul>

            </div>

            <div>

              <h3>Simple showcase</h3>

              <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {highorder1}
              </ReactMarkdown>

              <p>A more practical example involves array methods, which are some of the most commonly used <strong>higher-order functions</strong> in JavaScript</p>

              <BasicButton onClick={() => openModal(currentSnippet)}>show code</BasicButton>
              <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {highOrder2}
              </ReactMarkdown>
              </Modal>

            </div>

            <div>
             <h4>Benefits of Higher-Order Functions</h4>

             <ul>
              <li><strong>Reusability</strong> Higher-order functions allow you to abstract common logic into reusable utilities.</li> <br />
              <li><strong>Modularity</strong> They help create clean and modular code by separating concerns.</li> <br />
              <li><strong>Functional Composition</strong> You can build more complex logic by combining smaller functions.</li> <br />
              <li><strong>Simplified Iterations</strong> Functions like map, filter, and reduce simplify operations on arrays.</li> <br />
              <li><strong>Improved Readability</strong> They can make code more declarative, focusing on the "what" instead of the "how."</li>
             </ul>
              </div>

              <div>
                  <h4>Conclusion</h4>
                  <p>
                  Higher-order functions are an essential part of JavaScript, enabling clean, modular, and reusable code. By using them, you can handle complex logic, iterate through arrays efficiently, and create dynamic functionality. Embracing higher-order functions allows you to take full advantage of JavaScript's capabilities as a functional programming language.
                  </p>
              </div>
                        </>
          ) : null}

          {choice === 2 ? (
            <>
            <QuestionTitle>What is JSX?</QuestionTitle>
            
            <div>
            <p>JSX (JavaScript XML) is a syntax extension for JavaScript used in React to describe the UI structure. It allows you to write HTML-like code within JavaScript, making it easier to visualize the component's structure.</p>
            <p><strong>Why use JSX</strong></p>
            <ul>
                <li><p><strong>Readable and Declarative:</strong> JSX makes your code more readable by blending HTML-like syntax with JavaScript.</p></li>
                <li><p><strong>Integration with Logic:</strong> You can embed JavaScript expressions directly in JSX using curly braces.</p></li>
                <li><p><strong>React-Specific:</strong> JSX simplifies the process of writing React components by abstracting away React.createElement() calls.</p></li>
            </ul>
            </div>

            <div>
                <p>Here is a small demo component which returns the jsx format.</p>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                              {jsxDemo}
                            </ReactMarkdown>
                <p>the returned format looks like regular html, but we can make it dynamic and inject javascript using the curly braces.
                In this example, the 'name' prop can be dynamically assigned any value. The above code would look like this.
                </p>
                <Greeting name="Oliver"/>
            </div>

            <div>
                <p>JSX is <strong>transpiled</strong> into plain JavaScript that react can understand. Here is how it looks after being converted</p>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                              {transpiledJSX}
                            </ReactMarkdown>
                <p>If we were to do the same in just java script we would have an html document with a script injected to it, which we can use to manipulate the DOM and change elements.</p>

                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                              {htmlScript}
                            </ReactMarkdown>
            </div>

            <div>
                <p>And from the tic tac toe game in the beginning of the semester we could then target DOM elements like this</p>
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                              {ticTacToe}
                            </ReactMarkdown>
            </div>
            </>
          ) : null}

          {choice === 3 ? (
            <>
             <QuestionTitle>What is the purpose of flexbox and grid in css</QuestionTitle>

             <div>
                <p>Grid and Flexbox are two layout systems in CSS designed to simplify creating complex and responsive layouts.
                    <br/>
                    <br/>
                    To best illustrate their use, I’ve created this demo.
                    <br/>
                    <br/>
                    The grid represents the page of your application, making it easy to separate the page into areas that are easier to visualize and work with.
                    <br/><br/>
                    You can adjust the size of the grid and split it into as many cells as you want. For this example, I created a 3x3 grid using this CSS:
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                              {gridCSS}
                            </ReactMarkdown>
                            The repeat() takes two arguments. 
                            <br/>1. How many times to repeat (cell count)
                            <br/>2. 1fr. each cell takes up "one fraction" of the available spacesco
                </p>
         
             </div>

            <div style={{gridColumn: '2 / 4'}}>
                <GridExampleContainer>
                <GridItem column={position.column} row={position.row} justify={justifyContent}>
                    <Box size={64} color="white"/>
                </GridItem>
                </GridExampleContainer>

                <div className="grid-buttons-container">
                <button className="grid-button left" onClick={() => moveItem('left')}><ArrowLeft/></button>

                <div className="center">
                <button className="grid-button" onClick={() => moveItem('up')}><ArrowUp/></button>
                <button className="grid-button" onClick={() => moveItem('down')}><ArrowDown/></button>
                </div>

                <button className="grid-button right" onClick={() => moveItem('right')}><ArrowRight/></button>
                </div>
                <div className="grid-buttons-container">
  
</div>
        </div>

        <div>
            <p><strong>Flexbox</strong> is good for controlling the contents of the cells. In this demo we can use the justify-contents to move the contents of the cell.
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                              {justifySnippet}
                            </ReactMarkdown>
                Some of the ways to move the box is with either justify: center/flex-start/flex-end use these buttons to see how they behave            
            </p>
            <div className="justify-button-container">
            <button className="grid-button" onClick={() => setJustifyContent('flex-start')}>Start</button>
            <button className="grid-button" onClick={() => setJustifyContent('center')}>Center</button>
            <button className="grid-button" onClick={() => setJustifyContent('flex-end')}>End</button>
            </div>
            
        </div>
            </>
          ) : null}
        </MainContent>
      </Page>
    </>
  );
}

export default page;
