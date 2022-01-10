import React from "react";
import { ElementNode } from "@graphcms/rich-text-types";
import { elementKeys, NodeRendererProps, RenderElements } from ".";

export const RenderElement: React.FC<NodeRendererProps<ElementNode>> = (
  props
) => {
  const { node: element, ...rest } = props;
  const { type, ...elementProps } = element;

  const rendererKey = elementKeys[type];

  const renderer = props.renderers[rendererKey];
  const NodeRenderer = renderer as React.ElementType;
  return (
    <NodeRenderer {...rest} {...elementProps} contents={element.children}>
      <RenderElements {...rest} contents={element.children} />
    </NodeRenderer>
  );
};
