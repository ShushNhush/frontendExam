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
import ControlledForm from "../../assets/ControlledForm";
import UncontrolledForm from "../../assets/UncontrolledForm";
import { ControlledFilter, UncontrolledFilter } from "../../assets/fruitDemo";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { StepBack } from "lucide-react";


const nestedRoutes = `
\`\`\` javascript
<Routes>
  <Route path="dashboard" element={<Dashboard />}>
    <Route index element={<Home />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
\`\`\`
`;

const outletSnippet = `
\`\`\` javascript 
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* will either be <Home/> or <Settings/> */}
      <Outlet />
    </div>
  );
}
\`\`\` 
`

const globalScope = `
\`\`\` javascript
let globalVariable = "I'm global!";

function someFunction() {
    console.log(globalVariable); 
    // Can access global variable here
}

console.log(globalVariable); 
// Can access global variable here too
\`\`\`
`;

const localScope = `
\`\`\` javascript    
function someFunction() {
    let localVariable = "I'm local!";
    console.log(localVariable); 
    // Works fine
}

console.log(localVariable); 
// Error: localVariable is not defined
\`\`\`
`;
const uncontrolledSnippet = `
    
\`\`\` javascript
function UncontrolledForm() {

const inputRef = useRef();
const [color2, setColor2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setColor2("green");
  };

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

\`\`\` 
`;

const controlledSnippet = `
    
\`\`\` javascript
function ControlledForm() {
  
 const [formData, setFormData] = useState("");
 const [color1, setColor1] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setColor1("green");
    
  };
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
\`\`\` 

`;

function PageComponent() {
  const [choice, setChoice] = useState(1);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState("");

  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

  const navigate = useNavigate();

  const handleQuestionClick = (option) => {
    setChoice(option);
  };

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setModalOpen(true);
  };

  const [controlledFormData, setControlledFormData] = useState("");

  const handleControlSubmit = (e) => {
    e.preventDefault();

    setColor1("green");
  };

  const inputRef = useRef();

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();

    setColor2("green");
  };

  const [example, setExample] = useState(<ControlledFilter />);
  const [activeTab, setActiveTab] = useState(1);

  const handleSwitch = (choice) => {
    if (choice === 1) {
      setActiveTab(1);
      setExample(<ControlledFilter />);
    } else {
      setActiveTab(2);
      setExample(<UncontrolledFilter />);
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
                What is the scope of a variable in JavaScript
              </QuestionTitle>

              
              <div>
                <h3>Scope of a Variable in JavaScript</h3>
                <p>
                  In JavaScript, the scope of a variable refers to the area or
                  context in the code where the variable can be accessed or
                  referenced. Scope determines the visibility and lifetime of
                  variables and other resources in your program. There are two
                  primary types of scope in JavaScript:
                </p>

                <ul>
                  <li>
                    <strong>Global Scope</strong>
                  </li>
                  <li>
                    <strong>Local Scope</strong>
                  </li>
                </ul>
              </div>

              <div>
                <h4>Global Scope</h4>
                <p>
                  A variable has <strong>global</strong> scope if it is declared
                  outside of any function, block, or class. Global variables are
                  accessible from anywhere in the code, including inside
                  functions and other blocks.
                </p>
                <h4>Characteristics of Global Scope</h4>
                <ul>
                  <li>Accessible anywhere in the program.</li>
                  <li>
                    If a variable is declared outside of any function or block,
                    it will be available globally.
                  </li>
                  <li>
                    In browsers, global variables are stored as properties of
                    the window object.
                  </li>
                </ul>

                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {globalScope}
                </ReactMarkdown>
              </div>

              <div>
                <h4>Local Scope</h4>
                <p>
                  A variable has local scope if it is declared inside a
                  function, block (like a loop or if statement), or a specific
                  context. Local variables can only be accessed within the
                  context they are defined in.
                </p>
                <h4>Characteristics of Local Scope</h4>
                <ul>
                  <li>
                    Accessible only within the function or block in which it is
                    defined.
                  </li>
                  <li>
                    Once the execution flow leaves the function or block, the
                    local variable is no longer accessible.
                  </li>
                  <li>
                    Variables in local scope do not interfere with global
                    variables of the same name.
                  </li>
                </ul>

                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {localScope}
                </ReactMarkdown>
              </div>
              <div>
                <h4>Function Scope</h4>
                <p>
                  JavaScript has different scoping rules based on how the
                  variable is declared:
                </p>

                <ul>
                  <li>
                    <strong>var:</strong> has function scope. It is accessible
                    within the function where it is declared, but it can still
                    be accessed in nested functions even if declared inside a
                    block (like an if statement or loop).
                  </li>
                  <br />
                  <li>
                    <strong>let </strong> and <strong>const </strong> have block
                    scope. They are only accessible within the block they are
                    declared (e.g., inside a loop or an if statement).
                  </li>
                </ul>
              </div>
            </>
          ) : null}

          {choice === 2 ? (
            <>
              <QuestionTitle>
                Event handling and form submissions in React
              </QuestionTitle>

              <div>
                <p>
                  <strong>Event handling</strong> is a core concept in react
                  where you listen for and respond to user actions like, clicks,
                  typing, or form submissions.
                </p>

                <h4>Some common events:</h4>

                <ul>
                  <li>
                    <strong>onClick</strong>
                  </li>
                  <li>
                    <strong>onChange</strong>
                  </li>
                  <li>
                    <strong>onSubmit</strong>
                  </li>
                </ul>

                <p>
                  When working with forms we use two different approaches, these
                  are: <br />
                  <br />
                  <strong>Controlled-Components</strong> <br />
                  In a controlled component, the form elements’ values are
                  controlled by <strong>React state</strong>. The form input’s
                  value is updated via the onChange handler, and the component
                  renders the updated state.
                  <br /> <br />
                  <strong>Uncontrolled-Components</strong> <br />
                  In an uncontrolled component, the form elements manage their
                  own state internally. React interacts with the input using
                  refs to get the current value at the{" "}
                  <strong>time of submission</strong>.
                </p>
              </div>

              <div>
                <h4>Controlled Component</h4>
                <div style={{ color: color1 }} className="form-display">
                  {controlledFormData}
                </div>
                <ControlledForm
                  handleSubmit={handleControlSubmit}
                  setFormData={setControlledFormData}
                  formData={controlledFormData}
                ></ControlledForm>
                <BasicButton onClick={() => openModal(controlledSnippet)}>
                  Show code
                </BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {currentSnippet}
                  </ReactMarkdown>
                </Modal>
                <br />
                <br />

                <h4>Uncontrolled Component</h4>
                <div>
                  <div style={{ color: color2 }} className="form-display">
                    {inputRef.current?.value}
                  </div>
                </div>

                <UncontrolledForm
                  handleSubmit={handleUncontrolledSubmit}
                  inputRef={inputRef}
                ></UncontrolledForm>
                <BasicButton onClick={() => openModal(uncontrolledSnippet)}>
                  Show code
                </BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {currentSnippet}
                  </ReactMarkdown>
                </Modal>
              </div>

              <div>
                <p>
                  Both methods are commonly used but has their own unique
                  strengths, <strong>Controlled Components</strong> gives you
                  tigher control over the formdata and allows to do live checks
                  for valid inputs. For example it could be used for a search
                  function, to filter a list of data.
                  <br />
                  <br />
                  However <strong>Uncontrolled Components</strong> require less{" "}
                  <strong>Boilerplate</strong> code, which makes it quicker to
                  setup compared to Controlled Components which when working
                  with larger forms can be difficult to manage.
                </p>
              </div>

              <div>
                <h3>Another example</h3>
                <p>
                  We can use both these submit forms to filter a list of fruirs.
                  Here we can clearly see when each method takes effect.
                </p>

                <div className="example-header">
                  <div
                    className={`example-button ${
                      activeTab === 1 ? "active" : ""
                    }`}
                    onClick={() => handleSwitch(1)}
                  >
                    Controlled
                  </div>
                  <div
                    className={`example-button ${
                      activeTab === 2 ? "active" : ""
                    }`}
                    onClick={() => handleSwitch(2)}
                  >
                    Uncontrolled
                  </div>
                </div>
                {example}
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

export default PageComponent;
