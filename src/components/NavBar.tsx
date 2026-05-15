import React from 'react';

import {FaMoon, FaRegMoon} from 'react-icons/fa';

interface NavBarProps {
    onSwitch: () => void;
    darkMode: boolean;
}

const NavBar: React.FC<NavBarProps> = ({onSwitch, darkMode}) => {

    const navStyle = {
        light: 'bg-white text-lm-text',
        dark: 'bg-dm-el text-white',
    }

    return (
    
        <nav className={`navbar
            flex 
            items-center 
            justify-between 
            w-full
            pt-15 md:pt-5
            ps-8 md:ps-20             
            pe-[2.1rem] md:pe-20  
            pb-[3.6rem] md:pb-6     
            shadow-[0px_0px_10px_rgba(0,0,0,0.1)] 
            transition-colors duration-300 
            z-10
            ${navStyle[darkMode ? 'dark' : 'light']}`}
        >
            <h1 className="
                text-[1.76rem] md:text-[1.5rem] 
                font-[800] 
                tracking-[-0.018rem] md:tracking-normal 
                m-0">
                Where in the world?
            </h1>

            <div className="
                flex 
                items-center 
                gap-x-6 md:gap-x-[0.8rem] 
                mode-toggle 
                cursor-pointer"
                onClick={onSwitch}>
                <span className="
                text-[1.5rem] md:text-[1rem] 
                font-semibold">
                    {darkMode ? <FaRegMoon /> : <FaMoon />}</span>
                <span className="
                    text-[1.5rem] md:text-[1.01rem] 
                    tracking-[-0.015rem] md:tracking-normal 
                    m-0 
                    font-semibold">
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </span>
            </div>
        </nav>
        

    );
};

export default NavBar;