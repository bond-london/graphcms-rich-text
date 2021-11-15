import React, { useMemo } from "react";
import {
  defaultRemoveEmpty,
  defaultRenderers,
  ElementTypeMap,
  getElements,
  NodeRenderer,
  RenderElements,
} from ".";
import { RichTextProps } from "./types";

export const RichText: React.FC<RichTextProps> = ({
  renderers,
  removeEmptyElements,
  content,
  ...rest
}) => {
  const realRemoveEmptyElements: ElementTypeMap = useMemo(
    () => ({ ...defaultRemoveEmpty, ...removeEmptyElements }),
    [removeEmptyElements]
  );

  const realRenderers: NodeRenderer = useMemo(
    () => ({ ...defaultRenderers, ...renderers }),
    [renderers]
  );

  const elements = getElements(content);

  return (
    <RenderElements
      {...rest}
      renderers={realRenderers}
      removeEmptyElements={realRemoveEmptyElements}
      contents={elements}
    />
  );
};
