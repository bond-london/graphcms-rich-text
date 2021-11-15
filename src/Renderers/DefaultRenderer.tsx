import React from "react";
import { calculateClassName } from ".";
import { DefaultNodeRendererProps } from "..";

export const DefaultRenderer: React.FC<
  DefaultNodeRendererProps & {
    element: keyof JSX.IntrinsicElements;
  }
> = (props) => {
  const {
    element: Element,
    additionalClassName,
    className,
    style,
    role,
    children,
    classNameOverrides,
  } = props;

  const realClassName = calculateClassName(
    Element,
    classNameOverrides,
    additionalClassName,
    className
  );

  return (
    <Element className={realClassName} style={style} role={role}>
      {children}
    </Element>
  );
};
