import styled from "styled-components";
import { useState } from "react";
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
import { use } from "react";
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Login from "../../assets/Login";
import Modal from "../../assets/modal/Modal";

const syncingSnippet = `
    
\`\`\`javascript

const handleRun = () => {
    
    setSync([0, 0, 0, 0]);
    setAsync([0, 0, 0, 0]);

    const updateAsync = async () => {
      for (let i = 1; i <= 4; i++) {
        await new Promise((resolve) =>
          setTimeout(() => {
            setAsync((prev) => {
              const updated = [...prev];
              updated[i - 1] = i;
              return updated;
            });
            resolve();
          }, 1000) 
        );
      }
    };

    updateAsync();
    
    for (let i = 1; i <= 4; i++) {
      setSync((prev) => {
        const updated = [...prev];
        updated[i - 1] = i;
        return updated;
      });
    }
  };

\`\`\`
`;

const ternaryOperator = `
\`\`\` javascript
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ) : (
    <LoginForm />
  )}
</div>
\`\`\`
`
const ifelseSnippet = `
\`\`\` javascript
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
  \`\`\`
`;

const logicalSyntax = `
\`\`\` javascript    
<div>
  {isLoggedIn && <AdminPanel />}
</div>
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

const Box = styled.div`
  width: 40px;
  height: 40px;

  border: 1px solid #333;
`;

function PageComponent() {
  const [choice, setChoice] = useState(1);

  const [conChoice, setConChoice] = useState(1);

  const [sync, setSync] = useState([0, 0, 0, 0]);

  const [async, setAsync] = useState([0, 0, 0, 0]);

  const [response, setResponse] = useState(undefined);
    const [responseColor, setResponseColor] = useState(undefined);

  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState("");

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setModalOpen(true);
  };

  const handleQuestionClick = (option) => {
    setChoice(option);
  };

  const handleRun = () => {
    setSync([0, 0, 0, 0]);
    setAsync([0, 0, 0, 0]);

    const updateAsync = async () => {
      for (let i = 1; i <= 4; i++) {
        await new Promise((resolve) =>
          setTimeout(() => {
            setAsync((prev) => {
              const updated = [...prev];
              updated[i - 1] = i;
              return updated;
            });
            resolve();
          }, 1000)
        );
      }
    };

    updateAsync();

    for (let i = 1; i <= 4; i++) {
      setSync((prev) => {
        const updated = [...prev];
        updated[i - 1] = i;
        return updated;
      });
    }
  };

  const IfElseBoxes = () => {
    const [number, setNumber] = useState(1);
    if (number === 1) {
      return (
        <>
          <Box style={{ backgroundColor: "#333" }}></Box>
          <Box
            onClick={() => setNumber(2)}
            style={{ backgroundColor: "#fff" }}
          ></Box>
        </>
      );
    } else {
      return (
        <>
          <Box
            onClick={() => setNumber(1)}
            style={{ backgroundColor: "#fff" }}
          ></Box>
          <Box style={{ backgroundColor: "#333" }}></Box>
        </>
      );
    }
  };

  const reset = () => {
    setSync([0, 0, 0, 0]);
    setAsync([0, 0, 0, 0]);
  };

  const handleCopy = async () => {
    const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbGl2ZXIiLCJyb29tTnVtYmVyIjo3NjA0LCJpc3MiOiJHdWRiZXJnc2VuIiwiaWQiOjksImV4cCI6MTczNjI2MTgzMCwiaWF0IjoxNzM2MjU4MjMwfQ.Z-bKWxVUtkfKqTyBLo3PfKW5xJRjDJheLWzHA4kstAI"
    try {
      await navigator.clipboard.writeText(jwt);
      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
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
                Differences between synchronous & asynchronous programming
              </QuestionTitle>

              <div>
                <p>
                  <h3>Synchronous Programming</h3>In synchronous programming,
                  tasks are executed sequentially. Each task must complete
                  before the next one begins, leading to a "blocking" behavior.
                  <h3>Asynchronous Programming</h3>
                  In asynchronous programming, tasks can be executed
                  independently of the main program flow. This allows other
                  tasks to continue while waiting for slower operations (e.g.,
                  API calls, file reads) to complete.
                  <h3>How async and await fit into this</h3>
                  The async and await keywords in JavaScript simplify working
                  with asynchronous code, making it look and behave more like
                  synchronous code while still being non-blocking.
                </p>
              </div>

              <div>
                <ul>
                  <li>
                    <strong>async:</strong> Declares an asynchronous function.
                    The function returns a <strong>Promise</strong>
                  </li>
                  <li>
                    <strong>await:</strong> Pauses execution of the async
                    function until the <strong>Promise</strong> resolves or
                    rejects
                  </li>
                </ul>

                <div className="sync-container">
                  <div className="sync-numbers">
                    {sync.map((cell, index) => (
                      <div key={index} className="cell-number">
                        {cell}
                      </div>
                    ))}
                  </div>
                  <div className="async-numbers">
                    {async.map((cell, index) => (
                      <div key={index} className="cell-number">
                        {cell}
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      marginTop: "5px",
                    }}
                  >
                    <BasicButton onClick={handleRun}>Run parallel</BasicButton>
                    <BasicButton onClick={reset}>Reset</BasicButton>
                  </div>
                </div>
                <p>
                  Here we have two arrays which both gets filled with numbers
                  1-4. They are basically the same but the{" "}
                  <strong>bottom</strong> one uses async. <br />
                  <br />
                  Even though the async method is invoked first, the program
                  still executes syncrhonicly and fills out the first array as
                  expected.
                </p>
              </div>

              <div>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {syncingSnippet}
                </ReactMarkdown>
              </div>
              <div>
                <p>
                  <strong>async and await</strong> Can make the code easier to
                  read compared to promises with chained <strong>.then</strong>{" "}
                  and <strong>.catch </strong>
                  calls. <br />
                  <br />
                  In this example we can see that the{" "}
                  <strong>updateasync();</strong> method is called before the
                  loop for updating the sync array. <br />
                  <br />
                  So this way we can see the async is running asynchronous of
                  the program meanwhile it lets the synchronous functionality
                  run as expected
                </p>
                
              </div>
            </>
          ) : null}

          {choice === 2 ? (
            <>
              <QuestionTitle>
                Provide examples for different ways of doing conditional
                rendering
              </QuestionTitle>

              <div>
                <p>
                  In React, there is no special syntax for writing conditions.
                  Instead, you’ll use the same techniques as you use when
                  writing regular JavaScript code. <br />
                  <br /> For example, you can use an if statement to
                  conditionally include JSX:
                </p>

                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {ifelseSnippet}
                </ReactMarkdown>

                <p><strong>if-else</strong> statements cannot be written directly in the JSX, but we can use it to return JSX blocks.</p>
              </div>
              <div>
                <p>if you prefer more compact code, you can use the <br /><strong>conditional '?' operator</strong>. <br /> Which unlike <strong>if</strong>, works directly inside JSX.</p>

                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {ternaryOperator}
                </ReactMarkdown>
                <p>This is a common way of doing conditional rendering, and is compact and intuitive. Often combined with <strong>useState</strong>, which makes it easy to render the UI depending on different states</p>
              </div>

              <div>
                <p>
                    Sometimes we dont need an <strong>else</strong> condition, then we can use the <strong>logical && syntax</strong>.
                </p>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {logicalSyntax}
                </ReactMarkdown>
                <p>
                    This way we can render parts of the UI only when a condition is met. In this example its an Admin panel. <br /> <br /> But it could also for example be an <strong>error message</strong>. Which we often dont need an else, either we display the error or we dont.
                </p>
              </div>

              <div>
                <p>
                    All of these different approaches also work for conditionally specifying attributes. <br /><br />
                    There is no right or wrong approach, use what ever you're most familiar and comfortable with. <br /><br />
                    You can use many of the same techniques from JavaScript and Java, such as switch statement or chain multiple conditions with logical operator. <br />
                    <br />
                    With the use of <strong>useState</strong> we also often render lists or multiple objects by the use of the <strong>map</strong> function.
                    Which makes us able to re-render the UI when conditions change.

                </p>
              </div>

            
            </>
          ) : null}

          {choice === 3 ? (
            <>
            <QuestionTitle>A typical flow of using JWTs for user authentication in a React application.</QuestionTitle>
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
               you can use the website <a href="https://jwt.io/"target="_blank" rel="noopener noreferrer">jwt.io</a> to view the structure of a JWT token when after its been decoded.
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
