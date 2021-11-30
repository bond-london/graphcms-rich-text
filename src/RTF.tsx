/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import {
  ClassNameOverrides,
  defaultRemoveEmpty,
  defaultRenderers,
  ElementTypeMap,
  isEmptyRTFContent,
  NodeRenderer,
  RichText,
  RTFContent,
  RTFProps,
} from ".";

const headingClasses: (keyof ClassNameOverrides)[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
];

export const RealRTF: React.FC<
  Omit<RTFProps, "content"> & { content: RTFContent }
> = ({
  projectClassNameOverrides,
  projectRenderers,
  classNameOverrides,
  className,
  fixedParagraphClassName,
  fixedHeadingClassName,
  removeEmptyElements,
  renderers,
  ...rest
}) => {
  const realClassNameOverrides = useMemo(() => {
    const result: ClassNameOverrides = {
      ...projectClassNameOverrides,
      ...classNameOverrides,
    };
    const defaultHeadingClassName =
      fixedHeadingClassName || fixedParagraphClassName;
    if (defaultHeadingClassName) {
      headingClasses.forEach((h) => (result[h] = defaultHeadingClassName));
    }
    if (fixedParagraphClassName) {
      result.p = fixedParagraphClassName;
    }
    return result;
  }, [
    projectClassNameOverrides,
    classNameOverrides,
    fixedParagraphClassName,
    fixedHeadingClassName,
  ]);

  const realRemoveEmptyElements: ElementTypeMap = useMemo(
    () => ({ ...defaultRemoveEmpty, ...removeEmptyElements }),
    [removeEmptyElements]
  );

  const realRenderers: NodeRenderer = useMemo(
    () => ({ ...defaultRenderers, ...projectRenderers, ...renderers }),
    [projectRenderers, renderers]
  );

  return (
    <div className={className}>
      <RichText
        {...rest}
        classNameOverrides={realClassNameOverrides}
        renderers={realRenderers}
        removeEmptyElements={realRemoveEmptyElements}
      />
    </div>
  );
};

export const CoreRTF: React.FC<RTFProps> = ({ content, ...rest }) => {
  if (!content) {
    return null;
  }
  if (isEmptyRTFContent(content)) {
    return null;
  }
  return <RealRTF content={content} {...rest} />;
};
