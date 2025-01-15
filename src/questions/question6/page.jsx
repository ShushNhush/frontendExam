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
import ActionCounter0 from "../../assets/ActionsCounter0";
import ActionCounter1 from "../../assets/ActionsCounter1";
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const jwtHeader = `
\`\`\` json
{
  "alg": "HS256"
}
\`\`\`
`

const jwtPayload = `
\`\`\` json
  {
  "sub": "oliver",
  "roomNumber": 7604,
  "iss": "Gudbergsen",
  "id": 9,
  "exp": 1736261830,
  "iat": 1736258230
}
\`\`\` 
`

const jwtSignature = `
\`\`\` json  
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  + YOUR 256 BIT KEY
\`\`\`
`

function PageComponent() {
  const [choice, setChoice] = useState(1);

  const [count0, setCount0] = useState(0);
  const [count1, setCount1] = useState(0);

const navigate = useNavigate();

  const handleQuestionClick = (option) => {
    setChoice(option);
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
              What is the difference between localStorage and sessionStorage?
              </QuestionTitle>

              <div>
                <p>Both localStorage and sessionStorage are part of the Web Storage API in JavaScript and are used to store data in the browser. However, they differ in how and when the stored data persists. <br /><br />
                </p>
                <h3>Data Persistence</h3>

                <h4><strong>localStorage</strong></h4>
                <ul>
                  <li>Data stored in <strong>localStorage</strong> persists even after the browser is closed and reopened</li> <br />
                  <li>The data remains until it is explicitly removed by your code or the user (clearing browser data).</li>
                </ul>
                <h4><strong>sessionStorage</strong></h4>
                <ul>
                  <li>Data stored in <strong>sessionStorage</strong> persists only for the duration of the page session.</li> <br />
                  <li>The data is cleared as soon as the browser tab or window is closed.</li>
                </ul>
                
              </div>

              <div>
                <h3>Scope</h3>
                <h4><strong>localStorage</strong></h4>

                <ul>
                  <li>Data is shared across all tabs and windows of the same origin domain</li> <br />
                  <li>Example if you store data in one tab, you can access it from another tab of the same website</li>
                </ul>
                <h4><strong>sessionStorage</strong></h4>

                <ul>
                  <li>Data is unique to each tab or window.</li> <br />
                  <li>Example: Data stored in one tab cannot be accessed from another tab, even if both are from the same website</li>
                </ul>
              </div>

              <div>
                <h3>Use Cases</h3>
                <h4><strong>localStorage:</strong> Ideal for long-term data storage, like:</h4>
                <ul>
                  <li>User preferences</li> <br />
                  <li>Caching data for offline usage</li> <br />
                  <li>Storing tokens for authentication</li>
                </ul>
            <br /><br />
                <h4><strong>sessionStorage:</strong> Ideal for short-term storage, like:</h4>
                <ul>
                  <li>Temporary form data or state within a session</li> <br />
                  <li>Information that should be available only for a single browsing session</li>
                </ul>
              </div>

              <div>
                <p>Both <strong>localStorage</strong> and <strong>sessionStorage</strong> use the same API, which includes methods like:</p>
                <ul>
                  <li><strong>setItem(key, value)</strong> - Stores a key-value pair.</li> <br />
                  <li><strong>getItem(key)</strong> - Retrieves the value for a given key.</li> <br />
                  <li><strong>removeItem(key)</strong> - Removes a specific key-value pair.</li>
                  <li><strong>clear()</strong> - Clears all stored data.</li>
                </ul>
                <p>Neither localStorage nor sessionStorage should be used for storing sensitive or confidential information, as they are not encrypted and are accessible via JavaScript, making them
                  vulnerable to XX attacks <br /> <br />
                  Use alternatives like <strong>HTTP-only cookies</strong>
                </p>
                
              </div>

            </>
          ) : null}

          {choice === 2 ? (
            <>
              <QuestionTitle>Show and explain the useEffect hook</QuestionTitle>

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
          ) : null}

          {choice === 3 ? (
            <>
            <QuestionTitle>Show and explain the different parts of a JWT token.</QuestionTitle>
              
              <div>
              <p><strong>JWT (JSON Web Token)</strong> is a compact and self-contained way to securely transmit information between parties as a JSON object.
                 
                 </p>
                 <h3>The token consists of 3 parts</h3>
                 <ul>
                  <li><strong>Header:</strong> The header hold information about the algorithm and token type</li>
                  <br />                  
                  <li><strong>Payload:</strong> The payload holds the informations stored from the backend, such as, authentication, and expiry time</li>
                  <br />
                  <li><strong>Verify signature:</strong> The signature is made by the backend from its 256-bit secret key. And used to verify the signatures authenticity.</li>
                  <br />
                 </ul>
              </div>

              <div>
                <h3>Here is a JWT token</h3>
                <p><span style={{color: "red"}}>eyJhbGciOiJIUzI1NiJ9</span>. <span style={{color: "fuchsia"}}>eyJzdWIiOiJvbGl2ZXIiLCJyb29tTnVt<br />YmVyIjo3NjA0LCJpc3MiOiJHdWRiZXJn<br />c2VuIiwiaWQiOjksImV4cCI6MTczNjI2<br />MTgzMCwiaWF0IjoxNzM2MjU4MjMwfQ</span>. 
                <br /><span style={{color: "#009dff"}}>QGYLMSewzTPeP8QW_dRgVjEK<br />CoZKwsedzuXIwB6cnko</span>
                </p>
                <p>
                  JWT tokens are not encrypted but they are <strong>encoded</strong> and signed, we can decode this JWT token with the help of a library or thirdparty websites, such as <strong><a href="https://jwt.io/">jwt.io</a></strong>.</p>
                  <BasicButton onClick={() => handleCopy()}>Copy jwt</BasicButton>
              </div>

            <div>
              <h3 style={{color: "red"}}>Header</h3>

              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                  {jwtHeader}
                                </ReactMarkdown>

              <h3 style={{color: "fuchsia"}}>Payload</h3>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                  {jwtPayload}
                                </ReactMarkdown>
              <h3 style={{color: "#009dff"}}>Signature</h3>
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                  {jwtSignature}
                                </ReactMarkdown>
            </div>

            <div>
            <h3>The client stores the JWT</h3>
                <h4>Common storage options:</h4>
                <ul>
                    <li><strong>Local storage:</strong> Persistent, survives page refreshes.</li>
                    <li><strong>Session Storage:</strong> Limited to the session, cleared when the tab is closed</li>
                    <li><strong>HTTP-Only Cookies:</strong> Prevents access by JavaScript.</li>
                </ul> <br />

                <p>I personally utilized the <strong>json web tokens</strong> in my bingo game, though it doesnt have any protected routes for security.
              <br /><br />
              I was able to use the JWT reconnect a user to my sessions and retrieve their data such as their <strong>bingo board</strong>.
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
