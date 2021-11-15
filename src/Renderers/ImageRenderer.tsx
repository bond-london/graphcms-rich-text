import React, { Fragment } from "react";
import { calculateClassName } from ".";
import { ImageNodeRendererProps } from "..";

export const ImageRenderer: React.FC<ImageNodeRendererProps> = ({
  src,
  width,
  height,
  altText,
  title,
  classNameOverrides,
  additionalClassName,
  className,
  style,
}) => {
  if (!src) {
    console.warn("[ImageRenderer]: src is required");
    return <Fragment />;
  }
  return (
    <img
      loading="lazy"
      src={encodeURI(src)}
      width={width}
      height={height}
      alt={altText}
      title={title}
      className={calculateClassName(
        "img",
        classNameOverrides,
        additionalClassName,
        className
      )}
      style={style}
    />
  );
};
