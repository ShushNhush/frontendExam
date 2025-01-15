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
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Box, StepBack } from "lucide-react";
import PromiseDemo from "../../assets/PromiseDemo";




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


  const navigate = useNavigate();

  const handleQuestionClick = (option) => {
    setChoice(option);
  };

  const openModal = (snippet) => {
    setCurrentSnippet(snippet);
    setModalOpen(true);
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
    </>
  );
}

export default PageComponent;
