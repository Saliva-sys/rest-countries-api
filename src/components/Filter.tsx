import React from 'react';
import {FaChevronUp, FaChevronDown} from 'react-icons/fa';

interface FilterProps {
    isOpen: boolean;
    onToggle: () => void;
    onFilterByRegion: (region: string) => void;
    selectedRegion: string;
}

const Filter: React.FC<FilterProps> = ({isOpen, onToggle, onFilterByRegion, selectedRegion}) => {

    // filtrujeme krajiny podla regionu, aby sa zobrazili len tie, ktore patria do danej oblasti
    const filters = ["Filter by Region", "Africa", "America", "Asia", "Europe", "Oceania"] 
    
return (
    <div>
        <div className="relative flex h-[6rem] md:h-[3.5rem] items-center mt-[4.5rem] md:m-0 ps-[3rem] md:ps-[1.5rem] pe-[2.45rem] md:pe-[1.1rem] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] rounded-[0.6rem] md:rounded-[0.5rem] w-[25rem] md:w-[12.5rem] justify-between bg-amber-300 cursor-pointer"
        onClick={onToggle}>
            <span className="text-[1.5rem] md:text-[0.9rem] font-[600] tracking-[-0.01rem] md:tracking-[-0.025rem]">{selectedRegion === "" ? "Filter by Region" : selectedRegion === "Americas" ? "America" : selectedRegion}</span>       

            <span>{isOpen ? <FaChevronDown className="text-[17px] md:text-[12px]" /> : <FaChevronUp className="text-[17px] md:text-[12px]" />}</span>      

        </div>

        {/* Vykreslenie zoznamu moznosti - vyskakovaci zoznam */}   
            <div className="mt-2 md:mt-[0.2rem] relative">
                {isOpen && filters.length >0 && (
                    <ul className="absolute cursor-pointer rounded-[0.6rem] w-[25rem] md:w-[12.5rem] h-auto pt-[2rem] md:pt-[1rem] ps-[3rem] md:ps-[1.5rem] pb-[2.2rem] md:pb-[1.1rem] space-y-[0.7rem] md:space-y-[0.4rem] bg-amber-700">
                        {filters.map((region) => (
                            <li
                                key={region}
                                onClick = {() => onFilterByRegion(region)}
                                className="text-[1.5rem] md:text-[0.9rem] font-[600] tracking-[-0.01rem] md:tracking-[-0.02rem]">
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