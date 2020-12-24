import { createElement, useCallback } from 'react';
import { useSlate, Editable } from 'slate-react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

const decoratePlugins = (editor, plugins, decorateList) => entry => {
  let ranges = [];

  const addRanges = newRanges => {
    if (newRanges.length) ranges = [...ranges, ...newRanges];
  };

  decorateList.forEach(decorate => {
    addRanges(decorate(entry, editor));
  });
  plugins.forEach(({
    decorate
  }) => {
    decorate && addRanges(decorate(entry, editor));
  });
  return ranges;
};

/**
 * Get inline types from the plugins
 */
const getInlineTypes = plugins => {
  return plugins.reduce((arr, plugin) => {
    const types = plugin.inlineTypes || [];
    return arr.concat(types);
  }, []);
};

/**
 * Get void types from the plugins
 */
const getVoidTypes = plugins => {
  return plugins.reduce((arr, plugin) => {
    const types = plugin.voidTypes || [];
    return arr.concat(types);
  }, []);
};

const onDOMBeforeInputPlugins = (editor, plugins, onDOMBeforeInputList) => event => {
  onDOMBeforeInputList.forEach(onDOMBeforeInput => {
    onDOMBeforeInput(event, editor);
  });
  plugins.forEach(({
    onDOMBeforeInput
  }) => {
    onDOMBeforeInput === null || onDOMBeforeInput === void 0 ? void 0 : onDOMBeforeInput(event, editor);
  });
};

/**
 * Run `onKeyDownList` then `onKeyDown` of each plugin.
 * Stop if one handler returns false.
 */
const onKeyDownPlugins = (editor, plugins, onKeyDownList) => event => {
  const onKeyDowns = [...onKeyDownList];
  plugins.forEach(({
    onKeyDown
  }) => {
    if (onKeyDown) onKeyDowns.push(onKeyDown);
  });
  onKeyDowns.some(onKeyDown => onKeyDown(event, editor) === false);
};

const renderElementPlugins = (plugins, renderElementList) => {
  const Tag = elementProps => {
    let element;
    renderElementList.some(renderElement => {
      element = renderElement(elementProps);
      return !!element;
    });
    if (element) return element;
    plugins.some(({
      renderElement
    }) => {
      element = renderElement && renderElement(elementProps);
      return !!element;
    });
    if (element) return element;
    return /*#__PURE__*/createElement("div", Object.assign({}, elementProps.attributes), elementProps.children);
  };

  return elementProps => {
    // XXX: A wrapper tag component to make useContext get correct value inside.
    return /*#__PURE__*/createElement(Tag, Object.assign({}, elementProps));
  };
};

const renderLeafPlugins = (plugins, renderLeafList) => {
  const Tag = props => {
    const leafProps = Object.assign({}, props); // workaround for children readonly error.

    renderLeafList.forEach(renderLeaf => {
      leafProps.children = renderLeaf(leafProps);
    });
    plugins.forEach(({
      renderLeaf
    }) => {
      if (!renderLeaf) return;
      leafProps.children = renderLeaf(leafProps);
    });
    return /*#__PURE__*/createElement("span", Object.assign({}, leafProps.attributes), leafProps.children);
  };

  return leafProps => {
    // XXX: A wrapper tag component to make useContext get correct value inside.
    return /*#__PURE__*/createElement(Tag, Object.assign({}, leafProps));
  };
};

/**
 * {@link Editable} with plugins support.
 */

const EditablePlugins = _a => {
  var {
    plugins = [],
    decorate: decorateList = [],
    decorateDeps = [],
    renderElement: renderElementList = [],
    renderElementDeps = [],
    renderLeaf: renderLeafList = [],
    renderLeafDeps = [],
    onDOMBeforeInput: onDOMBeforeInputList = [],
    onDOMBeforeInputDeps = [],
    onKeyDown: onKeyDownList = [],
    onKeyDownDeps = []
  } = _a,
      props = __rest(_a, ["plugins", "decorate", "decorateDeps", "renderElement", "renderElementDeps", "renderLeaf", "renderLeafDeps", "onDOMBeforeInput", "onDOMBeforeInputDeps", "onKeyDown", "onKeyDownDeps"]);

  const editor = useSlate();
  return /*#__PURE__*/createElement(Editable, Object.assign({
    style: {
      fontSize: 16,
      lineHeight: 1.5
    },
    decorate: useCallback(decoratePlugins(editor, plugins, decorateList), [editor, ...[...plugins.flatMap(p => {
      var _a;

      return (_a = p.decorateDeps) !== null && _a !== void 0 ? _a : [];
    }), ...decorateDeps]]),
    renderElement: useCallback(renderElementPlugins(plugins, renderElementList), [...plugins.flatMap(p => {
      var _a;

      return (_a = p.renderElementDeps) !== null && _a !== void 0 ? _a : [];
    }), ...renderElementDeps]),
    renderLeaf: useCallback(renderLeafPlugins(plugins, renderLeafList), [...plugins.flatMap(p => {
      var _a;

      return (_a = p.renderLeafDeps) !== null && _a !== void 0 ? _a : [];
    }), ...renderLeafDeps]),
    onDOMBeforeInput: useCallback(onDOMBeforeInputPlugins(editor, plugins, onDOMBeforeInputList), [editor, ...[...plugins.flatMap(p => {
      var _a;

      return (_a = p.onDOMBeforeInputDeps) !== null && _a !== void 0 ? _a : [];
    }), ...onDOMBeforeInputDeps]]),
    onKeyDown: useCallback(onKeyDownPlugins(editor, plugins, onKeyDownList), [editor, ...[...plugins.flatMap(p => {
      var _a;

      return (_a = p.onKeyDownDeps) !== null && _a !== void 0 ? _a : [];
    }), ...onKeyDownDeps]])
  }, props));
};

export { EditablePlugins, decoratePlugins, getInlineTypes, getVoidTypes, onDOMBeforeInputPlugins, onKeyDownPlugins, renderElementPlugins, renderLeafPlugins };
//# sourceMappingURL=index.es.js.map
