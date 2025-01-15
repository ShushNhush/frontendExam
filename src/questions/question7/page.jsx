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
import {ControlledFilter, UncontrolledFilter} from "../../assets/fruitDemo"
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Login from "../../assets/Login";

const jwtHeader = `
\`\`\` json
{
  "alg": "HS256"
}
\`\`\`
`;

const jsTarget = `
\`\`\` javascript  
const buttons = document.querySelectorAll(".t1");

const click = document.querySelector("#buttons");
\`\`\`
`;

const eventlistener = `
\`\`\` javascript      
click.addEventListener("click", function (event) {
}
\`\`\` 
`;

const htmlSnippet = `
\`\`\` html
<body>

    <div id="container" class="container">
        
        <div id="buttons" class="buttons">
          <div id="top1" class="t1"></div>
          <div id="top2" class="t1"></div>
          <div id="top3" class="t1"></div>

          <div id="mid1" class="t1"></div>
          <div id="mid2" class="t1"></div>
          <div id="mid3" class="t1"></div>

          <div id="bot1" class="t1"></div>
          <div id="bot2" class="t1"></div>
          <div id="bot3" class="t1"></div>
          
        </div>

        <div id="bottom-container">
            <div id="winner"></div>
            <button id="reset">Reset</button>

        </div>
    </div>

    <script src="script.js"></script>
</body>
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState("");

   const [response, setResponse] = useState(undefined);
    const [responseColor, setResponseColor] = useState(undefined);

  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

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

  const [example, setExample] = useState(<ControlledFilter/>)
  const [activeTab, setActiveTab] = useState(1);

  const navigate = useNavigate();

  const handleSwitch = (choice) => {

    if (choice === 1) {

        setActiveTab(1);
        setExample(<ControlledFilter/>)

    } else {
        setActiveTab(2);
        setExample(<UncontrolledFilter/>)
    }

  }


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
              <QuestionTitle>DOM manipulation in JavaScript</QuestionTitle>

              <div>
                <p>
                  To do <strong>DOM manipulation</strong> in JavaScript, we add
                  a script to an <strong>HTML</strong> page. Now that the script
                  is linked to the HTML DOm, we can target the DOM elements.
                </p>
                <h3>Target Options</h3>
                <ul>
                  <li>
                    <strong>getElementById:</strong> returns a single element{" "}
                    <br />
                    (example selector: id="header")
                  </li>
                  <br />
                  <li>
                    <strong>getElementsByClassName:</strong> HTMLCollection (all
                    matching) <br />
                    (example selector: class="btn")
                  </li>
                  <br />
                  <li>
                    <strong>getElementsByTagName:</strong> HTMLCollection (all
                    matching) <br />
                    (example selector: button)
                  </li>
                  <br />
                  <li>
                    <strong>querySelector:</strong> First matching element{" "}
                    <br />
                    (example selector: .container, #main)
                  </li>
                  <br />
                  <li>
                    <strong>querySelectorAll:</strong> NodeList (all matching){" "}
                    <br />
                    (example selector: .item, div > p)
                  </li>
                </ul>
              </div>

              <div>
                <p>
                  In the beginning of 3rd semester we made a{" "}
                  <strong>tic tac toe</strong> game, I will show code examples
                  from
                </p>

                <h4>HTML structure and script injection</h4>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {htmlSnippet}
                </ReactMarkdown>
              </div>

              <div>
                <p>
                  With divs all having either id's or class names (or both) we
                  can use the target options to manipulate the different{" "}
                  <strong>DOM</strong> elements.
                </p>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {jsTarget}
                </ReactMarkdown>
                <p>
                  With the <strong>querySelectorAll(".t1")</strong> we can
                  target all divs with the class name <strong>t1 </strong>
                  and here we call them <strong>buttons </strong> to create our
                  tic tac toe game board.
                  <br /> <br />
                  We target the id of the <strong>parent</strong> div and call
                  it click.
                </p>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {eventlistener}
                </ReactMarkdown>
                With this add an <strong>eventListener</strong> which through{" "}
                <strong>event bubbling</strong> can detect which box was
                clicked. And we can run all the logic for our game here.
              </div>

              <div>
                <h3>document</h3>

                <p>
                  the <strong>document</strong> object represents the HTML
                  document that is currently loaded in the browser. It is the
                  entry point for accessing and interacting with the{" "}
                  <strong>DOM (Document Object Model)</strong>, which is a
                  structured representation of the HTML.
                  <br />
                  <br />
                  The document is a global object in the brower and provides
                  methods to query, modify and manipulate the structure and
                  content of the web page.
                  <br />
                  <br />
                  <strong>The document is the root of the DOM tree.</strong> It
                  allows you to traverse and intereact with every element,
                  attribute or node in the page.
                </p>
              </div>
            </>
          ) : null}

          {choice === 2 ? (
            <>
              <QuestionTitle>Event handling and form submissions in React</QuestionTitle>

              <div>
                <p><strong>Event handling</strong> is a core concept in react where you listen for and respond to user actions like, clicks, typing, or form submissions.

                </p>

                <h4>Some common events:</h4>

                <ul>
                    <li><strong>onClick</strong></li>
                    <li><strong>onChange</strong></li>
                    <li><strong>onSubmit</strong></li>
                </ul>
                
                <p>When working with forms we use two different approaches, these are: <br /><br />
                <strong>Controlled-Components</strong> <br />
                
                In a controlled component, the form elements’ values are controlled by <strong>React state</strong>. The form input’s value is updated via the onChange handler, and the component renders the updated state.
                <br /> <br />
                <strong>Uncontrolled-Components</strong> <br />
                In an uncontrolled component, the form elements manage their own state internally. React interacts with the input using refs to get the current value at the <strong>time of submission</strong>.
                </p>
                
              </div>

              <div>
                <h4>Controlled Component</h4>
                <div style={{color: color1}} className="form-display">{controlledFormData}</div>
                <ControlledForm handleSubmit={handleControlSubmit} setFormData={setControlledFormData} formData={controlledFormData}></ControlledForm>
                <BasicButton onClick={() => openModal(controlledSnippet)} >Show code</BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {currentSnippet}
                </ReactMarkdown>
                </Modal>
                <br /><br />

                <h4>Uncontrolled Component</h4>
                <div><div style={{color: color2}} className="form-display">{inputRef.current?.value}</div></div>

                <UncontrolledForm handleSubmit={handleUncontrolledSubmit} inputRef={inputRef}></UncontrolledForm>
                <BasicButton onClick={() => openModal(uncontrolledSnippet)} >Show code</BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {currentSnippet}
                </ReactMarkdown>
                </Modal>
              </div>

              <div>
                <p>Both methods are commonly used but has their own unique strengths, <strong>Controlled Components</strong> gives you tigher control over the formdata
                and allows to do live checks for valid inputs. For example it could be used for a search function, to filter a list of data. 
                <br /><br />
                However <strong>Uncontrolled Components</strong> require less <strong>Boilerplate</strong> code, which makes it quicker to setup compared to Controlled Components 
                which when working with larger forms can be difficult to manage.

                </p>
              </div>

              <div>
                <h3>Another example</h3>
                <p>We can use both these submit forms to filter a list of fruirs. Here we can clearly see when each method takes effect.</p>

                <div className="example-header">
                    <div className={`example-button ${activeTab === 1 ? "active" : ""}`} onClick={() => handleSwitch(1)} >
                        Controlled</div>
                    <div className={`example-button ${activeTab === 2 ? "active" : ""}`} onClick={() => handleSwitch(2)}>Uncontrolled</div>
                </div>
                {example}

              </div>
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
