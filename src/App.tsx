/* eslint-disable no-restricted-globals */
import React from 'react';
import './App.css';
import useWindowDimensions from './component/useWindowDimensions';
import Home from "./views/home";

function App() {
  const { height, width } = useWindowDimensions();
  
 const realHeight = height > screen.availHeight ? screen.availHeight : height;
 const realWidth = width > screen.availWidth ? screen.availWidth : width;

  return (
    <div className="App">
      <header className="App-header" style={{width: `${realWidth}px`, height: realHeight}}>
       <Home />
      </header>
    </div>
  );
}

export default App;
