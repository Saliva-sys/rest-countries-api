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
        <Link to="/" className="inline-block">            
            <div className={`button 
                flex 
                items-center 
                justify-center md:justify-normal 
                gap-[0.7rem] md:gap-[0.51rem] 
                max-[700px]:w-40 min-[700px]:w-52 md:w-34 
                pt-[0.74rem] md:pt-2 
                md:ps-[1.98rem] 
                pb-[0.67rem] md:pb-2 
                rounded-[0.3rem] 
                max-[700px]:text-[1rem] min-[700px]:text-[1.75rem] md:text-[1rem] 
                shadow-[0px_0px_10px_rgba(0,0,0,0.25)] 
                hover:shadow-[0px_0px_12px_0px_rgba(0,0,0,0.35)] 
                cursor-pointer 
                transition-colors duration-300 
                ${buttonStyle[darkMode ? 'dark' : 'light']}`}>
                <BsArrowLeft className="max-[700px]:text-[1.5rem] min-[700px]:text-[2.5rem] md:text-[1.35rem]" />
                <span>Back</span>            
            </div>
        </Link>
    );
};

export default BackButton;