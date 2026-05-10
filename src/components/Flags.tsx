interface FlagsProps {
    src: string;
    alt: string;
}

const Flags:React.FC<FlagsProps> = ({src, alt}) => {

    return (
        <div>
            <img className="rounded-t-[0.6rem] md:rounded-t-[0.3rem] w-full md:w-[16.55rem] h-[20rem] md:h-[10rem] object-cover"
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default Flags;