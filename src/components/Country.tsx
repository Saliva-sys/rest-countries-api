import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
// import data from '../data.json';
import { Countries, Translations } from '../types';
import Flags from './Flags';
import CountryDetails from './CountryDetails';
import BackButton from './BackButton';

interface CountryProps {
    darkMode: boolean;
    allCountries?: Countries[]; //added prop for all countries data
}

const Country: React.FC<CountryProps> = ({darkMode, allCountries}) => {
    const countryStyle = {
        dark: 'bg-dm-bg text-white',
        light: 'bg-lm-bg md:bg-white text-lm-text',
    }

    const {alpha3Code} = useParams();
    // const country = (data as Countries[]).find(item => item.alpha3Code === alpha3Code);
    const [country, setCountry] = useState<Countries | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        interface APICountry {
            name: {
                common: string;
                nativeName?: Record<string, { common: string }>;
            };
            cca2?: string;
            cca3?: string;
            population: number;
            region: string;
            subregion?: string;
            capital?: string[];
            tld?: string[];
            currencies?: Record<string, { name: string; symbol?: string }>;
            languages?: Record<string, string>;
            borders?: string[];
            flags: {
                svg: string;
                png: string;
                alt?: string;
            };
        }

        const fetchCountry = async () => {
            if (!alpha3Code) return;
            try {
                setLoading(true);
                setError("");

                const response = await fetch(`https://restcountries.com/v3.1/alpha/${alpha3Code}`);
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                const raw = data[0] as APICountry;

                if (!raw) throw new Error("Country not found");

                const nativeNameValue = raw.name?.nativeName
                    ? Object.values(raw.name.nativeName)[0]?.common ?? raw.name.common
                    : raw.name?.common ?? "N/A";

                const formattedCurrencies = raw.currencies
                    ? Object.entries(raw.currencies).map(([code, curr]) => ({
                        code,
                        name: code.toUpperCase(), // use currencu code as name
                        symbol: curr.symbol || ''
                    }))
                    : [];

                const formattedLanguages = raw.languages
                    ? Object.entries(raw.languages).map(([code, lang]) => ({
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

                const mappedCountry: Countries = {
                    name: raw.name.common,
                    topLevelDomain: raw.tld ?? [],
                    alpha2Code: raw.cca2 ?? '',
                    alpha3Code: raw.cca3 ?? '',
                    callingCodes: [],
                    capital: raw.capital ? raw.capital[0] : 'N/A',
                    altSpellings: [],
                    subregion: raw.subregion ?? '',
                    region: raw.region,
                    population: raw.population,
                    latlng: [],
                    demonym: '',
                    area: 0,
                    timezones: [],
                    borders: raw.borders ?? [],
                    nativeName: nativeNameValue,
                    numericCode: '',
                    flags: {
                        svg: raw.flags?.svg ?? '',
                        png: raw.flags?.png ?? '',
                    },
                    currencies: formattedCurrencies,
                    languages: formattedLanguages,
                    translations: createTranslations(),
                    flag: raw.flags?.svg ?? '',
                    independent: false,
                };

                setCountry(mappedCountry);
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountry();
    }, [alpha3Code]);

    if (loading) {
            return <div className={`flex items-center justify-center h-screen font-bold ${countryStyle[darkMode ? 'dark' : 'light']}`}>Loading details...</div>;
        }

        if (error || !country) {
            return <div className={`flex items-center justify-center h-screen font-bold text-red-500 ${countryStyle[darkMode ? 'dark' : 'light']}`}>Error: {error || "Country not found"}</div>;
        }  

    return (
        <div className={`country 
            flex 
            flex-col 
            max-[700px]:ps-10 min-[700px]:ps-14 md:ps-20 
            pe-[3.4rem] 
            max-[700px]:pt-10 min-[700px]:pt-20 
            pb-80
            transition-colors duration-300 
            ${countryStyle[darkMode ? 'dark' : 'light']}`}>
            <div>
                <BackButton 
                    darkMode={darkMode}
                />
            </div>
            <div className="
                flex md:grid 
                max-[1050px]:flex-col min-[1050px]:grid-cols-2 
                max-[700px]:pt-15 min-[700px]:pt-32 md:pt-20 
                justify-between">
                <div>
                    <Flags 
                        src={country.flags.svg}
                        alt={`Flag of ${country.name}`}
                        isDetail={true}
                        />
                </div>

                <div>
                    <CountryDetails
                        name={country.name}
                        nativeName={country.nativeName}
                        population={country.population}
                        region={country.region}
                        subregion={country.subregion}
                        capital={country.capital ??""}
                        topLevelDomain={country.topLevelDomain}
                        currencies={country.currencies ?? [{name: "N/A"}]}
                        languages={country.languages}
                        borders={country.borders ?? ["N/A"]}
                        darkMode={darkMode}    
                        allCountries={allCountries}                    
                    />
                </div>
            </div>
        </div>
    );
};

export default Country;