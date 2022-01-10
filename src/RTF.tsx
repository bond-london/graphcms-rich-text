/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import {
  ClassNameOverrides,
  cleanupRTFContent,
  defaultRemoveEmpty,
  defaultRenderers,
  ElementTypeMap,
  NodeRenderer,
  RealRTFProps,
  RichText,
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

export const RealRTF: React.FC<RealRTFProps> = ({
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
  const cleanedRTF = useMemo(() => {
    if (content) {
      return cleanupRTFContent(content);
    }
  }, [content]);

  if (!cleanedRTF) {
    return null;
  }
  return <RealRTF content={cleanedRTF} {...rest} />;
};
