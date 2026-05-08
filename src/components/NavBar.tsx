import React from 'react';

import {FaMoon, FaRegMoon} from 'react-icons/fa';

interface NavBarProps {
    onSwitch: () => void;
    darkMode: boolean;
}

const NavBar: React.FC<NavBarProps> = ({onSwitch, darkMode}) => {

    

    return (
    
        <nav className={`navbar flex items-center justify-between ps-[2rem] pt-[3.745rem] pe-[2.1rem] pb-[3.6rem] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] `}
        >
            <h1 className="text-[1.76rem] font-[800] tracking-[-0.018rem] m-0">Where in the world?</h1>

            <div className="flex items-center gap-x-[1.5rem] mode-toggle cursor-pointer"
                onClick={onSwitch}>
                <span className="text-[1.5rem] font-[600]">{darkMode ? <FaRegMoon /> : <FaMoon />}</span>
                <span className="text-[1.5rem] tracking-[-0.015rem] m-0 font-[600]">{darkMode ? "Light Mode" : "Dark Mode"}</span>
            </div>
        </nav>
        

    );
};

export default NavBar;