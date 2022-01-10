import React from "react";
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
    return (
      <span style={{ color: "red" }}>{"[ImageRenderer]: src is required"}</span>
    );
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
