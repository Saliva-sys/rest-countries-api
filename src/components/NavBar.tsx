import React from 'react';

import {FaMoon, FaRegMoon} from 'react-icons/fa';

const NavBar = () => {

    return (
        <nav className="flex items-center justify-between ps-8 pt-[3.3rem] pe-[2rem] pb-[3.2rem] font-sans bg-white shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
            <h1 className="text-[1.75rem] font-[800] tracking-[-0.013rem]">Where in the world?</h1>

            <div className="flex items-center">
                <FaMoon />
                Dark Mode
                <FaRegMoon />
            </div>
        </nav>

    );
};

export default NavBar;