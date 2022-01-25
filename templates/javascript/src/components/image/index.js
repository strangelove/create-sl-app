import React from "react";
import { default as NextImage } from "next/image";

const Image = ({
  cn = "",
  src,
  width,
  height,
  objectFit = "cover",
  objectPosition = "center",
  placeholder,
  blurDataURL,
  quality,
  priority,
  loader,
}) => {
  return (
    <div className={`imageWrapper ${cn}`}>
      <NextImage
        src={src}
        width={width}
        height={height}
        objectFit={objectFit}
        objectPosition={objectPosition}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        priority={priority}
        loader={loader}
      />
    </div>
  );
};

export default Image;
