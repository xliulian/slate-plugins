/**
 * Deserialize HTML text node to text.
 */
export const deserializeHTMLToText = (node: HTMLElement | ChildNode) => {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.nodeValue === '\n') {
      const parentNode = node.parentElement!
      if (parentNode.nodeName === 'SPAN') {
        const whiteSpace = getComputedStyle(parentNode).whiteSpace || parentNode.style.whiteSpace
        if (whiteSpace.slice(0, 3) === 'pre' || whiteSpace === 'break-spaces') {
          return node.textContent
        }
      }
      return null
    }
    return node.textContent;
  }
};
