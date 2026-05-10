import React from 'react';
import {useParams} from 'react-router-dom';
import data from '../../public/data.json';
import Flags from './Flags';


const Country: React.FC = () => {

    const {alpha3Code} = useParams();
    const country = data.find(item => item.alpha3Code === alpha3Code);

    if (!country) {
        return <div>Country not found</div>
    }

    return (
        <div>
            <div>
                <Flags 
                    src={country.flags.svg}
                    alt={`Flag of ${country.name}`}
                    />
            </div>

        </div>
    );
};

export default Country;