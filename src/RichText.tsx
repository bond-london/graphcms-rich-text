import React, { useMemo } from "react";
import {
  defaultRemoveEmpty,
  defaultRenderers,
  ElementTypeMap,
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
  return (
    <RenderElements
      {...rest}
      renderers={renderers}
      removeEmptyElements={removeEmptyElements}
      contents={content}
      index={0}
      parentIndex={0}
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
