import React from 'react';

import data from '../data.json';
import {Countries } from '../types';

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
}

const CountryDetails: React.FC<CountryDetailsProps> = ({name, population, region, subregion, capital, topLevelDomain, currencies, languages, borders = [], nativeName, darkMode}) => {

    const borderStyle = {
        light: 'bg-white text-lm-text',
        dark: 'bg-dm-el text-white',   
    }

    const borderCountries = borders?.map(border => {
        const country = (data as Countries[]).find(item => item.alpha3Code === border);
        return country ? country.name : border;
    })
    
    return (
        <div className="
            flex 
            flex-col
            md:ps-[1.65rem] 
            pt-[5.3rem] md:pt-[2.25rem]">
            <h1 className="
                text-[2.75rem] md:text-[2rem]
                font-[800]                  
                tracking-[-0.05rem] md:tracking-[-0.03rem]">
                    {name}
            </h1>

            <div className="
                flex 
                flex-col 
                pt-[1.45rem] md:pt-2 
                pb-[5.2rem] md:pb-[2.6rem] 
                text-[1.74rem] md:text-[0.87rem] 
                leading-12 md:leading-6 
                tracking-[-0.001rem] ">
                
                <div className="
                    flex 
                    flex-col md:grid md:grid-cols-2 
                    md:gap-18
                    pt-[0.45rem] md:pt-[0.8rem] 
                    md:text-[1rem] 
                    leading-16 md:leading-8">
                    <div>
                        <p><span className="font-semibold">Native Name:</span> {nativeName}</p>
                        <p><span className="font-semibold">Population:</span> {population.toLocaleString('en-US')}</p>
                        <p><span className="font-semibold">Region:</span> {region}</p>
                        <p><span className="font-semibold">Sub Region:</span> {subregion}</p>
                        <p><span className="font-semibold">Capital:</span> {capital}</p>
                    </div>
                    <div className="
                        pt-16 md:pt-0">
                        <p><span className="font-semibold">Top Level Domain:</span> {topLevelDomain.join(', ')}</p>
                        <p><span className="font-semibold">Currencies:</span> {currencies.map(currency => currency.name).join(', ')}</p>
                        <p><span className="font-semibold">Languages:</span> {languages.map(language => language.name).join(', ')}</p>
                    </div>
                </div>

                <div className="
                    flex
                    flex-col md:flex-row
                    md:items-center
                    mt-[4.2rem] md:mt-[4.15rem]
                    gap-8 md:gap-[0.9rem]">
                    <p className="
                        font-semibold
                        text-[2rem] md:text-[1rem]
                        whitespace-nowrap">
                            Border Countries:
                    </p> 
                    <div className="
                        grid
                        grid-cols-2 min-[600px]:grid-cols-3 md:grid-cols-3                        
                        gap-y-[1.2rem]       
                        md:gap-[0.6rem]                  
                        ">
                        {borderCountries.length > 0 ? (
                            borderCountries.map((borderName, index) => (
                                <span
                                    key={index}
                                    className={`borderCountry 
                                    flex
                                    justify-center
                                    items-center
                                    rounded-[0.3rem]
                                    shadow-[0px_0px_12px_rgba(0,0,0,0.2)] 
                                    ${borderName.length > 11 
                                        ? 'w-max px-3 whitespace-nowrap' 
                                        : 'w-48 md:w-[6.15rem] truncate'
                                    }
                                    truncate
                                    pt-[0.2rem] md:pt-[0.2rem]
                                    pb-[0.3rem] md:pb-[0.2rem]
                                    text-[1.5rem] md:text-[0.9rem]
                                    transition-colors duration-300
                                    ${borderStyle[darkMode ? 'dark' : 'light']}`}>
                                    {borderName}
                                </span>
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