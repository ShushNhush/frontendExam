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
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CaddyVisualization from "../../assets/CaddyVisualization";
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

const importCounter = `
\`\`\`javascript
<Counter label={"Counter 1"} step={1}/>
<Counter label={"Counter 2"} step={5}/>
\`\`\`
`;

function page() {
  const [choice, setChoice] = useState(1);

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const PRICE_PER_UNIT = 29.99;

  const handleClick = (option) => {
    setChoice(option);
  };

  const jsonScript = `
\`\`\`javascript
  "scripts": {
    "jsonserver": "json-server
    --watch data/db.json
    --port 3000"
  }
\`\`\`
  `;

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
              <QuestionTitle>What is the package.json</QuestionTitle>
              <div>
                <p>
                  The <strong>package.json</strong> file is a crucial part of a
                  Node.js project. It serves as the manifest for the project,
                  providing important metadata about the application and managing
                  its dependencies. This file ensures consistent project setup,
                  maintenance, and collaboration among developers.
                </p>
              </div>

              <div>
                <ul>
                  <li>
                    <strong>Metadata:</strong> Describes the project, including
                    its name, version, author, license, and more.
                  </li>
                  <br />
                  <li>
                    <strong>Dependency Management:</strong> Lists libraries and
                    packages your project depends on, along with their versions.
                  </li>
                  <br />
                  <li>
                    <strong>Script Automation:</strong> Defines custom scripts
                    for running commands (e.g., start, build, test).
                  </li>
                  <br />
                  <li>
                    <strong>Version Control:</strong> Helps manage semantic
                    versioning for dependencies.
                  </li>
                  <br />
                  <li>
                    <strong>Collaboration:</strong> Allows others to easily
                    replicate the project's setup with a single command (npm
                    install).
                  </li>
                  <br />
                  <li>
                    <strong>Configuration:</strong> Stores settings for tools,
                    like linters, test runners, or build systems.
                  </li>
                </ul>
              </div>

              <div>
                <p>
                  We can use the command <strong>npm install</strong> to install
                  all the dependencies in the package.json file.
                  <br />
                  <br />
                  We also run scripts with commands such as{" "}
                  <strong>npm run dev</strong> which runs the development
                  environment which we use when developing our application like
                  wise we also have <strong>npm run build</strong> to build the
                  project
                  <br />
                  <br />
                  We can also make custom scripts for repetitive tasks. Or as we
                  did in this semester, we setup a json-server added a script to
                  our package.json to start and run this server
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {jsonScript}
                  </ReactMarkdown>
                </p>
              </div>

              <div>
                <p><strong>"jsonserver"</strong> is the name of the script and we can run it by typing <strong>"npm run jsonserver"</strong> in our terminal.
                <br /><br />
                <strong>"json-server --watch data/db.json --port 3000"</strong> then starts a JSON server to serve the <strong>db.json</strong> file on port 3000. <br /><br />


                  This makes it easy to share the project with other developers. Once they clone the project off <strong>Github</strong> all they have to do is use the command
                  <strong> "npm install"</strong> and it will install all dependencies and configurations.
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

          {choice === 3 ? 
          
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
           : null}
        </MainContent>
      </Page>
    </>
  );
}

export default page;
