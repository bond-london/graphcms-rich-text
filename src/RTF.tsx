/* eslint-disable react/display-name */
import React, { useMemo } from "react";
import {
  ClassNameOverrides,
  isEmptyRTFContent,
  RichText,
  RichTextProps,
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

const RealRTF: React.FC<
  RichTextProps & {
    className?: string;
    fixedParagraphClassName?: string;
    fixedHeadingClassName?: string;
  }
> = ({
  classNameOverrides,
  className,
  fixedParagraphClassName,
  fixedHeadingClassName,
  ...rest
}) => {
  const realClassNameOverrides = useMemo(() => {
    const result: ClassNameOverrides = {
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
  }, [classNameOverrides, fixedParagraphClassName, fixedHeadingClassName]);

  return (
    <div className={className}>
      <RichText {...rest} classNameOverrides={realClassNameOverrides} />
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
