import React from "react";

const Img = ({ className, src = "defaultNoData.png", alt = "testImg", onError, ...restProps }) => {
    return <img className={className} src={src} alt={alt} onError={onError} {...restProps} loading={"lazy"} />;
};
export { Img };
