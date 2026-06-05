import React from 'react';

// import data from '../data.json';
import {Countries } from '../types';
import {useNavigate} from 'react-router-dom';

interface CountryDetailsProps {
    name: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string[];
    currencies: {name: string}[];
    languages: {name: string}[];
    borders?: string[];
    nativeName: string;
    darkMode:boolean;
    allCountries?: Countries[]; // Added prop for all countries data
}

const CountryDetails: React.FC<CountryDetailsProps> = ({name, population, region, subregion, capital, topLevelDomain, currencies, languages, borders = [], nativeName, darkMode, allCountries}) => {

    const borderStyle = {
        light: 'bg-white text-lm-text',
        dark: 'bg-dm-el text-white',   
    }

    const borderCountries = borders?.map(border => {
        // const country = (data as Countries[]).find(item => item.alpha3Code === border);
        const country = allCountries?.find(item => item.alpha3Code === border);
        return {
            name: country ? country.name : border, // if country is not found, use the border code as a fallback
            code: border // leave this here (eg. "AFG") for navigation purposes, even if the country name is not found in the data
        };
    }) || [];

    const navigate = useNavigate();
    const handleBorderClick = (borderCode: string) => {
        navigate(`/country/${borderCode.toUpperCase()}`);
    }
    
    return (
        <div className="
            flex 
            flex-col
            md:ps-[1.65rem] 
            max-[700px]:pt-6 min-[700px]:pt-[5.3rem] md:pt-9">
            <h1 className="
                max-[700px]:text-[1.2rem] min-[700px]:text-[2.75rem] md:text-[2rem]
                font-[800]                  
                tracking-[-0.05rem] md:tracking-[-0.03rem]">
                    {name}
            </h1>

            <div className="
                flex 
                flex-col 
                max-[700px]:pt-[0.8rem] min-[700px]:pt-[1.45rem] md:pt-2 
                pb-[5.2rem] md:pb-[2.6rem] 
                max-[700px]:text-[1rem] min-[700px]:text-[1.74rem] md:text-[0.87rem] 
                leading-12 md:leading-6 
                tracking-[-0.001rem] ">
                
                <div className="
                    flex 
                    flex-col md:grid md:grid-cols-2 
                    md:gap-18
                    pt-[0.45rem] md:pt-[0.8rem] 
                    md:text-[1rem] 
                    max-[700px]:leading-8 min-[700px]:leading-16 md:leading-8">
                    <div>
                        <p><span className="font-semibold">Native Name:</span> {nativeName}</p>
                        <p><span className="font-semibold">Population:</span> {population.toLocaleString('en-US')}</p>
                        <p><span className="font-semibold">Region:</span> {region}</p>
                        <p><span className="font-semibold">Sub Region:</span> {subregion}</p>
                        <p><span className="font-semibold">Capital:</span> {capital}</p>
                    </div>
                    <div className="
                        max-[700px]:pt-6 min-[700px]:pt-16 md:pt-0">
                        <p><span className="font-semibold">Top Level Domain:</span> {topLevelDomain.join(', ')}</p>
                        <p><span className="font-semibold">Currencies:</span> {currencies.map(currency => currency.name).join(', ')}</p>
                        <p><span className="font-semibold">Languages:</span> {languages.map(language => language.name).join(', ')}</p>
                    </div>
                </div>

                <div className="
                    flex
                    flex-col md:flex-row
                    md:items-center
                    max-[700px]:mt-4 min-[700px]:mt-[4.2rem] min-[768px]:mt-4 min-[1050px]:mt-[4.15rem]
                    max-[700px]:gap-4 min-[700px]:gap-8 md:gap-[0.9rem]">
                    <p className="
                        font-semibold
                        max-[700px]:text-[1.1rem] min-[700px]:text-[2rem] md:text-[1rem]
                        whitespace-nowrap">
                            Border Countries:
                    </p> 
                    <div className="
                        grid
                        max-[620px]:grid-cols-2 min-[620px]:grid-cols-3 md:grid-cols-3                        
                        gap-y-[1.2rem]       
                        max-[700px]:gap-x-2 md:gap-[0.6rem]                  
                        ">
                        {borderCountries.length > 0 ? (
                            borderCountries.map((country: { name: string, code: string }, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleBorderClick(country.code)}
                                    className={`borderCountry 
                                    flex
                                    justify-center
                                    items-center
                                    rounded-[0.3rem]
                                    shadow-[0px_0px_12px_rgba(0,0,0,0.2)] 

                                    max-[700px]:w-35 min-[700px]:w-48 md:w-[6.15rem] 
                                    max-[700px]:pt-[0.1rem] min-[700px]:pt-[0.2rem] md:pt-[0.2rem]
                                    max-[700px]:pb-[0.1rem] min-[700px]:pb-[0.3rem] md:pb-[0.2rem]

                                    overflow-hidden
                                    whitespace-nowrap
                                    text-ellipsis
                                    px-2

                                    max-[700px]:text-[1rem] min-[700px]:text-[1.5rem] md:text-[0.9rem]
                                    transition-all duration-300
                                    hover:scale-105
                                    ${borderStyle[darkMode ? 'dark' : 'light']}`}
                                    title={country.name} 
                                >
                                    <span className="truncate block w-full text-center">
                                        {country.name}
                                    </span>
                                </button>
                            ))
                        ) : (
                            <p>No border countries found.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CountryDetails;