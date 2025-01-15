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
import "highlight.js/styles/github.css";
import "../../basic.css";
import Counter from "../../assets/Counter";
import PromiseDemo from "../../assets/PromiseDemo";
import ErrorBoundary from "../../ErrorBoundary"
import ErrorComponent from "../../assets/ErrorComponent"
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CaddyVisualization from "../../assets/CaddyVisualization";

const promiseSnippet = `
\`\`\`javascript
const handleFetchData = () => {
    setLoading(true); 
    setError(null);
    setData(null); 

    const fetchData = new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.5; 
        if (success) {
          resolve(<ThumbsUp />);
        } else {
          reject(<ThumbsDown />);
        }
      }, 2000); 
    });

    fetchData
      .then((response) => {
        setData(response); 
        setLoading(false); 
      })
      .catch((err) => {
        setError(err); 
        setLoading(false); 
      });
  };
\`\`\`
`

const caddy = `
\`\`\`caddyfile 
bingo.gudbergsen.com {

    root * /srv/bingo
    file_server
    try_files {path} /index.html
}

bingoapi.gudbergsen.com {
        reverse_proxy bingo:7171
}
\`\`\`
`

function PageComponent() {
  const [choice, setChoice] = useState(1);

  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleQuestionClick = (option) => {
    setChoice(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (inputValue.trim() === '') {
      setMessage('Error: Input cannot be empty.');
    } else {
      setMessage('Success: Your input is valid!');
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

            <QuestionTitle>Show the concept of promises in JavaScript</QuestionTitle>
              <div>
                <p>
                A promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
                <br /><br />
                 Promises allow you to handle asynchronous code more cleanly than traditional callback functions.
                 <br /><br />
                 <strong>States of a Promise</strong>
                 <ul>
                    <li><strong>Pending:</strong> The initial state; neither fulfilled nor rejected</li>
                    <li><strong>Fulfilled:</strong> The operation completed successfuilly, and the promise has a result.</li>
                    <li><strong>Rejected:</strong> The operation failed, and the promise has a reason for failure.</li>
                 </ul>
                </p>
              </div>

              <div>
            <p>Now, let’s see how promises work in action. Below is a demo where we simulate an API request using a promise.

            </p>
            <PromiseDemo/>
              </div>

              <div>
                <p>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                              {promiseSnippet}
                                            </ReactMarkdown>
                </p>
              </div>

              <div>
                <p>In my <strong>Bingo game</strong> I also utilized promises for API calls. This was done by using the <strong>async, await, and fetch</strong> API
                    <br />
                    <br />
                    This has the same flow. Its an asyncronous function that runs independt from the app. When using await and fetch together the program, pauses until a response is received from the fetch call.
                     <strong>fetch</strong> returns a <strong>promise</strong>.
                     <br />
                     <br />
                     See <strong>joinroom</strong> method in bingo game to see implementation
                </p>
              </div>
            </>
          ) : null}

          {choice === 2 ? (
            <>
            <QuestionTitle>How to handle errors (HTTP or JS errors) in React</QuestionTitle>
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
          ) : null}

          {choice === 3 ? (
            <>
                <QuestionTitle>What is the purpose of Caddy</QuestionTitle>
              <div>

                <p>
                Caddy is a modern, lightweight, and versatile web server designed with simplicity and security in mind. It's known for its ease of use, built-in HTTPS support, and automatic configuration.
                </p>
                <h4>Caddy Serves as:</h4>

                <ul>
                  <li><strong>Reverse Proxy:</strong> Caddy forwards client requests to backend servers (e.g., application servers) and returns the response to the client. This enables load balancing, caching, and efficient handling of multiple services on a single domain.</li>
                  <li><strong>Static File Server:</strong> It efficiently serves static assets like HTML, CSS, JavaScript, and images directly from the filesystem.</li>
                  <li><strong>Automatic HTTPS Management:</strong> Caddy can automatically obtain and renew TLS/SSL certificates using Let's Encrypt, making it extremely easy to secure applications with HTTPS.</li>
                  <li><strong>Configuration Simplification:</strong> Caddy uses a simple configuration syntax (Caddyfile), which makes setting up and managing services easier than with traditional web servers.</li>
                </ul>
              </div>

              <div>
                <h3>Caddy File</h3>

                <p>
                  An example on a <strong>CaddyFile</strong> can be the one I used for my <a href="https://bingo.gudbergsen.com/">bingo.gudbergsen.com/</a> site which utilized two functions from Caddy.
                  <br /><br />
                  I have my frontend being served from <strong>static files</strong> from my server.
                  <br /><br />
                  And my <strong>backend</strong> running on the <strong>reverse-proxy</strong> on port <strong>7171</strong> for api calls.
                </p>
                
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                              {caddy}
                                            </ReactMarkdown>
              </div>

              <div>
                <h3>Visual Demonstration</h3>
                <CaddyVisualization></CaddyVisualization>
              </div>

              <div>
                <p>
                  Caddy serves multiple essential purposes in the <strong>CI/CD</strong> (Continuous Integration/Continuous Deployment) pipeline by simplifying and automating tasks
                </p>
                <h4>CI/CD Workflows with Caddy</h4>
                <ul>
                  <li><strong>Build Stage:</strong> CI builds the frontend (e.g., React) and backend (e.g., Node.js) applications.</li>
                  <li><strong>Deployment Stage:</strong> CI/CD deploys the static frontend files to a directory (/srv/bingo) and the backend service to a port (7171).</li> <br /><br />
                  <li><strong>Caddy Configuration:</strong> Caddy serves the static files for the frontend and proxies API requests to the backend.</li>
                  <li><strong>Go Live:</strong> Caddy fetches and applies HTTPS certificates automatically, ensuring a secure and operational site immediately.</li>

                </ul>
              </div>
            </>
          ) : null}
        </MainContent>
      </Page>
    </>
  );
}

export default PageComponent;
