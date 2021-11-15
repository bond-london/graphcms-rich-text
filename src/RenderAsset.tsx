import React, { Fragment } from "react";
import { AssetReference } from "@graphcms/rich-text-types";
import { elementKeys, EmbedNodeRendererProps, RenderElements } from ".";

export const RenderAsset: React.FC<EmbedNodeRendererProps> = (props) => {
  const { nodeId, nodeType, node: element, ...rest } = props;
  const { references, renderers } = rest;
  const { type, children, ...elementProps } = element;

  if (nodeType !== "Asset") {
    throw new Error(`Render asset can only render assets, not ${nodeType}`);
  }

  const referenceValue = references?.filter((ref) => ref.id === nodeId)[0];
  if (!referenceValue?.id) {
    console.error(`[RenderAsset]: No id found for embed node: ${nodeId}`);
    return <Fragment />;
  }

  if (!referenceValue?.mimeType) {
    console.error(`[RenderAsset]: No mimeType found for embed node: ${nodeId}`);
    return <Fragment />;
  }

  if (!referenceValue?.url) {
    console.error(`[RenderAsset]: No url found for embed node: ${nodeId}`);
    return <Fragment />;
  }

  let renderer;

  const { mimeType } = referenceValue as AssetReference;
  const mimeTypeRenderer = renderers?.asset?.[mimeType];
  if (mimeTypeRenderer) {
    renderer = mimeTypeRenderer;
  } else {
    const group = mimeType.split("/")[0];
    if (group) {
      const mimeGroupRenderer = renderers?.asset?.[group];
      if (mimeGroupRenderer) {
        renderer = mimeGroupRenderer;
      } else {
        console.warn(`[RenderAsset]: Unsupported mime type: ${mimeType}`);

        return <Fragment />;
      }
    }
  }

  const nodeRenderer = renderer || renderers?.[elementKeys[type]];

  const NodeRenderer = nodeRenderer as React.ElementType;
  if (NodeRenderer) {
    return (
      <NodeRenderer {...rest} {...elementProps} {...referenceValue}>
        <RenderElements {...rest} contents={children} />
      </NodeRenderer>
    );
  }

  return <Fragment />;
};
