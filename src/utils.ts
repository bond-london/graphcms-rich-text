import {
  ElementNode,
  isElement,
  isText,
  Text,
  Node,
} from "@graphcms/rich-text-types";
import React from "react";
import {
  ElementsRendererProps,
  GenericRichTextNode,
  RTFContent,
  RTFReferences,
} from "./types";

function cleanupTextString(text: string) {
  return text.replace(/\s+/g, " ");
}

export function isEmptyText(text: string): boolean {
  return text.trim().length === 0;
}

function cleanupElement(element: ElementNode): ElementNode | undefined {
  const { children, ...rest } = element;
  if (elementIsEmpty(element)) {
    return;
  }
  const newChildren = cleanupElements(children);
  return { ...rest, children: newChildren };
}

function cleanupText(text: Text): Text {
  return { ...text, text: cleanupTextString(text.text) };
}

function cleanupNode(node: Node): Node | undefined {
  if (isText(node)) {
    return cleanupText(node);
  }
  if (isElement(node)) {
    return cleanupElement(node);
  }

  return node;
}

export function getElements(content: RTFContent): ElementNode[] {
  return Array.isArray(content) ? content : content.children;
}

function cleanupElements(elements: Node[]): Node[] {
  return elements.map(cleanupNode).filter((n) => n) as Node[];
}

export function cleanupRTF(content: RTFContent): RTFContent {
  const elements = Array.isArray(content) ? content : content.children;
  const newElements = cleanupElements(elements);
  return newElements as ElementNode[];
}

function isNotEmpty(child: ElementNode | Text): boolean {
  if (isText(child)) {
    return !isEmptyText(child.text);
  }

  if (isElement(child)) {
    const nonEmptyChildren = child.children.filter(isNotEmpty);
    return nonEmptyChildren.length > 0;
  }

  return false;
}

export function elementIsEmpty({ children }: ElementNode): boolean {
  // Checks if the children array has more than one element.
  // It may have a link inside, that's why we need to check this condition.
  if (children.length > 1) {
    const nonEmptyChildren = children.filter(isNotEmpty);
    return nonEmptyChildren.length === 0;
  }

  const child = children[0];
  if (isText(child)) {
    const text = child.text;
    if (isEmptyText(text)) return true;
  }

  return false;
}

export function elementIsNotEmpty(element: ElementNode): boolean {
  return !elementIsEmpty(element);
}

export function elementsAreEmpty(elements: ElementNode[]): boolean {
  const nonEmptyElements = elements.filter(elementIsNotEmpty);
  return nonEmptyElements.length === 0;
}

export function elementsAreNotEmpty(elements: ElementNode[]): boolean {
  return !elementsAreEmpty(elements);
}

export function isEmptyRTFContent(content: RTFContent): boolean {
  const realContent = Array.isArray(content) ? content : content.children;
  return elementsAreEmpty(realContent);
}

export function isEmptyRTF(node: GenericRichTextNode | undefined): boolean {
  if (!node) {
    return true;
  }

  const content = node.json || (node.raw as RTFContent);
  if (!content) {
    return true;
  }

  return isEmptyRTFContent(content);
}

export function getRTF(
  node: GenericRichTextNode | string | undefined
): RTFContent | undefined {
  if (node) {
    if (typeof node === "string") {
      return [{ type: "paragraph", children: [{ text: node }] }];
    }

    if (node.json) {
      return node.json;
    }
    if (node.raw) {
      return node.raw as RTFContent;
    }

    throw new Error(`No json or raw in: ${JSON.stringify(node)}`);
  }
}

export function getRTFReferences(
  node: GenericRichTextNode | undefined
): RTFReferences | undefined {
  return node?.references;
}

export type TableCell = Node[];
export type TableRow = TableCell[];

export interface TableInformation {
  header: TableRow;
  body: TableRow[];
}

function getTableRow(node: ElementNode): TableRow | undefined {
  switch (node.type) {
    case "table_row":
      return node.children
        .filter(isElement)
        .filter((n) => n.type === "table_cell")
        .map((n) => n.children);
    default:
      throw new Error(`Cannot find table row: ${node.type}`);
  }
}

function getTable(node: ElementNode[]): TableInformation {
  const rows = node
    .filter((n) => {
      switch (n.type) {
        case "table_head":
        case "table_body":
          return true;
        default:
          return false;
      }
    })
    .flatMap((e) => e.children.filter(isElement).map(getTableRow))
    .filter((e) => e);

  const [header, ...body] = rows as TableRow[];
  return { header, body };
}

export function buildTableInformation(
  contents: ElementNode[]
): TableInformation {
  return getTable(contents);
}

export function buildTableInformationFromChildren(
  children: React.ReactNode
): TableInformation {
  const element = children as React.ReactElement<ElementsRendererProps>;
  const { props } = element;
  const { contents } = props;
  const table = buildTableInformation(contents as ElementNode[]);
  return table;
}
