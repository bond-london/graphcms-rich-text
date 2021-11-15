import React from "react";
import { calculateClassName } from ".";
import { ClassNodeRendererProps } from "..";

export const ClassRenderer: React.FC<ClassNodeRendererProps> = ({
  className,
  additionalClassName,
  classNameOverrides,
  children,
}) => {
  const realClassName = calculateClassName(
    "div",
    classNameOverrides,
    additionalClassName,
    className
  );
  return <div className={realClassName}>{children}</div>;
};
