import React from "react";
import { EmbedNodeRendererProps, LinkNodeRendererProps, RenderEmbed } from "..";

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

  if (props.nodeType) {
    return (
      <RenderEmbed
        {...(props as unknown as EmbedNodeRendererProps)}
        isInline={true}
      />
    );
  }
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
