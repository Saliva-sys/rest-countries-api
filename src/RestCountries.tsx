import React, {useState} from 'react';
import data from './data.json';

import Search from './components/Search';
import Filter from './components/Filter';
import Flags from './components/Flags';
import Info from './components/Info';
import { Countries } from './types';
import { Link, useNavigate } from 'react-router-dom';
interface RestCountriesProps  {
    darkMode: boolean;
}

const RestCountries: React.FC<RestCountriesProps> = ({darkMode}) => {

    // ******************************************************************
    // Features for "Dark Mode" and "Light Mode"    
    const modeStyle = {
        dark: 'bg-dm-bg text-white',
        light: 'bg-lm-bg text-lm-text',
    }

    const stateStyle ={
        light: 'bg-white',
        dark: 'bg-dm-el',
    }

    // ********************************************************************
    // Features for searching and displaying countries
    const [searchValue, setSearchValue] = useState("");
    const [activeRegion, setActiveRegion] = useState("");
    const [isOpen, setIsOpen] = useState(false); // FIXED: Moved up so it's available in handleFilterByRegion
    const navigate = useNavigate();
    const [countries] = useState<Countries[]>(data as Countries[]);

    const handleSelectCountry = (country: Countries) => {
        setSearchValue(country.name);
        navigate(`/country/${country.alpha3Code}`);
    }

    const handleFilterByRegion = (region: string) => {
        let apiRegion = region;
        if (region === "America") {
            apiRegion = "Americas";}

        setActiveRegion(apiRegion);
        setSearchValue("");
        setIsOpen(false);
        if (region === "Filter by Region") {
            setActiveRegion("");
        }
    }

    //*********************************************************************
    // switch for filter
    const toggleFilter = () => {
        setIsOpen(prev => !prev);};      
        
    // *********************************************************************
    // filter countries based on search and region
    

    //*********************************************************************
    // import data from json
    // const [countries, setCountries] = useState<Countries[]>(data);    

    // useEffect(() => {
        // fetch('/src/data.json')
            // .then(response => response.json())
            // .then((data: Countries[]) => {setCountries(data);})
            // .catch(error=>console.log(error))
    // }, []);
    //******************************************************************

    // --- Filter logic based on search input and active region ---
    const filteredCountries = countries.filter(country => {
        // Condition 1: Check if country name matches search value (case-insensitive)
    const matchesName = country.name.toLowerCase().includes(searchValue.toLowerCase());

    // Condition 2: Check if country region matches active region filter
    const matchesRegion = activeRegion === "" || country.region === activeRegion;

    // KEY: Both conditions must be true and must be met to pass the filter
    // If you are in Europe, matchesRegion will be true only for Europe.
    // If you start typing, matchesName will further filter only within Europe.
    return matchesName && matchesRegion;
});

    return (
        <div className={`content 
            flex 
            flex-col 
            w-full
            h-full 
            transition-colors duration-300
            ${modeStyle[darkMode ? 'dark' : 'light']}`}>

            <div className=" 
                flex
                flex-col
                h-full 
                ps-8 md:ps-20 
                pe-8 md:pe-20 
                pt-12"
                >
                
                <div className="
                flex 
                flex-col md:flex-row
                grow 
                min-h-0 
                md:justify-between">
                    <section>
                        <Search 
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            allCountries={countries}
                            onSelectCountry={handleSelectCountry}
                            activeRegion={activeRegion}
                            darkMode={darkMode}/>
                    </section>

                    <section >
                        <Filter
                            isOpen={isOpen}
                            onToggle={toggleFilter} 
                            onFilterByRegion={handleFilterByRegion}
                            selectedRegion={activeRegion}
                            darkMode={darkMode}/>
                    </section>
                </div>

                <div className="
                    grid
                    grid-cols-1 md:grid-cols-4
                    grow
                    min-h-0 
                    md:overflow-y-auto 
                    mt-14 md:mt-[6.3rem]
                    ms-4 sm:ms-20 md:ms-0 
                    me-[4.8rem] md:me-0 
                    gap-y-20 md:gap-y-[4.7rem] 
                    md:gap-x-[4.7rem]">
                {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                    <Link to={`/country/${country.alpha3Code}`}
                        key={country.alpha3Code}>
                        <div 
                            key={country.alpha3Code}                        
                            className={`state 
                                shadow-[0px_4px_10px_rgba(0,0,0,0.1)] 
                                rounded-[0.6rem] 
                                md:rounded-[0.3rem] 
                                transition-colors duration-300 
                                ${stateStyle[darkMode ? 'dark' : 'light']}`}
                            >
                            <section>
                                <Flags 
                                    src={country.flags.svg}
                                    alt={`Flag of ${country.name}`}/>
                            </section>

                            <section>
                                <Info 
                                name={country.name}
                                population={country.population}
                                region={country.region}
                                capital={country.capital}/>
                            </section>
                        </div>
                    </Link>
                ))                    
                ) : (
                    <div className="  
                        flex                  
                        w-full md:w-7xl
                        items-center
                        justify-center">
                        <p className="text-[1.5rem] font-bold text-center">No countries found.</p>
                    </div>
                )
                }
                </div>
            </div>
        </div>
    );
};

export default RestCountries;