import React from "react";
import { ElementsRendererProps, RenderNode } from ".";

export const RenderElements: React.FC<ElementsRendererProps> = (props) => {
  const {
    contents,
    index: parentIndex,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    parentIndex: _oldParentIndex,
    ...rest
  } = props;
  if (!contents) {
    return null;
  }
  return (
    <>
      {contents.map((node, index) => (
        <RenderNode
          key={index}
          index={index}
          parentIndex={parentIndex}
          node={node}
          {...rest}
        />
      ))}
    </>
  );
};
