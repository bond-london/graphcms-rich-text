import {
  AssetReference,
  ClassProps,
  EmbedElement,
  EmbedReferences,
  IFrameProps,
  ImageProps,
  LinkProps,
  Node,
  Reference,
  RichTextContent,
  VideoProps,
} from "@graphcms/rich-text-types";
import React, { AriaRole, CSSProperties } from "react";

export type RTFContent = RichTextContent;
export type RTFReferences = ReadonlyArray<Reference | AssetReference>;

export interface GenericRichTextNode {
  readonly raw?: unknown;
  readonly html?: string;
  readonly markdown?: string;
  readonly text?: string;
  readonly json?: RTFContent;
  readonly references?: RTFReferences;
}

export type EmbedNodeRenderer = (props: unknown) => JSX.Element;

export interface AssetRenderer {
  [key: string]: EmbedNodeRenderer | undefined;
}

export interface NodeRenderer {
  p: DefaultNodeRenderer;
  bold: DefaultNodeRenderer;
  italic: DefaultNodeRenderer;
  underline: DefaultNodeRenderer;
  code: DefaultNodeRenderer;
  h1: DefaultNodeRenderer;
  h2: DefaultNodeRenderer;
  h3: DefaultNodeRenderer;
  h4: DefaultNodeRenderer;
  h5: DefaultNodeRenderer;
  h6: DefaultNodeRenderer;
  class: DefaultNodeRenderer;
  a: LinkNodeRenderer;
  img: ImageNodeRenderer;
  iframe: IframeNodeRenderer;
  video: DefaultNodeRenderer;
  ul: DefaultNodeRenderer;
  ol: DefaultNodeRenderer;
  li: DefaultNodeRenderer;
  list_item_child: DefaultNodeRenderer;
  table: DefaultNodeRenderer;
  table_head: DefaultNodeRenderer;
  table_body: DefaultNodeRenderer;
  table_row: DefaultNodeRenderer;
  table_cell: DefaultNodeRenderer;
  blockquote: DefaultNodeRenderer;
  code_block: DefaultNodeRenderer;
  asset: AssetRenderer;
  embed: AssetRenderer;
}

export type ClassNameOverrides = {
  [key in keyof JSX.IntrinsicElements]?: string;
};
export type ElementTypeMap = {
  [key in keyof NodeRenderer]?: boolean;
};

export interface BaseRendererProps {
  references?: EmbedReferences;
  context?: unknown;
  classNameOverrides?: ClassNameOverrides;
  disabledElements?: ElementTypeMap;
  removeEmptyElements?: ElementTypeMap;
  renderDisabledElement?: (
    elementName: string,
    htmlElementName: keyof NodeRenderer
  ) => JSX.Element;
}

export interface RichTextProps extends BaseRendererProps {
  content: RTFContent;
  renderers?: Partial<NodeRenderer>;
}

export interface ElementsRendererProps extends BaseRendererProps {
  contents?: Array<Node>;
  renderers: NodeRenderer;
}

export interface NodeRendererProps<N = Node> extends BaseRendererProps {
  node: N;
  renderers: NodeRenderer;
}

export interface EmbedNodeRendererProps
  extends NodeRendererProps<EmbedElement> {
  nodeId: string;
  nodeType: string;
}

export interface DefaultNodeRendererProps {
  renderers: NodeRenderer;
  references?: EmbedReferences;
  context?: unknown;
  disabledElements?: ElementTypeMap;
  classNameOverrides?: ClassNameOverrides;
  additionalClassName?: string;
  className?: string;
  style?: CSSProperties;
  role?: AriaRole;
  children: React.ReactNode;
}
export type DefaultNodeRenderer = (
  props: DefaultNodeRendererProps
) => JSX.Element;

export interface LinkNodeRendererProps
  extends DefaultNodeRendererProps,
    Partial<LinkProps> {}

export type LinkNodeRenderer = (props: LinkNodeRendererProps) => JSX.Element;

export interface IframeNodeRendererProps
  extends DefaultNodeRendererProps,
    Partial<IFrameProps> {
  title?: string;
}
export type IframeNodeRenderer = (
  props: IframeNodeRendererProps
) => JSX.Element;

export interface ClassNodeRendererProps
  extends DefaultNodeRendererProps,
    Partial<ClassProps> {}
export type ClassNodeRenderer = (props: ClassNodeRendererProps) => JSX.Element;

export interface ImageNodeRendererProps
  extends DefaultNodeRendererProps,
    Partial<ImageProps> {}

export type ImageNodeRenderer = (props: ImageNodeRendererProps) => JSX.Element;

export interface AudioProps {
  url: string;
}
export interface AudioNodeRendererProps
  extends DefaultNodeRendererProps,
    Partial<AudioProps> {}
export type AudioNodeRenderer = (props: AudioNodeRendererProps) => JSX.Element;

export interface VideoNodeRendererProps
  extends DefaultNodeRendererProps,
    Partial<VideoProps> {}
export type VideoNodeRenderer = (props: VideoNodeRendererProps) => JSX.Element;

export interface AssetProps {
  url?: string;
}
