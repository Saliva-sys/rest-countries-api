import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestCountries from "./RestCountries";
import NavBar from './components/NavBar';
import Country from './components/Country';

const App: React.FC = () => {
  //*******************************************************************
      // Prepinanie "Light Mode" a "Dark Mode"
      const [darkMode, setIsDark] = useState(false);
      
      const switchDarkMode = () => {
          setIsDark(prev => !prev);};
  
      useEffect (() => {
          if (darkMode) {
              document.body.classList.add('dark');
          } else {
              document.body.classList.remove('dark');
          }
      }, [darkMode]);
      //*********************************************************************

  return (
    <BrowserRouter>
      <main>
        <NavBar 
                onSwitch = {switchDarkMode} 
                darkMode = {darkMode}
            />
        <Routes>
          <Route path="/" element={<RestCountries darkMode={darkMode}/>} />
          <Route path="/country/:alpha3Code" element={<Country />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;