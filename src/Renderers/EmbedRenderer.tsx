import React from "react";
import { EmbedNodeRendererProps, RenderAsset, RenderEmbed } from "..";

export const EmbedRenderer: React.FC<EmbedNodeRendererProps> = (props) => {
  if (props.nodeType === "Asset") {
    return <RenderAsset {...props} />;
  }
  return <RenderEmbed {...props} />;
};
