import styled from "styled-components";

const Page = styled.div`
    
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 10vh 90vh;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; 
    height: 100vh;
    width: 100%;
`

const Header = styled.div`
    
    grid-column: 1 / -1;
    grid-row: 1 / 1;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
   
`

const HeaderButton = styled.div`
    
    display: grid;
    justify-content: center;
    align-items: center;
    background-color: #333333;
    border: 1px solid black;
    color: white;
    font-size: 2rem;
    font-weight: 600;
    

`
const MainContent = styled.div`
    
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
    justify-content: center;
    justify-items: center;
    
`
const QuestionTitle = styled.h1`
  grid-column: 1 / -1;
`;

const BasicButton = styled.button`
    
    width: 6vw;
    height: 6vh;

    background-color: #333333;
    color: #fff;
    border-radius: 8px;

    &:hover {
        background-color: #676767;
    }

`
export {Header, Page, MainContent, HeaderButton, QuestionTitle, BasicButton}