import styled from "styled-components";
import { useState } from "react";
import {
  Page,
  Header,
  HeaderButton,
  MainContent,
  QuestionTitle
} from "../../assets/templateStyles";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // Import a highlight.js style
import DemoButton from "../../assets/DemoButton";
import "../../basic.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { StepBack } from "lucide-react";
import { BasicButton } from "../../assets/templateStyles";
import Modal from "../../assets/modal/Modal";
import TemperatureCalculator from "../../assets/TemperatureConverter";

const nestedRoutes = `
\`\`\` javascript
<Route path='/q1' element={<Q1/>}>
      <Route path='/q1/dashboard' element={<Dashboard/>}/>
      <Route path='/q1/about' element={<About/>}/>
    </Route>
\`\`\`
`;

const outletSnippet = `
\`\`\` javascript 

  <Link to="/q1">Home</Link> |
        
  <Link to="/q1/dashboard">Dashboard</Link> |
        
  <Link to="/q1/about">About</Link>
        
          <Outlet />
                
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



function page() {
  const [choice, setChoice] = useState(1);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState("");

  const navigate = useNavigate();

  const handleQuestionClick = (option) => {
    setChoice(option);
  };

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setModalOpen(true);
  };

  const componentImport = `
\`\`\`javascript
export {Header, Page, MainContent, HeaderButton}

import { Page, Header, HeaderButton, MainContent }
 from "../../assets/templateStyles";
\`\`\`
    `;
  const buttonImport = `
\`\`\`javascript
import DemoButton from "../../assets/DemoButton";
\`\`\`
    `;
  const buttonComponent = `
\`\`\`javascript
function DemoButton({ label, onClick }) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}

export default DemoButton;
\`\`\`
`;

const temperatureInput = `
\`\`\`javascript 
const TemperatureInput = ({ scale, temperature, onTemperatureChange }) => {
  const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
  };

  return (
    <div className="temperature-input">
      <label>
        Enter temperature in {scaleNames[scale]}:
        <input
          value={temperature}
          onChange={(e) => onTemperatureChange(e.target.value)}
          placeholder={Enter '$'{scaleNames[scale]}}
        />
      </label>
    </div>
  );
};
\`\`\`
`

const conversion = `
\`\`\`javascript 
// Conversion functions
  const toCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5 / 9;
  };

  const toFahrenheit = (celsius) => {
    return (celsius * 9 / 5) + 32;
  };
\`\`\`  
`

const temperature = `
\`\`\`javascript    
const [temperature, setTemperature] = useState('');
\`\`\`
`

const onChange = `
\`\`\`javascript   
// Handler functions that update the lifted state
  const handleCelsiusChange = (temperature) => {
    setScale('c');
    setTemperature(temperature);
  };

  const handleFahrenheitChange = (temperature) => {
    setScale('f');
    setTemperature(temperature);
  };
\`\`\`  
`

  return (
    <>
      <Page>
        <Header>
          <HeaderButton onClick={() => handleQuestionClick(1)}>
          <StepBack onClick={() => navigate("/")} style={{ position: "absolute", left: "5px"}} size={40} />
            Question 1</HeaderButton>
          <HeaderButton onClick={() => handleQuestionClick(2)}>Question 2</HeaderButton>
          <HeaderButton onClick={() => handleQuestionClick(3)}>Question 3</HeaderButton>
        </Header>
        <MainContent>
          {choice === 1 ? (
            <>
            <QuestionTitle>
            What are higher-order functions in JavaScript
            </QuestionTitle>
            <div>
          
          <h3>Higher-order functions</h3>
          <p>
          higher-order functions, are a powerful concept in JavaScript that comes from functional programming. Think of higher-order functions as "function factories" or "function managers" - they either create new functions or manage how other functions work.

          <br /><br />
          <strong>A higher-order function is simply a function that either:</strong>
          </p>
         
          <ul>
              <li>Takes one or more functions as arguments, and/or</li>
              <li>Returns a function as its result</li>
          </ul>

            </div>

            <div>

              <h3>Simple showcase</h3>

              <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {highorder1}
              </ReactMarkdown>

              <p>A more practical example involves array methods, which are some of the most commonly used <strong>higher-order functions</strong> in JavaScript</p>

              <BasicButton onClick={() => openModal(highOrder2)}>show code</BasicButton>
              <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {currentSnippet}
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
              <QuestionTitle>
                What is the main concept of a React component
              </QuestionTitle>


            <div>

              <p>
              A React component is a <strong>reusable</strong>, self-contained piece of user interface that manages its own content, presentation, and behavior. Think of it like a building block that can include both the visual elements (HTML/JSX) and the logic that controls how it works (JavaScript).
              </p>

              <h3>Key Concepts</h3>

              <h4>Component Structure</h4>
              <p>
              The component is a function that returns JSX (a mix of HTML-like syntax and JavaScript). 
              Components can be either function components or class components, though <strong>function 
              components with hooks</strong> are now the standard approach. Each component encapsulates 
              both its visual representation and behavior in one place.
              </p>

              <BasicButton onClick={() => openModal(temperatureInput)}>show example</BasicButton>
              <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {currentSnippet}
              </ReactMarkdown>
              </Modal>

            </div>

              
              <div>
                
                <h4>State Management</h4>

                <p>
                Using the <strong>useState hook</strong>, we maintain a shared state between two seperate instances of the same <strong>component</strong>
                </p>
                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {temperature}
                </ReactMarkdown>

                <h4>Component Logic</h4>
                
                <p>
                Component Logic: The component includes business logic (like temperature convertion calculations) that's specific to its purpose. This encapsulation keeps related code together.
                </p>

                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {conversion}
                </ReactMarkdown>

                
              </div>

              <div>
                <h4>Event Handling</h4>

                <p>
                  The component responds to user interactions through event handlers (like the <strong>onChange</strong> handlers on the inputs) that can update the state.
                </p>

                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                  {onChange}
                </ReactMarkdown>

                <h3>Advantages</h3>
                <h4>Reuseability</h4>
                <p>
                In vanilla JavaScript, you'd need to duplicate HTML and JavaScript code for similar elements. With React components, you can reuse the same component with different data
                </p>

              </div>

              <div>
                <h4>State Management</h4>

                <p>
                In vanilla JavaScript, you'd need to manually track changes to the DOM and update elements:
                </p>
                
                <h4>Maintainability</h4>

                <p>
                Components create a clear separation of concerns. Each component is responsible for its own piece of the UI and its associated logic. In vanilla JavaScript, you often end up with scattered code that's harder to maintain
                </p>
                <TemperatureCalculator></TemperatureCalculator>
              </div>
            </>
          ) : null}

          {choice === 3 ? (
             <>
                          <QuestionTitle>
                          Show and explain an example of sub-routing.
                          </QuestionTitle>
            
                          <div>
                            <p>
                              React Router is a library for routing in React applications.
                              It enables seamless navigation between different pages or
                              views in a <strong>single-page application (SPA)</strong> without the need to
                              reload the entire page.
                            </p>
            
                            <ul>
                              <li>Single page navigation</li><br />
                              <li>Dynamic url management</li><br />
                              <li>Improved user experience</li> <br />
                              <li>Code splitting</li>
                            </ul>
                            <br />
            
                            <p>
                              The <strong>React Router DOM</strong> allows us to define
                              routes and navigate between different components dynamically.
                              In this example, we use the <code>Outlet</code> component to
                              render nested routes. <br /><br />By linking to specific routes, we can
                              load different components, update the URL dynamically, and
                              change the displayed content without reloading the page.
                            </p>
                          </div>
            
                          <div>
                            <h3>Nested Routes</h3>
            
                            <p>Routes can be nested inside parent routes.</p>
                            
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {nestedRoutes}
                              </ReactMarkdown>
            
                              <p>The path of the parent is automatically included in the child, so this config creates both "/dashboard" and "/dashboard/settings" URLs.
            
            Child routes are rendered through the <strong>Outlet</strong> in the parent route.</p>
            
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {outletSnippet}
                              </ReactMarkdown>
                            
                          </div>
            
                           
                          <div style={{gridColumn: "3 / -1", display: "grid", gridTemplateColumns: "repeat(2 1fr)"}}>
                          <div style={{gridColumn: "1 / -1", display: "flex", justifyContent: "center", gap: "10px"}}>
                          <Link to="/q9">Home</Link> |
                            <br />
                            <Link to="/q9/dashboard">Dashboard</Link> |
                            <br />
                            <Link to="/q9/about">About</Link>
                          </div>
                            <Outlet />
                          </div>
                         
                        </>
          ) : null}
        </MainContent>
      </Page>
    </>
  );
}

export default page;
