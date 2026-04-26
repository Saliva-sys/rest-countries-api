import React from "react";

interface InfoProps {
    name: string;
    population: number;
    region: string;
    capital: string | undefined;
}

const Info: React.FC<InfoProps> = ({name, population, region, capital}) => {

return (
    <div>
        <div className="title">
            <h2>{name}</h2>
        </div>

        <div className="basics">
            <p>{population}</p>
            <p>{region}</p>
            <p>{capital}</p>
        </div>
    </div>
);
};

export default Info;