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
    // Vyhladavanie a zobrazenie vyhladanej krajiny
    const [searchValue, setSearchValue] = useState("");

    const handleSelectCountry = (country: Countries) => {
        setSearchValue(country.name);
    }

    //*********************************************************************
    // prepinanie sipok
    const [isOpen, setIsOpen] = useState(false);

    const toggleFilter = () => {
        setIsOpen(prev => !prev);};       

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

    const filteredCountries = countries.filter(country => country.name.toLowerCase().startsWith(searchValue.toLowerCase())); // zapis na vykreslenie krajin z vyhladania musi byt az po nacitani dat z json, inak by sa filtroval prazdny zoznam a nezobrazilo by sa nic

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
                        onToggle={toggleFilter} />
                </section>

                <div className="mt-16 ms-20 me-20 rounded-[0.6rem]">
                {filteredCountries.map((country) => (
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
                    </div>
                ))}
                </div>
            </div>
        </main>
    );
};

export default RestCountries;