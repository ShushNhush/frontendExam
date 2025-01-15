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
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Box, StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TemperatureCalculator from "../../assets/TemperatureConverter";
import CartQuantity from "../../assets/priceDisplayUplift/CartQuantity";
import PriceDisplay from "../../assets/priceDisplayUplift/PriceDisplay";


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

const gridCSS = `
\`\`\`css
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(3, 1fr);
\`\`\`
`


const GridExampleContainer = styled.div`
    
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    background-color: #333333;
    height: 50vh;
    width: 50vw;
    border: 2px solid #fff; /* Border around the entire grid container */
    grid-gap: 2px;

    background-image: 
    linear-gradient(to right, #fff 1px, transparent 1px), 
    linear-gradient(to bottom, #fff 1px, transparent 1px);
  background-size: 33.33% 33.33%; /* Define the size of the grid cells */

`

const GridItem = styled.div`
display: flex;
  border: 1px solid #ffffff; /* White border for visibility */
  background-color: #145DA0;
  grid-column: ${({ column }) => column};
  grid-row: ${({ row }) => row};
  justify-content: ${({ justify }) => justify};
  align-items: center;
  width: 100%;
  height: 100%;
`;

function PageComponent() {
  const [choice, setChoice] = useState(1);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState("");

  const [sync, setSync] = useState([0, 0, 0, 0]);

  const [async, setAsync] = useState([0, 0, 0, 0]);

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
  
  
    const reset = () => {
      setSync([0, 0, 0, 0]);
      setAsync([0, 0, 0, 0]);
    };
  
    
    const [position, setPosition] = useState({ column: 2, row: 2 });
    const [justifyContent, setJustifyContent] = useState('center');
  
    const justifySnippet = `
  \`\`\`css
  justify-content: ${justifyContent};
  \`\`\`
  `
  
  
    const moveItem = (direction) => {
      setPosition((prevPosition) => {
        const newPosition = { ...prevPosition };
        if (direction === 'left' && prevPosition.column > 1) {
          newPosition.column -= 1;
        } else if (direction === 'right' && prevPosition.column < 3) {
          newPosition.column += 1;
        } else if (direction === 'up' && prevPosition.row > 1) {
          newPosition.row -= 1;
        } else if (direction === 'down' && prevPosition.row < 3) {
          newPosition.row += 1;
        }
        return newPosition;
      });
    };

  return (
    
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
          <QuestionTitle>Show and explain the purpose of lifting state up in React.</QuestionTitle>
            <div>
              <h3>Lifting State</h3>

              <p>
              Lifting state up in React refers to the process of moving a shared state to the closest common ancestor of two or more components that need to share or use that state. This pattern promotes a single source of truth and ensures that components stay in sync when the state changes.
              </p>
              

            </div>
            <div>
            <h3>Why lift state up?</h3>

<ul>
  <li><strong>Shared State:</strong> If multiple components need access to the same data, lifting the state to their nearest common parent ensures that changes to the data are reflected in all dependent components.</li> <br />
  <li><strong>State Synchronization</strong> Without lifting state up, it can become challenging to keep components synchronized. Centralizing the state helps React manage updates efficiently.</li> <br />
  <li><strong>Simplifies Communication</strong> When child components need to communicate or affect each other (e.g., updating a sibling's state), lifting state up avoids the need for complex solutions like callbacks or context.</li>
</ul>
            </div>

            <div>
              <h3>Use case</h3>

              <p>For example, we have this <strong>Temperature Converter</strong> the inputs for Celcius and Fahrenheit are two individual <strong>componenets</strong>
                but they both depend on the same useState.
              
              </p>
              <h3>How it works</h3>
              <ul>
                <li>The input calls its <strong>onTemperatureChange</strong> handler</li> <br />
                <li>This triggers <strong>handleCelsiusChange</strong> in the parent</li><br />
                <li>The parent updates its state with the new temperature and scale</li><br />
                <li>React re-renders both inputs with the new values</li><br />
                <li>The Fahrenheit input automatically shows the converted value</li>
              </ul>
            </div>

            <div>

            <TemperatureCalculator></TemperatureCalculator>

            <h3>Benefits</h3>

            <ul>
              <li>Centralized state management.</li> <br />
              <li>Simplifies debugging, as all changes to the state are made in one place.</li> <br />
              <li>Components become more reusable and independent, relying only on props.</li>
            </ul>

            <p>
                Different Components Sharing State (Shopping Cart)
                </p>
                <div style={{display: "flex", justifyContent: "center"}}> 
                  <CartQuantity quantity={quantity} onQuantityChange={setQuantity}></CartQuantity>
                  <PriceDisplay quantity={quantity} pricePerUnit={PRICE_PER_UNIT}></PriceDisplay>
                </div>
            </div>
            
            </>
          ) : null}

          {choice === 3 ? (
            <>
            <QuestionTitle>What is the purpose of flexbox and grid in css</QuestionTitle>

            <div>
               <p>Grid and Flexbox are two layout systems in CSS designed to simplify creating complex and responsive layouts.
                   <br/>
                   <br/>
                   To best illustrate their use, I’ve created this demo.
                   <br/>
                   <br/>
                   The grid represents the page of your application, making it easy to separate the page into areas that are easier to visualize and work with.
                   <br/><br/>
                   You can adjust the size of the grid and split it into as many cells as you want. For this example, I created a 3x3 grid using this CSS:
                   <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                             {gridCSS}
                           </ReactMarkdown>
                           The repeat() takes two arguments. 
                           <br/>1. How many times to repeat (cell count)
                           <br/>2. 1fr. each cell takes up "one fraction" of the available spacesco
               </p>
        
            </div>

           <div style={{gridColumn: '2 / 4'}}>
               <GridExampleContainer>
               <GridItem column={position.column} row={position.row} justify={justifyContent}>
                   <Box size={64} color="white"/>
               </GridItem>
               </GridExampleContainer>

               <div className="grid-buttons-container">
               <button className="grid-button left" onClick={() => moveItem('left')}><ArrowLeft/></button>

               <div className="center">
               <button className="grid-button" onClick={() => moveItem('up')}><ArrowUp/></button>
               <button className="grid-button" onClick={() => moveItem('down')}><ArrowDown/></button>
               </div>

               <button className="grid-button right" onClick={() => moveItem('right')}><ArrowRight/></button>
               </div>
               <div className="grid-buttons-container">
 
</div>
       </div>

       <div>
           <p><strong>Flexbox</strong> is good for controlling the contents of the cells. In this demo we can use the justify-contents to move the contents of the cell.
           <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                             {justifySnippet}
                           </ReactMarkdown>
               Some of the ways to move the box is with either justify: center/flex-start/flex-end use these buttons to see how they behave            
           </p>
           <div className="justify-button-container">
           <button className="grid-button" onClick={() => setJustifyContent('flex-start')}>Start</button>
           <button className="grid-button" onClick={() => setJustifyContent('center')}>Center</button>
           <button className="grid-button" onClick={() => setJustifyContent('flex-end')}>End</button>
           </div>
           
       </div>
           </>
          ) : null}
        </MainContent>
      </Page>
    
  );
}

export default PageComponent;
