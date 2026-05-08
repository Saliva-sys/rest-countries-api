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
        <div className="relative flex h-[6rem] items-center ps-[3rem] pe-[2rem] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] rounded-[0.6rem] mt-[5rem] w-[25rem] justify-between bg-amber-300 cursor-pointer"
        onClick={onToggle}>
            <span className="text-[1.45rem] tracking-[0.06rem]">{selectedRegion === "" ? "Filter by Region" : selectedRegion}</span>       

            <span>{isOpen ? <FaChevronDown /> : <FaChevronUp/>}</span>      

        </div>

        {/* Vykreslenie zoznamu moznosti - vyskakovaci zoznam */}   
            <div>
                {isOpen && filters.length >0 && (
                    <ul className="absolute cursor-pointer">
                        {filters.map((region) => (
                            <li
                                key={region}
                                onClick = {() => onFilterByRegion(region)}>{region}</li>
                        ))}                        
                    </ul>
                )}
            </div>  
    </div>
    );
};

export default Filter;