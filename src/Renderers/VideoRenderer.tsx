import React from "react";
import { calculateClassName } from ".";
import { VideoNodeRendererProps } from "..";

export const VideoRenderer: React.FC<VideoNodeRendererProps> = ({
  src,
  width,
  height,
  title,
  classNameOverrides,
  additionalClassName,
  className,
  style,
}) => {
  if (!src) {
    return (
      <span style={{ color: "red" }}>{"[VideoRenderer]: src is required"}</span>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      className={calculateClassName(
        "video",
        classNameOverrides,
        additionalClassName,
        className
      )}
      style={style}
      src={encodeURI(src)}
      width={width || "100%"}
      height={height || "100%"}
      controls={true}
      title={title}
    >
      <p>
        {"Your browser doesn't support HTML5 video. Here is a "}
        <a href={src}>link to the video</a> instead.
      </p>
    </video>
  );
};
