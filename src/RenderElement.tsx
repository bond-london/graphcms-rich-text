import React from "react";
import { ElementNode, EmbedElement } from "@graphcms/rich-text-types";
import {
  elementKeys,
  EmbedNodeRendererProps,
  NodeRendererProps,
  RenderAsset,
  RenderElements,
  RenderEmbed,
} from ".";

export const RenderElement: React.FC<NodeRendererProps<ElementNode>> = (
  props
) => {
  const { node: element, ...rest } = props;
  const { type, ...elementProps } = element;

  const rendererKey = elementKeys[type];

  if (type === "embed") {
    const embedElement = element as EmbedElement;
    const embedProps = elementProps as unknown as EmbedNodeRendererProps;
    if (embedProps.nodeType === "Asset") {
      return (
        <RenderAsset
          {...rest}
          {...embedProps}
          {...elementProps}
          node={embedElement}
        />
      );
    }
    return (
      <RenderEmbed
        {...rest}
        {...embedProps}
        {...elementProps}
        node={embedElement}
      />
    );
  }

  const renderer = props.renderers[rendererKey];
  const NodeRenderer = renderer as React.ElementType;
  return (
    <NodeRenderer {...rest} {...elementProps} contents={element.children}>
      <RenderElements {...rest} contents={element.children} />
    </NodeRenderer>
  );
};
