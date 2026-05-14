import React from 'react';

interface CountryDetailsProps {
    name: string;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    topLevelDomain: string[];
    currencies: {name: string}[];
    languages: {name: string}[];
    borders: string[];
    nativeName: string;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({name, population, region, subregion, capital, topLevelDomain, currencies, languages, borders, nativeName}) => {
    
    return (
        <div className="flex flex-col md:ps-[1.7rem] pt-[5.3rem] md:pt-[2.3rem]">
            <h1 className="text-[2.75rem] font-[800] md:text-[2rem] font-[800] tracking-[-0.05rem] md:tracking-[-0.03rem]">{name}</h1>

            <div className="flex flex-col pt-[1.45rem] md:pt-[0.5rem] pb-[5.2rem] md:pb-[2.6rem] text-[1.74rem] md:text-[0.87rem] leading-[3rem] md:leading-[1.5rem] tracking-[-0.001rem] ">
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-[4.5rem] pt-[0.45rem] md:pt-[0.8rem] md:text-[1rem] leading-[4rem] md:leading-[2rem]">
                    <div>
                        <p><span className="font-[600]">Native Name:</span> {nativeName}</p>
                        <p><span className="font-[600]">Population:</span> {population.toLocaleString('en-US')}</p>
                        <p><span className="font-[600]">Region:</span> {region}</p>
                        <p><span className="font-[600]">Sub Region:</span> {subregion}</p>
                        <p><span className="font-[600]">Capital:</span> {capital}</p>
                    </div>
                    <div className="pt-[4rem] md:pt-0">
                        <p><span className="font-[600]">Top Level Domain:</span> {topLevelDomain.join(', ')}</p>
                        <p><span className="font-[600]">Currencies:</span> {currencies.map(currency => currency.name).join(', ')}</p>
                        <p><span className="font-[600]">Languages:</span> {languages.map(language => language.name).join(', ')}</p>
                    </div>
                </div>

                <div>
                    <p><span className="font-[600]">Border Countries:</span> {borders.join(', ')}</p>
                </div>

            </div>
        </div>
    );
};

export default CountryDetails;