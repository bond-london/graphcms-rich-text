import React from "react";
import { AudioRenderer, VideoRenderer } from ".";
import {
  AssetProps,
  AudioNodeRendererProps,
  ClassRenderer,
  DefaultRenderer,
  ImageNodeRendererProps,
  ImageRenderer,
  LinkRenderer,
  NodeRenderer,
  VideoNodeRendererProps,
} from "..";
import { EmbedRenderer } from "./EmbedRenderer";
import { IFrameRenderer } from "./IFrameRenderer";

export const defaultRenderers: NodeRenderer = {
  p: (props) => <DefaultRenderer {...props} element="p" />,
  bold: (props) => <DefaultRenderer {...props} element="b" />,
  italic: (props) => <DefaultRenderer {...props} element="i" />,
  underline: (props) => <DefaultRenderer {...props} element="u" />,
  code: (props) => <DefaultRenderer {...props} element="code" />,
  h1: (props) => <DefaultRenderer {...props} element="h1" />,
  h2: (props) => <DefaultRenderer {...props} element="h2" />,
  h3: (props) => <DefaultRenderer {...props} element="h3" />,
  h4: (props) => <DefaultRenderer {...props} element="h4" />,
  h5: (props) => <DefaultRenderer {...props} element="h5" />,
  h6: (props) => <DefaultRenderer {...props} element="h6" />,
  class: (props) => <ClassRenderer {...props} />,
  a: (props) => <LinkRenderer {...props} />,
  img: (props) => <ImageRenderer {...props} />,
  iframe: (props) => <IFrameRenderer {...props} />,
  video: (props) => <VideoRenderer {...props} />,
  ul: (props) => <DefaultRenderer {...props} element="ul" />,
  ol: (props) => <DefaultRenderer {...props} element="ol" />,
  li: (props) => <DefaultRenderer {...props} element="li" />,
  list_item_child: ({ children }) => <>{children}</>,
  table: (props) => <DefaultRenderer {...props} element="table" />,
  table_head: (props) => <DefaultRenderer {...props} element="thead" />,
  table_body: (props) => <DefaultRenderer {...props} element="tbody" />,
  table_row: (props) => <DefaultRenderer {...props} element="tr" />,
  table_cell: (props) => <DefaultRenderer {...props} element="td" />,
  blockquote: (props) => <DefaultRenderer {...props} element="blockquote" />,
  code_block: (props) => <DefaultRenderer {...props} element="pre" />,
  embed: (props) => <EmbedRenderer {...props} />,
  embed_asset: {
    audio: (props) => (
      <AudioRenderer {...(props as unknown as AudioNodeRendererProps)} />
    ),
    image: (props) => (
      <ImageRenderer
        {...(props as unknown as ImageNodeRendererProps)}
        src={(props as AssetProps).url}
      />
    ),
    video: (props) => (
      <VideoRenderer
        {...(props as unknown as VideoNodeRendererProps)}
        src={(props as AssetProps).url}
      />
    ),
  },
  embed_node: {},
};
