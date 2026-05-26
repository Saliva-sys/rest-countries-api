import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestCountries from "./RestCountries";
import NavBar from './components/NavBar';
import Country from './components/Country';
import Footer from './components/Footer';

const App: React.FC = () => {
  //*******************************************************************
      // Switching "Light Mode" and "Dark Mode"
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
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className=" 
        flex 
        flex-col 
        md:justify-center
        w-full 
        min-h-screen  md:h-screen 
        md:overflow-hidden
        m-0 
        transition-colors duration-300
        ">
          <main className="
            flex 
            flex-col 
            w-full max-w-360 
            h-full md:h-256 min-h-0
            m-0 md:m-auto">
            <NavBar 
                    onSwitch = {switchDarkMode} 
                    darkMode = {darkMode}
                />
            <div className="
              grow 
              flex 
              flex-col
              w-full    
              min-h-0          
              transition-colors duration-300">
              <Routes>
                <Route path="/" element={<RestCountries darkMode={darkMode}/>} />
                <Route path="/country/:alpha3Code" element={<Country darkMode={darkMode} />} />          
              </Routes>
            </div>
          </main>
          <Footer />
      </div>
      
    </BrowserRouter>
  );
};

export default App;