import React from 'react';
import {useParams} from 'react-router-dom';
import data from '../data.json';
import { Countries } from '../types';
import Flags from './Flags';
import CountryDetails from './CountryDetails';
import BackButton from './BackButton';

interface CountryProps {
    darkMode: boolean;
}

const Country: React.FC<CountryProps> = ({darkMode}) => {
    const countryStyle = {
        dark: 'bg-dm-bg text-white',
        light: 'bg-lm-bg md:bg-white text-lm-text',
    }

    const {alpha3Code} = useParams();
    const country = (data as Countries[]).find(item => item.alpha3Code === alpha3Code);

    if (!country) {
        return <div>Country not found</div>
    }

    return (
        <div className={`country 
            flex 
            flex-col 
            ps-14 md:ps-20 
            pe-[3.4rem] 
            pt-20 
            transition-colors duration-300 
            ${countryStyle[darkMode ? 'dark' : 'light']}`}>
            <div>
                <BackButton 
                    darkMode={darkMode}
                />
            </div>
            <div className="
                flex md:grid 
                flex-col md:grid-cols-2 
                pt-32 md:pt-20 
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
                        currencies={country.currencies ??[{name: "N/A"}]}
                        languages={country.languages}
                        borders={country.borders ?? ["N/A"]}
                        
                    />
                </div>
            </div>
        </div>
    );
};

export default Country;