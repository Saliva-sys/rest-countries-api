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
                ? 'rounded-0 w-full md:w-140 max-[580px]:h-40 min-[580px]:h-[28.6rem] min-[870px]:h-[25.05rem]'
                : 'rounded-t-[0.6rem] md:rounded-t-[0.3rem] w-full min-[870px]:w-[16.55rem] max-[700px]:h-40 min-[700px]:h-80 min-[870px]:h-40'
            }`}
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default Flags;