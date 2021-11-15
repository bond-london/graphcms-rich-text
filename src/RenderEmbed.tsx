import React, { Fragment } from "react";
import { EmbedNodeRendererProps, RenderElements } from ".";

export const RenderEmbed: React.FC<EmbedNodeRendererProps> = (props) => {
  const { nodeId, nodeType, node: element, ...rest } = props;
  const { references, renderers } = rest;
  const { children, ...elementProps } = element;

  if (nodeType === "Asset") {
    throw new Error(`Render embed can not render assets`);
  }

  const referenceValue = references?.filter((ref) => ref.id === nodeId)[0];
  if (!referenceValue?.id) {
    console.error(`[RenderEmbed]: No id found for embed node: ${nodeId}`);
    return <Fragment />;
  }

  let renderer;

  const elementRenderer = renderers?.embed?.[nodeType];
  if (elementRenderer) {
    renderer = elementRenderer;
  } else {
    console.warn(
      `[@bond-london/graphcms-rich-text]: No renderer found for embed type: ${nodeType}`
    );
    return <Fragment />;
  }

  const NodeRenderer = renderer as React.ElementType;
  return (
    <NodeRenderer {...rest} {...elementProps} {...referenceValue}>
      <RenderElements {...rest} contents={children} />
    </NodeRenderer>
  );
};
