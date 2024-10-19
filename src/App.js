import NavBar from './Components/NavBar';
import './App.css';
import React, { useState } from 'react';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const newsApi = process.env.REACT_APP_NEWS_API
  
  const [progress, setProgress] = useState(0);

  return (
    <div>
    <Router>
    <NavBar/>
    <LoadingBar
      height={3}
      color='#f11946'
      progress={progress}
    />
    <Routes>
        <Route exact path="/" element={<News setProgress={setProgress} apikey={newsApi} key="other" category={"other"} country={"in"}/>}/>
        <Route exact path="/buisness" element={<News setProgress={setProgress} apikey={newsApi} key="buisness" category={"buisness"} country={"in"}/>}/>
        <Route exact path="/entertainment" element={<News setProgress={setProgress} apikey={newsApi} key="entertainment" category={"entertainment"}country={"in"}/>}/>
        <Route exact path="/education" element={<News setProgress={setProgress} apikey={newsApi} key="education" category={"education"} country={"in"}/>}/>
        <Route exact path="/sports" element={<News setProgress={setProgress} apikey={newsApi} key="sports" category={"sports"} country={"in"}/>}/>
        <Route exact path="/health" element={<News setProgress={setProgress} apikey={newsApi} key="health" category={"health"} country={"in"}/>}/>
        <Route exact path="/technology" element={<News setProgress={setProgress} apikey={newsApi} key="technology" category={"technology"} country={"in"}/>}/>
    </Routes>
    </Router>
    </div>
  )
}


export default App;