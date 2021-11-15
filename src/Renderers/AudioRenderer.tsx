import React, { Fragment } from "react";
import { calculateClassName } from ".";
import { AudioNodeRendererProps } from "..";

export const AudioRenderer: React.FC<AudioNodeRendererProps> = ({
  url,
  classNameOverrides,
  additionalClassName,
  className,
  style,
}) => {
  if (!url) {
    console.warn("[AudioRenderer]: url is required");
    return <Fragment />;
  }

  const realStyle = style || {
    display: "block",
    maxWidth: "100%",
    height: "auto",
  };

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio
      className={calculateClassName(
        "audio",
        classNameOverrides,
        additionalClassName,
        className
      )}
      style={realStyle}
      src={encodeURI(url)}
      controls={true}
    >
      <p>
        {"Your browser doesn't support HTML5 audio. Here is a "}
        <a href={url}>link to the audio</a> instead.
      </p>
    </audio>
  );
};
