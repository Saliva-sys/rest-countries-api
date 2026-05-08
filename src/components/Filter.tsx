import {FaChevronUp, FaChevronDown} from 'react-icons/fa';

interface FilterProps {
    isOpen: boolean;
    onToggle: () => void;
}

const Filter: React.FC<FilterProps> = ({isOpen, onToggle}) => {
    

    return (
        <div className="flex h-[6rem] items-center ps-[3rem] pe-[2rem] shadow-[0px_4px_10px_rgba(0,0,0,0.1)] rounded-[0.6rem] mt-[5rem] w-[25rem] justify-between bg-amber-300"
        onClick={onToggle}>
            <span className="text-[1.45rem] tracking-[0.06rem]">Filter by Region</span>

            <span>
                {isOpen ? <FaChevronDown /> : <FaChevronUp/>}</span>            
        </div>
    );
};

export default Filter;