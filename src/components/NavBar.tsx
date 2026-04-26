import React from "react";
import { FaMoon, FaRegMoon } from "react-icons/fa";

const NavBar: React.FC = () => {

return (
    <div>
        <h1>Where in the world?</h1>

        <div>
            <FaRegMoon/>
            <span>Dark Mode</span>
            <FaMoon/>
            <span>Light Mode</span>
        </div>
    </div>
);
};

export default NavBar;