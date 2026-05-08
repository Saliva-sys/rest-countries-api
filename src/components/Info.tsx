import React from 'react';

interface InfoProps {
    name: string;
    population: number;
    region: string;
    capital: string;
}

const Info: React.FC<InfoProps> = ({name, population, region, capital}) => {

    return (
        <div>
            <h1>{name}</h1>

            <div>
                <p><span>Population:</span> {population}</p>
                <p><span>Region:</span> {region}</p>
                <p><span>Capital:</span> {capital}</p>
            </div>
        </div>
    );
};

export default Info;