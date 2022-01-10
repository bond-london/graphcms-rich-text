import { ElementTypeMap } from ".";
import { NodeRenderer } from "./types";

export const elementKeys: { [key: string]: keyof NodeRenderer } = {
  "heading-one": "h1",
  "heading-two": "h2",
  "heading-three": "h3",
  "heading-four": "h4",
  "heading-five": "h5",
  "heading-six": "h6",
  class: "class",
  link: "a",
  image: "img",
  iframe: "iframe",
  video: "video",
  "bulleted-list": "ul",
  "numbered-list": "ol",
  "list-item": "li",
  "list-item-child": "list_item_child",
  table: "table",
  table_head: "table_head",
  table_body: "table_body",
  table_row: "table_row",
  table_cell: "table_cell",
  "block-quote": "blockquote",
  paragraph: "p",
  bold: "bold",
  italic: "italic",
  underline: "underline",
  code: "code",
  "code-block": "code_block",
  embed: "embed",
};

export const defaultRemoveEmpty: ElementTypeMap = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  table_head: true,
  table_row: true,
};
