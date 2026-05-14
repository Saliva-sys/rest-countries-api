interface FlagsProps {
    src: string;
    alt: string;
    isDetail?: boolean;
}

const Flags:React.FC<FlagsProps> = ({src, alt, isDetail}) => {

    return (
        <div>
            <img className={`object-cover
            ${isDetail 
                ? 'rounded-0 w-full md:w-[35rem] h-[28.6rem] md:h-[25.05rem]'
                : 'rounded-t-[0.6rem] md:rounded-t-[0.3rem] w-full md:w-[16.55rem] h-[20rem] md:h-[10rem]'
            }`}
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default Flags;