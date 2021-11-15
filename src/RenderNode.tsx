import { isElement, isText } from "@graphcms/rich-text-types";
import React, { Fragment } from "react";
import {
  elementIsEmpty,
  elementKeys,
  isEmptyText,
  NodeRendererProps,
  RenderElement,
  RenderText,
} from ".";

export const RenderNode: React.FC<NodeRendererProps> = (props) => {
  const { node, ...rest } = props;
  if (isText(node)) {
    if (isEmptyText(node.text)) {
      return <Fragment />;
    }

    return <RenderText {...rest} node={node} />;
  }

  if (isElement(node)) {
    const { disabledElements, removeEmptyElements, renderDisabledElement } =
      rest;
    const elementKey = elementKeys[node.type];
    if (disabledElements?.[elementKey]) {
      if (renderDisabledElement) {
        return renderDisabledElement(node.type, elementKey);
      }
      return <Fragment />;
    }
    if (removeEmptyElements?.[elementKey] && elementIsEmpty(node)) {
      return <Fragment />;
    }

    return <RenderElement {...rest} node={node} />;
  }

  return <div>Cannot render {JSON.stringify(node)}</div>;
};
