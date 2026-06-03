import React from 'react';
import {FaChevronUp, FaChevronDown} from 'react-icons/fa';

interface FilterProps {
    isOpen: boolean;
    onToggle: () => void;
    onFilterByRegion: (region: string) => void;
    selectedRegion: string;
    darkMode:boolean;
}

const Filter: React.FC<FilterProps> = ({isOpen, onToggle, onFilterByRegion, selectedRegion, darkMode}) => {

    const filterStyle = {
        light: 'bg-white',
        dark: 'bg-dm-el',
    }

    // We filter countries by region to show only those that belong to the area
    const filters = ["Filter by Region", "Africa", "America", "Asia", "Europe", "Oceania"] 
    
return (
    <div>
        <div   
        onClick={onToggle} 
        className={`filter 
            relative 
            flex 
            max-[700px]:h-12 min-[700px]:h-24 md:h-14 
            items-center 
            max-[700px]:mt-8 min-[700px]:mt-18 
            md:m-0 
            ps-12 md:ps-6 
            pe-[2.45rem] md:pe-[1.1rem] 
            shadow-[0px_4px_10px_rgba(0,0,0,0.1)] 
            rounded-[0.6rem] md:rounded-lg 
            max-[590px]:w-full min-[590px]:w-[25.1rem] md:w-50 
            justify-between 
            cursor-pointer 
            transition-colors duration-300 
            ${filterStyle[darkMode ? 'dark' : 'light']}`}
        >
            <span className="
                max-[700px]:text-[1rem] min-[700px]:text-[1.5rem] md:text-[0.9rem] 
                font-semibold 
                tracking-[-0.017rem] md:tracking-[-0.025rem]">
                    {selectedRegion === "" ? "Filter by Region" : selectedRegion === "Americas" ? "America" : selectedRegion}</span>       

            <span>{isOpen ? <FaChevronDown className="max-[700px]:text-[12px] min-[700px]:text-[17px] md:text-[12px]" /> : <FaChevronUp className="max-[700px]:text-[12px] min-[700px]:text-[17px] md:text-[12px]" />}</span>      

        </div>

        {/* Dropdown list for region select options */}   
        <div className="
            mt-2 md:mt-[0.2rem] 
            relative">
            {isOpen && filters.length >0 && (
                <ul className={`popup 
                absolute 
                cursor-pointer 
                rounded-[0.6rem] 
                max-[700px]:w-full min-[700px]:w-[25.1rem] md:w-50 
                h-auto 
                pt-8 md:pt-4 
                ps-12 md:ps-6 
                pb-[2.2rem] md:pb-[1.1rem] 
                space-y-[0.7rem] md:space-y-[0.4rem] 
                transition-colors duration-300 
                ${filterStyle[darkMode ? 'dark' : 'light']}`}>
                    {filters.map((region) => (
                        <li
                            key={region}
                            onClick = {() => onFilterByRegion(region)}
                            className="
                            max-[700px]:text-[1rem] min-[700px]:text-[1.5rem] md:text-[0.9rem] 
                            font-semibold 
                            tracking-[-0.017rem] md:tracking-[-0.02rem]">
                            {region}                                
                        </li>
                    ))}                        
                </ul>
            )}
        </div>  
    </div>
    );
};

export default Filter;