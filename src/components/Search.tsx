import React, {useState} from 'react';
import {FaSearch} from 'react-icons/fa';
import { Countries } from '../types';

interface SearchProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    allCountries: Countries[];
    onSelectCountry: (country: Countries) => void;
    activeRegion: string;
}

const Search: React.FC<SearchProps> = ({searchValue, setSearchValue, allCountries, onSelectCountry, activeRegion}) => {

    // Lokálny stav na to, aby sme vedeli, či je zoznam návrhov otvorený
    const [isOpen, setIsOpen] = useState(false);

    // hľadáme krajiny, ktoré začínajú na zadaný text
    const suggestions = (searchValue.trim().length > 0 && allCountries) 
        ? allCountries.filter(country => {
            // podmienka pre zobrazenie krajin, ktorzch nazov zacina na text zadany do vzhladavacieho pola, bez ohladu na velkost pisma
            const matchesName = country.name.toLowerCase().startsWith(searchValue.toLowerCase())
            //podmienka, ake je vybrany region, nazov krajiny sa musi zhodovat s textom zadanym do vyhladavacieho pola a krajina musi paatrit do vybraneho regionu
            const matchesRegion = activeRegion ? country.region === activeRegion : true;

            return matchesName && matchesRegion;
        }).slice(0, 10) : [];

    
    console.log(searchValue);
    return (
        <div className="relative">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex h-[6rem] md:h-[3.5rem] w-full md:w-[30rem] items-center ps-[4rem] md:ps-[2rem] gap-[3.5rem] md:gap-[1.6rem] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] rounded-[0.6rem]">
                    {searchValue === "" && (<span className="text-[1.8rem] md:text-[1rem]"><FaSearch /></span>)}
                    <input
                        type="text"          
                        value={searchValue}
                        onChange={(e) => {
                             setSearchValue(e.target.value);
                             setIsOpen(true);
                            }}   
                        onFocus={() => setIsOpen(true)} // Otvoríme, aj keď do poľa len klikneš   
                        placeholder="Search for a country..."
                        className="text-[1.5rem] md:text-[0.9rem] tracking-[0.012rem] md:tracking-normal w-full outline-none bg-transparent">
                    </input>
                </div>
            </form>

            {/* Vykreslenie zoznamu moznosti - vyskakovaci zoznam */}
            <div className="mt-2 relative z-10">
                {isOpen && searchValue.trim().length > 0 && (
                    <ul className="absolute cursor-pointer rounded-[0.6rem] w-[25rem] md:w-[12.5rem] h-auto pt-[2rem] md:pt-[1rem] ps-[3rem] md:ps-[1.5rem] pb-[2.2rem] md:pb-[1.1rem] space-y-[0.7rem] md:space-y-[0.4rem] bg-amber-700">
                        {suggestions.length > 0 ? (
                        suggestions.map((country) => (
                            <li
                                key={country.alpha3Code}
                                onClick={() => { setSearchValue(country.name);
                                    onSelectCountry(country);
                                    setIsOpen(false);
                                }}
                                className="text-[1.5rem] md:text-[0.9rem] font-[600] tracking-[-0.01rem] md:tracking-normal">
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