import React, {useState, useEffect} from "react";

import './RestCountries.scss'
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Flags from "./components/Flags";
import Info from "./components/Info";

interface Countries {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: Flags;
  currencies: Currency[];
  languages: Language[];
  translations: Translations;
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: string;
  independent: boolean;
}

interface RegionalBloc {
  acronym: string;
  name: string;
}

interface Translations {
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  hu: string;
}

interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Flags {
  svg: string;
  png: string;
}

const RestCountries: React.FC = () => {
    const [countries, setCountries] = useState<Countries[]>([]);
    const [darkMode, setDarkMode] = useState(false)
    
const toggleDarkMode = () => {
  setDarkMode(prev => !prev);
};

// Tento efekt sa postará o to, aby HTML tag VŽDY súhlasil s React stavom
useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);

useEffect(() => {
    fetch('data.json')
    .then(response => response.json())
    .then((data: Countries[]) => {
        setCountries(data);
    })
    .catch(error => console.error ("chyba", error));
    },
[]);

return (
<div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-dm-bg text-white' : 'bg-lm-bg text-lm-text'}`}>
    <div className="main__container">
      <div className="grow">
        <NavBar 
          onToggle={toggleDarkMode}
          darkMode={darkMode}/>
      </div>

      <div className="main__content">
        <div className="sear__bar">
        </div>

        <div className="filter__bar">
        </div>
        
        <div className="countries__container">  
        {countries.map((country) => (                  
          <div
            key={country.alpha3Code}
            className="flag__container"> 

            <div>
              <Flags 
                src={country.flags.svg}
                alt={`Flag of ${country.name}`}/>
            </div>

            <div className="info__container">             
              <Info 
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
              />                     
           </div>
        </div>           
        ))}
        </div>
                
      </div>
    </div>

    {/* mt-auto odtlačí footer dole, h-20 mu dá jasnú výšku */}
    <footer className="pbs-2 bg-amber-800 mt-auto h-20 text-white">
        <Footer />
    </footer>
</div>
);
};


export default RestCountries;
