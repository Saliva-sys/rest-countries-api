import React from "react";

interface FlagsProps {
    src: string;
    alt: string;
}

const Flags:React.FC<FlagsProps> =({src, alt}) => {

return(
<div>    
    <img
        src={src}
        alt={alt}
    />

</div>
);
};

export default Flags;