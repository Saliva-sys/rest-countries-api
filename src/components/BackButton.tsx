import { Link } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";

interface BackButtonProps {
    darkMode:boolean;
}

const buttonStyle = {
        light: 'bg-white text-lm-text',
        dark: 'bg-dm-el text-white',   
    }

const BackButton: React.FC<BackButtonProps> = ({darkMode}) => {
    return (
        <div className={`button flex items-center justify-center md:justify-normal gap-[0.7rem] md:gap-[0.51rem] w-[13rem] md:w-[8.5rem] pt-[0.74rem] md:pt-[0.5rem] md:ps-[1.98rem] pb-[0.67rem] md:pb-[0.5rem] rounded-[0.3rem] text-[1.75rem] md:text-[1rem] shadow-[0px_0px_10px_rgba(0,0,0,0.25)] hover:shadow-[0px_0px_12px_0px_rgba(0,0,0,0.35)] transition-shadow cursor-pointer transition-colors duration-300 ${buttonStyle[darkMode ? 'dark' : 'light']}`}>
            <BsArrowLeft className="text-[2.5rem] md:text-[1.35rem]" />
            <Link to="/">Back</Link>            
        </div>
    );
};

export default BackButton;