import React from 'react';

import {FaMoon, FaRegMoon} from 'react-icons/fa';

interface NavBarProps {
    onSwitch: () => void;
    darkMode: boolean;
}

const NavBar: React.FC<NavBarProps> = ({onSwitch, darkMode}) => {

    const navStyle = {
        light: 'bg-white',
        dark: 'bg-dm-el',
    }

    return (
    
        <nav className={`navbar flex items-center justify-between ps-[2rem] md:ps-[5rem] pt-[3.745rem] md:pt-[1.3rem] pe-[2.1rem] md:pe-[5rem] pb-[3.6rem] md:pb-[1.45rem] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] transition-colors duration-300 ${navStyle[darkMode ? 'dark' : 'light']}`}
        >
            <h1 className="text-[1.76rem] md:text-[1.5rem] font-[800] tracking-[-0.018rem] md:tracking-normal m-0">Where in the world?</h1>

            <div className="flex items-center gap-x-[1.5rem] md:gap-x-[0.8rem] mode-toggle cursor-pointer"
                onClick={onSwitch}>
                <span className="text-[1.5rem] md:text-[1rem] font-[600]">{darkMode ? <FaRegMoon /> : <FaMoon />}</span>
                <span className="text-[1.5rem] md:text-[1.01rem] tracking-[-0.015rem] md:tracking-normal m-0 font-[600]">{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </div>
        </nav>
        

    );
};

export default NavBar;