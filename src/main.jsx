import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Q1 from './questions/question1/page.jsx'
import Q2 from './questions/question2/page.jsx'
import Q3 from  './questions/question3/page.jsx'
import Q4 from  './questions/question4/page.jsx'
import Q5 from  './questions/question5/page.jsx'
import Q6 from  './questions/question6/page.jsx'
import Q7 from  './questions/question7/page.jsx'
import Q8 from  './questions/question8/page.jsx'
import Q9 from  './questions/question9/page.jsx'
import Q10 from  './questions/question10/page.jsx'
import Q11 from  './questions/question11/page.jsx'
import Q12 from  './questions/question12/page.jsx'
import Q13 from  './questions/question13/page.jsx'

import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Dashboard from './assets/Dashboard.jsx'
import About from './assets/About.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />}>

    </Route>
    <Route path='/q1' element={<Q1/>}>
      <Route path='/q1/dashboard' element={<Dashboard/>}/>
      <Route path='/q1/about' element={<About/>}/>
    </Route>
    <Route path="/q2" element={<Q2/>}></Route>
    <Route path="/q3" element={<Q3/>}></Route>
    <Route path="/q4" element={<Q4/>}></Route>
    <Route path="/q5" element={<Q5/>}></Route>
    <Route path="/q6" element={<Q6/>}></Route>
    <Route path="/q7" element={<Q7/>}></Route>
    <Route path="/q8" element={<Q8/>}></Route>
    <Route path="/q9" element={<Q9/>}>
    <Route path='/q9/dashboard' element={<Dashboard/>}/> 
      <Route path='/q9/about' element={<About/>}/>
    </Route>
    <Route path="/q10" element={<Q10/>}></Route>
    <Route path="/q11" element={<Q11/>}></Route>
    <Route path="/q12" element={<Q12/>}></Route>
    <Route path="/q13" element={<Q13/>}></Route>
    
</>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
