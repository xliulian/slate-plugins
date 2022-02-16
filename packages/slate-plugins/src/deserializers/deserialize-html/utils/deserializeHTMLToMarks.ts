import { SlatePlugin } from '@udecode/slate-plugins-core';
import { Descendant, Element, Text } from 'slate';
import { jsx } from 'slate-hyperscript';
import { mergeDeepToNodes } from '../../../common';
import { DeserializeHTMLChildren } from '../types';

export interface DeserializeMarksProps {
  plugins: SlatePlugin[];
  element: HTMLElement;
  children: DeserializeHTMLChildren[];
}

/**
 * Deserialize HTML to Descendant[] with marks on Text.
 * Build the leaf from the leaf deserializers of each plugin.
 */
export const deserializeHTMLToMarks = ({
  plugins,
  element,
  children,
}: DeserializeMarksProps) => {
  let leaf = {};
  let leafMatched = false;

  plugins.forEach(({ deserialize: pluginDeserializers }) => {
    if (!pluginDeserializers?.leaf) return;

    pluginDeserializers.leaf.forEach((deserializer) => {
      const leafPart = deserializer.deserialize(element);

      if (!leafPart) return;

      leaf = { ...leaf, ...leafPart };
      leafMatched = true;
    });
  });

  const fragment = children.reduce((arr: Descendant[], child) => {
    if (!child) return arr;

    if (Element.isElement(child)) {
      if (Object.keys(leaf).length) {
        mergeDeepToNodes({
          node: child,
          source: leaf,
          query: {
            filter: ([n]) => Text.isText(n),
          },
        });
      }
      arr.push(child);
    } else {
      arr.push(jsx('text', leaf, child));
    }

    return arr;
  }, []);

  // TODO: check inline or fragment style for inline cases.
  if (!leafMatched && element.nodeName === 'DIV' && fragment.length > 0) {
    // no mark matched, just a normal div, we need check whether need add newline at the end.
    const lastFragment = fragment[fragment.length - 1];
    if (Text.isText(lastFragment)) {
      if (lastFragment.text[lastFragment.text.length - 1] !== '\n') {
        //lastFragment.text = lastFragment.text + '\n';
        // FIXME: exclude any span/inline cases.
        lastFragment.endOfBlock = true
      }
    }
  }
  return fragment;
};
