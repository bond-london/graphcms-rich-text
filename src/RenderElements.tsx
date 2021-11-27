import React from "react";
import { ElementsRendererProps, RenderNode } from ".";

export const RenderElements: React.FC<ElementsRendererProps> = (props) => {
  const { contents, ...rest } = props;
  if (!contents) {
    return null;
  }
  return (
    <>
      {contents.map((node, index) => (
        <RenderNode key={index} node={node} {...rest} />
      ))}
    </>
  );
};
