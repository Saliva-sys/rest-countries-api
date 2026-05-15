import React from 'react';

interface InfoProps {
    name: string;
    population: number;
    region: string;
    capital: string;
}

const Info: React.FC<InfoProps> = ({name, population, region, capital}) => {

    return (
        <div className="
            flex 
            flex-col 
            ps-[3.05rem] md:ps-6 
            pt-12 md:pt-6">
            <h1 className="
                text-[2.24rem] md:text-[1.1rem] 
                font-[800] 
                tracking-[-0.017rem] md:tracking-normal">
                    {name}
            </h1>

            <div className="
                pt-[1.45rem] md:pt-[0.73rem] 
                pb-[5.2rem] md:pb-[2.6rem] 
                text-[1.74rem] md:text-[0.87rem] 
                leading-12 md:leading-6 
                tracking-[-0.001rem]">
                <p><span className="font-semibold">Population:</span> {population.toLocaleString('en-US')}</p>
                <p><span className="font-semibold">Region:</span> {region}</p>
                <p><span className="font-semibold">Capital:</span> {capital}</p>
            </div>
        </div>        
    );
};

export default Info;