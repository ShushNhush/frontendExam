import { useState, useRef } from "react";
import {
  Page,
  Header,
  HeaderButton,
  MainContent,
  QuestionTitle,
  BasicButton,
} from "../../assets/templateStyles";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "../../basic.css";
import "./basic.css";
import Modal from "../../assets/modal/Modal";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { StepBack } from "lucide-react";
import Counter from "../../assets/Counter";
import Login from "../../assets/Login";
import TemperatureCalculator from "../../assets/TemperatureConverter";
import CartQuantity from "../../assets/priceDisplayUplift/CartQuantity";
import PriceDisplay from "../../assets/priceDisplayUplift/PriceDisplay";

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

const loginRequest = `
\`\`\` javascript  
const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://todo.ogudbergsen.dk/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { token } = await response.json();
      localStorage.setItem("jwt", token); // Save token to localStorage

      alert("Login successful!");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

\`\`\` 
`

const jwtPayload = `
\`\`\` jwt 
{
  "iss": "Gudbergsen",
  "sub": "user",
  "exp": 1736635785,
  "roles": "user",
  "username": "user"
}
  \`\`\` 
`

const withToken = `
\`\`\` javascript   
const fetchProtectedData = async () => {
    const token = localStorage.getItem("jwt");
  
    if (!token) {
        setResponseColor(2);
      setResponse("You are not logged in!");
      return;
    }
  
    try {
      const response = await fetch("https://todo.ogudbergsen.dk/api/protected/user_demo", {
        headers: {
          Authorization: Bearer '$'{token}, 
          // Include JWT in the Authorization header/ uncomment $ sign
        },
      });
  
      if (!response.ok) {
        
        throw new Error("Failed to fetch protected data");
      }
  
      const data = await response.json();
      console.log("Protected data:", data);
      setResponseColor(1)
      setResponse(data.msg);
    } catch (error) {
      console.error(error.message);
    }
  };
\`\`\` 
`

  

function PageComponent() {
  const [choice, setChoice] = useState(1);

  const [response, setResponse] = useState(undefined);
  const [responseColor, setResponseColor] = useState(undefined);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState("");

  const [quantity, setQuantity] = useState(1);
  const PRICE_PER_UNIT = 29.99;

  const navigate = useNavigate();

  const handleQuestionClick = (option) => {
    setChoice(option);
  };

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setModalOpen(true);
  };

  const fetchProtectedData = async () => {
    const token = localStorage.getItem("jwt");
  
    if (!token) {
        setResponseColor(2);
      setResponse("You are not logged in!");
      return;
    }
  
    try {
      const response = await fetch("https://todo.ogudbergsen.dk/api/protected/user_demo", {
        headers: {
          Authorization: `Bearer ${token}`, // Include JWT in the Authorization header
        },
      });
  
      if (!response.ok) {
        
        throw new Error("Failed to fetch protected data");
      }
  
      const data = await response.json();
      console.log("Protected data:", data);
      setResponseColor(1)
      setResponse(data.msg);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Page>
        <Header>
          <HeaderButton onClick={() => handleQuestionClick(1)}>
          <StepBack onClick={() => navigate("/")} style={{ position: "absolute", left: "5px"}} size={40} />
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
             <QuestionTitle>What are props and state in react</QuestionTitle>

             <div>
               <h3>Props</h3>
               <p>
                 <strong>Props (short for properties)</strong> are a way to
                 pass data from a parent component to a child component in
                 React. they are <strong>read only</strong> meaning a component
                 cannot modify its own props.
                 <br />
                 <br />
                 <strong>Key features</strong>
               </p>

               <ul>
                 <li>
                   <strong>Data Flow:</strong> Props enable a unidirectional
                   (parent-to-child) data flow.
                 </li> <br />
                 <li> 
                   <strong>Customizable Components:</strong> Allow components
                   to be dynamic and reusable
                 </li><br />
                 <li> 
                   <strong>children Prop:</strong> A special prop used to pass
                   child elements or components to a parent component
                 </li>
               </ul>

               
             </div>

             <div>
             <h3>useState</h3>
               <p>
                 <strong>State</strong> is an object in a React component that
                 hold information about the component's current situation.
                 Unlike props, <strong>state is mutable</strong>
                 , it allows components to manage and react to user
                 interactions or changes over time.
                 <br />
                 <br />
                 <strong>Key features:</strong>
               </p>

               <ul>
                 <li>
                   <strong>Local Storage:</strong> state is managed within a component and not shared directly with others.
                 </li> <br />
                 <li>
                   <strong>Dynamic Updates:</strong> Components re-render when
                   their state changes.
                 </li> <br />
                 <li>
                   <strong>Initial and Updated Values:</strong> State can have
                   an initial value and be updated using{" "}
                   <span style={{ color: "green" }}>setState</span> (in class
                   components) or{" "}
                   <span style={{ color: "green" }}>useState</span>(in
                   functional components)
                 </li>
               </ul>
             </div>

             <div>

             <h3>Lifting State</h3>

             <p>
             Lifting state up in React refers to the process of moving a shared state to the closest common ancestor of two or more components that need to share or use that state. This pattern promotes a single source of truth and ensures that components stay in sync when the state changes.
             </p>
             
             <h4>Real World Examples</h4>
             
             <p>
               <strong>Multiple instances of the same component sharing state</strong>
             </p>
             <ul>
                <li>A group of form fields that need to be enabled/disabled together</li> <br />
                <li>Multiple audio players that should share the same volume setting</li> <br />  
                <li>A set of filters that should all reset together</li>  
             </ul>

             </div>

             <div>

               <p><strong>Different components sharing state</strong></p>

               <ul>
                 <li>A search input and search results display</li> <br />
                 <li>A form progress indicator and form fields</li>
               </ul>
                 
               <TemperatureCalculator></TemperatureCalculator>

               <h3>Price Display</h3>

               <p>
               Different Components Sharing State (Shopping Cart)
               </p>
               <div style={{display: "flex", justifyContent: "center"}}> 
                 <CartQuantity quantity={quantity} onQuantityChange={setQuantity}></CartQuantity>
                 <PriceDisplay quantity={quantity} pricePerUnit={PRICE_PER_UNIT}></PriceDisplay>
               </div>

             </div>
             {/* <div>
               <p>
                 A short example to show case the states independance how props
                 can be passed down to child components
                 <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                   {counterComponent}
                 </ReactMarkdown>
                 with this button we can show that a components state is unique
                 to the instance of the component, and how we can pass props to
                 it with the 'label' and 'step' properties
               </p>
             </div> */}

             {/* <div>
               <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                 {importCounter}
               </ReactMarkdown>
           
                 <Counter label={"Counter 1"} step={1} />
                 <Counter label={"Counter 2"} step={5} />
               
             </div> */}
           </>
          ) : null}

          {choice === 3 ? (
              <>
                <QuestionTitle>
                Describe and show the login process using JWT
                </QuestionTitle> 
              
                <div>
                  <h3>Conceptual Flow</h3>
                  <p>JWT (JSON Web Token) is a compact and self-contained way to securely transmit information between parties as a JSON object. Here’s a typical flow for implementing user authentication using JWTs in a React application:</p>
  
                  <h3>User Login Request</h3>
                  <ul>
                      <li>The user enters their credentials (username and password) in a React login form.</li>
                      <li>The React frontend sends a Post request to the backend authentication endpoint</li>
                      <BasicButton onClick={() => openModal(loginRequest)}>Show code</BasicButton>
                  <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {currentSnippet}
                  </ReactMarkdown>
                  </Modal>
                      
                  </ul>
                </div>
                <div>
                  <p>The backend verifies the request and <strong>Credentials</strong> and issues a <strong>JWT</strong> signed with a secret key</p>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {jwtPayload}
                  </ReactMarkdown>
  
                  <h3>The client stores the JWT</h3>
                  <h4>Common storage options:</h4>
                  <ul>
                      <li><strong>Local storage:</strong> Persistent, survives page refreshes.</li> <br />
                      <li><strong>Session Storage:</strong> Limited to the session, cleared when the tab is closed</li><br />
                      <li><strong>HTTP-Only Cookies:</strong> Prevents access by JavaScript.</li>
                  </ul>
                </div>
  
                <div>
                  <h3>Attach JWT to Protected Requests</h3>
                  <p>For future API calls to protected routes, the frontend includes the JWT in the <strong>Authorization</strong> header as a <strong>Bearer token.</strong></p>
  
                  <Login></Login>
                  
                  <BasicButton onClick={() => fetchProtectedData()}>Test</BasicButton>
                  <BasicButton onClick={() => openModal(withToken)}>Show code</BasicButton>
                  {response && <p style={{color: responseColor === 1 ? "green" : "red"}}> {response}</p> }
  
                  
  
              
  
                  <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {currentSnippet}
                    </ReactMarkdown>
                  </Modal>
                
                  <p>JWT is primarily used for authentication. But it can also be used to store other data in a json format.</p>
                </div>
                <div>
  
                
  
  
                   <p>I personally utilized the <strong>json web tokens</strong> in my <a href="https://bingo.gudbergsen.com/" target="_blank" rel="noopener noreferrer">bingo game</a>, though it doesnt have any protected routes for security.
                <br /><br />
                I was able to use the JWT reconnect a user to my sessions and retrieve their data such as their <strong>bingo board</strong>.
                 <br /><br /> 
                 you can use the website <a href="https://jwt.io/" target="_blank" rel="noopener noreferrer">jwt.io</a> to view the structure of a JWT token when after its been decoded.
                  <br /> <br />
                  <BasicButton onClick={() => handleCopy()}>Copy jwt</BasicButton>
                
                
                </p>
                </div>
              </>
          ) : null}
        </MainContent>
      </Page>
    </>
  );
}

export default PageComponent;
