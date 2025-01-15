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
import EventBubbling from "../../assets/eventBubbling/EventBubbling"
import ItemTransfer from "../../assets/ItemTransfer";
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CaddyVisualization from "../../assets/CaddyVisualization";

const jwtHeader = `
\`\`\` json
{
  "alg": "HS256"
}
\`\`\`
`;

const mapSnippet = `
\`\`\` javascript
{table1Items.map(item => (
            <tr key={item.id}>
              <td style={{border: "1px solid #333", padding: "5px" }}>{item.name}</td>
              <td style={{border: "1px solid #333", padding: "5px" }}>
                <BasicButton onClick={() => moveItemToTable2(item.id)}>Move to Table 2</BasicButton>
              </td>
            </tr>
          ))}
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

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState("");

  const handleQuestionClick = (option) => {
    setChoice(option);
  };

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setModalOpen(true);
  };

const navigate = useNavigate();
 

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
              <QuestionTitle>Show and explain the concept of event bubbling in JavaScript.</QuestionTitle>

            <div>
                <h3>Event Bubbling</h3>
                <p>Event bubbling is a fundamental concept in the DOM (Document Object Model) 
                    event system. It describes how events <strong>propagate</strong> in the DOM tree when they are triggered.

                </p>
                <h4>What is Event Bubbling</h4>
                <ul>
                    <li>When an event is triggered on an element (such as a click on a button), the event does not only stay on the target element but will propagate upward through its parent elements all the way to the document object.</li> <br />

                    <li>This process of "bubbling" happens in the order from the target element up to the root of the DOM tree.</li> <br />
                    <li>Event bubbling is the default propagation behavior in most modern browsers.</li>
                </ul>

            </div>
            <div>
            <h3>Why is Event Bubbling Important?</h3>
                <p>

<strong>Event Delegation:</strong> Event bubbling allows you to use event delegation, which is an efficient way to handle events for multiple child elements. You can add a single event listener on a parent element and handle events for all its child elements by checking the target property of the event.
                </p>

<h3>Stopping the Bubbling</h3>
                <p>

Sometimes, you may not want the event to propagate to the parent elements. You can stop the bubbling by using event.stopPropagation():</p>



            </div>

            <div>
                <h3>Event bubble demo</h3>
              <EventBubbling/>
            </div>

            <div>
                <p>This behavior helps in making JavaScript event handling more efficient, especially when managing events for dynamically added elements.</p>
                <br />
                <p>In the beginning of 3rd Semester I utilized the <strong>Event Delegation</strong> to assign an onClick effect to all my <strong>child</strong> divs, for my <strong>tic tac toe</strong> game</p>
            </div>
            </>
          ) : null}

          {choice === 2 ? (
            <>
              <QuestionTitle>Show and explain the map function in React</QuestionTitle>

            <div>

                <p>In React, you often need to render a list of elements dynamically based on an array or an object. One of the most common ways to do this is by using the map() function.

                </p>
                <br />
                <h3>How the map() function is used for rendering lists in React</h3>

                <p>In React, the map() function is used to loop over an array of items and return a corresponding set of JSX elements for each item. It is a great way to render dynamic lists because React can efficiently update and re-render only the necessary elements when the list changes.</p>

            </div>
              <div>
                <p>Here are two tables, they each contain a list of objects, and they have a <strong>unique id</strong> to identify them.
                By default React uses <strong>index</strong> as it's key but this can lead to errors.
                </p>
                <ItemTransfer></ItemTransfer>
              </div>

              <div>
                <h3>map()</h3>
                <p>
                The <strong>map()</strong> function takes a callback function that is executed for each element in the array (items). The callback function receives the current item as arguments.
                </p>
                <h3>key attribute</h3>
                <p>
                The key attribute is a special prop in React that helps React identify each element in a list uniquely. When you render a list of elements, React needs a way to identify which items have changed, been added, or removed.
                </p>
                <BasicButton onClick={() => openModal(mapSnippet)} >Show code</BasicButton>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {currentSnippet}
                </ReactMarkdown>
                </Modal>
              </div>

              <div>
                <h3>Why is the key important</h3>
                <p>
                When the state of the list changes (e.g., when items are added or removed), React can use the key to compare the new list to the previous one and only update the items that have actually changed, instead of re-rendering the entire list.
                </p>

                <p>
                If you <strong>don't</strong> provide a key, React will use the index by default, but it's best to use unique identifiers if available to avoid potential issues with reordering and performance.
                </p>

                
              </div>
            </>
          ) : null}

          {choice === 3 ? (
            <>
              <QuestionTitle>
             What is HTTPS and how did we get it working on our deployed websites
              </QuestionTitle>

            <div>
              <h3>What is HTTPS</h3>
              <p>
              HTTPS (HyperText Transfer Protocol Secure) is the <strong>secure version of HTTP</strong>, the protocol used for communication between web browsers and websites. HTTPS ensures that data sent between the client (browser) and the server is encrypted, protecting it from being intercepted by attackers. It is an essential feature for modern websites, especially those handling sensitive information like login credentials, payment details, or personal data.
              </p>
            </div>

            <div>
              <h3>Key Features of HTTPS</h3>

              <ul>
                <li><strong>Encryption:</strong> HTTPS uses SSL/TLS (Secure Sockets Layer/Transport Layer Security) to encrypt the data transmitted between the browser and the server. <br />
            
                </li>
                <li><strong>Authentication:</strong> The server presents a certificate to prove its identity, ensuring that the user is communicating with the legitimate website.</li><br />
                <li><strong>Data Integrity:</strong> HTTPS ensures that the data exchanged between the server and client is not tampered with during transit.</li><br />
                <li><strong>Trust and SEO Benefits:</strong> HTTPS-enabled websites display a padlock in the browser address bar, signaling to users that the connection is secure.
                <br />
                <br />
                Search engines like Google prioritize HTTPS websites in search rankings.</li>
              </ul>
            </div>

            <div>
              <h4>Caddy</h4>
              <p><strong>Using Caddy for Automatic HTTPS. </strong>
              Caddy is a modern web server that simplifies the process of setting up HTTPS. It automatically provisions and renews SSL/TLS certificates using <strong>Let's Encrypt</strong>, a free certificate authority.
              </p>

              <p>
                                An example on a <strong>CaddyFile</strong> can be the one I used for my <a href="https://bingo.gudbergsen.com/">bingo.gudbergsen.com/</a> site which utilized two functions from Caddy.
                                <br /><br />
                                I have my frontend being served from <strong>static files</strong> from my server.
                                <br /><br />
                                And my <strong>backend</strong> running on the <strong>reverse-proxy</strong> on port <strong>7171</strong> for api calls.
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                            {caddy}
                                                          </ReactMarkdown>
                              </p>
                              
                            
            </div>

            <div>
            <div>
                <h3>Visual Demonstration</h3>
                <CaddyVisualization></CaddyVisualization>
              </div>

            </div>
            </>
          ) : null}
        </MainContent>
      </Page>
    </>
  );
}

export default PageComponent;
