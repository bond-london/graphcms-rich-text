import React from "react";
import { LinkNodeRendererProps } from "..";

export const LinkRenderer: React.FC<LinkNodeRendererProps> = (props) => {
  const {
    href,
    rel,
    id,
    title,
    openInNewTab,
    className,
    classNameOverrides,
    style,
    role,
    children,
  } = props;
  const aProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
    rel,
    id,
    title,
    style,
    role,
  };

  const realClassName = className || classNameOverrides?.["a"];

  if (href) aProps.href = encodeURI(href);
  if (realClassName) aProps.className = realClassName;
  if (openInNewTab) {
    aProps.target = "_blank";
    aProps.rel = "noreferrer";
  }

  return <a {...aProps}>{children}</a>;
};
