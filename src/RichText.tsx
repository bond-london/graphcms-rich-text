import React, { useMemo } from "react";
import {
  defaultRemoveEmpty,
  defaultRenderers,
  ElementTypeMap,
  getElements,
  NodeRenderer,
  RenderElements,
} from ".";
import { InternalRichTextProps, RichTextProps } from "./types";

export const InternalRichText: React.FC<InternalRichTextProps> = ({
  content,
  renderers,
  removeEmptyElements,
  ...rest
}) => {
  const elements = getElements(content);
  return (
    <RenderElements
      {...rest}
      renderers={renderers}
      removeEmptyElements={removeEmptyElements}
      contents={elements}
      index={0}
    />
  );
};

export const RichText: React.FC<RichTextProps> = ({
  renderers,
  removeEmptyElements,
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

  return (
    <InternalRichText
      {...rest}
      renderers={realRenderers}
      removeEmptyElements={realRemoveEmptyElements}
    />
  );
};
