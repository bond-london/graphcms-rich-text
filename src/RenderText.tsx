import { Text } from "@graphcms/rich-text-types";
import React from "react";
import { NodeRendererProps } from "./types";

export const RenderText: React.FC<NodeRendererProps<Text>> = ({
  node,
  renderers,
  disabledElements,
}) => {
  const { text, bold, italic, underline, code } = node;

  let element: React.ReactNode = text;

  if (bold && !disabledElements?.bold) {
    const Bold = renderers.bold as React.ElementType;
    element = <Bold>{element}</Bold>;
  }

  if (italic && !disabledElements?.italic) {
    const Italic = renderers.italic as React.ElementType;
    element = <Italic>{element}</Italic>;
  }

  if (underline && !disabledElements?.underline) {
    const Underline = renderers.underline as React.ElementType;
    element = <Underline>{element}</Underline>;
  }

  if (code && !disabledElements?.code) {
    const Code = renderers.code as React.ElementType;
    element = <Code>{element}</Code>;
  }

  return <>{element}</>;
};
