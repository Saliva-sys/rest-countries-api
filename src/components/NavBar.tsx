import React from "react";
import { FaMoon, FaRegMoon } from "react-icons/fa";

interface NavBarProps {
    onToggle: () => void;
    darkMode: boolean;
}

const NavBar: React.FC<NavBarProps> = ({onToggle, darkMode}) => {

return (
    <div className={`navbar ${darkMode ? 'bg-dm-el text-white' : 'bg-white text-lm-text'}`}>
        <h1>Where in the world?</h1>

        <div  
            onClick={onToggle}
            className="mode-toggle cursor-pointer"
        >
                {darkMode ? <FaMoon /> : <FaRegMoon />}
            <span>
                {darkMode ? "Dark Mode" : "Light Mode"}
            </span>            
        </div>
    </div>
);
};

export default NavBar;