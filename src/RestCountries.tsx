import React, {useState, useEffect} from 'react';

import Search from './components/Search';
import Filter from './components/Filter';
import Flags from './components/Flags';
import Info from './components/Info';
import { Countries } from './types';
import { Link } from 'react-router-dom';
interface RestCountriesProps  {
    darkMode: boolean;
}

const RestCountries: React.FC<RestCountriesProps> = ({darkMode}) => {

    // ******************************************************************
    // vlastnosti pre "Dark Mode" a "Light Mode"    
    const modeStyle = {
        dark: 'bg-dm-bg text-white',
        light: 'bg-lm-bg text-lm-text',
    }

    const stateStyle ={
        light: 'bg-white',
        dark: 'bg-dm-el',
    }

    // ********************************************************************
    // Vyhladavanie a zobrazenie vyhladanej krajiny vo vyhladavacom poli podla nazvu a vo filtri podla regionu
    const [searchValue, setSearchValue] = useState("");
    const [activeRegion, setActiveRegion] = useState("");

    const handleSelectCountry = (country: Countries) => {
        setSearchValue(country.name);
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
    // prepinanie sipok
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen(prev => !prev);};      
        
    // *********************************************************************
    // vyber krajin podla regionu
    

    //*********************************************************************
    // import dat z json
    const [countries, setCountries] = useState<Countries[]>([]);

    useEffect(() => {
        fetch('data.json')
            .then(response => response.json())
            .then((data: Countries[]) => {setCountries(data);})
            .catch(error=>console.log(error))
    }, []);
    //******************************************************************

    // zapis na vykreslenie krajin z vyhladania musi byt az po nacitani dat z json, inak by sa filtroval prazdny zoznam a nezobrazilo by sa nic
    const filteredCountries = countries.filter(country => {
        // Podmienka 1: Súhlasí meno? (Ak je searchValue prázdny, prejdú všetky)
    const matchesName = country.name.toLowerCase().includes(searchValue.toLowerCase());

    // Podmienka 2: Súhlasí región? (Ak nie je vybraný, prejdú všetky)
    const matchesRegion = activeRegion === "" || country.region === activeRegion;

    // KĽÚČ: Musia platiť OBA naraz
    // Ak si v Europe, matchesRegion je true len pre Európu. 
    // Ak k tomu začneš písať, matchesName to ďalej oseká len v rámci tej Európy.
    return matchesName && matchesRegion;
});

    return (
        <main className={`main w-full h-screen flex-col transition-colors duration-300 ${modeStyle[darkMode ? 'dark' : 'light']}`}>
            

            <div className="flex-col ps-8 md:ps-[5rem] pe-8 md:pe-[5rem] pt-12">
                <div className=" flex flex-col md:flex-row md:justify-between">
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

                <div className="grid grid-cols-1 md:grid-cols-4 mt-14 md:mt-[2.5rem] ms-20 md:ms-0 me-[4.8rem] md:me-[0rem] gap-y-[5rem] md:gap-y-[4.7rem] md:gap-x-[4.7rem]">
                {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                    <Link to={`/country/${country.alpha3Code}`}
                        key={country.alpha3Code}>
                        <div 
                            key={country.alpha3Code}                        
                            className={`state shadow-[0px_4px_10px_rgba(0,0,0,0.1)] rounded-[0.6rem] md:rounded-[0.3rem] transition-colors duration-300 ${stateStyle[darkMode ? 'dark' : 'light']}`} 
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
                    <p>No countries found.</p>
                )
                }
                </div>
            </div>
        </main>
    );
};

export default RestCountries;