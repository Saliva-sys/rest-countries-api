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
            max-[700px]:ps-4 min-[700px]:ps-[3.05rem] md:ps-6 
            max-[700px]:pt-6 min-[700px]:pt-12 md:pt-6">
            <h1 className="
                max-[700px]:text-[1.5rem] min-[700px]:text-[2.24rem] md:text-[1.1rem] 
                font-[800] 
                tracking-[-0.017rem] md:tracking-normal">
                    {name}
            </h1>

            <div className="
                max-[700px]:pt-4  min-[700px]:pt-[1.45rem] md:pt-[0.73rem] 
                max-[700px]:pb-8 min-[700px]:pb-[5.2rem] md:pb-[2.6rem] 
                max-[700px]:text-[1rem] min-[700px]:text-[1.74rem] md:text-[0.87rem] 
                max-[700px]:leading-6 min-[700px]:leading-12 md:leading-6 
                tracking-[-0.001rem]">
                <p><span className="font-semibold">Population:</span> {population.toLocaleString('en-US')}</p>
                <p><span className="font-semibold">Region:</span> {region}</p>
                <p><span className="font-semibold">Capital:</span> {capital}</p>
            </div>
        </div>        
    );
};

export default Info;