interface FlagsProps {
    src: string;
    alt: string;
}

const Flags:React.FC<FlagsProps> = ({src, alt}) => {

    return (
        <div >
            <img className="rounded-t-[0.6rem] w-full h-[20rem] object-cover"
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default Flags;