import { SlatePlugin } from '@udecode/slate-plugins-core';
import { DeserializeHTMLChildren } from '../types';
import { deserializeHTMLToBreak } from './deserializeHTMLToBreak';
import { deserializeHTMLToElement } from './deserializeHTMLToElement';
import { deserializeHTMLToFragment } from './deserializeHTMLToFragment';
import { deserializeHTMLToMarks } from './deserializeHTMLToMarks';
import { deserializeHTMLToText } from './deserializeHTMLToText';

/**
 * Deserialize HTML element or child node.
 */
export const deserializeHTMLNode = (plugins: SlatePlugin[]) => (
  node: HTMLElement | ChildNode
) => {
  // text node
  const textNode = deserializeHTMLToText(node);
  if (textNode) return textNode;

  // if not an element node
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const htmlElement = node as HTMLElement;

  // break line
  const breakLine = deserializeHTMLToBreak(node);
  if (breakLine) return breakLine;

  const { nodeName } = node;
  let parent = node;

  // blockquote
  if (nodeName === 'PRE' && node.childNodes[0]?.nodeName === 'CODE') {
    [parent] = node.childNodes;
  } else if (nodeName === 'STYLE') {
    return null;
  }

  const children: DeserializeHTMLChildren[] = Array.from(parent.childNodes)
    .map(deserializeHTMLNode(plugins))
    .flat();

  // body
  const fragment = deserializeHTMLToFragment({
    element: htmlElement,
    children,
  });
  if (fragment) return fragment;

  // element
  const element = deserializeHTMLToElement({
    plugins,
    element: htmlElement,
    children,
  });
  if (element) return element;

  // mark
  return deserializeHTMLToMarks({
    plugins,
    element: htmlElement,
    children,
  });
};
