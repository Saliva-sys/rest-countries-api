import React, {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import { Countries } from '../types';

interface SearchProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    allCountries: Countries[];
    onSelectCountry: (country: Countries) => void;
    activeRegion: string;
    darkMode: boolean;
}

const Search: React.FC<SearchProps> = ({searchValue, setSearchValue, allCountries, onSelectCountry, activeRegion, darkMode}) => {

    const searchStyle = {
        light: 'bg-white',
        dark: 'bg-dm-el',    
    }

    // Local state to manage dropdown visibility
    const [isOpen, setIsOpen] = useState(false);

    // Filter suggestions based on input value and active region
    const suggestions = (searchValue.trim().length > 0 && allCountries) 
        ? allCountries.filter(country => {
            // Condition for displaying countries whose name starts with the text entered in the search field, regardless of case
            const matchesName = country.name.toLowerCase().startsWith(searchValue.toLowerCase())
            // Condition for displaying countries in the selected region
            const matchesRegion = activeRegion ? country.region === activeRegion : true;

            return matchesName && matchesRegion;
        }).slice(0, 10) : [];

    
    console.log(searchValue);
    return (
        <div>
            <div>
                <div className={`search 
                    flex 
                    max-[700px]:h-12 min-[700px]:h-24 md:h-14 
                    max-[767px]:w-full min-[768px]:w-100 min-[1100px]:w-120  
                    items-center 
                    max-[700px]:ps-4 min-[700px]:ps-16 md:ps-8 
                    max-[700px]:gap-4 min-[700px]:gap-14 md:gap-[1.6rem] 
                    shadow-[0px_4px_10px_rgba(0,0,0,0.1)] 
                    rounded-[0.6rem] 
                    transition-colors duration-300 
                    ${searchStyle[darkMode ? 'dark' : 'light']}`}>
                    {searchValue === "" && (<span className="max-[700px]:text-[1rem] min-[700px]:text-[1.8rem] md:text-[1rem]"><FaSearch /></span>)}
                    <input
                        type="text"          
                        value={searchValue}
                        onChange={(e) => {
                             setSearchValue(e.target.value);
                             setIsOpen(true);
                            }}   
                        onFocus={() => setIsOpen(true)} // We open even if you just click in the box 
                        // Closes dropdown when clicking outside, timeout allows item click to register first
                        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                        placeholder="Search for a country..."
                        className="
                            max-[700px]:text-[1rem] min-[700px]:text-[1.5rem] md:text-[0.9rem] 
                            tracking-[0.012rem] md:tracking-normal 
                            w-full 
                            outline-none 
                            bg-transparent"
                        >
                    </input>
                </div>
            </div>

            {/* Drawing a list of the options - pop-up list */}
            <div className="mt-2 relative z-10">
                {isOpen && searchValue.trim().length > 0 && (
                    <ul className={`popup 
                    absolute 
                    cursor-pointer 
                    rounded-[0.6rem] 
                    max-[700px]:w-full min-[700px]:w-100 md:w-50 
                    h-auto 
                    pt-8 md:pt-4 
                    ps-12 md:ps-6 
                    pb-[2.2rem] md:pb-[1.1rem] 
                    space-y-[0.7rem] md:space-y-[0.4rem] 
                    transition-colors duration-300 
                    ${searchStyle[darkMode ? 'dark' : 'light']}`}>
                        {suggestions.length > 0 ? (
                        suggestions.map((country) => (
                            <li
                                key={country.alpha3Code}
                                onClick={() => { setSearchValue(country.name);
                                    onSelectCountry(country);
                                    setIsOpen(false);
                                }}
                                className="
                                max-[700px]:text-[1rem] min-[700px]:text-[1.5rem] md:text-[0.9rem] 
                                font-semibold 
                                tracking-[-0.01rem] md:tracking-normal">
                                    {country.name}
                            </li>
                            ))
                        ) : (
                            <li>No country matches your search...</li>
                        )}
                    </ul>
                )}
            </div>
        </div>

    );
};

export default Search;