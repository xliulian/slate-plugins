import * as React from 'react';
import { Element } from 'slate';
import { RenderElementProps } from 'slate-react';
import { RenderElement, SlatePlugin } from '../types';

const ElementContext = React.createContext<null|Element>(null)

export const useElement = () => {
  return React.useContext(ElementContext)
}

export const renderElementPlugins = (
  plugins: SlatePlugin[],
  renderElementList: RenderElement[]
) => {
  const Tag = (elementProps: RenderElementProps) => {
    let renderIdx = 0;

    const next = () => {
      let element;

      renderElementList.some((renderElement, idx) => {
        if (idx < renderIdx) {
          return false;
        }
        renderIdx += 1;
        element = renderElement(elementProps, next);
        return !!element;
      });
      if (element) return element;

      plugins.some(({ renderElement }, idx) => {
        if (renderElementList.length + idx < renderIdx) {
          return false;
        }
        renderIdx += 1;
        element = renderElement && renderElement(elementProps, next);
        return !!element;
      });
      if (element) return element;

      return <div {...elementProps.attributes} {...elementProps.element?.attributes}>{elementProps.children}</div>;
    }

    return next();
  };

  return (elementProps: RenderElementProps) => {
    // XXX: A wrapper tag component to make useContext get correct value inside.
    return (
      <ElementContext.Provider value={elementProps.element}>
        <Tag {...elementProps} />
      </ElementContext.Provider>
    );
  };
};
