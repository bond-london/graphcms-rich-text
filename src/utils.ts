import {
  ElementNode,
  isElement,
  isText,
  Text,
  Node,
  EmbedElement,
} from "@graphcms/rich-text-types";
import React from "react";
import { CleanedRTF } from ".";
import {
  ElementsRendererProps,
  GenericRichTextNode,
  RTFContent,
  RTFReferences,
} from "./types";

function cleanupTextString(text: string) {
  return text.replace(/\s+/g, " ");
}

export function cleanupElementNode(
  elementNode: ElementNode
): ElementNode | undefined {
  const { children, ...rest } = elementNode;
  const newChildren: (ElementNode | Text)[] = [];
  children.forEach((child) => {
    if (isText(child)) {
      if (!isEmptyText(child.text)) {
        newChildren.push({ ...child, text: cleanupTextString(child.text) });
      }
    } else if (isElement(child)) {
      const newChild = cleanupElementNode(child);
      if (newChild) {
        newChildren.push(newChild);
      }
    }
  });
  if (newChildren.length) {
    return { ...rest, children: newChildren };
  }

  if (isEmbed(elementNode)) {
    return { ...rest, children: [] };
  }
}

export function cleanupRTFContent(content: RTFContent): CleanedRTF {
  const elements = Array.isArray(content) ? content : content.children;
  const newElements: ElementNode[] = [];
  elements.forEach((element) => {
    const cleanedElement = cleanupElementNode(element);
    if (cleanedElement) {
      newElements.push(cleanedElement);
    }
  });

  return newElements;
}

export function isEmptyText(text: string): boolean {
  return text.trim().length === 0;
}

function cleanupElement(element: ElementNode): ElementNode | undefined {
  const { children, ...rest } = element;
  if (isEmbed(element)) {
    return { ...rest, children: [] };
  }
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
    if (isEmptyText(node.text)) {
      return;
    }
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

export function isEmbed(node: Node): node is EmbedElement {
  return isElement(node) && node.type === "embed";
}

export function nodeIsNotEmpty(node: Node): boolean {
  if (isText(node)) {
    return !isEmptyText(node.text);
  }

  if (isElement(node)) {
    if (isEmbed(node)) {
      return !!node.nodeId;
    }
    const nonEmptyChildren = node.children.filter(nodeIsNotEmpty);
    return nonEmptyChildren.length > 0;
  }

  return false;
}

export function nodesAreNotEmpty(nodes: Node[]): boolean {
  const nonEmpty = nodes.filter(nodeIsNotEmpty);
  return nonEmpty.length > 0;
}

export function elementIsEmpty({ children }: ElementNode): boolean {
  // Checks if the children array has more than one element.
  // It may have a link inside, that's why we need to check this condition.
  if (children.length > 1) {
    const nonEmptyChildren = children.filter(nodeIsNotEmpty);
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

export function tryGetRTF(
  node: GenericRichTextNode | string | undefined,
  clean = true
): RTFContent | undefined {
  const content = getRTF(node);
  if (content) {
    const cleanContent = clean ? cleanupRTF(content) : content;
    if (!isEmptyRTFContent(cleanContent)) {
      return cleanContent;
    }
  }
}

export function getCleanedRTF(
  node: GenericRichTextNode | undefined
): CleanedRTF | undefined {
  if (node) {
    return node.cleaned;
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

function getTable(node: CleanedRTF): TableInformation {
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

export function buildTableInformation(contents: CleanedRTF): TableInformation {
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
