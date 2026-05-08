import React, {useState, useEffect} from 'react';

import NavBar from './components/NavBar';
import Search from './components/Search';
import Filter from './components/Filter';
import Flags from './components/Flags';
import Info from './components/Info';
import { Countries } from './types';


const RestCountries: React.FC = () => {
    //*******************************************************************
    // Prepinanie "Light Mode" a "Dark Mode"
    const modeStyle = {
        dark: 'bg-dm-bg text-white',
        light: 'bg-lm-bg text-lm-text',
    }

    const [darkMode, setIsDark] = useState(false);
    
    const switchDarkMode = () => {
        setIsDark(prev => !prev);};

    useEffect (() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);
    //*********************************************************************

    // ********************************************************************
    // Vyhladavanie a zobrazenie vyhladanej krajiny vo vyhladavacom poli podla nazvu a vo filtri podla regionu
    const [searchValue, setSearchValue] = useState("");
    const [activeRegion, setActiveRegion] = useState("");

    const handleSelectCountry = (country: Countries) => {
        setSearchValue(country.name);
        setActiveRegion("");
    }

    const handleFilterByRegion = (region: string) => {
        setActiveRegion(region);
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
            <NavBar 
                onSwitch = {switchDarkMode} 
                darkMode = {darkMode}
            />

            <div className="flex-col ps-8 pe-8 pt-12">
                <section>
                    <Search 
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        allCountries={countries}
                        onSelectCountry={handleSelectCountry}/>
                </section>

                <section>
                    <Filter
                        isOpen={isOpen}
                        onToggle={toggleFilter} 
                        onFilterByRegion={handleFilterByRegion}
                        selectedRegion={activeRegion}/>
                </section>

                <div className="mt-16 ms-20 me-20 rounded-[0.6rem]">
                {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                    <div
                        key={country.alpha3Code}>
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
                    </div>))
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