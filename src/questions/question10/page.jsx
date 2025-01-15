import styled from "styled-components";
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
import ErrorBoundary from "../../ErrorBoundary"
import ErrorComponent from "../../assets/ErrorComponent"
import Counter from "../../assets/Counter";
import ActionCounter0 from "../../assets/ActionsCounter0";
import ActionCounter1 from "../../assets/ActionsCounter1";
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TemperatureCalculator from "../../assets/TemperatureConverter";
import PriceDisplay from "../../assets/priceDisplayUplift/PriceDisplay";
import CartQuantity from "../../assets/priceDisplayUplift/CartQuantity";
import SpreadRestDemo from "../../assets/spreadAndRest/SpreadAndRest";

const useEffectSyntax = `
\`\`\` javascript    
useEffect(callback
, [dependencyArray]);
\`\`\` 
`

const withoutDependency = `
\`\`\` javascript    
function CounterWithoutDependency({count, setCount}) {

    const [input, setInput] = useState('');

    useEffect(() => {
        setCount(count + 1);
    }, []);

    return (
        <div>
            <input
        type="text"
        placeholder="Type something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
        </div>
    )
} 

export default CounterWithoutDependency;
\`\`\` 
`
const withDependency = `
\`\`\` javascript   
function CounterWithDependency({count, setCount}) {

    const [input, setInput] = useState('');

    useEffect(() => {
        setCount(count + 1);
    }, [input]);

    return (
        <div>
            <input
        type="text"
        placeholder="Type something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
        </div>
    )
} 

export default CounterWithDependency;
\`\`\`
`

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


const corsHeaders = `
\`\`\` javascript   
private static void corsHeaders(Context ctx) {
        String origin = ctx.header("Origin");
        if (origin != null && origin.equals("https://bingo.gudbergsen.com")) {
            ctx.header("Access-Control-Allow-Origin", origin); // Dynamically set origin
        }
        ctx.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        ctx.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        ctx.header("Access-Control-Allow-Credentials", "true"); // Only if needed
    }

    private static void corsHeadersOptions(Context ctx) {
        String origin = ctx.header("Origin");
        if (origin != null && origin.equals("https://bingo.gudbergsen.com")) {
            ctx.header("Access-Control-Allow-Origin", origin);
        }
        ctx.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        ctx.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        ctx.header("Access-Control-Allow-Credentials", "true"); // Only if needed
        ctx.status(204); // No content for preflight response
    }
\`\`\` 
`

const spread1 = `
\`\`\` javascript

const [newNumber, setNewNumber] = useState('');
const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

 const handleAddNumber = () => {
    if (newNumber) {
      setNumbers([...numbers, newNumber]);
      setNewNumber('');
    }
  };


 <div className="input-group">
          <input
            type="number"
            value={newNumber}
            onChange={(e) => setNewNumber(Number(e.target.value) || '')}
            placeholder="Enter a number"
          />
          <button onClick={() => handleAddNumber()}>Add Number</button>
</div>

\`\`\` 
`

const spread2 = `
\`\`\` javascript
const [person, setPerson] = useState({
    name: 'John',
    age: 25
  });


const handleUpdatePerson = (field, value) => {
    setPerson({
      ...person,
      [field]: value
    });
  };
  
<div className="input-group">
          <input
            type="text"
            value={person.name}
            onChange={(e) => handleUpdatePerson('name', e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={person.age}
            onChange={(e) => handleUpdatePerson('age', e.target.value)}
            placeholder="Age"
          />
        </div>  
\`\`\`
`

const rest = `

\`\`\` javascript

const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);

const calculateTotal = (...nums) => {
    return nums.reduce((sum, num) => sum + num, 0);
  };

<div className="code-display">
          <code>
            calculateTotal(...numbers) = {calculateTotal(...numbers)}
          </code>
          <p className="note">
            Using rest parameters to sum: [{numbers.join(', ')}]
          </p>
        </div>  

\`\`\`
`

function PageComponent() {
  const [choice, setChoice] = useState(1);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState("");

  const [subChoice, setSubChoice] = useState(1);

  const [hook, setHook] = useState(1);
  const [activeHook, setActiveHook] = useState(1);

  const [count0, setCount0] = useState(0);
  const [count1, setCount1] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const PRICE_PER_UNIT = 29.99;

  const navigate = useNavigate();

  const handleQuestionClick = (option) => {

    setChoice(option);
  };

  const handleHookChoice = (option) => {

    if (option === 1) {

        setHook(option);
        setActiveHook(1);
        
    } else {

        setHook(option)
        setActiveHook(2);
    }
    
  }
  

  const handleSubChoice = (option) => {

    if (option === 1) {

        setSubChoice(option);
        setActiveTab(1);
    } else {

        setSubChoice(option);
        setActiveTab(2); 
    }
    
  }

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setModalOpen(true);
  };

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (inputValue.trim() === '') {
      setMessage('Error: Input cannot be empty.');
    } else {
      setMessage('Success: Your input is valid!');
    }
  };

  const [activeTab, setActiveTab] = useState(1);

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
                Show and explain spread and rest Operator's in JavaScript
              </QuestionTitle>

              <div>

              <p>
              The spread and rest operators in JavaScript both use the same syntax: three dots (...). However, they serve different purposes depending on the context in which they are used.
              </p>

              <h3>
              Spread Operator (...)
              </h3>

              <p>
              The <strong>spread operator</strong> is used to <strong>"spread"</strong> elements of an array, object, or iterable into individual elements. It is often used for creating shallow copies or combining data structures.
              </p>
              <h3>
              Rest Operator (...)
              </h3>

              <p>
              The <strong>rest operator</strong> is used to collect multiple elements into an array or object. It is primarily used in function parameters or destructuring assignments.
              </p>
              </div>

              <div>
              <h3>Features</h3>
                <h4>Spread Operator</h4>
                <ul>
                    <li><strong>Purpose:</strong> Expands elements of an array or properties of an object</li> <br />
                    <li><strong>Usage Context:</strong> Array/object literals, function calls, ect,</li> <br />
                    <li><strong>Direction:</strong> Expands Data.</li>
                </ul>
                <h4>Rest Operator</h4>
                <ul>
                    <li><strong>Purpose:</strong> Collects multiple elements or properties into a single array or object.</li> <br />
                    <li><strong>Usage Context:</strong> Function parameters, destructuring assignments</li> <br />
                    <li><strong>Direction:</strong> Collects Data.</li>
                </ul>
              </div>

              <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>

              <BasicButton onClick={() => openModal(spread1)}>Show code</BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {currentSnippet}
                  </ReactMarkdown>
                  </Modal>
              
                  <BasicButton onClick={() => openModal(spread2)}>Show code</BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {currentSnippet}
                  </ReactMarkdown>
                  </Modal>

                  <BasicButton onClick={() => openModal(rest)}>Show code</BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {currentSnippet}
                  </ReactMarkdown>
                  </Modal>
              </div>
              <SpreadRestDemo></SpreadRestDemo>

              
            {/*
              <div>
                <p>
                  Both the <strong>rest</strong> and <strong>spread</strong>{" "}
                  operator's have the same syntax <strong>(...)</strong>, but
                  they serve different purposes depending on how they're used.
                  Think of them as twins with different personalities.
                </p>

                <h4>The Spread Operator(..)</h4>

                <p>
                The spread operator (...) is used to "spread" the elements of an array or properties of an object into separate items. It is commonly used for copying, merging, or passing elements.
                </p>

                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                    {spread1}
                </ReactMarkdown>
              </div>

              <div>
                <h4>The Rest Operator(..)</h4>

                <p>
                In contrast, the rest operator does the opposite - it collects multiple elements into a single array. Think of it as gathering up the "rest" of the elements. It's commonly used in function parameters or destructuring.
                </p>

                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                    {rest1}
                </ReactMarkdown>

              </div>

              <div>
                <h4>Combining the two</h4>
                <p>
                    For more advanced use cases, we can utilize both. In this example, we add some user specific preferences.
                    <br /><br />
                    There are some base preferences which can be required.
                    <br /><br />
                    And some custom preferences, which of we dont know how many there will be
                    
                    <br />
                    <br />
                    The <strong>rest</strong> operator gathers custom preferences into a single object.

                    <br />
                    <br />
                    And combine them by <strong>spreading</strong> both base and custom preferences, to get data from both combined into a new <strong>mergedPreferences</strong> object.
                    </p>
                <BasicButton onClick={() => openModal(combined)}>Show Code</BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ReactMarkdown rehypePlugins={rehypeHighlight}>
                    {currentSnippet}
                </ReactMarkdown>
                </Modal>

                
              </div>

              <div>
              

              </div> */}
            </>
          ) : null}

          {choice === 2 ? (
            <>
            <div className="header">
             <div onClick={() => handleSubChoice(1)} className={`choice-item ${
                      activeTab === 1 ? "active" : ""
                    }`}>
                <h2>What are React Hooks</h2>
                </div>
                <div onClick={() => handleSubChoice(2)} className={`choice-item ${
                      activeTab === 2 ? "active" : ""
                    }`}>
                <h2>Error Handling</h2>
                </div>
                </div>

                {subChoice == 1 && 
                <>
                <div style={{gridColumn: "1 / -1", display: "flex", gap: "20px"}}>
                    <div onClick={() => handleHookChoice(1)} className={`${
                      activeHook === 1 ? "active-hook" : "hollow-text"
                    }`}><h3>useState</h3></div>
                    <div onClick={() => handleHookChoice(2)} className={`${
                      activeHook === 2 ? "active-hook" : "hollow-text"
                    }`}><h3>useEffect</h3></div>
                </div>
                {hook === 1 ? 
                
                <>
              {/* <QuestionTitle>What are props and state in react</QuestionTitle> */}

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
            
            </> : 
                
                <>
              {/* <QuestionTitle>Show and explain the useEffect hook</QuestionTitle> */}

              <div>
                <p>The <strong>useEffect</strong> hook is a key part of React's functional components. It allows you to perform side effects, such as data fetching, subscriptions,
                or manually changing the DOM in response to changes in your components.</p>

                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                  {useEffectSyntax}
                                </ReactMarkdown>

              <p>useEffect takes a callback function which, runs everytime it is invoked. <br /> If the <strong>dependencyArray</strong> is empty
              the function only runs once on mount. <br /><br /> If the useEffect has a dependency it runs each time the dependency changes.
              <br /><br /> Often in practice this is a useState, but it can also for example be props passed from parent to child component.
              </p>
              </div>

              <div>
                <h3>Demonstration</h3>
                <div className="effect-demo">
                <div className="count-box">{count0}</div>
                <ActionCounter0 count={count0} setCount={setCount0}/>
                <div className="count-box">{count1}</div>
                <ActionCounter1 count={count1} setCount={setCount1}/>
                </div>

                <p>The only difference bewteen these two components is that the bottom one has the <strong>input</strong> as its dependency.
                Therefor it updates the counter for each new input. <br /><br /> However the top one has an empty <strong>dependecy array </strong>
                 which makes it only count on mount. <br />We can see this by changing from question 1 and 2 back and forth, each time the component mounts the counter increases
                </p>
              </div>
              
              <div>
                <h4>Without dependency</h4>

                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                  {withoutDependency}
                                </ReactMarkdown>

              </div>

              <div>
                <h4>With dependency</h4>

                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                  {withDependency}
                                </ReactMarkdown>

              </div>



            </>
                 }


                </>
                }

                {subChoice == 2 && 
                <>
                {/* <QuestionTitle>How to handle errors (HTTP or JS errors) in React</QuestionTitle> */}
                  <div>
                    <p>
                        <h3>Handling HTTP errors</h3>
                        HTTP errors typically occur during API calls. You can handle them using:
    
                        <ul>
                            <li><strong>Try-Catch Block:</strong> For async operations</li>
                            <li><strong>Conditional Rendering:</strong> Display error messages when errors occur</li>
                        </ul>
                        HTTP errors often come with error codes which helps with debugging or error handling. Examples <br />
                        404 not found, 500 server errors
                        <h3>Handling JavaScript errors</h3>
                        <strong>Error Boundary</strong> An Error Boundary is a React component that catches JavaScript errors in its child component tree and renders a fallback UI instead of crashing the entire app.
    
                    </p>
                  </div>
                  <div>
                    <p><strong>Try-Catch Block</strong> works like in java, and it first tries to reach the API but many different errors could occur.
                    <br /> <br />
                    such as a bad request (invalid input) or server error (problem on the API side)
    
                    <br /><br />
                    <strong>Conditional Rendering</strong> is used often to give the user constructive feedback on what happened and usually how to resolve it. For example invalid login.
                    
                    </p>
                    
                    <form onSubmit={handleSubmit}>
            <label>
              Your Input:
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type something..."
              />
            </label>
            <BasicButton type="submit">Submit</BasicButton>
          </form>
    
          {message && (
            <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>
              {message}
            </p>
          )}
                  </div>
    
                  <div>
                        <p><strong>Error Boundary</strong> catches javascript errors, and with it we can render a fallback UI and provide means to recover the page or reload. </p>
                        <ErrorBoundary>
                            <ErrorComponent/>
                        </ErrorBoundary>
    
                        <p><h3>Key notes about Error Boundaries</h3>
                        
                        <strong>They catch errors during:</strong>
    
                        <ul>
                            <li>Rendering</li>
                            <li>Lifecycle methods</li>
                            <li>In child components</li>
                        </ul>
                        <strong>They dont catch errors:</strong>
    
                        <ul>
                            <li>inside event handlers</li>
                            <li>In asynchronous code (setTimeout or Promise rejections</li>
                            <li>Server-side rendering</li>
                        </ul>
                        </p>
                  </div>
    
                  <div><p>By understanding where errors can occur and handling them
                    appropriately, using <strong>try-catch</strong> block for async operations or <strong>conditional rendering</strong> for user feedback, <strong>and Error Boundaries</strong> for JavaScript errors. <br /><br />
                    We ensures a robust program and a userfriendly experience. There are many libraries which can make error handling and logging easier in React and can help developers with this process
                    
    
                    </p></div>
                </>
                }


            </>
          ) : null}

          {choice === 3 ? (
            <>
              <QuestionTitle>
              Describe conceptually what SOP and CORS headers are
              </QuestionTitle>


              <div>
                <h3>What is SOP?</h3>

                <p>
                  <strong>Same-Origin Policy (SOP)</strong> is a fundamental security concept in web development. It restricts how resources loaded from one origin (protocol, domain, and port) can interact with resources from another origin. This prevents malicious websites from accessing sensitive data on other domains via the user's browser.

                </p>

                <h4>Key Features of SOP</h4>
                <p>An origin is defined as a combination of:</p>
                <ul>
                  
                  <li><strong>Protocol:</strong> e.g., http:// or https://</li>
                  <li><strong>Domain:</strong> e.g., example.com</li>
                  <li><strong>Port:</strong> :80 for HTTP, :443 for HTTPS</li>
                </ul>

                <p>
                  <strong>Purpose:</strong> SOP prevents malicious scripts from accessing sensitive data, such as cookies or session tokens, on other domains via cross-origin requests.
                </p>
              </div>

              <div>
                <h3>What is CORS?</h3>

                <p>
                  <strong>CORS (Cross-Origin Resource Sharing)</strong> is a mechanism that allows servers to specify which origins are permitted to access their resources. It relaxes the restrictions imposed by SOP in controlled ways, enabling safe cross-origin communication.
                </p>
                <h3>How CORS Works</h3>

                <p>
                  <strong>Preflight Request:</strong> For certain types of requests (e.g., POST with a JSON payload), the browser sends a "preflight" OPTIONS request to the server. This checks if the server allows the requested origin, methods, and headers.
                  <br /><br />
                  <strong>CORS Response Headers: </strong>The server responds with specific headers to indicate whether the cross-origin request is allowed.
                </p>

              </div>

              <div>

                <h3>Implementation</h3>

                <p>This example is from my bingo game <strong>API</strong> 
                
                </p>

                <BasicButton onClick={() => openModal(corsHeaders)}>Show code</BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {currentSnippet}
                  </ReactMarkdown>
                  </Modal>
              </div>

              <div>
                <h3>Conclusion</h3>

                <ul>
                  <li><strong>SOP:</strong> ensures web security by restricting cross-origin interactions.</li>
                  <li><strong>CORS: </strong> provides a controlled way to allow safe cross-origin requests.</li>
                </ul>

                <p>
                By properly configuring the API server and using tools like proxies during development, we can avoid CORS errors and enable secure cross-origin communication between the frontend and backend.
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
