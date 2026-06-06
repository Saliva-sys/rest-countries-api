import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestCountries from "./RestCountries";
import NavBar from './components/NavBar';
import Country from './components/Country';
import Footer from './components/Footer';
import { Countries, Translations } from './types';

const getRouterBase = (): string => {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname.startsWith('/rest-countries-api/')
    ? '/rest-countries-api/'
    : '/';
};

const App: React.FC = () => {
  const routerBasename = import.meta.env.VITE_BASE_URL || getRouterBase();
  //*******************************************************************
      // Switching "Light Mode" and "Dark Mode"
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

// for fetching data from API, we can use useEffect an fetch data from API and set it to state
    const [countries, setCountries] = useState<Countries[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    React.useEffect(() => {
        // defining structure of the data we want to fetch from API and set it to state
        interface APICountry {
            name: {
                common: string;
                nativeName?: Record<string, {common: string}>;
            };
            cca2?: string;
            cca3?: string;
            population: number;
            region: string;
            subregion?: string;
            capital?: string[];
            tld?: string[];
            currencies?: Record<string, {name: string; symbol?: string}>;
            languages?: Record<string, string>;
            borders?: string[];
            flags: {
                svg: string;
                png: string;
                alt?: string;                
            };
        }
        
        const fetchCountries = async () => {
            try {
                setLoading(true);
                // API v3.1 requires maximum of 10 fields
                const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,cca3,population,region,capital,currencies,languages,flags,borders');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const rawdata: APICountry[] = await response.json();

                const mappedCountries: Countries[] = rawdata.map((country: APICountry) => {
                    const nativeNameValue = country.name?.nativeName
                        ? Object.values(country.name.nativeName)[0]?.common ?? country.name.common
                        : country.name.common;

                    const formattedCurrencies = country.currencies
                        ? Object.entries(country.currencies).map(([code, curr]) => ({
                            code,
                            name: curr.name,
                            symbol: curr.symbol ?? ''
                        }))
                        : [];

                    const formattedLanguages = country.languages
                        ? Object.entries(country.languages).map(([code, lang]: [string, string]) => ({
                            iso639_1: code,
                            iso639_2: code,
                            name: lang,
                            nativeName: lang
                        }))
                        : [];

                    const createTranslations = (): Translations => ({
                        br: '',
                        pt: '',
                        nl: '',
                        hr: '',
                        fa: '',
                        de: '',
                        es: '',
                        fr: '',
                        ja: '',
                        it: '',
                        hu: '',
                    });

                    return {
                        name: country.name.common,
                        topLevelDomain: [],
                        alpha2Code: country.cca2 ?? '',
                        alpha3Code: country.cca3 ?? '',
                        callingCodes: [],
                        capital: country.capital ? country.capital[0] : 'N/A',
                        altSpellings: [],
                        subregion: '',
                        region: country.region,
                        population: country.population,
                        latlng: [],
                        demonym: '',
                        area: 0,
                        timezones: [],
                        borders: country.borders ?? [],
                        nativeName: nativeNameValue,
                        numericCode: '',
                        flags: {
                            svg: country.flags?.svg ?? '',
                            png: country.flags?.png ?? '',
                        },
                        currencies: formattedCurrencies,
                        languages: formattedLanguages,
                        translations: createTranslations(),
                        flag: country.flags?.svg ?? '',
                        independent: false,
                    } as Countries;
                });

                setCountries(mappedCountries);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occured while fetching data.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

  return (
    <BrowserRouter basename={routerBasename}>
      <div className=" 
        flex 
        flex-col 
        w-full 
        min-h-screen
        m-0 
        transition-colors duration-300
        ">
          <main className="
            flex 
            flex-col 
            w-full max-w-360 
            min-h-0
            m-0 md:m-auto">
            <NavBar 
                    onSwitch = {switchDarkMode} 
                    darkMode = {darkMode}
                />
            <div className="
              grow 
              flex 
              flex-col
              w-full    
              min-h-0          
              transition-colors duration-300">
              <Routes>
                <Route path="/" element={
                  <RestCountries 
                    darkMode={darkMode}
                    countries={countries}
                    loading={loading}
                    error={error}/>} />
                <Route path="/country/:alpha3Code" element={
                  <Country 
                    darkMode={darkMode}
                    allCountries={countries} />} />          
              </Routes>
            </div>
          </main>
          <Footer />
      </div>
      
    </BrowserRouter>
  );
};

export default App;