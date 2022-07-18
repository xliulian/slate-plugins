import { getInlineTypes } from '@udecode/slate-plugins-core';
export * from '@udecode/slate-plugins-core';
import { Editor, Span, Range, Path, Node as Node$1, Element, Point, Text, Transforms, createEditor } from 'slate';
import isHotkey from 'is-hotkey';
import React, { createElement, forwardRef, useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { classNamesFunction, styled, memoizeFunction } from '@uifabric/utilities';
import { useSlate, ReactEditor, useEditor, useReadOnly, Slate, withReact, useFocused, useSelected } from 'slate-react';
import { concatStyleSets, mergeStyles } from '@uifabric/styling';
import Tippy from '@tippyjs/react';
import Prism$1, { languages, tokenize } from 'prismjs';
import useMergedRef from '@react-hook/merged-ref';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import { renderToStaticMarkup } from 'react-dom/server';
import { jsx } from 'slate-hyperscript';
import markdown from 'remark-parse';
import slate from 'remark-slate';
import unified from 'unified';
import imageExtensions from 'image-extensions';

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * Casts `value` as an array if it's not one.
 *
 * @static
 * @memberOf _
 * @since 4.4.0
 * @category Lang
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast array.
 * @example
 *
 * _.castArray(1);
 * // => [1]
 *
 * _.castArray({ 'a': 1 });
 * // => [{ 'a': 1 }]
 *
 * _.castArray('abc');
 * // => ['abc']
 *
 * _.castArray(null);
 * // => [null]
 *
 * _.castArray(undefined);
 * // => [undefined]
 *
 * _.castArray();
 * // => []
 *
 * var array = [1, 2, 3];
 * console.log(_.castArray(array) === array);
 * // => true
 */
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray_1(value) ? value : [value];
}

var castArray_1 = castArray;

const withInlineVoid = ({
  plugins = [],
  inlineTypes = [],
  voidTypes = []
}) => editor => {
  const {
    isInline
  } = editor;
  const {
    isVoid
  } = editor;
  let allInlineTypes = [...inlineTypes];
  let allVoidTypes = [...voidTypes];
  plugins.forEach(plugin => {
    if (plugin.inlineTypes) {
      allInlineTypes = allInlineTypes.concat(castArray_1(plugin.inlineTypes));
    }

    if (plugin.voidTypes) {
      allVoidTypes = allVoidTypes.concat(castArray_1(plugin.voidTypes));
    }
  });

  editor.isInline = element => {
    return allInlineTypes.includes(element.type) ? true : isInline(element);
  };

  editor.isVoid = element => allVoidTypes.includes(element.type) ? true : isVoid(element);

  return editor;
};

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol = _root.Symbol;

var _Symbol = Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

var _arrayEach = arrayEach;

var defineProperty = (function() {
  try {
    var func = _getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var _defineProperty = defineProperty;

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty) {
    _defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$4.call(object, key) && eq_1(objValue, value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }
  return object;
}

var _copyObject = copyObject;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}

var _baseAssign = baseAssign;

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

var _nativeKeysIn = nativeKeysIn;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }
  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

var _baseKeysIn = baseKeysIn;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn$1(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn$1;

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}

var _baseAssignIn = baseAssignIn;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports = exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}

var _copySymbols = copySymbols;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/** Built-in value references. */
var getPrototype = _overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
  var result = [];
  while (object) {
    _arrayPush(result, _getSymbols(object));
    object = _getPrototype(object);
  }
  return result;
};

var _getSymbolsIn = getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}

var _copySymbolsIn = copySymbolsIn;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise = _getNative(_root, 'Promise');

var _Promise = Promise;

/* Built-in method references that are verified to be native. */
var Set$1 = _getNative(_root, 'Set');

var _Set = Set$1;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$1 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (_Map && getTag(new _Map) != mapTag$1) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$1) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$1;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$1;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty$9.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

var _initCloneArray = initCloneArray;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$2 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return _cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$2:
      return _cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return _cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return _cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag:
      return _cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject_1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !_isPrototype(object))
    ? _baseCreate(_getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject;

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike_1(value) && _getTag(value) == mapTag$3;
}

var _baseIsMap = baseIsMap;

/* Node.js helper references. */
var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

var isMap_1 = isMap;

/** `Object#toString` result references. */
var setTag$3 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike_1(value) && _getTag(value) == setTag$3;
}

var _baseIsSet = baseIsSet;

/* Node.js helper references. */
var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

var isSet_1 = isSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$1 = '[object Symbol]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] =
cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] =
cloneableTags[numberTag$2] = cloneableTags[objectTag$2] =
cloneableTags[regexpTag$2] = cloneableTags[setTag$4] =
cloneableTags[stringTag$2] = cloneableTags[symbolTag$1] =
cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag$2] =
cloneableTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject_1(value)) {
    return value;
  }
  var isArr = isArray_1(value);
  if (isArr) {
    result = _initCloneArray(value);
    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer_1(value)) {
      return _cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$2 || tag == argsTag$2 || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : _initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? _copySymbolsIn(value, _baseAssignIn(result, value))
          : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = _initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new _Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet_1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap_1(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? _getAllKeysIn : _getAllKeys)
    : (isFlat ? keysIn : keys_1);

  var props = isArr ? undefined : keysFunc(value);
  _arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

var _baseClone = baseClone;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_SYMBOLS_FLAG$1 = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}

var cloneDeep_1 = cloneDeep;

/**
 * Match the object with a predicate object or function.
 * If predicate is:
 * - object: every predicate key/value should be in obj.
 * - function: it should return true.
 */

const match = (obj, predicate) => {
  if (!predicate) return true;

  if (typeof predicate === 'object') {
    return Object.entries(predicate).every(([key, value]) => {
      const values = castArray_1(value);

      return values.includes(obj[key]);
    });
  }

  return predicate(obj);
};
const matchPredicate = predicate => obj => match(obj, predicate);
/**
 * Extended query options for slate queries:
 * - `match` can be an object predicate where one of the values should include the node value.
 * Example: { type: ['1', '2'] } will match the nodes having one of these 2 types.
 */

const getQueryOptions = (editor, options) => {
  return Object.assign(Object.assign({}, options), {
    match: n => match(n, options.match) && (!(options === null || options === void 0 ? void 0 : options.block) || Editor.isBlock(editor, n))
  });
};

/**
 * Iterate through all of the nodes in the editor and return the first match. If
 * no match is found, return undefined.
 */
/**
 * Get the first descendant node matching the condition.
 */

const findDescendant = (editor, options) => {
  // Slate throws when things aren't found so we wrap in a try catch and return undefined on throw.
  try {
    const {
      match: _match,
      at = editor.selection,
      reverse = false,
      voids = false
    } = options;
    if (!at) return;
    let from;
    let to;

    if (Span.isSpan(at)) {
      [from, to] = at;
    } else if (Range.isRange(at)) {
      const first = Editor.path(editor, at, {
        edge: 'start'
      });
      const last = Editor.path(editor, at, {
        edge: 'end'
      });
      from = reverse ? last : first;
      to = reverse ? first : last;
    }

    let root = [editor, []];

    if (Path.isPath(at)) {
      root = Editor.node(editor, at);
    }

    const nodeEntries = Node$1.descendants(root[0], {
      reverse,
      from,
      to,
      pass: ([n]) => voids ? false : Editor.isVoid(editor, n)
    });

    for (const [node, path] of nodeEntries) {
      if (match(node, _match)) {
        return [node, at.concat(path)];
      }
    }
  } catch (error) {
    return undefined;
  }
};

/**
 * Find node matching the condition.
 */

const findNode = (editor, options) => {
  // Slate throws when things aren't found so we wrap in a try catch and return undefined on throw.
  try {
    const {
      match: _match = () => true,
      at = editor.selection || [],
      reverse = false,
      voids = false
    } = options;
    let from;
    let to;

    if (Span.isSpan(at)) {
      [from, to] = at;
    } else if (Range.isRange(at)) {
      const first = Editor.path(editor, at, {
        edge: 'start'
      });
      const last = Editor.path(editor, at, {
        edge: 'end'
      });
      from = reverse ? last : first;
      to = reverse ? first : last;
    }

    let root = [editor, []];

    if (Path.isPath(at)) {
      root = Editor.node(editor, at);
    }

    const nodeEntries = Node$1.nodes(root[0], {
      reverse,
      from,
      to,
      pass: ([n]) => voids ? false : Editor.isVoid(editor, n)
    });

    for (const [node, path] of nodeEntries) {
      if (match(node, _match)) {
        return [node, path];
      }
    }
  } catch (error) {
    return undefined;
  }
};

/**
 * Get node above a location (default: selection).
 */

const getAbove = (editor, options = {}) => {
  return Editor.above(editor, getQueryOptions(editor, options));
};

/**
 * Get the block above a location (default: selection).
 */

const getBlockAbove = (editor, options = {}) => getAbove(editor, Object.assign(Object.assign({}, options), {
  block: true
}));

/**
 * Get the last child of a node or null if no children.
 */

const getLastChild = nodeEntry => {
  const [node, path] = nodeEntry;
  if (!node.children.length) return null;
  return [node.children[node.children.length - 1], path.concat([node.children.length - 1])];
};
/**
 * Get last child path. If there is no child, last index is 0.
 */

const getLastChildPath = nodeEntry => {
  const lastChild = getLastChild(nodeEntry);
  if (!lastChild) return nodeEntry[1].concat([-1]);
  return lastChild[1];
};
/**
 * Is the child path the last one of the parent.
 */

const isLastChild = (parentEntry, childPath) => {
  const lastChildPath = getLastChildPath(parentEntry);
  return Path.equals(lastChildPath, childPath);
};

const isAncestor = node => Element.isElement(node) || Editor.isEditor(node);

const getLastChild$1 = (node, level) => {
  if (!(level + 1) || !isAncestor(node)) return node;
  const {
    children
  } = node;
  const lastNode = children[children.length - 1];
  return getLastChild$1(lastNode, level - 1);
};
/**
 * Get the last node at a given level.
 */


const getLastNode = (editor, level) => {
  const {
    children
  } = editor;
  const lastNode = children[children.length - 1];
  const [, lastPath] = Editor.last(editor, []);
  return [getLastChild$1(lastNode, level - 1), lastPath.slice(0, level + 1)];
};

/**
 * Get the next sibling nodes after a path.
 * @param ancestorEntry Ancestor of the sibling nodes
 * @param path Path of the reference node
 */
const getNextSiblingNodes = (ancestorEntry, path) => {
  const [ancestor, ancestorPath] = ancestorEntry;
  const leafIndex = path[ancestorPath.length];
  const siblings = [];

  if (leafIndex + 1 < ancestor.children.length) {
    for (let i = leafIndex + 1; i < ancestor.children.length; i++) {
      siblings.push(ancestor.children[i]);
    }
  }

  return siblings;
};

/**
 * Get the descendant node referred to by a specific path.
 * If the path is an empty array, it refers to the root node itself.
 * If the node is not found, return null.
 */

const getNode = (editor, path) => {
  try {
    return Node$1.get(editor, path);
  } catch (err) {
    return null;
  }
};

/**
 * Get children node entries of a node entry.
 * TODO: try Node.children
 */
const getChildren = nodeEntry => {
  const [node, path] = nodeEntry;
  const children = node.children || [];
  return children.map((child, index) => {
    const childPath = path.concat([index]);
    return [child, childPath];
  });
};

/**
 * Return {@link Editor.unhangRange} if `unhang` is true and if `at` (default: selection) is a range.
 */

const unhangRange = (editor, options = {}) => {
  const {
    at = editor.selection,
    voids,
    unhang = true
  } = options;

  if (Range.isRange(at) && unhang) {
    options.at = Editor.unhangRange(editor, at, {
      voids
    });
  }
};

const getNodes = (editor, options = {}) => {
  unhangRange(editor, options);
  return Editor.nodes(editor, getQueryOptions(editor, options));
};

/**
 * See {@link Editor.parent}.
 * Returns undefined if there is no parent.
 */

const getParent = (editor, at, options) => {
  try {
    return Editor.parent(editor, at, options);
  } catch (err) {}
};

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/** `Object#toString` result references. */
var boolTag$3 = '[object Boolean]',
    dateTag$3 = '[object Date]',
    errorTag$2 = '[object Error]',
    mapTag$5 = '[object Map]',
    numberTag$3 = '[object Number]',
    regexpTag$3 = '[object RegExp]',
    setTag$5 = '[object Set]',
    stringTag$3 = '[object String]',
    symbolTag$2 = '[object Symbol]';

var arrayBufferTag$3 = '[object ArrayBuffer]',
    dataViewTag$4 = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$4:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$3:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag$3:
    case dateTag$3:
    case numberTag$3:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag$2:
      return object.name == other.name && object.message == other.message;

    case regexpTag$3:
    case stringTag$3:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag$5:
      var convert = _mapToArray;

    case setTag$5:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$1;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag$2:
      if (symbolValueOf$1) {
        return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** Used for built-in method references. */
var objectProto$d = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$a = objectProto$d.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$a.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** `Object#toString` result references. */
var argsTag$3 = '[object Arguments]',
    arrayTag$2 = '[object Array]',
    objectTag$3 = '[object Object]';

/** Used for built-in method references. */
var objectProto$e = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$b = objectProto$e.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$2 : _getTag(object),
      othTag = othIsArr ? arrayTag$2 : _getTag(other);

  objTag = objTag == argsTag$3 ? objectTag$3 : objTag;
  othTag = othTag == argsTag$3 ? objectTag$3 : othTag;

  var objIsObj = objTag == objectTag$3,
      othIsObj = othTag == objectTag$3,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$b.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$b.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** `Object#toString` result references. */
var symbolTag$3 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$3);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto$2 ? symbolProto$2.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) &&
    (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get_1(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn_1(object, path)
      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == 'object') {
    return isArray_1(value)
      ? _baseMatchesProperty(value[0], value[1])
      : _baseMatches(value);
  }
  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

var _createBaseFor = createBaseFor;

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = _createBaseFor();

var _baseFor = baseFor;

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

var _createBaseEach = createBaseEach;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = _createBaseEach(_baseForOwn);

var _baseEach = baseEach;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike_1(collection) ? Array(collection.length) : [];

  _baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

var _baseMap = baseMap;

/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray_1(collection) ? _arrayMap : _baseMap;
  return func(collection, _baseIteratee(iteratee));
}

var map_1 = map;

/* eslint-disable no-constant-condition */
/**
 * {@link Editor.before} with additional options.
 * TODO: support for sequence of any characters.
 */

const getPointBefore = (editor, at, options) => {
  var _a, _b, _c;

  if (!options || !options.match && !options.matchString) {
    return Editor.before(editor, at, options);
  }

  let beforeAt = at;
  let previousBeforePoint = Editor.point(editor, at, {
    edge: 'end'
  });
  const stackLength = (((_a = options.matchString) === null || _a === void 0 ? void 0 : _a.length) || 0) + 1;
  const stack = Array(stackLength);
  const unitOffset = !options.unit || options.unit === 'offset';
  let count = 0;

  while (true) {
    const beforePoint = Editor.before(editor, beforeAt, options); // not found

    if (!beforePoint) return; // different path

    if (!options.multiPaths && !Path.equals(beforePoint.path, previousBeforePoint.path)) {
      return;
    }

    const beforeString = Editor.string(editor, {
      anchor: beforePoint,
      focus: previousBeforePoint
    });
    const matchString = castArray_1(options.matchString);
    let beforeStringToMatch = beforeString;

    if (unitOffset && stackLength) {
      stack.unshift({
        point: beforePoint,
        text: beforeString
      });
      stack.pop();
      beforeStringToMatch = map_1(stack.slice(0, -1), 'text').join('');
    }

    if (matchString.includes(beforeStringToMatch) || ((_b = options.match) === null || _b === void 0 ? void 0 : _b.call(options, {
      beforeString: beforeStringToMatch,
      beforePoint,
      at
    }))) {
      if (options.afterMatch) {
        if (stackLength && unitOffset) {
          return (_c = stack[stack.length - 1]) === null || _c === void 0 ? void 0 : _c.point;
        }

        return previousBeforePoint;
      }

      return beforePoint;
    }

    previousBeforePoint = beforePoint;
    beforeAt = beforePoint;
    count += 1;

    if (!options.skipInvalid) {
      if (!matchString || count > matchString.length) return;
    }
  }
};

/**
 * Get the point from a location (default: selection).
 * If the location is a range, get the anchor point.
 * If the location is a path, get the point at this path with offset 0.
 * If `focus` is true, get the focus point.
 */

const getPointFromLocation = (editor, {
  at = editor.selection,
  focus
} = {}) => {
  let point;
  if (Range.isRange(at)) point = !focus ? at.anchor : at.focus;
  if (Point.isPoint(at)) point = at;
  if (Path.isPath(at)) point = {
    path: at,
    offset: 0
  };
  return point;
};

/**
 * If the start point is inside an inline void, get the point before or after it.
 */

const getPointNextToVoid = (editor, {
  at,
  after
}) => {
  const startVoid = Editor.void(editor, {
    at,
    mode: 'highest'
  });

  if (startVoid) {
    const blockAbove = getBlockAbove(editor, {
      at
    });

    if (blockAbove) {
      let nextPoint;

      if (after) {
        nextPoint = Editor.after(editor, at);
      } else {
        nextPoint = Editor.before(editor, at);
      }

      if (nextPoint && blockAbove && Path.isAncestor(blockAbove[1], nextPoint.path)) {
        at = nextPoint;
      }
    }
  }

  return at;
};

/**
 * Query the node entry.
 */

const queryNode = (entry, {
  filter = () => true,
  allow = [],
  exclude = []
} = {}) => {
  const allows = castArray_1(allow);
  const excludes = castArray_1(exclude);

  let filterAllow = () => true;

  if (allows.length) {
    filterAllow = ([n]) => allows.includes(n.type);
  }

  let filterExclude = () => true;

  if (excludes.length) {
    filterExclude = ([n]) => !excludes.includes(n.type);
  }

  return !!entry && filter(entry) && filterAllow(entry) && filterExclude(entry);
};

/**
 * Find the block before a block by id.
 * If not found, find the first block by id and return [null, its previous path]
 */

const getPreviousBlockById = (editor, id, query) => {
  const entry = findNode(editor, {
    match: {
      id
    }
  });

  if (entry) {
    const prevEntry = Editor.previous(editor, {
      at: entry[1]
    });

    if (prevEntry && prevEntry[0].id && Editor.isBlock(editor, prevEntry[0])) {
      return prevEntry;
    }
  }

  let found = false;
  const nodeEntries = [...Editor.nodes(editor, {
    mode: 'highest',
    reverse: true,
    match: n => {
      // filter nodes that are not blocks and without id.
      if (!Editor.isBlock(editor, n) || !n.id) return false; // find the block then take the previous one.

      if (n.id === id) {
        found = true;
        return false;
      }

      return found && n.id !== id && queryNode([n, []], query);
    },
    at: []
  })];

  if (nodeEntries.length) {
    return nodeEntries[0];
  }

  if (!found) return;
  const firstNodeEntry = [...Editor.nodes(editor, {
    mode: 'highest',
    match: n => {
      return Editor.isBlock(editor, n) && !!n.id && queryNode([n, []], query);
    },
    at: []
  })];

  if (firstNodeEntry.length) {
    const [, path] = firstNodeEntry[0];
    path[path.length - 1] = path[path.length - 1] - 1;
    return [null, path];
  }
};

const getPreviousPath = path => {
  if (path.length === 0) return;
  const last = path[path.length - 1];
  if (last <= 0) return;
  return path.slice(0, -1).concat(last - 1);
};

/**
 * Get range from {@link getPointBefore} to the end point of `at`.
 */

const getRangeBefore = (editor, at, options) => {
  const anchor = getPointBefore(editor, at, options);
  if (!anchor) return;
  const focus = Editor.point(editor, at, {
    edge: 'end'
  });
  return {
    anchor,
    focus
  };
};

/**
 * Get the range from the start of the block above a location (default: selection) to the location.
 */

const getRangeFromBlockStart = (editor, options = {}) => {
  var _a;

  const path = (_a = getBlockAbove(editor, options)) === null || _a === void 0 ? void 0 : _a[1];
  if (!path) return;
  const start = Editor.start(editor, path);
  const focus = getPointFromLocation(editor, options);
  if (!focus) return;
  return {
    anchor: start,
    focus
  };
};

/**
 * See {@link Editor.string}.
 * If `at` is not defined, return an empty string.
 */

const getText = (editor, at) => {
  var _a;

  return (_a = at && Editor.string(editor, at)) !== null && _a !== void 0 ? _a : '';
};

/**
 * Get the selected text.
 * Return empty string if no selection.
 */

const getSelectionText = editor => getText(editor, editor.selection);

/**
 * Is an ancestor empty (empty text and no inline children).
 */

const isAncestorEmpty = (editor, node) => !Node$1.string(node) && !node.children.some(n => Editor.isInline(editor, n));

/**
 * Is the block above the selection empty.
 */

const isBlockAboveEmpty = editor => {
  var _a;

  const block = (_a = getBlockAbove(editor)) === null || _a === void 0 ? void 0 : _a[0];
  if (!block) return false;
  return isAncestorEmpty(editor, block);
};

/**
 * Is there empty text after the selection.
 * If there is no leaf after the selected leaf, return {@link Editor.isEnd}.
 * Else, check if the next leaves are empty.
 */

const isBlockTextEmptyAfterSelection = editor => {
  if (!editor.selection) return false;
  const blockAbove = getBlockAbove(editor);
  if (!blockAbove) return false;
  const cursor = editor.selection.focus;
  const selectionParentEntry = getParent(editor, editor.selection);
  if (!selectionParentEntry) return false;
  const [, selectionParentPath] = selectionParentEntry;
  if (!Editor.isEnd(editor, cursor, selectionParentPath)) return false;
  const siblingNodes = getNextSiblingNodes(blockAbove, cursor.path);

  if (siblingNodes.length) {
    for (const siblingNode of siblingNodes) {
      if (siblingNode.text) {
        return false;
      }
    }
  } else {
    return Editor.isEnd(editor, cursor, blockAbove[1]);
  }

  return true;
};

/**
 * See {@link Range.isCollapsed}.
 * Return false if `range` is not defined.
 */

const isCollapsed = range => !!range && Range.isCollapsed(range);

const isDescendant = node => Element.isElement(node) || Text.isText(node);

/**
 * {@link Editor.isEnd}. If point is null, return false.
 */

const isEnd = (editor, point, at) => !!point && Editor.isEnd(editor, point, at);

/**
 * See {@link Range.isExpanded}.
 * Return false if `range` is not defined.
 */

const isExpanded = range => !!range && Range.isExpanded(range);

/**
 * Is it the first child of the parent
 */
const isFirstChild = path => path[path.length - 1] === 0;

const isMarkActive = (editor, type) => {
  const marks = Editor.marks(editor);
  return marks ? marks[type] === true : false;
};

const AFTER_MATCH_REGEX = /^(\s|$)/;
/**
 * Is a point at the end of a word
 */

const isPointAtWordEnd = (editor, {
  at
}) => {
  // Point after at
  const after = Editor.after(editor, at); // From at to after

  const afterRange = Editor.range(editor, at, after);
  const afterText = getText(editor, afterRange); // Match regex on after text

  return !!afterText.match(AFTER_MATCH_REGEX);
};

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

/**
 * Is the range (default: selection) across blocks.
 */

const isRangeAcrossBlocks = (editor, _a = {}) => {
  var {
    at
  } = _a,
      options = __rest(_a, ["at"]);

  if (!at) at = editor.selection;
  if (!at) return false;
  const [start, end] = Range.edges(at);
  const startBlock = getBlockAbove(editor, Object.assign({
    at: start
  }, options));
  const endBlock = Editor.above(editor, Object.assign({
    at: end
  }, options));
  return startBlock && endBlock && !Path.equals(startBlock[1], endBlock[1]);
};

/**
 * Is the range in the same single text path.
 */

const isRangeInSingleText = at => {
  const [start, end] = Range.edges(at);
  return Path.equals(start.path, end.path);
};

/**
 * Is the selection focus at the end of its parent block.
 */

const isSelectionAtBlockEnd = editor => {
  var _a, _b;

  const path = (_a = getBlockAbove(editor)) === null || _a === void 0 ? void 0 : _a[1];
  return path && isEnd(editor, (_b = editor.selection) === null || _b === void 0 ? void 0 : _b.focus, path);
};

/**
 * {@link Editor.isStart}. If point is null, return false.
 */

const isStart = (editor, point, at) => !!point && Editor.isStart(editor, point, at);

/**
 * Is the selection focus at the start of its parent block.
 */

const isSelectionAtBlockStart = editor => {
  var _a, _b;

  const path = (_a = getBlockAbove(editor)) === null || _a === void 0 ? void 0 : _a[1];
  return !!path && isStart(editor, (_b = editor.selection) === null || _b === void 0 ? void 0 : _b.focus, path);
};

/**
 * Is the selection expanded.
 */

const isSelectionExpanded = editor => isExpanded(editor.selection);

const isTextByPath = (editor, path) => {
  const node = Node$1.get(editor, path);
  return Text.isText(node);
};

const createDocumentNode = (type = 'p', text = '', remaining = []) => [{
  children: [{
    type,
    children: [{
      text
    }]
  }, ...remaining]
}];

const createNode = (type = 'p', text = '') => ({
  type,
  children: [{
    text
  }]
});

const escapeRegExp = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&');
};

/**
 * Get a deserializer by type, node names, class names and styles.
 */

const getNodeDeserializer = ({
  type,
  node,
  attributes,
  styles,
  rules,
  withoutChildren
}) => {
  const deserializers = [];
  rules.forEach(({
    nodeNames = '*',
    style,
    className,
    attribute
  }) => {
    nodeNames = castArray_1(nodeNames);
    nodeNames.forEach(nodeName => {
      deserializers.push({
        type,
        withoutChildren,
        deserialize: el => {
          if (nodeNames.length && !nodeNames.includes(el.nodeName) && nodeName !== '*') return;
          if (className && !el.classList.contains(className)) return;

          if (style) {
            for (const [key, value] of Object.entries(style)) {
              if (value === '*') {
                if (el.style[key]) {
                  continue;
                }

                return;
              }

              const values = castArray_1(value);
              if (!values.includes(el.style[key])) return;
            }
          }

          if (attribute) {
            if (typeof attribute === 'string') {
              if (!el.getAttributeNames().includes(attribute)) return;
            } else {
              for (const [key, value] of Object.entries(attribute)) {
                const values = castArray_1(value);
                const attr = el.getAttribute(key);
                if (!attr || !values.includes(attr)) return;
              }
            }
          }

          const htmlAttributes = {};

          if (attributes) {
            const attributeNames = el.getAttributeNames();

            for (const attr of attributes) {
              if (attributeNames.includes(attr)) htmlAttributes[attr] = el.getAttribute(attr);
            }
          }

          if (styles) {
            let htmlStyles;

            for (const style of styles) {
              if (el.style[style]) {
                htmlStyles = htmlStyles || {};
                htmlStyles[style] = el.style[style];
              }
            }

            if (htmlStyles) {
              htmlAttributes['style'] = htmlStyles;
            }
          }

          const slateNode = node(el);
          if (slateNode && Object.keys(htmlAttributes).length) slateNode.attributes = htmlAttributes;
          return slateNode;
        }
      });
    });
  });
  return deserializers;
};

/**
 * See {@link getNodeDeserializer}.
 */

const getElementDeserializer = options => getNodeDeserializer(Object.assign({
  node: () => ({
    type: options.type
  })
}, options));

/**
 * Call a handler if defined
 */
const getHandler = (cb, ...args) => () => {
  cb === null || cb === void 0 ? void 0 : cb(...args);
};

/**
 * See {@link getNodeDeserializer}.
 */

const getLeafDeserializer = options => getNodeDeserializer(Object.assign({
  node: () => ({
    [options.type]: true
  })
}, options));

/**
 * Add/remove marks in the selection.
 * @param key mark to toggle
 * @param clear marks to clear when adding mark
 */

const toggleMark = (editor, key, clear = []) => {
  const isActive = isMarkActive(editor, key);

  if (isActive) {
    editor.removeMark(key);
    return;
  }

  const clears = castArray_1(clear);
  clears.forEach(item => {
    editor.removeMark(item);
  });
  editor.addMark(key, true);
};

/**
 * Get `onKeyDown` handler to toggle mark if hotkey is pressed.
 */

const getOnHotkeyToggleMark = ({
  type,
  hotkey,
  clear
}) => {
  if (!hotkey) return;
  return (e, editor) => {
    if (hotkey && isHotkey(hotkey, e)) {
      e.preventDefault();
      toggleMark(editor, type, clear);
    }
  };
};

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

var _apply = apply;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
  return _defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};

var _baseSetToString = baseSetToString;

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = _shortOut(_baseSetToString);

var _setToString = setToString;

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}

var _baseRest = baseRest;

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq_1(object[key], value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignMergeValue = assignMergeValue;

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike_1(value) && isArrayLike_1(value);
}

var isArrayLikeObject_1 = isArrayLikeObject;

/** `Object#toString` result references. */
var objectTag$4 = '[object Object]';

/** Used for built-in method references. */
var funcProto$2 = Function.prototype,
    objectProto$f = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$2 = funcProto$2.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$c = objectProto$f.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString$2.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$4) {
    return false;
  }
  var proto = _getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$c.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString$2.call(Ctor) == objectCtorString;
}

var isPlainObject_1 = isPlainObject;

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

var _safeGet = safeGet;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return _copyObject(value, keysIn_1(value));
}

var toPlainObject_1 = toPlainObject;

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = _safeGet(object, key),
      srcValue = _safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    _assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray_1(srcValue),
        isBuff = !isArr && isBuffer_1(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray_1(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject_1(objValue)) {
        newValue = _copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = _cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = _cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
      newValue = objValue;
      if (isArguments_1(objValue)) {
        newValue = toPlainObject_1(objValue);
      }
      else if (!isObject_1(objValue) || isFunction_1(objValue)) {
        newValue = _initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  _assignMergeValue(object, key, newValue);
}

var _baseMergeDeep = baseMergeDeep;

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  _baseFor(source, function(srcValue, key) {
    stack || (stack = new _Stack);
    if (isObject_1(srcValue)) {
      _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      _assignMergeValue(object, key, newValue);
    }
  }, keysIn_1);
}

var _baseMerge = baseMerge;

/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject_1(objValue) && isObject_1(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);
    _baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
    stack['delete'](srcValue);
  }
  return objValue;
}

var _customDefaultsMerge = customDefaultsMerge;

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike_1(object) && _isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq_1(object[index], value);
  }
  return false;
}

var _isIterateeCall = isIterateeCall;

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return _baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

var _createAssigner = createAssigner;

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = _createAssigner(function(object, source, srcIndex, customizer) {
  _baseMerge(object, source, srcIndex, customizer);
});

var mergeWith_1 = mergeWith;

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var defaultsDeep = _baseRest(function(args) {
  args.push(undefined, _customDefaultsMerge);
  return _apply(mergeWith_1, undefined, args);
});

var defaultsDeep_1 = defaultsDeep;

/**
 * Deep merge the default object properties that are not defined in the destination object.
 * @param object  The destination object.
 * @param defaultObject   The default object.
 */

const setDefaults = (object, defaultObject) => defaultsDeep_1(object, defaultObject);

/**
 * Get `onKeyDown` handler for mark with default options.
 */

const getOnHotkeyToggleMarkDefault = ({
  key,
  defaultOptions,
  options
}) => {
  const keyOptions = setDefaults(options, defaultOptions)[key];
  return getOnHotkeyToggleMark(keyOptions);
};

/**
 * Iterate through all of the nodes in the editor and break early for the first truthy match. Otherwise
 * returns false.
 */

const someNode = (editor, options) => {
  return !!findNode(editor, options);
};

const DEFAULT_ELEMENT = 'p';

/**
 * Toggle the type of the selected node.
 * Don't do anything if activeType === inactiveType.
 */

const toggleNodeType = (editor, options, editorNodesOptions) => {
  const {
    activeType,
    inactiveType = DEFAULT_ELEMENT
  } = options;
  const isActive = someNode(editor, Object.assign(Object.assign({}, editorNodesOptions), {
    match: {
      type: activeType
    }
  }));
  if (isActive && activeType === inactiveType) return;
  Transforms.setNodes(editor, {
    type: isActive ? inactiveType : activeType
  });
};

/**
 * Get `onKeyDown` handler to toggle node type if hotkey is pressed.
 */

const getOnHotkeyToggleNodeType = ({
  type,
  defaultType,
  hotkey
}) => {
  if (!hotkey) return;
  const hotkeys = castArray_1(hotkey);
  return (e, editor) => {
    for (const key of hotkeys) {
      if (isHotkey(key, e)) {
        e.preventDefault();
        toggleNodeType(editor, {
          activeType: type,
          inactiveType: defaultType
        });
        return;
      }
    }
  };
};

/**
 * `getOnHotkeyToggleNodeType` with default options.
 */

const getOnHotkeyToggleNodeTypeDefault = ({
  key,
  defaultOptions,
  options
}) => {
  const keys = castArray_1(key);
  return (e, editor) => {
    keys.forEach(keyItem => {
      var _a;

      const keyOptions = setDefaults(options, defaultOptions)[keyItem];
      return (_a = getOnHotkeyToggleNodeType(keyOptions)) === null || _a === void 0 ? void 0 : _a(e, editor);
    });
  };
};

/**
 * Prevent default and call a handler if defined
 */
const getPreventDefaultHandler = (cb, ...args) => event => {
  event.preventDefault();
  cb === null || cb === void 0 ? void 0 : cb(...args);
};

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject_1(object)) {
    return object;
  }
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = _toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject_1(objValue)
          ? objValue
          : (_isIndex(path[index + 1]) ? [] : {});
      }
    }
    _assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

var _baseSet = baseSet;

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = _baseGet(object, path);

    if (predicate(value, path)) {
      _baseSet(result, _castPath(path, object), value);
    }
  }
  return result;
}

var _basePickBy = basePickBy;

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pickBy(object, _.isNumber);
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = _arrayMap(_getAllKeysIn(object), function(prop) {
    return [prop];
  });
  predicate = _baseIteratee(predicate);
  return _basePickBy(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}

var pickBy_1 = pickBy;

/**
 * Get a `renderElement` handler for a single type.
 * If the given `type` is equals to the slate element type, render the given `component`.
 * You can pass props by using `rootProps`. Falsy props are ignored.
 */

const getRenderElement = ({
  type,
  component: Component,
  rootProps,
  nodeToProps
}) => ({
  attributes,
  element,
  children
}) => {
  var _a;

  if (element.type === type) {
    const htmlAttributes = (_a = nodeToProps === null || nodeToProps === void 0 ? void 0 : nodeToProps({
      attributes,
      element,
      children,
      rootProps
    })) !== null && _a !== void 0 ? _a : element === null || element === void 0 ? void 0 : element.attributes;
    return /*#__PURE__*/createElement(Component, Object.assign({
      attributes: attributes,
      htmlAttributes: htmlAttributes,
      element: element
    }, pickBy_1(rootProps)), children);
  }
};
/**
 * Get a `renderElement` handler for multiple types.
 */

const getRenderElements = options => ({
  attributes,
  element,
  children
}) => {
  var _a;

  for (const {
    type,
    component: Component,
    rootProps,
    nodeToProps
  } of options) {
    if (element.type === type) {
      const htmlAttributes = (_a = nodeToProps === null || nodeToProps === void 0 ? void 0 : nodeToProps({
        attributes,
        element,
        children,
        rootProps
      })) !== null && _a !== void 0 ? _a : element === null || element === void 0 ? void 0 : element.attributes;
      return /*#__PURE__*/createElement(Component, Object.assign({
        attributes: attributes,
        htmlAttributes: htmlAttributes,
        element: element
      }, pickBy_1(rootProps)), children);
    }
  }
};

/**
 * Get a `renderLeaf` handler for a single type.
 */

const getRenderLeaf = ({
  type,
  component: Component,
  rootProps
}) => ({
  children,
  leaf
}) => {
  if (leaf[type] && !!leaf.text) {
    return /*#__PURE__*/createElement(Component, Object.assign({
      leaf: leaf
    }, pickBy_1(rootProps)), children);
  }

  return children;
};

/**
 * Get a `renderLeaf` handler for a single type, with default options.
 */

const getRenderLeafDefault = ({
  key,
  defaultOptions,
  options
}) => {
  const keyOptions = setDefaults(options, defaultOptions)[key];
  return getRenderLeaf(keyOptions);
};

/**
 * RegExps.
 * A URL must match #1 and then at least one of #2/#3.
 * Use two levels of REs to avoid REDOS.
 */
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
const localhostDomainRE = /^localhost[:?\d]*(?:[^:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s.]+\.\S{2,}$/;
/**
 * Loosely validate a URL `string`.
 */

const isUrl = string => {
  if (typeof string !== 'string') {
    return false;
  }

  const match = string.match(protocolAndDomainRE);

  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];

  if (!everythingAfterProtocol) {
    return false;
  }

  try {
    new URL(string);
  } catch (err) {
    return false;
  }

  return localhostDomainRE.test(everythingAfterProtocol) || nonLocalhostDomainRE.test(everythingAfterProtocol);
};

/**
 * Normalize the descendants to a valid document fragment.
 */

const normalizeDescendantsToDocumentFragment = descendants => {
  descendants.forEach(element => {
    if (Element.isElement(element)) {
      normalizeDescendantsToDocumentFragment(element.children);
    }
  });

  if (!descendants.length) {
    descendants.push({
      text: ''
    });
  }

  return descendants;
};

function pipe(x, ...fns) {
  return fns.reduce((y, fn) => fn(y), x);
}

/**
 * Is the word at the point after a trigger (punctuation character)
 * https://github.com/ianstormtaylor/slate/blob/master/packages/slate/src/utils/string.ts#L6
 */

const isWordAfterTrigger = (editor, {
  at,
  trigger
}) => {
  // Point at the start of previous word (excluding punctuation)
  const wordBefore = Editor.before(editor, at, {
    unit: 'word'
  }); // Point before wordBefore

  const before = wordBefore && Editor.before(editor, wordBefore); // Range from before to start

  const beforeRange = before && Editor.range(editor, before, at); // Before text

  const beforeText = getText(editor, beforeRange); // Starts with char and ends with word characters

  const escapedTrigger = escapeRegExp(trigger);
  const beforeRegex = new RegExp(`^${escapedTrigger}([\\w|À-ÖØ-öø-ÿ|а-яА-ЯёЁ]+)$`); // Match regex on before text

  const match = !!beforeText && beforeText.match(beforeRegex);
  return {
    range: beforeRange,
    match
  };
};

/** Used for built-in method references. */
var objectProto$g = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$d = objectProto$g.hasOwnProperty;

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = _baseRest(function(object, sources) {
  object = Object(object);

  var index = -1;
  var length = sources.length;
  var guard = length > 2 ? sources[2] : undefined;

  if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
    length = 1;
  }

  while (++index < length) {
    var source = sources[index];
    var props = keysIn_1(source);
    var propsIndex = -1;
    var propsLength = props.length;

    while (++propsIndex < propsLength) {
      var key = props[propsIndex];
      var value = object[key];

      if (value === undefined ||
          (eq_1(value, objectProto$g[key]) && !hasOwnProperty$d.call(object, key))) {
        object[key] = source[key];
      }
    }
  }

  return object;
});

var defaults_1 = defaults;

/**
 * Recursively apply an operation to children nodes with a query.
 */

const applyDeepToNodes = ({
  node,
  source,
  apply,
  query
}) => {
  const entry = [node, []];

  if (queryNode(entry, query)) {
    if (source instanceof Function) {
      apply(node, source());
    } else {
      apply(node, source);
    }
  }

  if (!isAncestor(node)) return;
  node.children.forEach(child => {
    applyDeepToNodes({
      node: child,
      source,
      apply,
      query
    });
  });
};

/**
 * Recursively merge a source object to children nodes with a query.
 */

const defaultsDeepToNodes = options => {
  applyDeepToNodes(Object.assign(Object.assign({}, options), {
    apply: defaults_1
  }));
};

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = _createAssigner(function(object, source, srcIndex) {
  _baseMerge(object, source, srcIndex);
});

var merge_1 = merge;

/**
 * Recursively merge a source object to children nodes with a query.
 */

const mergeDeepToNodes = options => {
  applyDeepToNodes(Object.assign(Object.assign({}, options), {
    apply: merge_1
  }));
};

/**
 * Enables support for inserting nodes with an id key.
 */

const withNodeID = ({
  idKey = 'id',
  idCreator = () => Date.now(),
  filterText = true,
  resetExistingID = false,
  filter = () => true,
  allow,
  exclude
} = {}) => e => {
  const editor = e;
  const {
    apply
  } = editor;

  const idPropsCreator = () => ({
    [idKey]: idCreator()
  });

  editor.removedIDs = new Set();

  editor.apply = operation => {
    if (operation.type === 'insert_node') {
      const newFilter = entry => {
        const [node] = entry;
        return filter(entry) && filterText ? Element.isElement(node) : isDescendant(node);
      };

      const node = cloneDeep_1(operation.node); // it will not overwrite ids once it's set as it's read-only

      const applyDeepToNodes = resetExistingID ? mergeDeepToNodes : defaultsDeepToNodes;
      applyDeepToNodes({
        node,
        source: idPropsCreator,
        query: {
          filter: newFilter,
          allow,
          exclude
        }
      });
      return apply(Object.assign(Object.assign({}, operation), {
        node
      }));
    }

    if (operation.type === 'split_node' && (!filterText || operation.properties.type)) {
      let id = operation.properties[idKey];

      if (editor.removedIDs.has(id)) {
        editor.removedIDs.delete(id);
      } else {
        id = idCreator();
      }

      return apply(Object.assign(Object.assign({}, operation), {
        properties: Object.assign(Object.assign({}, operation.properties), {
          [idKey]: id
        })
      }));
    }

    if (operation.type === 'merge_node' && (!filterText || operation.properties.type)) {
      editor.removedIDs.add(operation.properties.id);
    }

    return apply(operation);
  };

  return editor;
};

const withSelectOnBackspace = query => editor => {
  const {
    deleteBackward
  } = editor;

  editor.deleteBackward = unit => {
    const {
      selection
    } = editor;

    if (unit === 'character' && isCollapsed(selection)) {
      const prevNode = Editor.before(editor, selection, {
        unit
      });

      if (prevNode) {
        const [prevCell] = Editor.nodes(editor, {
          match: node => queryNode([node, prevNode.path], query),
          at: prevNode
        });

        if (!!prevCell && prevNode) {
          // don't delete image, set selection there
          Transforms.select(editor, prevNode);
        } else {
          deleteBackward(unit);
        }
      } else {
        deleteBackward(unit);
      }
    } else {
      deleteBackward(unit);
    }
  };

  return editor;
};

/**
 * Merge a node at a location with the previous node of the same depth,
 * removing any empty containing nodes after the merge if necessary.
 */

const mergeNodes = (editor, options = {}) => {
  Editor.withoutNormalizing(editor, () => {
    let {
      match,
      at = editor.selection
    } = options;
    const {
      mergeNode,
      removeEmptyAncestor,
      hanging = false,
      voids = false,
      mode = 'lowest'
    } = options;

    if (!at) {
      return;
    }

    if (match == null) {
      if (Path.isPath(at)) {
        const [parent] = Editor.parent(editor, at);

        match = n => parent.children.includes(n);
      } else {
        match = n => Editor.isBlock(editor, n);
      }
    }

    if (!hanging && Range.isRange(at)) {
      at = Editor.unhangRange(editor, at);
    }

    if (Range.isRange(at)) {
      if (Range.isCollapsed(at)) {
        at = at.anchor;
      } else {
        const [, end] = Range.edges(at);
        const pointRef = Editor.pointRef(editor, end);
        Transforms.delete(editor, {
          at
        });
        at = pointRef.unref();

        if (options.at == null) {
          Transforms.select(editor, at);
        }
      }
    }

    const [current] = Editor.nodes(editor, {
      at,
      match,
      voids,
      mode
    });
    const prev = Editor.previous(editor, {
      at,
      match,
      voids,
      mode
    });

    if (!current || !prev) {
      return;
    }

    const [node, path] = current;
    const [prevNode, prevPath] = prev;

    if (path.length === 0 || prevPath.length === 0) {
      return;
    }

    const newPath = Path.next(prevPath);
    const commonPath = Path.common(path, prevPath);
    const isPreviousSibling = Path.isSibling(path, prevPath);
    const levels = Array.from(Editor.levels(editor, {
      at: path
    }), ([n]) => n).slice(commonPath.length).slice(0, -1); // Determine if the merge will leave an ancestor of the path empty as a
    // result, in which case we'll want to remove it after merging.

    const emptyAncestor = Editor.above(editor, {
      at: path,
      mode: 'highest',
      match: n => levels.includes(n) && Element.isElement(n) && n.children.length === 1
    });
    const emptyRef = emptyAncestor && Editor.pathRef(editor, emptyAncestor[1]);
    let properties;
    let position; // Ensure that the nodes are equivalent, and figure out what the position
    // and extra properties of the merge will be.

    if (Text.isText(node) && Text.isText(prevNode)) {
      const rest = __rest(node, ["text"]);

      position = prevNode.text.length;
      properties = rest;
    } else if (Element.isElement(node) && Element.isElement(prevNode)) {
      const rest = __rest(node, ["children"]);

      position = prevNode.children.length;
      properties = rest;
    } else {
      throw new Error(`Cannot merge the node at path [${path}] with the previous sibling because it is not the same kind: ${JSON.stringify(node)} ${JSON.stringify(prevNode)}`);
    } // If the node isn't already the next sibling of the previous node, move
    // it so that it is before merging.


    if (!isPreviousSibling) {
      // DIFF
      if (!mergeNode) {
        Transforms.moveNodes(editor, {
          at: path,
          to: newPath,
          voids
        });
      }
    } // If there was going to be an empty ancestor of the node that was merged,
    // we remove it from the tree.


    if (emptyRef) {
      // DIFF: start
      if (!removeEmptyAncestor) {
        Transforms.removeNodes(editor, {
          at: emptyRef.current,
          voids
        });
      } else {
        const emptyPath = emptyRef.current;
        emptyPath && removeEmptyAncestor(editor, {
          at: emptyPath
        });
      } // DIFF: end

    } // If the target node that we're merging with is empty, remove it instead
    // of merging the two. This is a common rich text editor behavior to
    // prevent losing formatting when deleting entire nodes when you have a
    // hanging selection.
    // DIFF: start


    if (mergeNode) {
      mergeNode(editor, {
        at: path,
        to: newPath
      }); // DIFF: end
    } else if (Element.isElement(prevNode) && Editor.isEmpty(editor, prevNode) || Text.isText(prevNode) && prevNode.text === '') {
      Transforms.removeNodes(editor, {
        at: prevPath,
        voids
      });
    } else {
      editor.apply({
        type: 'merge_node',
        path: newPath,
        position,
        properties
      });
    }

    if (emptyRef) {
      emptyRef.unref();
    }
  });
};

const deleteFragment = (editor, options = {}) => {
  Editor.withoutNormalizing(editor, () => {
    const {
      moveNode,
      removeEmptyAncestor,
      reverse = false,
      unit = 'character',
      distance = 1,
      voids = false
    } = options;
    let {
      at = editor.selection,
      hanging = false
    } = options;

    if (!at) {
      return;
    }

    if (Range.isRange(at) && Range.isCollapsed(at)) {
      at = at.anchor;
    }

    if (Point.isPoint(at)) {
      const furthestVoid = Editor.void(editor, {
        at,
        mode: 'highest'
      });

      if (!voids && furthestVoid) {
        const [, voidPath] = furthestVoid;
        at = voidPath;
      } else {
        const opts = {
          unit,
          distance
        };
        const target = reverse ? Editor.before(editor, at, opts) || Editor.start(editor, []) : Editor.after(editor, at, opts) || Editor.end(editor, []);
        at = {
          anchor: at,
          focus: target
        };
        hanging = true;
      }
    }

    if (Path.isPath(at)) {
      Transforms.removeNodes(editor, {
        at,
        voids
      });
      return;
    }

    if (Range.isCollapsed(at)) {
      return;
    }

    if (!hanging) {
      at = Editor.unhangRange(editor, at, {
        voids
      });
    }

    let [start, end] = Range.edges(at);
    const startBlock = Editor.above(editor, {
      match: n => Editor.isBlock(editor, n),
      at: start,
      voids
    });
    const endBlock = Editor.above(editor, {
      match: n => Editor.isBlock(editor, n),
      at: end,
      voids
    });
    const isAcrossBlocks = startBlock && endBlock && !Path.equals(startBlock[1], endBlock[1]);
    const isSingleText = Path.equals(start.path, end.path);
    const startVoid = voids ? null : Editor.void(editor, {
      at: start,
      mode: 'highest'
    });
    const endVoid = voids ? null : Editor.void(editor, {
      at: end,
      mode: 'highest'
    }); // If the start or end points are inside an inline void, nudge them out.

    if (startVoid) {
      const before = Editor.before(editor, start);

      if (before && startBlock && Path.isAncestor(startBlock[1], before.path)) {
        start = before;
      }
    }

    if (endVoid) {
      const after = Editor.after(editor, end);

      if (after && endBlock && Path.isAncestor(endBlock[1], after.path)) {
        end = after;
      }
    } // Get the highest nodes that are completely inside the range, as well as
    // the start and end nodes.


    const matches = [];
    let lastPath;

    for (const entry of Editor.nodes(editor, {
      at,
      voids
    })) {
      const [node, path] = entry;

      if (lastPath && Path.compare(path, lastPath) === 0) {
        continue;
      }

      if (!voids && Editor.isVoid(editor, node) || !Path.isCommon(path, start.path) && !Path.isCommon(path, end.path)) {
        matches.push(entry);
        lastPath = path;
      }
    }

    const pathRefs = Array.from(matches, ([, p]) => Editor.pathRef(editor, p));
    const startRef = Editor.pointRef(editor, start);
    const endRef = Editor.pointRef(editor, end);

    if (!isSingleText && !startVoid) {
      const point = startRef.current;
      const [node] = Editor.leaf(editor, point);
      const {
        path
      } = point;
      const {
        offset
      } = start;
      const text = node.text.slice(offset);
      editor.apply({
        type: 'remove_text',
        path,
        offset,
        text
      });
    }

    for (const pathRef of pathRefs) {
      const path = pathRef.unref();
      Transforms.removeNodes(editor, {
        at: path,
        voids
      });
    }

    if (!endVoid) {
      const point = endRef.current;
      const [node] = Editor.leaf(editor, point);
      const {
        path
      } = point;
      const offset = isSingleText ? start.offset : 0;
      const text = node.text.slice(offset, end.offset);
      editor.apply({
        type: 'remove_text',
        path,
        offset,
        text
      });
    }

    if (!isSingleText && isAcrossBlocks && endRef.current && startRef.current) {
      // DIFF: allow custom mergeNodes
      mergeNodes(editor, {
        at: endRef.current,
        hanging: true,
        voids,
        mergeNode: moveNode,
        removeEmptyAncestor
      });
    }

    const point = endRef.unref() || startRef.unref();

    if (options.at == null && point) {
      Transforms.select(editor, point);
    }
  });
};

const insertEmptyElement = (editor, type, options) => {
  Transforms.insertNodes(editor, {
    type,
    children: [{
      text: ''
    }]
  }, getQueryOptions(editor, options));
};

/**
 * Move the children of a node to a path.
 * Returns the number of children moved.
 */

const moveChildren = (editor, {
  at,
  to,
  match,
  fromStartIndex = 0
}) => {
  let moved = 0;
  const parentPath = Path.isPath(at) ? at : at[1];
  const parentNode = Path.isPath(at) ? Node$1.get(editor, parentPath) : at[0];
  if (!Editor.isBlock(editor, parentNode)) return moved;

  for (let i = parentNode.children.length - 1; i >= fromStartIndex; i--) {
    const childPath = [...parentPath, i];
    const childNode = getNode(editor, childPath);

    if (!match || childNode && match([childNode, childPath])) {
      Transforms.moveNodes(editor, {
        at: childPath,
        to
      });
      moved++;
    }
  }

  return moved;
};

/**
 * Select the end point of the block above the selection.
 */

const selectEndOfBlockAboveSelection = editor => {
  var _a;

  const path = (_a = getBlockAbove(editor)) === null || _a === void 0 ? void 0 : _a[1];
  path && Transforms.select(editor, Editor.end(editor, path));
};

/**
 * Unwrap nodes with extended options.
 * See {@link Transforms.unwrapNodes}
 */

const unwrapNodes = (editor, options) => {
  Transforms.unwrapNodes(editor, getQueryOptions(editor, options));
};

/**
 * {@link Transforms.wrapNodes}.
 */

const wrapNodes = (editor, element, options = {}) => {
  unhangRange(editor, options);
  return Transforms.wrapNodes(editor, element, options);
};

/**
 * Unwrap if the node type is in selection.
 * Wrap otherwise.
 */

const toggleWrapNodes = (editor, type) => {
  if (someNode(editor, {
    match: {
      type
    }
  })) {
    unwrapNodes(editor, {
      match: {
        type
      }
    });
  } else {
    wrapNodes(editor, {
      type,
      children: []
    });
  }
};

const PortalBody = ({
  children
}) => /*#__PURE__*/createPortal(children, document.body);

const getStyledComponentStyles = ({
  className
}) => {
  return {
    root: [className, {// Insert css properties
    }]
  };
};

const getClassNames = classNamesFunction();
/**
 * StyledComponent with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const StyledComponentBase = ({
  children,
  styles,
  className,
  as = 'div'
}) => {
  const classNames = getClassNames(styles, {
    className
  });
  const Tag = as;
  return /*#__PURE__*/createElement(Tag, {
    className: classNames.root
  }, children);
};
/**
 * StyledComponent
 */

const StyledComponent = styled(StyledComponentBase, getStyledComponentStyles, undefined, {
  scope: 'StyledComponent'
});

const getClassNames$1 = classNamesFunction();
/**
 * StyledElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const StyledElementBase = ({
  attributes,
  children,
  className,
  styles,
  htmlAttributes,
  as = 'div'
}) => {
  const classNames = getClassNames$1(styles, {
    className
  });
  const Tag = as;
  return /*#__PURE__*/createElement(Tag, Object.assign({}, attributes, {
    className: classNames.root
  }, htmlAttributes), children);
};
const StyledElement = styled(StyledElementBase, getStyledComponentStyles, undefined, {
  scope: 'StyledElement'
});

const getClassNames$2 = classNamesFunction();
/**
 * StyledLeaf with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const StyledLeafBase = ({
  attributes,
  children,
  className,
  styles,
  as = 'span'
}) => {
  const classNames = getClassNames$2(styles, {
    className
  });
  const Tag = as;
  return /*#__PURE__*/createElement(Tag, Object.assign({}, attributes, {
    className: classNames.root
  }), children);
};
const StyledLeaf = styled(StyledLeafBase, getStyledComponentStyles, undefined, {
  scope: 'StyledLeaf'
});

const classNames = {
  root: 'slate-Toolbar'
};
const getToolbarStyles = memoizeFunction(styles => {
  return concatStyleSets({
    root: [classNames.root, {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'content-box',
      userSelect: 'none',
      minHeight: 40,
      color: 'rgb(68, 68, 68)'
    }]
  }, styles);
});

const getClassNames$3 = classNamesFunction();
const ToolbarBase = /*#__PURE__*/forwardRef((_a, ref) => {
  var {
    className,
    styles,
    children
  } = _a,
      props = __rest(_a, ["className", "styles", "children"]);

  const classNames = getClassNames$3(styles, {
    className
  });
  return /*#__PURE__*/createElement("div", Object.assign({
    "data-testid": "Toolbar"
  }, props, {
    className: classNames.root,
    ref: ref
  }), children);
});
const Toolbar = /*#__PURE__*/forwardRef((_a, ref) => {
  var {
    styles
  } = _a,
      props = __rest(_a, ["styles"]);

  return /*#__PURE__*/createElement(ToolbarBase, Object.assign({}, props, {
    ref: ref,
    styles: concatStyleSets(getToolbarStyles(styles))
  }));
});

const classNames$1 = {
  root: 'slate-BalloonToolbar'
};
const getBalloonToolbarStyles = memoizeFunction((className, styles, theme, hidden, hiddenDelay, direction, arrow) => {
  let color = 'rgb(157, 170, 182)';
  let colorActive = 'white';
  let background = 'rgb(36, 42, 49)';
  let borderColor = 'transparent';

  if (theme === 'light') {
    color = 'rgba(0, 0, 0, 0.50)';
    colorActive = 'black';
    background = 'rgb(250, 250, 250)';
    borderColor = 'rgb(196, 196, 196)';
  }

  let marginTop;
  let arrowStyle = {};
  let arrowBorderStyle = {};

  if (arrow) {
    arrowStyle = {
      left: '50%',
      content: '" "',
      position: 'absolute',
      marginTop: '-1px',
      transform: 'translateX(-50%)',
      borderColor: `${background} transparent`,
      borderStyle: 'solid'
    };

    if (direction === 'top') {
      arrowStyle = Object.assign(Object.assign({}, arrowStyle), {
        top: '100%',
        bottom: 'auto',
        borderWidth: '8px 8px 0px'
      });

      if (theme === 'light') {
        arrowBorderStyle = Object.assign(Object.assign({}, arrowStyle), {
          marginTop: 0,
          borderWidth: '9px 9px 0px',
          borderColor: `${borderColor} transparent`
        });
      }
    } else {
      arrowStyle = Object.assign(Object.assign({}, arrowStyle), {
        top: 'auto',
        bottom: '100%',
        borderWidth: '0px 8px 8px'
      });

      if (theme === 'light') {
        arrowBorderStyle = Object.assign(Object.assign({}, arrowStyle), {
          marginTop: 0,
          borderWidth: '0px 9px 9px',
          borderColor: `${borderColor} transparent`
        });
      }
    }
  }

  if (direction === 'top') {
    marginTop = -9;
  } else {
    marginTop = 9;
  }

  return concatStyleSets({
    root: [classNames$1.root, {
      position: 'absolute',
      zIndex: 500,
      background,
      color,
      whiteSpace: 'nowrap',
      visibility: 'hidden',
      border: 'solid #000',
      borderRadius: 4,
      borderWidth: 1,
      borderColor,
      padding: '0 4px',
      marginTop,
      transition: hiddenDelay ? '' : 'top 75ms ease-out,left 75ms ease-out',
      selectors: {
        '::before': arrowBorderStyle,
        '::after': arrowStyle,
        '.slate-ToolbarButton-active, .slate-ToolbarButton:hover': {
          color: colorActive
        }
      }
    }, !hidden && {
      visibility: 'visible'
    }, className]
  }, styles);
});

const setPositionAtSelection = (el, direction = 'top') => {
  const domSelection = window.getSelection();
  if (!domSelection || domSelection.rangeCount < 1) return;
  const domRange = domSelection.getRangeAt(0);
  const rect = domRange.getBoundingClientRect();

  if (direction === 'top') {
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
  } else {
    el.style.top = `${rect.bottom + window.pageYOffset}px`;
  }

  el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
};

/**
 * Move when the selection changes.
 */

const useBalloonMove = ({
  editor,
  ref,
  direction
}) => {
  const selectionExpanded = isSelectionExpanded(editor);
  const selectionText = getSelectionText(editor);
  useEffect(() => {
    ref.current && selectionExpanded && setPositionAtSelection(ref.current, direction);
  }, [direction, selectionText.length, selectionExpanded, ref]);
};

var useTimeoutFn_1 = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });

function useTimeoutFn(fn, ms) {
    if (ms === void 0) { ms = 0; }
    var ready = React.useRef(false);
    var timeout = React.useRef();
    var callback = React.useRef(fn);
    var isReady = React.useCallback(function () { return ready.current; }, []);
    var set = React.useCallback(function () {
        ready.current = false;
        timeout.current && clearTimeout(timeout.current);
        timeout.current = setTimeout(function () {
            ready.current = true;
            callback.current();
        }, ms);
    }, [ms]);
    var clear = React.useCallback(function () {
        ready.current = null;
        timeout.current && clearTimeout(timeout.current);
    }, []);
    // update ref when function changes
    React.useEffect(function () {
        callback.current = fn;
    }, [fn]);
    // set on mount, clear on unmount
    React.useEffect(function () {
        set();
        return clear;
    }, [ms]);
    return [isReady, clear, set];
}
exports.default = useTimeoutFn;
});

var _useTimeoutFn = unwrapExports(useTimeoutFn_1);

/**
 * Hide if not selecting.
 * If hiddenDelay = 0 and the selection changes: show.
 * If hiddenDelay > 0: hide when the selection length changes.
 */

const useBalloonShow = ({
  editor,
  ref,
  hiddenDelay
}) => {
  const [hidden, setHidden] = useState(true);
  const selectionExpanded = isSelectionExpanded(editor);
  const selectionText = getSelectionText(editor);
  const show = useCallback(() => {
    if (ref.current && hidden && selectionExpanded) {
      setHidden(false);
    }
  }, [hidden, ref, selectionExpanded]);

  const [,, reset] = _useTimeoutFn(show, hiddenDelay);

  useEffect(() => {
    if (!hiddenDelay) {
      show();
    }
  }, [selectionText.length, reset, hiddenDelay, show]);
  /**
   * Hide if not selecting.
   */

  useEffect(() => {
    if (!hidden && !selectionExpanded) {
      setHidden(true);

      if (ref.current) {
        ref.current.removeAttribute('style');
      }
    }
  }, [hidden, hiddenDelay, reset, selectionExpanded, show, selectionText.length, ref]);
  /**
   * If hiddenDelay > 0:
   * Hide when the selection length changes.
   */

  useEffect(() => {
    if (!hiddenDelay) return;
    reset();
    setHidden(true);
  }, [hiddenDelay, selectionText.length, reset]);
  return [hidden];
};

const BalloonToolbar = ({
  className,
  styles,
  children,
  hiddenDelay = 0,
  direction = 'top',
  theme = 'dark',
  arrow = false
}) => {
  const ref = useRef(null);
  const editor = useSlate();
  const [hidden] = useBalloonShow({
    editor,
    ref,
    hiddenDelay
  });
  useBalloonMove({
    editor,
    ref,
    direction
  });
  return /*#__PURE__*/createElement(PortalBody, null, /*#__PURE__*/createElement(Toolbar, {
    ref: ref,
    styles: getBalloonToolbarStyles(className, styles, theme, hidden, hiddenDelay, direction, arrow)
  }, children));
};

const classNames$2 = {
  root: 'slate-HeadingToolbar'
};
const getHeadingToolbarStyles = ({
  className
} = {}) => {
  const color = '#06c';
  const styles = {
    root: [classNames$2.root, {
      position: 'relative',
      padding: '1px 18px 17px',
      margin: '0 -20px',
      borderBottom: '2px solid #eee',
      marginBottom: '20px',
      selectors: {
        '.slate-ToolbarButton-active, .slate-ToolbarButton:hover': {
          color
        }
      }
    }, className]
  };
  return concatStyleSets(getToolbarStyles(), styles);
};

const HeadingToolbar = styled(ToolbarBase, getHeadingToolbarStyles(), undefined, {
  scope: 'HeadingToolbar'
});

const classNames$3 = {
  root: 'slate-ToolbarButton',
  active: 'slate-ToolbarButton-active'
};
const getToolbarButtonStyles = ({
  className,
  active
} = {}) => ({
  root: [classNames$3.root, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '28px',
    height: '24px',
    userSelect: 'none',
    cursor: 'pointer',
    verticalAlign: 'middle',
    selectors: {
      '> svg': {
        display: 'block',
        width: '20px',
        height: '20px'
      }
    }
  }, active && classNames$3.active, className]
});

const getClassNames$4 = classNamesFunction();
const ToolbarButtonBase = ({
  className,
  styles,
  icon,
  tooltip,
  active,
  onMouseDown
}) => {
  const spanProps = {
    onMouseDown
  };
  const classNames = getClassNames$4(styles, {
    className,
    active
  });
  const tooltipProps = Object.assign({
    content: '',
    arrow: true,
    offset: [0, 17],
    delay: 0,
    duration: [200, 0],
    hideOnClick: false
  }, tooltip);
  const button = /*#__PURE__*/createElement("span", Object.assign({
    "data-testid": "ToolbarButton",
    className: classNames.root
  }, spanProps), icon);
  return tooltip ? /*#__PURE__*/createElement(Tippy, Object.assign({}, tooltipProps), button) : button;
};
const ToolbarButton = styled(ToolbarButtonBase, getToolbarButtonStyles, undefined, {
  scope: 'ToolbarButton'
});

/**
 * Toolbar button to toggle the type of elements in selection.
 */

const ToolbarElement = _a => {
  var {
    type,
    inactiveType
  } = _a,
      props = __rest(_a, ["type", "inactiveType"]);

  const editor = useSlate();
  return /*#__PURE__*/createElement(ToolbarButton, Object.assign({
    active: someNode(editor, {
      match: {
        type
      }
    }),
    onMouseDown: getPreventDefaultHandler(toggleNodeType, editor, {
      activeType: type,
      inactiveType
    })
  }, props));
};

/**
 * Toolbar button to toggle the mark of the leaves in selection.
 */

const ToolbarMark = _a => {
  var {
    type,
    clear
  } = _a,
      props = __rest(_a, ["type", "clear"]);

  const editor = useSlate();
  return /*#__PURE__*/createElement(ToolbarButton, Object.assign({
    active: isMarkActive(editor, type),
    onMouseDown: getPreventDefaultHandler(toggleMark, editor, type, clear)
  }, props));
};

const getPreviewLeafStyles = ({
  className,
  title,
  list,
  italic,
  hr,
  code,
  bold,
  blockquote
}) => {
  const boldStyle = {
    fontWeight: 'bold'
  };
  const italicStyle = {
    fontStyle: 'italic'
  };
  const titleStyle = {
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: '20px',
    margin: '20px 0 10px 0'
  };
  const listStyle = {
    paddingLeft: '10px',
    fontSize: '20px',
    lineHeight: '10px'
  };
  const hrStyle = {
    display: 'block',
    textAlign: 'center',
    borderBottom: '2px solid #ddd'
  };
  const blockquoteStyle = {
    display: 'inline-block',
    borderLeft: '2px solid #ddd',
    paddingLeft: '10px',
    color: '#aaa',
    fontStyle: 'italic'
  };
  const codeStyle = {
    fontFamily: 'monospace',
    backgroundColor: '#eee',
    padding: '3px'
  };
  let rootStyle = {};
  if (bold) rootStyle = Object.assign(Object.assign({}, rootStyle), boldStyle);
  if (italic) rootStyle = Object.assign(Object.assign({}, rootStyle), italicStyle);
  if (title) rootStyle = Object.assign(Object.assign({}, rootStyle), titleStyle);
  if (list) rootStyle = Object.assign(Object.assign({}, rootStyle), listStyle);
  if (hr) rootStyle = Object.assign(Object.assign({}, rootStyle), hrStyle);
  if (blockquote) rootStyle = Object.assign(Object.assign({}, rootStyle), blockquoteStyle);
  if (code) rootStyle = Object.assign(Object.assign({}, rootStyle), codeStyle);
  return {
    root: [rootStyle, className]
  };
};

const getClassNames$5 = classNamesFunction();
/**
 * PreviewLeaf with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const PreviewLeafBase = ({
  children,
  attributes,
  styles,
  className,
  leaf
}) => {
  const classNames = getClassNames$5(styles, Object.assign({
    className
  }, leaf));
  return /*#__PURE__*/createElement("span", Object.assign({}, attributes, {
    className: classNames.root
  }), children);
};
/**
 * PreviewLeaf
 */

const PreviewLeaf = styled(PreviewLeafBase, getPreviewLeafStyles, undefined, {
  scope: 'PreviewLeaf'
});

(function (Prism) {

	// Allow only one line break
	var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))/.source;

	/**
	 * This function is intended for the creation of the bold or italic pattern.
	 *
	 * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
	 *
	 * _Note:_ Keep in mind that this adds a capturing group.
	 *
	 * @param {string} pattern
	 * @returns {RegExp}
	 */
	function createInline(pattern) {
		pattern = pattern.replace(/<inner>/g, function () { return inner; });
		return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
	}


	var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
	var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|$)/.source.replace(/__/g, function () { return tableCell; });
	var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;


	Prism.languages.markdown = Prism.languages.extend('markup', {});
	Prism.languages.insertBefore('markdown', 'prolog', {
		'blockquote': {
			// > ...
			pattern: /^>(?:[\t ]*>)*/m,
			alias: 'punctuation'
		},
		'table': {
			pattern: RegExp('^' + tableRow + tableLine + '(?:' + tableRow + ')*', 'm'),
			inside: {
				'table-data-rows': {
					pattern: RegExp('^(' + tableRow + tableLine + ')(?:' + tableRow + ')*$'),
					lookbehind: true,
					inside: {
						'table-data': {
							pattern: RegExp(tableCell),
							inside: Prism.languages.markdown
						},
						'punctuation': /\|/
					}
				},
				'table-line': {
					pattern: RegExp('^(' + tableRow + ')' + tableLine + '$'),
					lookbehind: true,
					inside: {
						'punctuation': /\||:?-{3,}:?/
					}
				},
				'table-header-row': {
					pattern: RegExp('^' + tableRow + '$'),
					inside: {
						'table-header': {
							pattern: RegExp(tableCell),
							alias: 'important',
							inside: Prism.languages.markdown
						},
						'punctuation': /\|/
					}
				}
			}
		},
		'code': [
			{
				// Prefixed by 4 spaces or 1 tab and preceded by an empty line
				pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
				lookbehind: true,
				alias: 'keyword'
			},
			{
				// `code`
				// ``code``
				pattern: /``.+?``|`[^`\r\n]+`/,
				alias: 'keyword'
			},
			{
				// ```optional language
				// code block
				// ```
				pattern: /^```[\s\S]*?^```$/m,
				greedy: true,
				inside: {
					'code-block': {
						pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
						lookbehind: true
					},
					'code-language': {
						pattern: /^(```).+/,
						lookbehind: true
					},
					'punctuation': /```/
				}
			}
		],
		'title': [
			{
				// title 1
				// =======

				// title 2
				// -------
				pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
				alias: 'important',
				inside: {
					punctuation: /==+$|--+$/
				}
			},
			{
				// # title 1
				// ###### title 6
				pattern: /(^\s*)#+.+/m,
				lookbehind: true,
				alias: 'important',
				inside: {
					punctuation: /^#+|#+$/
				}
			}
		],
		'hr': {
			// ***
			// ---
			// * * *
			// -----------
			pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'list': {
			// * item
			// + item
			// - item
			// 1. item
			pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
			lookbehind: true,
			alias: 'punctuation'
		},
		'url-reference': {
			// [id]: http://example.com "Optional title"
			// [id]: http://example.com 'Optional title'
			// [id]: http://example.com (Optional title)
			// [id]: <http://example.com> "Optional title"
			pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
			inside: {
				'variable': {
					pattern: /^(!?\[)[^\]]+/,
					lookbehind: true
				},
				'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
				'punctuation': /^[\[\]!:]|[<>]/
			},
			alias: 'url'
		},
		'bold': {
			// **strong**
			// __strong__

			// allow one nested instance of italic text using the same delimiter
			pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^..)[\s\S]+(?=..$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /\*\*|__/
			}
		},
		'italic': {
			// *em*
			// _em_

			// allow one nested instance of bold text using the same delimiter
			pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^.)[\s\S]+(?=.$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /[*_]/
			}
		},
		'strike': {
			// ~~strike through~~
			// ~strike~
			pattern: createInline(/(~~?)(?:(?!~)<inner>)+?\2/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'content': {
					pattern: /(^~~?)[\s\S]+(?=\1$)/,
					lookbehind: true,
					inside: {} // see below
				},
				'punctuation': /~~?/
			}
		},
		'url': {
			// [example](http://example.com "Optional title")
			// [example][id]
			// [example] [id]
			pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[(?:(?!\])<inner>)+\])/.source),
			lookbehind: true,
			greedy: true,
			inside: {
				'variable': {
					pattern: /(\[)[^\]]+(?=\]$)/,
					lookbehind: true
				},
				'content': {
					pattern: /(^!?\[)[^\]]+(?=\])/,
					lookbehind: true,
					inside: {} // see below
				},
				'string': {
					pattern: /"(?:\\.|[^"\\])*"(?=\)$)/
				}
			}
		}
	});

	['url', 'bold', 'italic', 'strike'].forEach(function (token) {
		['url', 'bold', 'italic', 'strike'].forEach(function (inside) {
			if (token !== inside) {
				Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
			}
		});
	});

	Prism.hooks.add('after-tokenize', function (env) {
		if (env.language !== 'markdown' && env.language !== 'md') {
			return;
		}

		function walkTokens(tokens) {
			if (!tokens || typeof tokens === 'string') {
				return;
			}

			for (var i = 0, l = tokens.length; i < l; i++) {
				var token = tokens[i];

				if (token.type !== 'code') {
					walkTokens(token.content);
					continue;
				}

				/*
				 * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
				 * is optional. But the grammar is defined so that there is only one case we have to handle:
				 *
				 * token.content = [
				 *     <span class="punctuation">```</span>,
				 *     <span class="code-language">xxxx</span>,
				 *     '\n', // exactly one new lines (\r or \n or \r\n)
				 *     <span class="code-block">...</span>,
				 *     '\n', // exactly one new lines again
				 *     <span class="punctuation">```</span>
				 * ];
				 */

				var codeLang = token.content[1];
				var codeBlock = token.content[3];

				if (codeLang && codeBlock &&
					codeLang.type === 'code-language' && codeBlock.type === 'code-block' &&
					typeof codeLang.content === 'string') {

					// this might be a language that Prism does not support

					// do some replacements to support C++, C#, and F#
					var lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp');
					// only use the first word
					lang = (/[a-z][\w-]*/i.exec(lang) || [''])[0].toLowerCase();
					var alias = 'language-' + lang;

					// add alias
					if (!codeBlock.alias) {
						codeBlock.alias = [alias];
					} else if (typeof codeBlock.alias === 'string') {
						codeBlock.alias = [codeBlock.alias, alias];
					} else {
						codeBlock.alias.push(alias);
					}
				}
			}
		}

		walkTokens(env.tokens);
	});

	Prism.hooks.add('wrap', function (env) {
		if (env.type !== 'code-block') {
			return;
		}

		var codeLang = '';
		for (var i = 0, l = env.classes.length; i < l; i++) {
			var cls = env.classes[i];
			var match = /language-(.+)/.exec(cls);
			if (match) {
				codeLang = match[1];
				break;
			}
		}

		var grammar = Prism.languages[codeLang];

		if (!grammar) {
			if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
				var id = 'md-' + new Date().valueOf() + '-' + Math.floor(Math.random() * 1e16);
				env.attributes['id'] = id;

				Prism.plugins.autoloader.loadLanguages(codeLang, function () {
					var ele = document.getElementById(id);
					if (ele) {
						ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
					}
				});
			}
		} else {
			// reverse Prism.util.encode
			var code = env.content.replace(/&lt;/g, '<').replace(/&amp;/g, '&');

			env.content = Prism.highlight(code, grammar, codeLang);
		}
	});

	Prism.languages.md = Prism.languages.markdown;

}(Prism));

// eslint-disable-next-line simple-import-sort/imports

/**
 * Decorate texts with markdown preview.
 */

const decoratePreview = () => ([node, path]) => {
  const ranges = [];

  if (!Text.isText(node)) {
    return ranges;
  }

  const getLength = token => {
    if (typeof token === 'string') {
      return token.length;
    }

    if (typeof token.content === 'string') {
      return token.content.length;
    }

    return token.content.reduce((l, t) => l + getLength(t), 0);
  };

  const tokens = Prism$1.tokenize(node.text, Prism$1.languages.markdown);
  let start = 0;

  for (const token of tokens) {
    const length = getLength(token);
    const end = start + length;

    if (typeof token !== 'string') {
      ranges.push({
        [token.type]: true,
        anchor: {
          path,
          offset: start
        },
        focus: {
          path,
          offset: end
        }
      });
    }

    start = end;
  }

  return ranges;
};

const renderLeafPreview = () => props => /*#__PURE__*/createElement(PreviewLeaf, Object.assign({}, props));

const PreviewPlugin = () => ({
  decorate: decoratePreview(),
  renderLeaf: renderLeafPreview()
});

const useDragBlock = (editor, id) => {
  return useDrag(() => ({
    item: {
      type: 'block',
      id
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    begin: () => {
      document.body.classList.add('dragging');
    },
    end: () => {
      document.body.classList.remove('dragging');
    }
  }), []);
};

/**
 * If dragging a block A over another block B:
 * get the direction of block A relative to block B.
 */
const getHoverDirection = (dragItem, monitor, ref, hoverId) => {
  var _a;

  if (!ref.current) return;
  const dragId = dragItem.id; // Don't replace items with themselves

  if (dragId === hoverId) return; // Determine rectangle on screen

  const hoverBoundingRect = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect(); // Get vertical middle

  const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; // Determine mouse position

  const clientOffset = monitor.getClientOffset();
  if (!clientOffset) return; // Get pixels to the top

  const hoverClientY = clientOffset.y - hoverBoundingRect.top; // Only perform the move when the mouse has crossed half of the items height
  // When dragging downwards, only move when the cursor is below 50%
  // When dragging upwards, only move when the cursor is above 50%
  // Dragging downwards
  // if (dragId < hoverId && hoverClientY < hoverMiddleY) {

  if (hoverClientY < hoverMiddleY) {
    return 'top';
  } // Dragging upwards
  // if (dragId > hoverId && hoverClientY > hoverMiddleY) {


  if (hoverClientY >= hoverMiddleY) {
    return 'bottom';
  }
};

/**
 * Get new direction if updated
 */
const getNewDirection = (previousDir, dir) => {
  if (!dir && previousDir) {
    return '';
  }

  if (dir === 'top' && previousDir !== 'top') {
    return 'top';
  }

  if (dir === 'bottom' && previousDir !== 'bottom') {
    return 'bottom';
  }
};

const useDropBlockOnEditor = (editor, {
  blockRef,
  id,
  dropLine,
  setDropLine
}) => {
  return useDrop({
    accept: 'block',
    drop: (dragItem, monitor) => {
      var _a, _b;

      const direction = getHoverDirection(dragItem, monitor, blockRef, id);
      if (!direction) return;
      const dragEntry = findNode(editor, {
        at: [],
        match: {
          id: dragItem.id
        }
      });
      if (!dragEntry) return;
      const [, dragPath] = dragEntry;
      ReactEditor.focus(editor);
      let dropPath;

      if (direction === 'bottom') {
        dropPath = (_a = findNode(editor, {
          at: [],
          match: {
            id
          }
        })) === null || _a === void 0 ? void 0 : _a[1];
        if (!dropPath) return;
        if (Path.equals(dragPath, Path.next(dropPath))) return;
      }

      if (direction === 'top') {
        const nodePath = (_b = findNode(editor, {
          at: [],
          match: {
            id
          }
        })) === null || _b === void 0 ? void 0 : _b[1];
        if (!nodePath) return;
        dropPath = [...nodePath.slice(0, -1), nodePath[nodePath.length - 1] - 1];
        if (Path.equals(dragPath, dropPath)) return;
      }

      if (direction) {
        const _dropPath = dropPath;
        const before = Path.isBefore(dragPath, _dropPath) && Path.isSibling(dragPath, _dropPath);
        const to = before ? _dropPath : Path.next(_dropPath);
        Transforms.moveNodes(editor, {
          at: dragPath,
          to
        });
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    }),

    hover(item, monitor) {
      const direction = getHoverDirection(item, monitor, blockRef, id);
      const dropLineDir = getNewDirection(dropLine, direction);
      if (dropLineDir) setDropLine(dropLineDir);

      if (direction && isExpanded(editor.selection)) {
        ReactEditor.focus(editor);
        Transforms.collapse(editor);
      }
    }

  });
};

const useDndBlock = ({
  id,
  blockRef,
  removePreview
}) => {
  const editor = useEditor();
  const [dropLine, setDropLine] = useState('');
  const [{
    isDragging
  }, dragRef, preview] = useDragBlock(editor, id);
  const [{
    isOver
  }, drop] = useDropBlockOnEditor(editor, {
    id,
    blockRef,
    dropLine,
    setDropLine
  });

  if (removePreview) {
    drop(blockRef);
    preview(getEmptyImage(), {
      captureDraggingState: true
    });
  } else {
    preview(drop(blockRef));
  }

  if (!isOver && dropLine) {
    setDropLine('');
  }

  return {
    isDragging,
    dropLine,
    dragRef
  };
};

const GrabberTooltipContent = () => /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12
  }
}, /*#__PURE__*/React.createElement("div", null, "Drag ", /*#__PURE__*/React.createElement("span", {
  style: {
    color: 'rgba(255, 255, 255, 0.45)'
  }
}, "to move")));

const grabberTooltipProps = {
  content: /*#__PURE__*/React.createElement(GrabberTooltipContent, null),
  placement: 'bottom',
  arrow: false,
  offset: [0, 0],
  delay: [300, 0],
  duration: [0, 0],
  hideOnClick: true,
  theme: 'small'
};

const classNames$4 = {
  root: 'slate-Selectable',
  gutterLeft: 'slate-gutter-left'
};
const getSelectableStyles = ({
  className,
  direction,
  isDragging,
  selected
}) => {
  return {
    root: [classNames$4.root, {
      position: 'relative',
      opacity: isDragging ? 0.5 : 1,
      backgroundColor: selected ? 'rgb(181, 215, 255)' : undefined,
      selectors: {
        ':hover .slate-gutter-left': {
          opacity: 1
        }
      }
    }, className],
    block: {},
    blockAndGutter: {
      paddingTop: 3,
      paddingBottom: 3
    },
    gutterLeft: [{
      position: 'absolute',
      top: 0,
      transform: 'translateX(-100%)',
      display: 'flex',
      height: '100%',
      opacity: 0
    }, classNames$4.gutterLeft],
    blockToolbarWrapper: {
      display: 'flex',
      // alignItems: 'center',
      height: '1.5em'
    },
    blockToolbar: {
      width: 18,
      height: 18,
      marginRight: 4,
      pointerEvents: 'auto'
    },
    dragButton: {
      minWidth: 18,
      height: 18,
      padding: 0,
      backgroundColor: 'transparent',
      backgroundRepeat: 'no-repeat',
      border: 'none',
      cursor: 'pointer',
      overflow: 'hidden',
      outline: 'none'
    },
    dropLine: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: direction === 'top' ? -1 : undefined,
      bottom: direction === 'bottom' ? -1 : undefined,
      height: 2,
      opacity: 1,
      background: '#B4D5FF'
    }
  };
};

const getClassNames$6 = classNamesFunction();

const SelectableBase = ({
  children,
  element,
  className,
  styles,
  componentRef,
  dragIcon
}) => {
  const blockRef = useRef(null);
  const rootRef = useRef(null);
  const multiRootRef = useMergedRef(componentRef, rootRef);
  const {
    dropLine,
    dragRef,
    isDragging
  } = useDndBlock({
    id: element.id,
    blockRef: rootRef
  });
  const dragWrapperRef = useRef(null);
  const multiDragRef = useMergedRef(dragRef, dragWrapperRef);
  const classNames = getClassNames$6(styles, {
    className,
    direction: dropLine,
    isDragging
  });
  return /*#__PURE__*/React.createElement("div", {
    className: classNames.root,
    ref: multiRootRef
  }, /*#__PURE__*/React.createElement("div", {
    ref: blockRef,
    className: mergeStyles(classNames.blockAndGutter, classNames.block)
  }, children, !!dropLine && /*#__PURE__*/React.createElement("div", {
    className: classNames.dropLine,
    contentEditable: false
  })), /*#__PURE__*/React.createElement("div", {
    className: mergeStyles(classNames.blockAndGutter, classNames.gutterLeft),
    contentEditable: false
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames.blockToolbarWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames.blockToolbar
  }, /*#__PURE__*/React.createElement(Tippy, Object.assign({}, grabberTooltipProps), /*#__PURE__*/React.createElement("div", {
    ref: multiDragRef
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: classNames.dragButton,
    onMouseDown: e => e.stopPropagation()
  }, dragIcon)))))));
};

const Selectable = styled(SelectableBase, getSelectableStyles, undefined, {
  scope: 'Selectable'
});

const getSelectableElement = ({
  component: Component,
  styles,
  level,
  filter,
  allowReadOnly = false,
  dragIcon
}) => {
  return /*#__PURE__*/forwardRef((_a, ref) => {
    var {
      attributes,
      element
    } = _a,
        props = __rest(_a, ["attributes", "element"]);

    const editor = useEditor();
    const readOnly = useReadOnly();
    const path = useMemo(() => ReactEditor.findPath(editor, element), [editor, element]);
    const filteredOut = useMemo(() => Number.isInteger(level) && level !== path.length - 1 || filter && filter(editor, path), [path, editor]);

    if (filteredOut || !allowReadOnly && readOnly) {
      return /*#__PURE__*/React.createElement(Component, Object.assign({
        attributes: attributes,
        element: element
      }, props));
    }

    return /*#__PURE__*/React.createElement(Selectable, {
      attributes: attributes,
      componentRef: ref,
      element: element,
      styles: styles,
      dragIcon: dragIcon
    }, /*#__PURE__*/React.createElement(Component, Object.assign({
      attributes: attributes,
      element: element
    }, props)));
  });
};

/**
 * Select the start of a block by id and focus the editor.
 */

const focusBlockStartById = (editor, id) => {
  var _a;

  const path = (_a = findNode(editor, {
    at: [],
    match: {
      id
    }
  })) === null || _a === void 0 ? void 0 : _a[1];
  if (!path) return;
  Transforms.select(editor, Editor.start(editor, path));
  ReactEditor.focus(editor);
};

/**
 * Get blocks with an id
 */

const getBlocksWithId = (editor, options) => {
  return [...getNodes(editor, Object.assign({
    match: n => Editor.isBlock(editor, n) && !!n.id
  }, options))];
};

/**
 * Get node entries range.
 */

const getNodesRange = (editor, nodeEntries) => {
  if (!nodeEntries.length) return;
  const firstBlockPath = nodeEntries[0][1];
  const lastBlockPath = nodeEntries[nodeEntries.length - 1][1];
  return Editor.range(editor, firstBlockPath, lastBlockPath);
};

/**
 * Remove blocks with an id and focus the editor.
 */

const removeBlocksAndFocus = (editor, options) => {
  unhangRange(editor, options);
  const nodeEntries = getBlocksWithId(editor, options);
  Transforms.removeNodes(editor, {
    at: getNodesRange(editor, nodeEntries)
  });
  ReactEditor.focus(editor);
};

/**
 * Select the block above the selection by id and focus the editor.
 */

const selectBlockById = (editor, id) => {
  var _a;

  const path = (_a = findNode(editor, {
    at: [],
    match: {
      id
    }
  })) === null || _a === void 0 ? void 0 : _a[1];
  if (!path) return;
  Transforms.select(editor, Editor.range(editor, path));
  ReactEditor.focus(editor);
};

/**
 * Select blocks by selection or by id.
 * If the block with id is not selected, select the block with id.
 * Else, select the blocks above the selection.
 */

const selectBlocksBySelectionOrId = (editor, id) => {
  if (!editor.selection) return;
  const blockEntries = getBlocksWithId(editor, {
    at: editor.selection
  });
  const isBlockSelected = blockEntries.some(blockEntry => blockEntry[0].id === id);

  if (isBlockSelected) {
    Transforms.select(editor, getNodesRange(editor, blockEntries));
    ReactEditor.focus(editor);
  } else {
    selectBlockById(editor, id);
  }
};

/**
 * Convert HTML string into HTML element.
 */
const htmlStringToDOMNode = rawHtml => {
  const node = document.createElement('body');
  node.innerHTML = rawHtml.replace(/(\r\n|\n|\r|\t)/gm, '');
  return node;
};

/**
 * Create a React element wrapped in a Slate provider.
 * By default, it will use an empty editor.
 * TODO: allow other providers
 */

const createElementWithSlate = slateProps => {
  const _a = slateProps || {},
        {
    editor = withReact(createEditor()),
    value = [],
    onChange = () => {},
    children
  } = _a,
        props = __rest(_a, ["editor", "value", "onChange", "children"]);

  return /*#__PURE__*/createElement(Slate, Object.assign({
    editor,
    value,
    onChange
  }, props), children);
};

const trimWhitespace = rawHtml => rawHtml.replace(/(\r\n|\n|\r|\t)/gm, ''); // Remove redundant data attributes


const stripSlateDataAttributes = rawHtml => rawHtml.replace(/( data-slate)(-node|-type)="[^"]+"/gm, '').replace(/( data-testid)="[^"]+"/gm, '');
/**
 * Remove all class names that do not start with one of preserveClassNames (`slate-` by default)
 */


const stripClassNames = (html, {
  preserveClassNames = ['slate-']
}) => {
  const allClasses = html.split(/(class="[^"]*")/g);
  let filteredHtml = '';
  allClasses.forEach((item, index) => {
    if (index % 2 === 0) {
      return filteredHtml += item;
    }

    const preserveRegExp = new RegExp(preserveClassNames.map(cn => `${cn}[^"\\s]*`).join('|'), 'g');
    const slateClassNames = item.match(preserveRegExp);

    if (slateClassNames) {
      filteredHtml += `class="${slateClassNames.join(' ')}"`;
    }
  });
  return filteredHtml;
};

const getNode$1 = ({
  plugins,
  elementProps,
  slateProps,
  preserveClassNames
}) => {
  // If no type provided we wrap children with div tag
  if (!elementProps.element.type) {
    return `<div>${elementProps.children}</div>`;
  }

  let html; // Search for matching plugin based on element type

  plugins.some(plugin => {
    var _a, _b, _c, _d, _e, _f, _g;

    if (!((_a = plugin.serialize) === null || _a === void 0 ? void 0 : _a.element) && !plugin.renderElement) return false;

    if (!((_c = (_b = plugin.deserialize) === null || _b === void 0 ? void 0 : _b.element) === null || _c === void 0 ? void 0 : _c.some(item => item.type === String(elementProps.element.type)))) {
      html = `<div>${elementProps.children}</div>`;
      return false;
    } // Render element using picked plugins renderElement function and ReactDOM


    html = renderToStaticMarkup(createElementWithSlate(Object.assign(Object.assign({}, slateProps), {
      children: (_f = (_e = (_d = plugin.serialize) === null || _d === void 0 ? void 0 : _d.element) === null || _e === void 0 ? void 0 : _e.call(_d, elementProps)) !== null && _f !== void 0 ? _f : (_g = plugin.renderElement) === null || _g === void 0 ? void 0 : _g.call(plugin, elementProps)
    })));
    html = stripClassNames(html, {
      preserveClassNames
    });
    return true;
  });
  return html;
};

const getLeaf = ({
  plugins,
  leafProps,
  slateProps,
  preserveClassNames
}) => {
  const {
    children
  } = leafProps;
  return plugins.reduce((result, plugin) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;

    if (!((_a = plugin.serialize) === null || _a === void 0 ? void 0 : _a.leaf) && !plugin.renderLeaf) return result;
    if (((_d = (_c = (_b = plugin.serialize) === null || _b === void 0 ? void 0 : _b.leaf) === null || _c === void 0 ? void 0 : _c.call(_b, leafProps)) !== null && _d !== void 0 ? _d : (_e = plugin.renderLeaf) === null || _e === void 0 ? void 0 : _e.call(plugin, leafProps)) === children) return result;
    const newLeafProps = Object.assign(Object.assign({}, leafProps), {
      children: encodeURIComponent(result)
    });
    let html = decodeURIComponent(renderToStaticMarkup(createElementWithSlate(Object.assign(Object.assign({}, slateProps), {
      children: (_h = (_g = (_f = plugin.serialize) === null || _f === void 0 ? void 0 : _f.leaf) === null || _g === void 0 ? void 0 : _g.call(_f, leafProps)) !== null && _h !== void 0 ? _h : (_j = plugin.renderLeaf) === null || _j === void 0 ? void 0 : _j.call(plugin, newLeafProps)
    }))));
    html = stripClassNames(html, {
      preserveClassNames
    });
    return html;
  }, children);
};

const isEncoded = (str = '') => {
  try {
    return str !== decodeURIComponent(str);
  } catch (error) {
    return false;
  }
};
/**
 * Convert Slate Nodes into HTML string
 */


const serializeHTMLFromNodes = ({
  plugins,
  nodes,
  slateProps,
  stripDataAttributes = true,
  preserveClassNames
}) => {
  let result = nodes.map(node => {
    if (Text.isText(node)) {
      return getLeaf({
        plugins,
        leafProps: {
          leaf: node,
          text: node,
          children: isEncoded(node.text) ? node.text : encodeURIComponent(node.text),
          attributes: {
            'data-slate-leaf': true
          }
        },
        slateProps,
        preserveClassNames
      });
    }

    return getNode$1({
      plugins,
      elementProps: {
        element: node,
        children: encodeURIComponent(serializeHTMLFromNodes({
          plugins,
          nodes: node.children,
          preserveClassNames
        })),
        attributes: {
          'data-slate-node': 'element',
          ref: null
        }
      },
      slateProps,
      preserveClassNames
    });
  }).join('');
  result = trimWhitespace(decodeURIComponent(result));

  if (stripDataAttributes) {
    result = stripSlateDataAttributes(result);
  }

  return result;
};

/**
 * Deserialize HTML to break line.
 */
const deserializeHTMLToBreak = node => {
  if (node.nodeName === 'BR') {
    return '\n';
  }
};

/**
 * Deserialize HTML to Element.
 */

const deserializeHTMLToElement = ({
  plugins,
  element,
  children
}) => {
  let slateElement;
  let withoutChildren;
  plugins.some(({
    deserialize: pluginDeserializers
  }) => {
    if (!(pluginDeserializers === null || pluginDeserializers === void 0 ? void 0 : pluginDeserializers.element)) return;
    return pluginDeserializers.element.some(deserializer => {
      const deserialized = deserializer.deserialize(element);
      if (!deserialized) return;
      slateElement = deserialized;
      withoutChildren = deserializer.withoutChildren;
      return true;
    });
  });

  if (slateElement) {
    let descendants = children;

    if (!descendants.length || withoutChildren) {
      descendants = [{
        text: ''
      }];
    }

    return jsx('element', slateElement, descendants);
  }
};

/**
 * Deserialize HTML body element to Fragment.
 */

const deserializeHTMLToFragment = ({
  element,
  children
}) => {
  if (element.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }
};

/**
 * Deserialize HTML to Descendant[] with marks on Text.
 * Build the leaf from the leaf deserializers of each plugin.
 */

const deserializeHTMLToMarks = ({
  plugins,
  element,
  children
}) => {
  let leaf = {};
  plugins.forEach(({
    deserialize: pluginDeserializers
  }) => {
    if (!(pluginDeserializers === null || pluginDeserializers === void 0 ? void 0 : pluginDeserializers.leaf)) return;
    pluginDeserializers.leaf.forEach(deserializer => {
      const leafPart = deserializer.deserialize(element);
      if (!leafPart) return;
      leaf = Object.assign(Object.assign({}, leaf), leafPart);
    });
  });
  const fragment = children.reduce((arr, child) => {
    if (!child) return arr;

    if (Element.isElement(child)) {
      if (Object.keys(leaf).length) {
        mergeDeepToNodes({
          node: child,
          source: leaf,
          query: {
            filter: ([n]) => Text.isText(n)
          }
        });
      }

      arr.push(child);
    } else {
      arr.push(jsx('text', leaf, child));
    }

    return arr;
  }, []); // TODO: check inline or fragment style for inline cases.

  if (
  /*!leafMatched &&*/
  element.nodeName === 'DIV' && fragment.length > 0) {
    // no mark matched, just a normal div, we need check whether need add newline at the end.
    const lastFragment = fragment[fragment.length - 1];

    if (Text.isText(lastFragment)) {
      if (lastFragment.text[lastFragment.text.length - 1] !== '\n') {
        //lastFragment.text = lastFragment.text + '\n';
        // FIXME: exclude any span/inline cases.
        lastFragment.endOfBlock = true;
      }
    }
  }

  return fragment;
};

/**
 * Deserialize HTML text node to text.
 */
const deserializeHTMLToText = node => {
  if (node.nodeType === Node.TEXT_NODE) {
    if (node.nodeValue === '\n') {
      const parentNode = node.parentElement;

      if (parentNode.nodeName === 'SPAN') {
        const whiteSpace = getComputedStyle(parentNode).whiteSpace || parentNode.style.whiteSpace;

        if (whiteSpace.slice(0, 3) === 'pre' || whiteSpace === 'break-spaces') {
          return node.textContent;
        }
      }

      return null;
    }

    return node.textContent;
  }
};

/**
 * Deserialize HTML element or child node.
 */

const deserializeHTMLNode = plugins => node => {
  var _a; // text node


  const textNode = deserializeHTMLToText(node);
  if (textNode) return textNode; // if not an element node

  if (node.nodeType !== Node.ELEMENT_NODE) return null;
  const htmlElement = node; // break line

  const breakLine = deserializeHTMLToBreak(node);
  if (breakLine) return breakLine;
  const {
    nodeName
  } = node;
  let parent = node; // blockquote

  if (nodeName === 'PRE' && ((_a = node.childNodes[0]) === null || _a === void 0 ? void 0 : _a.nodeName) === 'CODE') {
    [parent] = node.childNodes;
  } else if (nodeName === 'STYLE') {
    return null;
  }

  const children = Array.from(parent.childNodes).map(deserializeHTMLNode(plugins)).flat(); // body

  const fragment = deserializeHTMLToFragment({
    element: htmlElement,
    children
  });
  if (fragment) return fragment; // element

  const element = deserializeHTMLToElement({
    plugins,
    element: htmlElement,
    children
  });
  if (element) return element; // mark

  return deserializeHTMLToMarks({
    plugins,
    element: htmlElement,
    children
  });
};

/**
 * Deserialize HTML element.
 */

const deserializeHTMLElement = ({
  plugins,
  element
}) => {
  return deserializeHTMLNode(plugins)(element);
};

/**
 * Deserialize HTML element to a valid document fragment.
 */

const deserializeHTMLToDocumentFragment = ({
  plugins,
  element
}) => {
  if (typeof element === 'string') {
    element = htmlStringToDOMNode(element);
  }

  const fragment = deserializeHTMLElement({
    plugins,
    element
  });
  return normalizeDescendantsToDocumentFragment(fragment);
};

/**
 * Deserialize HTML to a valid Slate value.
 */

const deserializeHTMLToDocument = ({
  plugins,
  element
}) => {
  const nodes = deserializeHTMLToDocumentFragment({
    plugins,
    element
  });
  return [{
    children: nodes
  }];
};

/**
 * Enables support for deserializing inserted content from HTML format to Slate format.
 */

const withDeserializeHTML = (_a = {}) => {
  var {
    plugins = []
  } = _a,
      options = __rest(_a, ["plugins"]);

  return editor => {
    const {
      insertData
    } = editor;
    const {
      preInsert = fragment => {
        const inlineTypes = getInlineTypes(plugins);
        const firstNodeType = fragment[0].type; // replace the selected node type by the first block type

        if (isBlockAboveEmpty(editor) && firstNodeType && !inlineTypes.includes(firstNodeType)) {
          Transforms.setNodes(editor, {
            type: fragment[0].type
          });
        }

        return fragment;
      },
      insert = fragment => {
        Transforms.insertFragment(editor, fragment);
      }
    } = options;

    editor.insertData = data => {
      const html = data.getData('text/html');

      if (html) {
        const {
          body
        } = new DOMParser().parseFromString(html, 'text/html');
        let fragment = deserializeHTMLToDocumentFragment({
          plugins,
          element: body
        }); // XXX: if there is any element or non-plain text, we use html parsed fragment,
        //      else use default plain text insertData behavior since it trade newline better.

        if (fragment.some(f => Element.isElement(f) || Object.keys(f).some(k => k !== 'text'))) {
          fragment = preInsert(fragment);
          insert(fragment);
          return;
        }
      }

      insertData(data);
    };

    return editor;
  };
};

function filterBreaklines(item) {
  return !item.text;
}

const getBlockquoteElementStyles = ({
  className
}) => {
  return {
    root: [{
      // Insert css properties
      borderLeft: '2px solid #ddd',
      padding: '10px 20px 10px 16px',
      color: '#aaa',
      margin: '8px 0'
    }, className]
  };
};

const getClassNames$7 = classNamesFunction();
/**
 * BlockquoteElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const BlockquoteElementBase = ({
  attributes,
  children,
  className,
  styles,
  htmlAttributes
}) => {
  const classNames = getClassNames$7(styles, {
    className
  });
  return /*#__PURE__*/createElement("blockquote", Object.assign({}, attributes, {
    className: classNames.root
  }, htmlAttributes), children);
};
/**
 * BlockquoteElement
 */

const BlockquoteElement = styled(BlockquoteElementBase, getBlockquoteElementStyles, undefined, {
  scope: 'BlockquoteElement'
});

const ELEMENT_BLOCKQUOTE = 'blockquote';
const DEFAULTS_BLOCKQUOTE = {
  blockquote: {
    component: BlockquoteElement,
    type: ELEMENT_BLOCKQUOTE,
    hotkey: 'mod+shift+.',
    rootProps: {
      className: 'slate-blockquote',
      as: 'blockquote'
    }
  }
};

const getCodeBlockElementStyles = ({
  className
}) => {
  return {
    root: [{
      // Insert css properties
      fontSize: '16px',
      padding: '12px 16px',
      backgroundColor: 'rgb(247, 246, 243)',
      borderRadius: '3px',
      whiteSpace: 'pre-wrap',
      fontFamily: 'SFMono-Regular, Consolas, Monaco, "Liberation Mono", Menlo, Courier, monospace;',
      tabSize: '2',
      lineHeight: 'normal'
    }, className]
  };
};

const getClassNames$8 = classNamesFunction();
/**
 *   CodeBlockElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const CodeBlockElementBase = ({
  attributes,
  children,
  className,
  styles,
  htmlAttributes
}) => {
  const classNames = getClassNames$8(styles, {
    className
  });
  return /*#__PURE__*/createElement("pre", Object.assign({}, attributes, {
    className: classNames.root
  }, htmlAttributes), /*#__PURE__*/createElement("code", null, children));
};
/**
 * CodeBlockElement
 */

const CodeBlockElement = styled(CodeBlockElementBase, getCodeBlockElementStyles, undefined, {
  scope: 'CodeBlockElement'
});

const getCodeLineElementStyles = ({
  className
}) => {
  return {
    root: [{// Insert css properties
    }, className]
  };
};

const getClassNames$9 = classNamesFunction();
/**
 *   CodeLineElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const CodeLineElementBase = ({
  attributes,
  children,
  className,
  styles,
  htmlAttributes
}) => {
  const classNames = getClassNames$9(styles, {
    className
  });
  return /*#__PURE__*/createElement("div", Object.assign({}, attributes, {
    className: classNames.root
  }, htmlAttributes), children);
};
/**
 * CodeBlockElement
 */

const CodeLineElement = styled(CodeLineElementBase, getCodeLineElementStyles, undefined, {
  scope: 'CodeBlockElement'
});

const MARK_PRISM = 'prism';
const ELEMENT_CODE_BLOCK = 'code_block';
const ELEMENT_CODE_LINE = 'code_line';
const DEFAULTS_CODE_BLOCK = {
  code_block: {
    component: CodeBlockElement,
    type: ELEMENT_CODE_BLOCK,
    hotkey: ['mod+opt+8', 'mod+shift+8'],
    rootProps: {
      className: 'slate-code-block'
    }
  },
  code_line: {
    component: CodeLineElement,
    type: ELEMENT_CODE_LINE,
    rootProps: {
      className: 'slate-code-line'
    }
  }
}; // `
// javascript:
// abap: ABAP
// arduino: Arduino
// bash: Bash
// basic: BASIC
// c: C
// clojure: Clojure
// coffeescript: CoffeeScript
// cpp: C++
// csharp: C#
// css: CSS
// dart: Dart
// diff: Diff
// docker: Docker
// elixir: Elixir
// elm: Elm
// erlang: Erlang
// flow: Flow
// fortran: Fortran
// fsharp: F#
// gherkin: Gherkin
// glsl: GLSL
// go: Go
// graphql: GraphQL
// groovy: Groovy
// haskell
// less
// livescript
// lua
// makefile
// markup
// matlab
// nix
// objectivec
// ocaml
// pascal
// perl
// prolog
// purebasic
// r
// reason
// scss
// scala
// scheme
// sql
// swift
// vbnet
// verilog
// vhdl
// visual-basic
// wasm
// `;

const CODE_BLOCK_LANGUAGES = {
  antlr4: 'ANTLR4',
  bash: 'Bash',
  c: 'C',
  csharp: 'C#',
  css: 'CSS',
  coffeescript: 'CoffeeScript',
  cmake: 'CMake',
  django: 'Django',
  docker: 'Docker',
  ejs: 'EJS',
  erlang: 'Erlang',
  git: 'Git',
  go: 'Go',
  graphql: 'GraphQL',
  groovy: 'Groovy',
  html: 'HTML',
  java: 'Java',
  javascript: 'JavaScript',
  json: 'JSON',
  kotlin: 'Kotlin',
  latex: 'LaTeX',
  less: 'Less',
  lua: 'Lua',
  makefile: 'Makefile',
  markdown: 'Markdown',
  matlab: 'MATLAB',
  markup: 'Markup',
  objectivec: 'Objective-C',
  perl: 'Perl',
  php: 'PHP',
  powershell: 'PowerShell',
  properties: '.properties',
  protobuf: 'Protocol Buffers',
  python: 'Python',
  r: 'R',
  jsx: 'React JSX',
  tsx: 'React TSX',
  ruby: 'Ruby',
  sass: 'Sass (Sass)',
  scss: 'Sass (Scss)',
  scala: 'Scala',
  scheme: 'Scheme',
  sql: 'SQL',
  shell: 'Shell',
  swift: 'Swift',
  svg: 'SVG',
  typescript: 'TypeScript',
  wasm: 'WebAssembly',
  yaml: 'YAML',
  xml: 'XML'
};

const ELEMENT_H1 = 'h1';
const ELEMENT_H2 = 'h2';
const ELEMENT_H3 = 'h3';
const ELEMENT_H4 = 'h4';
const ELEMENT_H5 = 'h5';
const ELEMENT_H6 = 'h6';
const baseMargin = 4.8;
const baseFontSize = 16;
const DEFAULTS_HEADING = {
  h1: {
    component: StyledElement,
    type: ELEMENT_H1,
    rootProps: {
      className: `slate-${ELEMENT_H1}`,
      as: 'h1',
      styles: {
        root: {
          fontWeight: '400',
          marginTop: 0,
          marginBottom: `${baseMargin * 2.5}px`,
          fontSize: `${baseFontSize * 20 / 11}px`,
          lineHeight: '36px',
          selectors: {
            ':not(:first-child)': {
              marginTop: '30px'
            }
          }
        }
      }
    }
  },
  h2: {
    component: StyledElement,
    type: ELEMENT_H2,
    rootProps: {
      className: `slate-${ELEMENT_H2}`,
      as: 'h2',
      styles: {
        root: {
          fontWeight: '400',
          marginTop: 0,
          marginBottom: `${baseMargin * 1.5}px`,
          fontSize: `${baseFontSize * 16 / 11}px`,
          lineHeight: '28px',
          selectors: {
            ':not(:first-child)': {
              marginTop: '18px'
            }
          }
        }
      }
    }
  },
  h3: {
    component: StyledElement,
    type: ELEMENT_H3,
    rootProps: {
      className: `slate-${ELEMENT_H3}`,
      as: 'h3',
      styles: {
        root: {
          color: '#434343',
          fontWeight: '400',
          marginTop: 0,
          marginBottom: `${baseMargin * 1.25}px`,
          fontSize: `${baseFontSize * 14 / 11}px`,
          selectors: {
            ':not(:first-child)': {
              marginTop: '8px'
            }
          }
        }
      }
    }
  },
  h4: {
    component: StyledElement,
    type: ELEMENT_H4,
    rootProps: {
      className: `slate-${ELEMENT_H4}`,
      as: 'h4',
      styles: {
        root: {
          color: '#666666',
          fontWeight: '400',
          marginTop: 0,
          marginBottom: `${baseMargin}px`,
          fontSize: `${baseFontSize * 12 / 11}px`,
          selectors: {
            ':not(:first-child)': {
              marginTop: '8px'
            }
          }
        }
      }
    }
  },
  h5: {
    component: StyledElement,
    type: ELEMENT_H5,
    rootProps: {
      className: `slate-${ELEMENT_H5}`,
      as: 'h5',
      styles: {
        root: {
          color: '#666666',
          fontWeight: '400',
          marginTop: 0,
          marginBottom: `${baseMargin}px`,
          fontSize: `${baseFontSize}px`,
          selectors: {
            ':not(:first-child)': {
              marginTop: '8px'
            }
          }
        }
      }
    }
  },
  h6: {
    component: StyledElement,
    type: ELEMENT_H6,
    rootProps: {
      className: `slate-${ELEMENT_H6}`,
      as: 'h6',
      styles: {
        root: {
          color: '#666666',
          fontWeight: '400',
          fontStyle: 'italic',
          marginTop: 0,
          marginBottom: `${baseMargin}px`,
          fontSize: `${baseFontSize}px`,
          selectors: {
            ':not(:first-child)': {
              marginTop: '8px'
            }
          }
        }
      }
    }
  },
  levels: 6
};

const getLinkElementStyles = ({
  className
}) => {
  return {
    root: [{
      // Insert css properties
      textDecoration: 'initial',
      color: '#0078d4',
      selectors: {
        ':hover, :visited:hover': {
          color: '#004578',
          textDecoration: 'underline'
        },
        ':visited': {
          color: '#0078d4'
        }
      }
    }, className]
  };
};

const getClassNames$a = classNamesFunction();
/**
 * LinkElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const LinkElementBase = ({
  attributes,
  children,
  element,
  styles,
  className,
  htmlAttributes
}) => {
  const classNames = getClassNames$a(styles, {
    className
  });
  return /*#__PURE__*/createElement("a", Object.assign({}, attributes, {
    href: element.url,
    className: classNames.root
  }, htmlAttributes), children);
};
/**
 * LinkElement
 */

const LinkElement = styled(LinkElementBase, getLinkElementStyles, undefined, {
  scope: 'LinkElement'
});

const ELEMENT_LINK = 'a';
const ATTRIBUTE_LINK = 'url';
const DEFAULTS_LINK = {
  link: {
    component: LinkElement,
    type: ELEMENT_LINK,
    attribute: ATTRIBUTE_LINK,
    isUrl,
    rootProps: {
      className: 'slate-link'
    }
  }
};

const ELEMENT_PARAGRAPH = 'p';
const DEFAULTS_PARAGRAPH = {
  p: {
    component: StyledElement,
    type: ELEMENT_PARAGRAPH,
    hotkey: ['mod+opt+0', 'mod+shift+0'],
    rootProps: {
      className: `slate-${ELEMENT_PARAGRAPH}`,
      as: 'p'
    }
  }
};

const ELEMENT_UL = 'ul';
const ELEMENT_OL = 'ol';
const ELEMENT_LI = 'li';
const DEFAULTS_LIST = Object.assign({
  ul: {
    component: StyledElement,
    type: ELEMENT_UL,
    rootProps: {
      className: 'slate-ul',
      as: 'ul',
      styles: {
        root: {
          paddingInlineStart: '24px',
          marginBlockStart: '0',
          marginBlockEnd: '0'
        }
      }
    }
  },
  ol: {
    component: StyledElement,
    type: ELEMENT_OL,
    rootProps: {
      className: 'slate-ol',
      as: 'ol',
      styles: {
        root: {
          paddingInlineStart: '24px',
          marginBlockStart: '0',
          marginBlockEnd: '0'
        }
      }
    }
  },
  li: {
    component: StyledElement,
    type: ELEMENT_LI,
    rootProps: {
      className: 'slate-li',
      as: 'li'
    }
  }
}, DEFAULTS_PARAGRAPH);

const parseMD = options => content => {
  const {
    p,
    blockquote,
    link,
    code,
    ul,
    ol,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6
  } = setDefaults(options, {
    p: {
      type: ELEMENT_PARAGRAPH
    },
    blockquote: {
      type: ELEMENT_BLOCKQUOTE
    },
    link: {
      type: ELEMENT_LINK,
      attribute: ATTRIBUTE_LINK
    },
    code: {
      type: ELEMENT_CODE_BLOCK
    },
    ul: {
      type: ELEMENT_UL
    },
    ol: {
      type: ELEMENT_OL
    },
    li: {
      type: ELEMENT_LI
    },
    h1: {
      type: ELEMENT_H1
    },
    h2: {
      type: ELEMENT_H2
    },
    h3: {
      type: ELEMENT_H3
    },
    h4: {
      type: ELEMENT_H4
    },
    h5: {
      type: ELEMENT_H5
    },
    h6: {
      type: ELEMENT_H6
    }
  });
  const tree = unified().use(markdown).use(slate, {
    nodeTypes: {
      paragraph: p.type,
      block_quote: blockquote.type,
      link: link.type,
      code_block: code.type,
      ul_list: ul.type,
      ol_list: ol.type,
      listItem: li.type,
      heading: {
        1: h1.type,
        2: h2.type,
        3: h3.type,
        4: h4.type,
        5: h5.type,
        6: h6.type
      }
    },
    linkDestinationKey: link.attribute
  }).processSync(content);
  return tree.result;
};

/**
 * Enables support for deserializing content
 * from Markdown format to Slate format.
 */

const withDeserializeMd = options => editor => {
  const {
    insertData
  } = editor;

  editor.insertData = data => {
    const content = data.getData('text/plain');

    if (content) {
      const fragment = parseMD(options)(content);
      if (!fragment.length) return;

      if (fragment[0].type) {
        Transforms.setNodes(editor, {
          type: fragment[0].type
        });
      }

      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};

const CLASS_TODO_LIST = 'slate-todo-list';
const CLASS_TODO_LIST_CHECKED = 'slate-todo-list-checked';

const getTodoListElementStyles = ({
  className,
  checked
}) => {
  let rootClassName = className;
  if (checked) rootClassName += ` ${CLASS_TODO_LIST_CHECKED}`;
  return {
    root: [{
      display: 'flex',
      flexDirection: 'row',
      padding: '3px 0'
    }, rootClassName],
    checkboxWrapper: {
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '24px',
      height: '24px',
      marginRight: '6px'
    },
    checkbox: {
      width: '16px',
      height: '16px',
      margin: '0'
    },
    text: {
      flex: 1,
      opacity: checked ? 0.666 : 1,
      textDecoration: checked ? 'line-through' : 'none',
      selectors: {
        ':focus': {
          outline: 'none'
        }
      }
    }
  };
};

const getClassNames$b = classNamesFunction();
/**
 * TodoListElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const TodoListElementBase = ({
  attributes,
  children,
  element,
  className,
  styles,
  htmlAttributes
}) => {
  const editor = useEditor();
  const readOnly = useReadOnly();
  const {
    checked
  } = element;
  const classNames = getClassNames$b(styles, {
    className,
    // Other style props
    checked
  });
  return /*#__PURE__*/createElement("div", Object.assign({}, attributes, {
    className: classNames.root
  }, htmlAttributes), /*#__PURE__*/createElement("div", {
    contentEditable: false,
    className: classNames.checkboxWrapper
  }, /*#__PURE__*/createElement("input", {
    "data-testid": "TodoListElementCheckbox",
    className: classNames.checkbox,
    type: "checkbox",
    checked: !!checked,
    onChange: e => {
      const path = ReactEditor.findPath(editor, element);
      Transforms.setNodes(editor, {
        checked: e.target.checked
      }, {
        at: path
      });
    }
  })), /*#__PURE__*/createElement("span", {
    className: classNames.text,
    contentEditable: !readOnly,
    suppressContentEditableWarning: true
  }, children));
};
/**
 * TodoListElement
 */

const TodoListElement = styled(TodoListElementBase, getTodoListElementStyles, undefined, {
  scope: 'TodoListElement'
});

const ELEMENT_TODO_LI = 'action_item';
const DEFAULTS_TODO_LIST = {
  todo_li: {
    component: TodoListElement,
    type: ELEMENT_TODO_LI,
    hotkey: ['mod+opt+4', 'mod+shift+4'],
    rootProps: {
      className: CLASS_TODO_LIST
    }
  }
};

const deserializeTodoList = options => {
  const {
    todo_li
  } = setDefaults(options, DEFAULTS_TODO_LIST);
  return {
    element: getNodeDeserializer({
      type: todo_li.type,
      node: el => ({
        type: todo_li.type,
        checked: el.classList.contains(CLASS_TODO_LIST_CHECKED)
      }),
      rules: [{
        className: todo_li.rootProps.className
      }]
    })
  };
};

const renderElementTodoList = options => {
  const {
    todo_li
  } = setDefaults(options, DEFAULTS_TODO_LIST);
  return getRenderElement(todo_li);
};

const TodoListPlugin = options => ({
  renderElement: renderElementTodoList(options),
  deserialize: deserializeTodoList(options),
  onKeyDown: getOnHotkeyToggleNodeTypeDefault({
    key: 'todo_li',
    defaultOptions: DEFAULTS_TODO_LIST,
    options
  })
});

const deserializeBlockquote = options => {
  var _a;

  const {
    blockquote
  } = setDefaults(options, DEFAULTS_BLOCKQUOTE);
  return {
    element: getElementDeserializer(Object.assign({
      type: blockquote.type,
      rules: [{
        nodeNames: 'BLOCKQUOTE'
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.blockquote) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderElementBlockquote = options => {
  const {
    blockquote
  } = setDefaults(options, DEFAULTS_BLOCKQUOTE);
  return getRenderElement(blockquote);
};

/**
 * Enables support for block quotes, useful for
 * quotations and passages.
 */

const BlockquotePlugin = options => ({
  renderElement: renderElementBlockquote(options),
  deserialize: deserializeBlockquote(options),
  onKeyDown: getOnHotkeyToggleNodeTypeDefault({
    key: 'blockquote',
    defaultOptions: DEFAULTS_BLOCKQUOTE,
    options
  })
});

/**
 * Insert a code block: set the node to code line and wrap it with a code block.
 * If the cursor is not at the block start, insert break before.
 */

const insertCodeBlock = (editor, options = {}, pluginsOptions = {}) => {
  if (!editor.selection || isExpanded(editor.selection)) return;
  const {
    code_line,
    code_block
  } = setDefaults(pluginsOptions, DEFAULTS_CODE_BLOCK);

  const matchCodeElements = node => node.type === code_block.type || node.type === code_line.type;

  if (someNode(editor, {
    match: matchCodeElements
  })) {
    return;
  }

  if (!isSelectionAtBlockStart(editor)) {
    editor.insertBreak();
  }

  Transforms.setNodes(editor, {
    type: code_line.type,
    children: [{
      text: ''
    }]
  }, options);
  wrapNodes(editor, {
    type: code_block.type,
    children: []
  }, options);
};

/**
 * Called by toolbars to make sure a code-block gets inserted below a paragraph
 * rather than awkwardly splitting the current selection.
 */

const insertEmptyCodeBlock = (editor, options = {}, pluginsOptions = {}) => {
  if (!editor.selection) return;
  const defaultType = pluginsOptions.defaultType || DEFAULT_ELEMENT;
  const level = pluginsOptions.level || 1;

  if (isExpanded(editor.selection) || !isBlockAboveEmpty(editor)) {
    const selectionPath = Editor.path(editor, editor.selection);
    const insertPath = Path.next(selectionPath.slice(0, level + 1));
    Transforms.insertNodes(editor, {
      type: defaultType,
      children: [{
        text: ''
      }]
    }, {
      at: insertPath,
      select: true
    });
  }

  insertCodeBlock(editor, options, pluginsOptions);
};

const ToolbarCodeBlock = _a => {
  var {
    options = {}
  } = _a,
      props = __rest(_a, ["options"]);

  const {
    code_block
  } = setDefaults(options, DEFAULTS_CODE_BLOCK);
  const editor = useSlate();
  return /*#__PURE__*/createElement(ToolbarElement, Object.assign({
    type: code_block.type,
    onMouseDown: getPreventDefaultHandler(insertEmptyCodeBlock, editor, {
      select: true
    }, options)
  }, props));
};

// import 'prismjs/components/prism-antlr4';
const decorateCodeBlock = options => entry => {
  const ranges = [];
  const [node, path] = entry;
  const {
    code_block
  } = setDefaults(options, DEFAULTS_CODE_BLOCK);

  if (node.type === code_block.type) {
    const text = Node$1.string(node); // const langName: any = parent.lang || 'markup';

    const langName = 'javascript';
    const lang = languages[langName]; // if (lang) {

    const tokens = tokenize(text, lang);
    let offset = 0;

    for (const element of tokens) {
      if (typeof element === 'string') {
        offset += element.length;
      } else {
        const token = element;
        ranges.push({
          anchor: {
            path,
            offset
          },
          focus: {
            path,
            offset: offset + token.length
          },
          className: `prism-token token ${token.type} `,
          prism: true
        });
        offset += token.length;
      }
    } // }

  }

  return ranges;
};

const deserializeCodeBlock = options => {
  var _a, _b;

  const {
    code_block,
    code_line
  } = setDefaults(options, DEFAULTS_CODE_BLOCK);
  return {
    element: [...getElementDeserializer(Object.assign({
      type: code_block.type,
      rules: [{
        nodeNames: 'PRE'
      }, {
        className: code_block.rootProps.className
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.code_block) === null || _a === void 0 ? void 0 : _a.deserialize)), ...getElementDeserializer(Object.assign({
      type: code_line.type,
      rules: [{
        className: code_line.rootProps.className
      }]
    }, (_b = options === null || options === void 0 ? void 0 : options.code_line) === null || _b === void 0 ? void 0 : _b.deserialize))]
  };
};

/**
 * If at (default = selection) is in ul>li>p, return li and ul node entries.
 */

const getCodeLineEntry = (editor, {
  at = editor.selection
} = {}, options) => {
  const {
    code_line
  } = setDefaults(options, DEFAULTS_CODE_BLOCK);

  if (at && someNode(editor, {
    at,
    match: {
      type: code_line.type
    }
  })) {
    const selectionParent = getParent(editor, at);
    if (!selectionParent) return;
    const [, parentPath] = selectionParent;
    const codeLine = getAbove(editor, {
      at,
      match: {
        type: code_line.type
      }
    }) || getParent(editor, parentPath);
    if (!codeLine) return;
    const [codeLineNode, codeLinePath] = codeLine;
    if (codeLineNode.type !== code_line.type) return;
    const codeBlock = getParent(editor, codeLinePath);
    if (!codeBlock) return;
    return {
      codeBlock,
      codeLine
    };
  }
};

/**
 * Indent if:
 * - the selection is expanded
 * - the selected code line has no whitespace character
 * Indentation = 2 spaces.
 */

const indentCodeLine = (editor, {
  codeLine
}) => {
  var _a;

  const [, codeLinePath] = codeLine;
  const codeLineStart = Editor.start(editor, codeLinePath);

  if (!isExpanded(editor.selection)) {
    const cursor = (_a = editor.selection) === null || _a === void 0 ? void 0 : _a.anchor;
    const range = Editor.range(editor, codeLineStart, cursor);
    const text = Editor.string(editor, range);

    if (/\S/.test(text)) {
      Transforms.insertText(editor, '  ', {
        at: editor.selection
      });
      return;
    }
  }

  Transforms.insertText(editor, '  ', {
    at: codeLineStart
  });
};

/**
 * If there is a whitespace character at the start of the code line,
 * delete it.
 */

const deleteStartSpace = (editor, {
  codeLine
}) => {
  const [, codeLinePath] = codeLine;
  const codeLineStart = Editor.start(editor, codeLinePath);
  const codeLineEnd = codeLineStart && Editor.after(editor, codeLineStart);
  const spaceRange = codeLineEnd && Editor.range(editor, codeLineStart, codeLineEnd);
  const spaceText = getText(editor, spaceRange);

  if (/\s/.test(spaceText)) {
    Transforms.delete(editor, {
      at: spaceRange
    });
    return true;
  }

  return false;
};

/**
 * Outdent the code line.
 * Remove 2 whitespace characters if any.
 */

const outdentCodeLine = (editor, {
  codeBlock,
  codeLine
}) => {
  const deleted = deleteStartSpace(editor, {
    codeBlock,
    codeLine
  });
  deleted && deleteStartSpace(editor, {
    codeBlock,
    codeLine
  });
};

/**
 * If at (default = selection) is in ul>li>p, return li and ul node entries.
 */

const getCodeLines = (editor, {
  at = editor.selection
} = {}, options) => {
  if (!at) return;
  const {
    code_line
  } = setDefaults(options, DEFAULTS_CODE_BLOCK);
  return [...getNodes(editor, {
    at,
    match: {
      type: code_line.type
    }
  })];
};

const getIndentDepth = (editor, {
  codeLine
}) => {
  const [, codeLinePath] = codeLine;
  const text = getText(editor, codeLinePath);
  return text.search(/\S|$/);
};

/**
 * - Shift+Tab: outdent code line.
 * - Tab: indent code line.
 */

const onKeyDownCodeBlock = options => (e, editor) => {
  if (e.key === 'Tab') {
    const shiftTab = e.shiftKey;
    const res = getCodeLineEntry(editor, {}, options);

    if (res) {
      const {
        codeBlock,
        codeLine
      } = res;
      e.preventDefault(); // outdent with shift+tab

      if (shiftTab) {
        // TODO: outdent multiple lines
        outdentCodeLine(editor, {
          codeBlock,
          codeLine
        });
      } // indent with tab


      const tab = !e.shiftKey;

      if (tab) {
        // TODO: indent multiple lines
        indentCodeLine(editor, {
          codeBlock,
          codeLine
        });
      }

      return;
    }

    const codeLines = getCodeLines(editor, {}, options);

    if (codeLines && (codeLines === null || codeLines === void 0 ? void 0 : codeLines[0])) {
      e.preventDefault();
      const [, firstLinePath] = codeLines[0];
      const codeBlock = getParent(editor, firstLinePath);

      for (const codeLine of codeLines) {
        if (shiftTab) {
          // TODO: outdent multiple lines
          outdentCodeLine(editor, {
            codeBlock,
            codeLine
          });
        } // indent with tab


        const tab = !e.shiftKey;

        if (tab) {
          // TODO: indent multiple lines
          indentCodeLine(editor, {
            codeBlock,
            codeLine
          });
        }
      }
    }
  } // FIXME: would prefer this as mod+a, but doesn't work


  if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
    const res = getCodeLineEntry(editor, {}, options);
    if (!res) return;
    const {
      codeBlock
    } = res;
    const [, codeBlockPath] = codeBlock; // select the whole code block

    Transforms.select(editor, codeBlockPath);
    e.preventDefault();
    e.stopPropagation();
  } // Note: rather than handling mod+enter/mod+shift+enter here, we recommend
  // using the exit-break plugin/ If not using exit-break, follow similar logic
  // to exit-break to add behavior to exit the code-block

};

const renderElementCodeBlock = options => {
  const {
    code_block,
    code_line
  } = setDefaults(options, DEFAULTS_CODE_BLOCK);
  return getRenderElements([code_block, code_line]);
};

const renderLeafCodeBlock = () => ({
  leaf,
  children
}) => {
  if (leaf[MARK_PRISM] && !!leaf.text) {
    return /*#__PURE__*/createElement("span", {
      className: leaf === null || leaf === void 0 ? void 0 : leaf.className
    }, children);
  }

  return children;
};

const CodeBlockPlugin = options => ({
  renderElement: renderElementCodeBlock(options),
  renderLeaf: renderLeafCodeBlock(),
  deserialize: deserializeCodeBlock(options),
  decorate: decorateCodeBlock(),
  onKeyDown: onKeyDownCodeBlock(options)
});

/**
 * Insert a code line starting with indentation.
 */

const insertCodeLine = (editor, indentDepth = 0, options) => {
  const {
    code_line
  } = setDefaults(options, DEFAULTS_CODE_BLOCK);

  if (editor.selection) {
    const indent = ' '.repeat(indentDepth);
    Transforms.insertNodes(editor, {
      type: code_line.type,
      children: [{
        text: indent
      }]
    });
  }
};

const unwrapCodeBlock = (editor, options) => {
  const {
    code_block,
    code_line
  } = setDefaults(options, DEFAULTS_CODE_BLOCK);
  unwrapNodes(editor, {
    match: {
      type: code_line.type
    }
  });
  unwrapNodes(editor, {
    match: {
      type: code_block.type
    },
    split: true
  });
};

const toggleCodeBlock = (editor, options) => {
  if (!editor.selection) return;
  const {
    code_block,
    code_line
  } = setDefaults(options, DEFAULTS_CODE_BLOCK);
  const isActive = someNode(editor, {
    match: {
      type: code_block.type
    }
  });
  unwrapCodeBlock(editor, options);
  Transforms.setNodes(editor, {
    type: code_line.type
  });

  if (!isActive) {
    const codeBlock = {
      type: code_block.type,
      children: []
    };
    wrapNodes(editor, codeBlock);
    const nodes = [...getNodes(editor, {
      match: {
        type: code_line.type
      }
    })];
    const codeLine = {
      type: code_block.type,
      children: []
    };

    for (const [, path] of nodes) {
      // Transforms.wrapNodes(editor, codeLine, {
      Transforms.setNodes(editor, codeLine, {
        at: path
      });
    }
  }
};

const withCodeBlock = (options = {}) => editor => {
  const {
    insertBreak
  } = editor;

  const insertBreakCodeBlock = () => {
    if (editor.selection) return;
    const res = getCodeLineEntry(editor, {}, options);
    if (!res) return;
    const {
      codeBlock,
      codeLine
    } = res;
    const indentDepth = getIndentDepth(editor, {
      codeBlock,
      codeLine
    });
    insertCodeLine(editor, indentDepth, options);
    return true;
  };

  editor.insertBreak = () => {
    if (insertBreakCodeBlock()) return;
    insertBreak();
  };

  return editor;
};

const deserializeHeading = options => {
  var _a, _b, _c, _d, _e, _f;

  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    levels
  } = setDefaults(options, DEFAULTS_HEADING);
  let deserializers = getElementDeserializer(Object.assign({
    type: h1.type,
    rules: [{
      nodeNames: 'H1'
    }]
  }, (_a = options === null || options === void 0 ? void 0 : options.h1) === null || _a === void 0 ? void 0 : _a.deserialize));
  if (levels >= 2) deserializers = [...deserializers, ...getElementDeserializer(Object.assign({
    type: h2.type,
    rules: [{
      nodeNames: 'H2'
    }]
  }, (_b = options === null || options === void 0 ? void 0 : options.h2) === null || _b === void 0 ? void 0 : _b.deserialize))];
  if (levels >= 3) deserializers = [...deserializers, ...getElementDeserializer(Object.assign({
    type: h3.type,
    rules: [{
      nodeNames: 'H3'
    }]
  }, (_c = options === null || options === void 0 ? void 0 : options.h3) === null || _c === void 0 ? void 0 : _c.deserialize))];
  if (levels >= 4) deserializers = [...deserializers, ...getElementDeserializer(Object.assign({
    type: h4.type,
    rules: [{
      nodeNames: 'H4'
    }]
  }, (_d = options === null || options === void 0 ? void 0 : options.h4) === null || _d === void 0 ? void 0 : _d.deserialize))];
  if (levels >= 5) deserializers = [...deserializers, ...getElementDeserializer(Object.assign({
    type: h5.type,
    rules: [{
      nodeNames: 'H5'
    }]
  }, (_e = options === null || options === void 0 ? void 0 : options.h5) === null || _e === void 0 ? void 0 : _e.deserialize))];
  if (levels >= 6) deserializers = [...deserializers, ...getElementDeserializer(Object.assign({
    type: h6.type,
    rules: [{
      nodeNames: 'H6'
    }]
  }, (_f = options === null || options === void 0 ? void 0 : options.h6) === null || _f === void 0 ? void 0 : _f.deserialize))];
  return {
    element: deserializers
  };
};

/**
 * Font sizes are relative to the base font size
 * H1 - fs * 20/11
 * H2 - fs * 16/11
 * H3 - fs * 14/11
 * H4 - fs * 12/11
 * H5 - fs * 1
 * H6 - fs * 1
 */

const renderElementHeading = options => props => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    levels
  } = setDefaults(options, DEFAULTS_HEADING);
  const renderElementsOptions = [];

  const checkRenderElement = (level, optionsValues) => {
    if (levels >= level) renderElementsOptions.push(optionsValues);
  };

  checkRenderElement(1, h1);
  checkRenderElement(2, h2);
  checkRenderElement(3, h3);
  checkRenderElement(4, h4);
  checkRenderElement(5, h5);
  checkRenderElement(6, h6);
  return getRenderElements(renderElementsOptions)(props);
};

/**
 * Enables support for headings with configurable levels
 * (from 1 to 6).
 */

const HeadingPlugin = options => ({
  renderElement: renderElementHeading(options),
  deserialize: deserializeHeading(options),
  onKeyDown: getOnHotkeyToggleNodeTypeDefault({
    key: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    defaultOptions: DEFAULTS_HEADING,
    options
  })
});

const deserializeParagraph = options => {
  var _a;

  const {
    p
  } = setDefaults(options, DEFAULTS_PARAGRAPH);
  return {
    element: getElementDeserializer(Object.assign({
      type: p.type,
      rules: [{
        nodeNames: 'P'
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.p) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderElementParagraph = options => {
  const {
    p
  } = setDefaults(options, DEFAULTS_PARAGRAPH);
  return getRenderElement(p);
};

/**
 * Enables support for paragraphs.
 */

const ParagraphPlugin = options => ({
  renderElement: renderElementParagraph(options),
  deserialize: deserializeParagraph(options),
  onKeyDown: getOnHotkeyToggleNodeTypeDefault({
    key: 'p',
    defaultOptions: DEFAULTS_PARAGRAPH,
    options
  })
});

const BasicElementPlugins = options => [BlockquotePlugin(options), CodeBlockPlugin(options), HeadingPlugin(options), ParagraphPlugin(options)];

const getImageElementStyles = ({
  className,
  focused,
  selected
}) => {
  return {
    root: [{// Insert css properties
    }, className],
    img: {
      display: 'block',
      maxWidth: '100%',
      maxHeight: '20em',
      padding: '10px 0',
      boxShadow: focused && selected ? '0 0 0 3px #B4D5FF' : 'none'
    }
  };
};

const getClassNames$c = classNamesFunction();
/**
 * ImageElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const ImageElementBase = ({
  attributes,
  children,
  element,
  className,
  styles,
  htmlAttributes
}) => {
  const {
    url
  } = element;
  const focused = useFocused();
  const selected = useSelected();
  const classNames = getClassNames$c(styles, {
    className,
    // Other style props
    focused,
    selected
  });
  return /*#__PURE__*/createElement("div", Object.assign({}, attributes, {
    className: classNames.root
  }), /*#__PURE__*/createElement("div", {
    contentEditable: false
  }, /*#__PURE__*/createElement("img", Object.assign({
    "data-testid": "ImageElementImage",
    className: classNames.img,
    src: url,
    alt: ""
  }, htmlAttributes))), children);
};
/**
 * ImageElement
 */

const ImageElement = styled(ImageElementBase, getImageElementStyles, undefined, {
  scope: 'ImageElement'
});

const ELEMENT_IMAGE = 'img';
const DEFAULTS_IMAGE = {
  img: {
    component: ImageElement,
    type: ELEMENT_IMAGE,
    rootProps: {
      className: 'slate-img'
    }
  }
};

const insertImage = (editor, url, options) => {
  const {
    img
  } = setDefaults(options, DEFAULTS_IMAGE);
  const text = {
    text: ''
  };
  const image = {
    type: img.type,
    url,
    children: [text]
  };
  Transforms.insertNodes(editor, image);
};

const ToolbarImage = _a => {
  var {
    img
  } = _a,
      props = __rest(_a, ["img"]);

  const editor = useEditor();
  return /*#__PURE__*/createElement(ToolbarButton, Object.assign({
    onMouseDown: async event => {
      var _a;

      event.preventDefault();
      let url;

      if (((_a = img === null || img === void 0 ? void 0 : img.rootProps) === null || _a === void 0 ? void 0 : _a.getImageUrl) != null) {
        url = await img.rootProps.getImageUrl();
      } else {
        url = window.prompt('Enter the URL of the image:');
      }

      if (!url) return;
      insertImage(editor, url, {
        img
      });
    }
  }, props));
};

const deserializeImage = options => {
  var _a;

  const {
    img
  } = setDefaults(options, DEFAULTS_IMAGE);
  return {
    element: getNodeDeserializer(Object.assign({
      type: img.type,
      node: el => ({
        type: img.type,
        url: el.getAttribute('src')
      }),
      rules: [{
        nodeNames: 'IMG'
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.img) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderElementImage = options => {
  const {
    img
  } = setDefaults(options, DEFAULTS_IMAGE);
  return getRenderElement(img);
};

/**
 * Enables support for images.
 */

const ImagePlugin = options => {
  const {
    img
  } = setDefaults(options, DEFAULTS_IMAGE);
  return {
    renderElement: renderElementImage(options),
    deserialize: deserializeImage(options),
    voidTypes: [img.type]
  };
};

const isImageUrl = url => {
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

/**
 * Allows for pasting images from clipboard.
 * Not yet: dragging and dropping images, selecting them through a file system dialog.
 * @param options.type
 * @param options.uploadImage
 */

const withImageUpload = options => editor => {
  const {
    insertData
  } = editor;

  editor.insertData = data => {
    const text = data.getData('text/plain');
    const {
      files
    } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          reader.addEventListener('load', async () => {
            var _a;

            if (!reader.result) {
              return;
            }

            const uploadedUrl = ((_a = options === null || options === void 0 ? void 0 : options.img) === null || _a === void 0 ? void 0 : _a.uploadImage) ? await options.img.uploadImage(reader.result) : reader.result;
            insertImage(editor, uploadedUrl);
          });
          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text, options);
    } else {
      insertData(data);
    }
  };

  return editor;
};

/**
 * Wrap selected nodes with a link and collapse at the end.
 */

const wrapLink = (editor, url, options) => {
  const {
    at,
    link
  } = setDefaults(options, DEFAULTS_LINK);
  wrapNodes(editor, {
    type: link.type,
    url,
    children: []
  }, {
    at,
    split: true
  });
};

/**
 * Unwrap link at a location (default: selection).
 * Then, the focus of the location is set to selection focus.
 * Then, wrap the link at the location.
 */

const upsertLinkAtSelection = (editor, url, options) => {
  if (!editor.selection) return;
  const {
    link,
    wrap
  } = setDefaults(options, DEFAULTS_LINK);

  if (!wrap && isCollapsed(editor.selection)) {
    return Transforms.insertNodes(editor, {
      type: link.type,
      url,
      children: [{
        text: url
      }]
    });
  } // if our cursor is inside an existing link, but don't have the text selected, select it now


  if (wrap && isCollapsed(editor.selection)) {
    const linkLeaf = Editor.leaf(editor, editor.selection);
    const [, inlinePath] = linkLeaf;
    Transforms.select(editor, inlinePath);
  }

  unwrapNodes(editor, {
    at: editor.selection,
    match: {
      type: link.type
    }
  });
  wrapLink(editor, url, {
    link,
    at: editor.selection
  });
  Transforms.collapse(editor, {
    edge: 'end'
  });
};

const ToolbarLink = _a => {
  var {
    link
  } = _a,
      props = __rest(_a, ["link"]);

  const options = setDefaults({
    link
  }, DEFAULTS_LINK);
  const editor = useSlate();
  const isLink = someNode(editor, {
    match: {
      type: options.link.type
    }
  });
  return /*#__PURE__*/createElement(ToolbarButton, Object.assign({
    active: isLink,
    onMouseDown: event => {
      event.preventDefault();
      let prevUrl = '';
      const linkNode = getAbove(editor, {
        match: {
          type: options.link.type
        }
      });

      if (linkNode) {
        prevUrl = linkNode[0].url;
      }

      const url = window.prompt(`Enter the URL of the link:`, prevUrl);

      if (!url) {
        linkNode && editor.selection && unwrapNodes(editor, {
          at: editor.selection,
          match: {
            type: options.link.type
          }
        });
        return;
      } // If our cursor is in middle of a link, then we don't want to inser it inline


      const shouldWrap = linkNode !== undefined && isCollapsed(editor.selection);
      upsertLinkAtSelection(editor, url, Object.assign({
        wrap: shouldWrap
      }, options));
    }
  }, props));
};

const deserializeLink = options => {
  var _a;

  const {
    link
  } = setDefaults(options, DEFAULTS_LINK);
  return {
    element: getNodeDeserializer(Object.assign({
      type: link.type,
      node: el => ({
        type: link.type,
        url: el.getAttribute('href')
      }),
      rules: [{
        nodeNames: 'A'
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.link) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderElementLink = options => {
  const {
    link
  } = setDefaults(options, DEFAULTS_LINK);
  return getRenderElement(link);
};

/**
 * Enables support for hyperlinks.
 */

const LinkPlugin = options => {
  const {
    link
  } = setDefaults(options, DEFAULTS_LINK);
  return {
    renderElement: renderElementLink(options),
    deserialize: deserializeLink(options),
    inlineTypes: [link.type]
  };
};

/**
 * Remove nodes with empty text.
 */

const withRemoveEmptyNodes = options => editor => {
  const types = castArray_1(options.type);
  const {
    normalizeNode
  } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (node.type && types.includes(node.type) && Node$1.string(node) === '') {
      Transforms.removeNodes(editor, {
        at: path
      });
      return;
    }

    normalizeNode([node, path]);
  };

  return editor;
};

const upsertLink = (editor, url, _a) => {
  var {
    at
  } = _a,
      options = __rest(_a, ["at"]);

  const {
    link
  } = setDefaults(options, DEFAULTS_LINK);
  unwrapNodes(editor, {
    at,
    match: {
      type: link.type
    }
  });
  const newSelection = editor.selection;
  wrapLink(editor, url, {
    link,
    at: Object.assign(Object.assign({}, at), {
      focus: newSelection.focus
    })
  });
};

const upsertLinkIfValid = (editor, {
  link,
  isUrl
}) => {
  const rangeFromBlockStart = getRangeFromBlockStart(editor);
  const textFromBlockStart = getText(editor, rangeFromBlockStart);

  if (rangeFromBlockStart && isUrl(textFromBlockStart)) {
    upsertLink(editor, textFromBlockStart, {
      at: rangeFromBlockStart,
      link
    });
    return true;
  }
};
/**
 * Insert space after a url to wrap a link.
 * Lookup from the block start to the cursor to check if there is an url.
 * If not found, lookup before the cursor for a space character to check the url.
 *
 * On insert data:
 * Paste a string inside a link element will edit its children text but not its url.
 *
 */


const withLink = options => editor => {
  const {
    link,
    isUrl: isUrl$1
  } = setDefaults(options, Object.assign(Object.assign({}, DEFAULTS_LINK), {
    isUrl: isUrl
  }));
  const {
    insertData,
    insertText
  } = editor;
  const DEFAULT_RANGE_BEFORE_OPTIONS = {
    matchString: ' ',
    skipInvalid: true,
    afterMatch: true,
    multiPaths: true
  };
  const rangeOptions = Object.assign(Object.assign({}, DEFAULT_RANGE_BEFORE_OPTIONS), get_1(options, 'rangeBeforeOptions', {}));

  editor.insertText = text => {
    if (text === ' ' && isCollapsed(editor.selection)) {
      const selection = editor.selection;

      if (upsertLinkIfValid(editor, {
        link,
        isUrl: isUrl$1
      })) {
        return insertText(text);
      }

      const beforeWordRange = getRangeBefore(editor, selection, rangeOptions);

      if (beforeWordRange) {
        const beforeWordText = getText(editor, beforeWordRange);

        if (isUrl$1(beforeWordText)) {
          upsertLink(editor, beforeWordText, {
            at: beforeWordRange,
            link
          });
        }
      }
    }

    insertText(text);
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');

    if (text) {
      if (someNode(editor, {
        match: {
          type: link.type
        }
      })) {
        return insertText(text);
      }

      if (isUrl$1(text)) {
        return upsertLinkAtSelection(editor, text, {
          link
        });
      }
    }

    insertData(data);
  }; // editor.insertBreak = () => {
  //   if (upsertLinkIfValid(editor, { link, isUrl })) {
  //     console.info('fix cursor');
  //   }
  //
  //   insertBreak();
  // };


  editor = withRemoveEmptyNodes({
    type: link.type
  })(editor);
  return editor;
};

const unwrapList = (editor, options) => {
  const {
    li,
    ul,
    ol
  } = setDefaults(options, DEFAULTS_LIST);
  unwrapNodes(editor, {
    match: {
      type: li.type
    }
  });
  unwrapNodes(editor, {
    match: {
      type: [ul.type, ol.type]
    },
    split: true
  });
};

const toggleList = (editor, _a) => {
  var {
    typeList
  } = _a,
      options = __rest(_a, ["typeList"]);

  if (!editor.selection) return;
  const {
    p,
    li
  } = setDefaults(options, DEFAULTS_LIST);
  const isActive = someNode(editor, {
    match: {
      type: typeList
    }
  });
  unwrapList(editor, options);
  Transforms.setNodes(editor, {
    type: p.type
  });

  if (!isActive) {
    const list = {
      type: typeList,
      children: []
    };
    wrapNodes(editor, list);
    const nodes = [...getNodes(editor, {
      match: {
        type: p.type
      }
    })];
    const listItem = {
      type: li.type,
      children: []
    };

    for (const [, path] of nodes) {
      Transforms.wrapNodes(editor, listItem, {
        at: path
      });
    }
  }
};

const ToolbarList = _a => {
  var {
    typeList = ELEMENT_UL
  } = _a,
      props = __rest(_a, ["typeList"]);

  const editor = useSlate();
  return /*#__PURE__*/createElement(ToolbarElement, Object.assign({
    type: typeList,
    onMouseDown: getPreventDefaultHandler(toggleList, editor, Object.assign(Object.assign({}, props), {
      typeList
    }))
  }, props));
};

const getListTypes = options => {
  const {
    ul,
    ol
  } = setDefaults(options, DEFAULTS_LIST);
  return [ol.type, ul.type];
};

/**
 * If the list item has no child: insert an empty paragraph.
 * Else: move the children that are not valid to the paragraph.
 */

const normalizeListItem = (editor, {
  nodeEntry,
  validLiChildrenTypes = []
}, options) => {
  var _a;

  const {
    p,
    ul,
    ol
  } = setDefaults(options, DEFAULTS_LIST);
  const allValidLiChildrenTypes = [ul.type, ol.type, p.type, ...validLiChildrenTypes];
  const [listItemNode, listItemPath] = nodeEntry;
  const firstChildPath = listItemPath.concat([0]);
  const firstChild = (_a = listItemNode.children) === null || _a === void 0 ? void 0 : _a[0];

  if (!firstChild) {
    insertEmptyElement(editor, p.type, {
      at: firstChildPath
    });
    return true;
  }

  const children = getChildren(nodeEntry);
  const inlinePathRefs = children.filter(([child]) => !allValidLiChildrenTypes.includes(child.type)).map(([, childPath]) => Editor.pathRef(editor, childPath)); // Ensure that all lists have a <p> tag as a first element

  if (firstChild.type !== p.type) {
    insertEmptyElement(editor, p.type, {
      at: firstChildPath
    });
  } // Ensure that any text nodes under the list are inside the <p>


  for (const ref of inlinePathRefs.reverse()) {
    const path = ref.unref();

    if (path) {
      Transforms.moveNodes(editor, {
        at: path,
        to: firstChildPath.concat([0])
      });
    }
  }

  return inlinePathRefs.length > 0;
};

/**
 * Normalize list node to force the ul>li>p+ul structure.
 */

const getListNormalizer = (editor, {
  validLiChildrenTypes
}, options) => {
  const {
    li
  } = setDefaults(options, DEFAULTS_LIST);
  const {
    normalizeNode
  } = editor;
  return ([node, path]) => {
    if (match(node, {
      type: getListTypes(options)
    })) {
      if (!node.children.length) {
        return Transforms.removeNodes(editor, {
          at: path
        });
      }
    }

    if (node.type === li.type) {
      if (normalizeListItem(editor, {
        nodeEntry: [node, path],
        validLiChildrenTypes
      }, options)) {
        // Tree changed - kick off another normalization
        return;
      }
    }

    normalizeNode([node, path]);
  };
};

const deserializeList = options => {
  var _a, _b, _c;

  const {
    li,
    ul,
    ol
  } = setDefaults(options, DEFAULTS_LIST);
  return {
    element: [...getElementDeserializer(Object.assign({
      type: ul.type,
      rules: [{
        nodeNames: 'UL'
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.ul) === null || _a === void 0 ? void 0 : _a.deserialize)), ...getElementDeserializer(Object.assign({
      type: ol.type,
      rules: [{
        nodeNames: 'OL'
      }]
    }, (_b = options === null || options === void 0 ? void 0 : options.ol) === null || _b === void 0 ? void 0 : _b.deserialize)), ...getElementDeserializer(Object.assign({
      type: li.type,
      rules: [{
        nodeNames: 'LI'
      }]
    }, (_c = options === null || options === void 0 ? void 0 : options.li) === null || _c === void 0 ? void 0 : _c.deserialize))]
  };
};

/**
 * If at (default = selection) is in ul>li>p, return li and ul node entries.
 */

const getListItemEntry = (editor, {
  at = editor.selection
} = {}, options) => {
  const {
    li
  } = setDefaults(options, DEFAULTS_LIST);

  if (at && someNode(editor, {
    at,
    match: {
      type: li.type
    }
  })) {
    const selectionParent = getParent(editor, at);
    if (!selectionParent) return;
    const [, paragraphPath] = selectionParent; // If selection range includes root list item

    if (Range.isRange(at) && !isCollapsed(at) && paragraphPath.length === 1) {
      at = at.focus.path;
    }

    const listItem = getAbove(editor, {
      at,
      match: {
        type: li.type
      }
    }) || getParent(editor, paragraphPath);
    if (!listItem) return;
    const [listItemNode, listItemPath] = listItem;
    if (listItemNode.type !== li.type) return;
    const list = getParent(editor, listItemPath);
    if (!list) return;
    return {
      list,
      listItem
    };
  }
};

/**
 * Is selection across blocks with list items
 */

const isAcrossListItems = (editor, options) => {
  const {
    li
  } = setDefaults(options, DEFAULTS_LIST);
  const {
    selection
  } = editor;

  if (!selection || isCollapsed(selection)) {
    return false;
  }

  const isAcrossBlocks = isRangeAcrossBlocks(editor);
  if (!isAcrossBlocks) return false;
  return someNode(editor, {
    match: {
      type: li.type
    }
  });
};

const moveListItemDown = (editor, {
  list,
  listItem
}, options) => {
  const [listNode] = list;
  const [, listItemPath] = listItem; // Previous sibling is the new parent

  const previousSiblingItem = Editor.node(editor, Path.previous(listItemPath));

  if (previousSiblingItem) {
    const [previousNode, previousPath] = previousSiblingItem;
    const sublist = previousNode.children.find(n => match(n, {
      type: getListTypes(options)
    }));
    const newPath = previousPath.concat(sublist ? [1, sublist.children.length] : [1]);

    if (!sublist) {
      // Create new sublist
      Transforms.wrapNodes(editor, {
        type: listNode.type,
        children: []
      }, {
        at: listItemPath
      });
    } // Move the current item to the sublist


    Transforms.moveNodes(editor, {
      at: listItemPath,
      to: newPath
    });
  }
};

/**
 * Is there a list child in the node.
 */

const hasListChild = (node, options) => node.children.some(n => match(n, {
  type: getListTypes(options)
}));

/**
 * Move the list items of the sublist of `fromListItem` to `toList` (if `fromListItem` is defined).
 * Move the list items of `fromList` to `toList` (if `fromList` is defined).
 */

const moveListItemsToList = (editor, {
  fromList,
  fromListItem,
  fromStartIndex,
  to: _to,
  toList,
  toListIndex = null,
  deleteFromList = true
}, options) => {
  let fromListPath;

  if (fromListItem) {
    const fromListItemSublist = findDescendant(editor, {
      at: fromListItem[1],
      match: {
        type: getListTypes(options)
      }
    });
    if (!fromListItemSublist) return 0;
    fromListPath = fromListItemSublist === null || fromListItemSublist === void 0 ? void 0 : fromListItemSublist[1];
  } else if (fromList) {
    // eslint-disable-next-line prefer-destructuring
    fromListPath = fromList[1];
  } else {
    return;
  }

  let to = null;
  if (_to) to = _to;

  if (toList) {
    if (toListIndex !== null) to = toList[1].concat([toListIndex]);else {
      const lastChildPath = getLastChildPath(toList);
      to = Path.next(lastChildPath);
    }
  }

  if (!to) return;
  const moved = moveChildren(editor, {
    at: fromListPath,
    to,
    fromStartIndex
  }); // Remove the empty list

  if (deleteFromList) {
    Transforms.delete(editor, {
      at: fromListPath
    });
  }

  return moved;
};

/**
 * Move a list item up.
 */

const moveListItemUp = (editor, {
  list,
  listItem
}, options) => {
  const move = () => {
    const {
      li
    } = setDefaults(options, DEFAULTS_LIST);
    const [listNode, listPath] = list;
    const [liNode, liPath] = listItem;
    const liParent = getAbove(editor, {
      at: listPath,
      match: {
        type: li.type
      }
    });

    if (!liParent) {
      const toListPath = Path.next(listPath);
      const condA = hasListChild(liNode, options);
      const condB = !isLastChild(list, liPath);

      if (condA || condB) {
        // Insert a new list next to `list`
        Transforms.insertNodes(editor, {
          type: listNode.type,
          children: []
        }, {
          at: toListPath
        });
      }

      if (condA) {
        const toListNode = getNode(editor, toListPath);
        if (!toListNode) return; // Move li sub-lis to the new list

        moveListItemsToList(editor, {
          fromListItem: listItem,
          toList: [toListNode, toListPath]
        }, options);
      } // If there is siblings li, move them to the new list


      if (condB) {
        const toListNode = getNode(editor, toListPath);
        if (!toListNode) return; // Move next lis to the new list

        moveListItemsToList(editor, {
          fromList: list,
          fromStartIndex: liPath[liPath.length - 1] + 1,
          toList: [toListNode, toListPath],
          deleteFromList: false
        }, options);
      } // Finally, unwrap the list


      unwrapList(editor, options);
      return true;
    }

    const [, liParentPath] = liParent;
    const toListPath = liPath.concat([1]); // If li has next siblings, we need to move them.

    if (!isLastChild(list, liPath)) {
      // If li has no sublist, insert one.
      if (!hasListChild(liNode, options)) {
        Transforms.insertNodes(editor, {
          type: listNode.type,
          children: []
        }, {
          at: toListPath
        });
      }

      const toListNode = getNode(editor, toListPath);
      if (!toListNode) return; // Move next siblings to li sublist.

      moveListItemsToList(editor, {
        fromListItem: liParent,
        toList: [toListNode, toListPath],
        fromStartIndex: liPath[liPath.length - 1] + 1,
        deleteFromList: false
      }, options);
    }

    const movedUpLiPath = Path.next(liParentPath); // Move li one level up: next to the li parent.

    Transforms.moveNodes(editor, {
      at: liPath,
      to: movedUpLiPath
    });
    return true;
  };

  let moved = false;
  Editor.withoutNormalizing(editor, () => {
    moved = move();
  });
  return moved;
};

const onKeyDownList = options => (e, editor) => {
  let moved = false;

  if (e.key === 'Tab') {
    const res = getListItemEntry(editor, {}, options);
    if (!res) return; // TODO: handle multiple li

    if (isAcrossListItems(editor, options)) return;
    const {
      list,
      listItem
    } = res;
    const [, listItemPath] = listItem;
    e.preventDefault(); // move up with shift+tab

    const shiftTab = e.shiftKey;

    if (shiftTab) {
      moved = moveListItemUp(editor, {
        list,
        listItem
      }, options);
      if (moved) e.preventDefault();
    } // move down with tab


    const tab = !e.shiftKey;

    if (tab && !isFirstChild(listItemPath)) {
      moveListItemDown(editor, {
        list,
        listItem
      }, options);
    }
  }
};

const renderElementList = options => {
  const {
    ul,
    ol,
    li
  } = setDefaults(options, DEFAULTS_LIST);
  return getRenderElements([ul, ol, li]);
};

/**
 * Enables support for bulleted, numbered and to-do lists.
 */

const ListPlugin = options => ({
  renderElement: renderElementList(options),
  deserialize: deserializeList(options),
  onKeyDown: onKeyDownList(options)
});

/**
 * Find the highest end list that can be deleted.
 * Its path should be different to diffListPath.
 * If the highest end list 2+ items, return liPath.
 * Get the parent list until:
 * - the list has less than 2 items.
 * - its path is not equals to diffListPath.
 */

const getHighestEmptyList = (editor, liPath, diffListPath, options) => {
  const {
    li
  } = setDefaults(options, DEFAULTS_LIST);
  const list = getAbove(editor, {
    at: liPath,
    match: {
      type: getListTypes(options)
    }
  });
  if (!list) return;
  const [listNode, listPath] = list;

  if (!diffListPath || !Path.equals(listPath, diffListPath)) {
    if (listNode.children.length < 2) {
      const liParent = getAbove(editor, {
        at: listPath,
        match: {
          type: li.type
        }
      });

      if (liParent) {
        return getHighestEmptyList(editor, liParent[1], diffListPath, options) || listPath;
      }
    }

    return liPath;
  }
};

/**
 * Searches upward for the root list element
 */

const getListRoot = (editor, at = editor.selection, options) => {
  var _a;

  if (!at) return;
  const {
    ol,
    ul
  } = setDefaults(options, DEFAULTS_LIST);
  const parentList = getAbove(editor, {
    at,
    match: {
      type: [ul.type, ol.type]
    }
  });

  if (parentList) {
    const [, parentListPath] = parentList;
    return (_a = getListRoot(editor, parentListPath, options)) !== null && _a !== void 0 ? _a : parentList;
  }
};

/**
 * Is the list nested, i.e. its parent is a list item.
 */

const isListNested = (editor, listPath, options) => {
  const {
    li
  } = setDefaults(options, DEFAULTS_LIST);
  const [listParentNode] = Editor.parent(editor, listPath);
  return listParentNode.type === li.type;
};

const deleteFragmentList = (editor, options) => {
  let deleted = false;
  Editor.withoutNormalizing(editor, () => {
    const {
      li
    } = setDefaults(options, DEFAULTS_LIST); // Selection should be across list items

    if (!isAcrossListItems(editor, options)) return;
    /**
     * Check if the end li can be deleted (if it has no sublist).
     * Store the path ref to delete it after deleteFragment.
     */

    const end = Editor.end(editor, editor.selection);
    const liEnd = getAbove(editor, {
      at: end,
      match: {
        type: li.type
      }
    });
    const liEndCanBeDeleted = liEnd && !hasListChild(liEnd[0], options);
    const liEndPathRef = liEndCanBeDeleted ? Editor.pathRef(editor, liEnd[1]) : undefined;
    /**
     * Delete fragment and move end block children to start block
     */

    deleteFragment(editor, {
      moveNode: (_editor, {
        at
      }) => {
        if (!editor.selection) return;
        const [, path] = Editor.node(editor, at);
        const blockAbove = getBlockAbove(editor, {
          at: Range.start(editor.selection)
        });
        if (!blockAbove) return;
        const [blockAboveNode, blockAbovePath] = blockAbove;
        moveChildren(editor, {
          at: path,
          to: blockAbovePath.concat(blockAboveNode.children.length)
        });
      },
      removeEmptyAncestor: () => {}
    });
    const start = Editor.start(editor, editor.selection);
    const liStart = getAbove(editor, {
      at: start,
      match: {
        type: li.type
      }
    });

    if (liEndPathRef) {
      const liEndPath = liEndPathRef.unref();
      const listStart = liStart && getParent(editor, liStart[1]);
      const deletePath = getHighestEmptyList(editor, liEndPath, listStart === null || listStart === void 0 ? void 0 : listStart[1], options);

      if (deletePath) {
        Transforms.removeNodes(editor, {
          at: deletePath
        });
      }

      deleted = true;
    }
  });
  return deleted;
};

const onKeyDownResetBlockType = ({
  rules
}) => (event, editor) => {
  let reset;

  if (editor.selection && isCollapsed(editor.selection)) {
    rules.forEach(({
      types,
      defaultType,
      hotkey,
      predicate,
      onReset
    }) => {
      if (!event || hotkey && isHotkey(hotkey, event)) {
        if (predicate(editor) && someNode(editor, {
          match: {
            type: types
          }
        })) {
          event === null || event === void 0 ? void 0 : event.preventDefault();
          Transforms.setNodes(editor, {
            type: defaultType
          });
          onReset === null || onReset === void 0 ? void 0 : onReset(editor);
          reset = true;
        }
      }
    });
  }

  return reset;
};

/**
 * If list is not nested and if li is not the first child, move li up.
 */

const removeFirstListItem = (editor, {
  list,
  listItem
}, options) => {
  const [, listPath] = list;
  const [, listItemPath] = listItem;

  if (!isListNested(editor, listPath, options) && isFirstChild(listItemPath)) {
    moveListItemUp(editor, {
      list,
      listItem
    }, options);
    return true;
  }

  return false;
};

/**
 * Move fromListItem sublist list items to the end of `toListItem` sublist.
 * If there is no `toListItem` sublist, insert one.
 */

const moveListItemSublistItemsToListItemSublist = (editor, {
  fromListItem,
  toListItem,
  start
}, options) => {
  const [, fromListItemPath] = fromListItem;
  const [, toListItemPath] = toListItem;
  const fromListItemSublist = findDescendant(editor, {
    at: fromListItemPath,
    match: {
      type: getListTypes(options)
    }
  });
  if (!fromListItemSublist) return 0;
  const [, fromListItemSublistPath] = fromListItemSublist;
  const toListItemSublist = findDescendant(editor, {
    at: toListItemPath,
    match: {
      type: getListTypes(options)
    }
  });
  let to;

  if (!toListItemSublist) {
    const fromList = getParent(editor, fromListItemPath);
    if (!fromList) return 0;
    const [fromListNode] = fromList;
    const fromListType = fromListNode.type;
    const toListItemSublistPath = toListItemPath.concat([1]);
    Transforms.insertNodes(editor, {
      type: fromListType,
      children: []
    }, {
      at: toListItemSublistPath
    });
    to = toListItemSublistPath.concat([0]);
  } else if (start) {
    const [, toListItemSublistPath] = toListItemSublist;
    to = toListItemSublistPath.concat([0]);
  } else {
    to = Path.next(getLastChildPath(toListItemSublist));
  }

  const moved = moveChildren(editor, {
    at: fromListItemSublistPath,
    to
  }); // Remove the empty list

  Transforms.delete(editor, {
    at: fromListItemSublistPath
  });
  return moved;
};

/**
 * Remove list item and move its sublist to list if any.
 */

const removeListItem = (editor, {
  list,
  listItem
}, options) => {
  const {
    p,
    li
  } = setDefaults(options, DEFAULTS_LIST);
  const [liNode, liPath] = listItem; // Stop if the list item has no sublist

  if (isExpanded(editor.selection) || !hasListChild(liNode, options)) {
    return false;
  }

  const previousLiPath = getPreviousPath(liPath);
  /**
   * If there is a previous li, we need to move sub-lis to the previous li.
   * As we need to delete first, we will:
   * 1. insert a temporary li: tempLi
   * 2. move sub-lis to tempLi
   * 3. delete
   * 4. move sub-lis from tempLi to the previous li.
   * 5. remove tempLi
   */

  if (previousLiPath) {
    const previousLi = Editor.node(editor, previousLiPath); // 1

    let tempLiPath = Path.next(liPath);
    Transforms.insertNodes(editor, {
      type: li.type,
      children: [{
        type: p.type,
        children: [{
          text: ''
        }]
      }]
    }, {
      at: tempLiPath
    });
    const tempLi = Editor.node(editor, tempLiPath);
    const tempLiPathRef = Editor.pathRef(editor, tempLi[1]); // 2

    moveListItemSublistItemsToListItemSublist(editor, {
      fromListItem: listItem,
      toListItem: tempLi
    }, options); // 3

    deleteFragment(editor, {
      reverse: true
    });
    tempLiPath = tempLiPathRef.unref(); // 4

    moveListItemSublistItemsToListItemSublist(editor, {
      fromListItem: [tempLi[0], tempLiPath],
      toListItem: previousLi
    }, options); // 5

    Transforms.removeNodes(editor, {
      at: tempLiPath
    });
    return true;
  } // If it's the first li, move the sublist to the parent list


  moveListItemsToList(editor, {
    fromListItem: listItem,
    toList: list,
    toListIndex: 1
  }, options);
};

const deleteBackwardList = (editor, unit, options) => {
  const {
    p,
    li
  } = setDefaults(options, DEFAULTS_LIST);
  const res = getListItemEntry(editor, {}, options);

  if (res) {
    const {
      list,
      listItem
    } = res;
    const [listItemNode] = listItem;

    if (isSelectionAtBlockStart(editor)) {
      let moved;
      Editor.withoutNormalizing(editor, () => {
        moved = removeFirstListItem(editor, {
          list,
          listItem
        }, options);
        if (moved) return;
        moved = removeListItem(editor, {
          list,
          listItem
        }, options);

        if (!moved) {
          deleteFragment(editor, {
            unit,
            reverse: true
          });
        }

        moved = true; // moved = moveListItemUp(editor, { list, listItem }, options);
      });
      if (moved) return true;
    }

    if (hasListChild(listItemNode) && isCollapsed(editor.selection)) {
      return;
    }
  }

  const resetBlockTypesListRule = {
    types: [li.type],
    defaultType: p.type,
    onReset: _editor => unwrapList(_editor, options)
  };
  return onKeyDownResetBlockType({
    rules: [Object.assign(Object.assign({}, resetBlockTypesListRule), {
      predicate: () => isSelectionAtBlockStart(editor)
    })]
  })(null, editor);
};

/**
 * Insert list item if selection in li>p.
 * TODO: test
 */

const insertListItem = (editor, options) => {
  const {
    p,
    li
  } = setDefaults(options, DEFAULTS_LIST);

  if (editor.selection) {
    const paragraphEntry = getAbove(editor, {
      match: {
        type: p.type
      }
    });
    if (!paragraphEntry) return;
    const [, paragraphPath] = paragraphEntry;
    const listItemEntry = getParent(editor, paragraphPath);
    if (!listItemEntry) return;
    const [listItemNode, listItemPath] = listItemEntry;
    if (listItemNode.type !== li.type) return;

    if (!Range.isCollapsed(editor.selection)) {
      Transforms.delete(editor);
    }

    const isStart = Editor.isStart(editor, editor.selection.focus, paragraphPath);
    const isEnd = isBlockTextEmptyAfterSelection(editor);
    const nextParagraphPath = Path.next(paragraphPath);
    const nextListItemPath = Path.next(listItemPath);
    /**
     * If start, insert a list item before
     */

    if (isStart) {
      Transforms.insertNodes(editor, {
        type: li.type,
        children: [{
          type: p.type,
          children: [{
            text: ''
          }]
        }]
      }, {
        at: listItemPath
      });
      return true;
    }
    /**
     * If not end, split nodes, wrap a list item on the new paragraph and move it to the next list item
     */
    // if (!isEnd) {


    Editor.withoutNormalizing(editor, () => {
      if (!isEnd) {
        Transforms.splitNodes(editor);
      } else {
        const marks = Editor.marks(editor) || {};
        Transforms.insertNodes(editor, {
          type: p.type,
          children: [Object.assign({
            text: ''
          }, marks)]
        }, {
          at: nextParagraphPath
        });
      }

      Transforms.wrapNodes(editor, {
        type: li.type,
        children: []
      }, {
        at: listItemPath,
        match: (n, p) => p.length === nextParagraphPath.length && !Path.isBefore(p, nextParagraphPath)
      });
      Transforms.moveNodes(editor, {
        at: nextParagraphPath,
        to: nextListItemPath
      });
      Transforms.select(editor, nextListItemPath);
      Transforms.collapse(editor, {
        edge: 'start'
      });
    }); // } else {
    //   /**
    //    * If end, insert a list item after and select it
    //    */
    //   const marks = Editor.marks(editor) || {};
    //   Transforms.insertNodes(
    //     editor,
    //     {
    //       type: li.type,
    //       children: [{ type: p.type, children: [{ text: '', ...marks }] }],
    //     },
    //     { at: nextListItemPath }
    //   );
    //   Transforms.select(editor, nextListItemPath);
    // }

    /**
     * If there is a list in the list item, move it to the next list item
     */
    // if (listItemNode.children.length > 1) {
    //   Transforms.moveNodes(editor, {
    //     at: nextParagraphPath,
    //     to: nextListItemPath.concat(1),
    //   });
    // }

    return true;
  }
};

const insertBreakList = (editor, options) => {
  if (!editor.selection) return;
  const {
    p,
    li
  } = setDefaults(options, DEFAULTS_LIST);
  const res = getListItemEntry(editor, {}, options);
  let moved; // If selection is in a li

  if (res) {
    const {
      list,
      listItem
    } = res; // If selected li is empty, move it up.

    if (isBlockAboveEmpty(editor)) {
      moved = moveListItemUp(editor, {
        list,
        listItem
      }, options);
      if (moved) return true;
    }
  }

  const resetBlockTypesListRule = {
    types: [li.type],
    defaultType: p.type,
    onReset: _editor => unwrapList(_editor, options)
  };
  const didReset = onKeyDownResetBlockType({
    rules: [Object.assign(Object.assign({}, resetBlockTypesListRule), {
      predicate: () => !moved && isBlockAboveEmpty(editor)
    })]
  })(null, editor);
  if (didReset) return true;
  /**
   * If selection is in li > p, insert li.
   */

  if (!moved) {
    const inserted = insertListItem(editor, options);
    if (inserted) return true;
  }
};

const moveListSiblingsAfterCursor = (editor, {
  at,
  to
}, options) => {
  const offset = at[at.length - 1];
  at = Path.parent(at);
  const listNode = Node$1.get(editor, at);
  const listEntry = [listNode, at];

  if (!match(listNode, {
    type: getListTypes(options)
  }) || Path.isParent(at, to) // avoid moving nodes within its own list
  ) {
      return 0;
    }

  return moveChildren(editor, {
    at: listEntry,
    to,
    fromStartIndex: offset + 1
  });
};

const ListHotkey = {
  TAB: 'Tab',
  ENTER: 'Enter',
  DELETE_BACKWARD: 'Backspace'
};

const withList = (_a = {}) => {
  var {
    validLiChildrenTypes
  } = _a,
      options = __rest(_a, ["validLiChildrenTypes"]);

  return editor => {
    const {
      insertBreak,
      deleteBackward,
      deleteFragment
    } = editor;

    editor.insertBreak = () => {
      if (insertBreakList(editor, options)) return;
      insertBreak();
    };

    editor.deleteBackward = unit => {
      if (deleteBackwardList(editor, unit, options)) return;
      deleteBackward(unit);
    };

    editor.deleteFragment = () => {
      if (deleteFragmentList(editor, options)) return;
      deleteFragment();
    };

    editor.normalizeNode = getListNormalizer(editor, {
      validLiChildrenTypes
    }, options);
    return editor;
  };
};

const getMentionElementStyles = ({
  className,
  focused,
  selected
}) => {
  return {
    root: [{
      // Insert css properties
      padding: '3px 3px 2px',
      margin: '0 1px',
      verticalAlign: 'baseline',
      display: 'inline-block',
      borderRadius: '4px',
      backgroundColor: '#eee',
      fontSize: '0.9em',
      boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none'
    }, className]
  };
};

const getClassNames$d = classNamesFunction();
/**
 *   MentionElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const MentionElementBase = ({
  attributes,
  children,
  element,
  prefix,
  className,
  styles,
  htmlAttributes,
  as: Tag = 'span',
  onClick,
  renderLabel = mentionable => mentionable.value
}) => {
  const selected = useSelected();
  const focused = useFocused();
  const classNames = getClassNames$d(styles, {
    className,
    // Other style props
    selected,
    focused
  });
  return /*#__PURE__*/createElement(Tag, Object.assign({}, attributes, {
    "data-slate-value": element.value,
    className: classNames.root,
    contentEditable: false,
    onClick: getHandler(onClick, element)
  }, htmlAttributes), prefix, renderLabel(element), children);
};
/**
 * MentionElement
 */

const MentionElement = styled(MentionElementBase, getMentionElementStyles, undefined, {
  scope: 'MentionElement'
});

const classNames$5 = {
  root: 'slate-MentionSelect',
  mentionItem: 'slate-MentionSelect-mentionItem',
  mentionItemSelected: 'slate-MentionSelect-mentionItemSelected'
};
const getMentionSelectStyles = ({
  className
} = {}) => {
  const mentionItem = [classNames$5.mentionItem, {
    padding: '1px 3px',
    borderRadius: '3px',
    background: 'transparent',
    cursor: 'pointer'
  }];
  const mentionItemSelected = [classNames$5.mentionItemSelected, ...mentionItem, {
    background: '#B4D5FF'
  }];
  return {
    root: [classNames$5.root, {
      top: '-9999px',
      left: '-9999px',
      position: 'absolute',
      zIndex: 1,
      padding: '3px',
      background: 'white',
      borderRadius: '4px',
      boxShadow: '0 1px 5px rgba(0,0,0,.2)'
    }, className],
    mentionItem,
    mentionItemSelected
  };
};

const getClassNames$e = classNamesFunction();
const MentionSelectBase = _a => {
  var {
    className,
    styles,
    at,
    options,
    valueIndex,
    onClickMention,
    renderLabel = mentionable => mentionable.value
  } = _a,
      props = __rest(_a, ["className", "styles", "at", "options", "valueIndex", "onClickMention", "renderLabel"]);

  const classNames = getClassNames$e(styles, {
    className
  });
  const ref = useRef();
  const editor = useSlate();
  useEffect(() => {
    if (at && options.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, at);
      const rect = domRange.getBoundingClientRect();

      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [options.length, editor, at]);

  if (!at || !options.length) {
    return null;
  }

  return /*#__PURE__*/createElement(PortalBody, null, /*#__PURE__*/createElement("div", Object.assign({
    ref: ref,
    className: classNames.root
  }, props), options.map((option, i) => /*#__PURE__*/createElement("div", {
    key: `${i}${option.value}`,
    className: i === valueIndex ? classNames.mentionItemSelected : classNames.mentionItem,
    onMouseDown: getPreventDefaultHandler(onClickMention, editor, option)
  }, renderLabel(option)))));
};
const MentionSelect = styled(MentionSelectBase, getMentionSelectStyles, undefined, {
  scope: 'MentionSelect'
});

const ELEMENT_MENTION = 'mention';
const DEFAULTS_MENTION = {
  mention: {
    component: MentionElement,
    type: ELEMENT_MENTION,
    rootProps: {
      className: 'slate-mention',
      prefix: '@'
    }
  }
};

const deserializeMention = options => {
  var _a;

  const {
    mention
  } = setDefaults(options, DEFAULTS_MENTION);
  return {
    element: getNodeDeserializer(Object.assign({
      type: mention.type,
      node: el => ({
        type: mention.type,
        value: el.getAttribute('data-slate-value')
      }),
      rules: [{
        className: mention.rootProps.className
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.mention) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderElementMention = options => {
  const {
    mention
  } = setDefaults(options, DEFAULTS_MENTION);
  return getRenderElement(mention);
};

/**
 * Enables support for autocompleting @mentions and #tags.
 * When typing a configurable marker, such as @ or #, a select
 * component appears with autocompleted suggestions.
 */

const MentionPlugin = options => {
  const {
    mention
  } = setDefaults(options, DEFAULTS_MENTION);
  return {
    renderElement: renderElementMention(options),
    deserialize: deserializeMention(options),
    inlineTypes: [mention.type],
    voidTypes: [mention.type]
  };
};

const insertMention = (editor, mentionable, options, insertSpaceAfterMention) => {
  const {
    mention
  } = setDefaults(options, DEFAULTS_MENTION);
  const mentionNode = Object.assign({
    type: mention.type,
    children: [{
      text: ''
    }]
  }, mentionable);
  Transforms.insertNodes(editor, mentionNode);
  Transforms.move(editor);

  if (insertSpaceAfterMention) {
    Transforms.insertText(editor, ' ');
    Transforms.move(editor);
  }
};

/**
 * Get next index from 0 to max.
 * If index is max, get to 0.
 */
const getNextIndex = (i, max) => i >= max ? 0 : i + 1;

/**
 * Get previous index from 0 to max.
 * If index is 0, get to max.
 */
const getPreviousIndex = (i, max) => i <= 0 ? max : i - 1;

const matchesTriggerAndPattern = (editor, {
  at,
  trigger,
  pattern
}) => {
  // Point at the start of line
  const lineStart = Editor.before(editor, at, {
    unit: 'line'
  }); // Range from before to start

  const beforeRange = lineStart && Editor.range(editor, lineStart, at); // Before text

  const beforeText = getText(editor, beforeRange); // Starts with char and ends with word characters

  const escapedTrigger = escapeRegExp(trigger);
  const beforeRegex = new RegExp(`(?:^|\\s)${escapedTrigger}(${pattern})$`); // Match regex on before text

  const match = !!beforeText && beforeText.match(beforeRegex); // Point at the start of mention

  const mentionStart = match ? Editor.before(editor, at, {
    unit: 'character',
    distance: match[1].length + trigger.length
  }) : null; // Range from mention to start

  const mentionRange = mentionStart && Editor.range(editor, mentionStart, at);
  return {
    range: mentionRange,
    match
  };
};
const useMention = (mentionables = [], _a = {}) => {
  var {
    maxSuggestions = 10,
    trigger = '@',
    mentionableFilter = search => c => c.value.toLowerCase().includes(search.toLowerCase()),
    mentionableSearchPattern,
    insertSpaceAfterMention
  } = _a,
      options = __rest(_a, ["maxSuggestions", "trigger", "mentionableFilter", "mentionableSearchPattern", "insertSpaceAfterMention"]);

  const [targetRange, setTargetRange] = useState(null);
  const [valueIndex, setValueIndex] = useState(0);
  const [search, setSearch] = useState('');
  const values = mentionables.filter(mentionableFilter(search)).slice(0, maxSuggestions);
  const onAddMention = useCallback((editor, data) => {
    if (targetRange !== null) {
      Transforms.select(editor, targetRange);
      insertMention(editor, data, options, insertSpaceAfterMention);
      return setTargetRange(null);
    }
  }, [options, targetRange, insertSpaceAfterMention]);
  const onKeyDownMention = useCallback((e, editor) => {
    if (targetRange) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        return setValueIndex(getNextIndex(valueIndex, values.length - 1));
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        return setValueIndex(getPreviousIndex(valueIndex, values.length - 1));
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        return setTargetRange(null);
      }

      if (['Tab', 'Enter'].includes(e.key)) {
        e.preventDefault();
        onAddMention(editor, values[valueIndex]);
        return false;
      }
    }
  }, [values, valueIndex, setValueIndex, targetRange, setTargetRange, onAddMention]);
  const onChangeMention = useCallback(editor => {
    const {
      selection
    } = editor;

    if (selection && isCollapsed(selection)) {
      const cursor = Range.start(selection);
      const {
        range,
        match: beforeMatch
      } = mentionableSearchPattern ? // new behavior, searches for matching string against pattern right after the trigger
      matchesTriggerAndPattern(editor, {
        at: cursor,
        trigger,
        pattern: mentionableSearchPattern
      }) : // previous behavior. searches for a word after typing the first letter. Kept for backward compatibility.
      isWordAfterTrigger(editor, {
        at: cursor,
        trigger
      });

      if (beforeMatch && isPointAtWordEnd(editor, {
        at: cursor
      })) {
        setTargetRange(range);
        const [, word] = beforeMatch;
        setSearch(word);
        setValueIndex(0);
        return;
      }

      setTargetRange(null);
    }
  }, [setTargetRange, setSearch, setValueIndex, trigger, mentionableSearchPattern]);
  return {
    search,
    index: valueIndex,
    target: targetRange,
    values,
    onChangeMention,
    onKeyDownMention,
    onAddMention
  };
};

const getTableElementStyles = ({
  className
}) => {
  return {
    root: [{
      // Insert css properties
      margin: '10px 0',
      borderCollapse: 'collapse',
      width: '100%'
    }, className]
  };
};

const getClassNames$f = classNamesFunction();
/**
 * TableElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const TableElementBase = ({
  attributes,
  children,
  className,
  styles,
  htmlAttributes
}) => {
  const classNames = getClassNames$f(styles, {
    className
  });
  return /*#__PURE__*/createElement("table", Object.assign({}, attributes, {
    className: classNames.root
  }, htmlAttributes), /*#__PURE__*/createElement("tbody", null, children));
};
/**
 * TableElement
 */

const TableElement = styled(TableElementBase, getTableElementStyles, undefined, {
  scope: 'TableElement'
});

const ELEMENT_TABLE = 'table';
const ELEMENT_TH = 'th';
const ELEMENT_TR = 'tr';
const ELEMENT_TD = 'td';
const DEFAULTS_TABLE = {
  table: {
    component: TableElement,
    type: ELEMENT_TABLE,
    rootProps: {
      className: 'slate-table',
      as: 'table'
    }
  },
  tr: {
    component: StyledElement,
    type: ELEMENT_TR,
    rootProps: {
      className: 'slate-tr',
      as: 'tr'
    }
  },
  th: {
    component: StyledElement,
    type: ELEMENT_TH,
    rootProps: {
      className: 'slate-th',
      as: 'th',
      styles: {
        root: {
          backgroundColor: 'rgb(244, 245, 247)',
          border: '1px solid rgb(193, 199, 208)',
          padding: '8px',
          minWidth: '48px',
          textAlign: 'left',
          selectors: {
            '> *': {
              margin: 0
            }
          }
        }
      }
    },
    nodeToProps: ({
      element
    }) => {
      var _a, _b;

      return {
        colSpan: (_a = element === null || element === void 0 ? void 0 : element.attributes) === null || _a === void 0 ? void 0 : _a.colspan,
        rowSpan: (_b = element === null || element === void 0 ? void 0 : element.attributes) === null || _b === void 0 ? void 0 : _b.rowspan
      };
    }
  },
  td: {
    component: StyledElement,
    type: ELEMENT_TD,
    rootProps: {
      className: 'slate-td',
      as: 'td',
      styles: {
        root: {
          backgroundColor: 'rgb(255, 255, 255)',
          border: '1px solid rgb(193, 199, 208)',
          padding: '8px',
          minWidth: '48px',
          selectors: {
            '> *': {
              margin: 0
            }
          }
        }
      }
    },
    nodeToProps: ({
      element
    }) => {
      var _a, _b;

      return {
        colSpan: (_a = element === null || element === void 0 ? void 0 : element.attributes) === null || _a === void 0 ? void 0 : _a.colspan,
        rowSpan: (_b = element === null || element === void 0 ? void 0 : element.attributes) === null || _b === void 0 ? void 0 : _b.rowspan
      };
    }
  }
};

const ToolbarTable = _a => {
  var {
    transform
  } = _a,
      props = __rest(_a, ["transform"]);

  const {
    table
  } = setDefaults(props, DEFAULTS_TABLE);
  const editor = useSlate();
  return /*#__PURE__*/createElement(ToolbarButton, Object.assign({
    active: someNode(editor, {
      match: {
        type: table.type
      }
    }),
    onMouseDown: getPreventDefaultHandler(transform, editor, props)
  }, props));
};

const deserializeTable = options => {
  var _a, _b, _c, _d;

  const {
    table,
    td,
    th,
    tr
  } = setDefaults(options, DEFAULTS_TABLE);
  return {
    element: [...getElementDeserializer(Object.assign({
      type: table.type,
      rules: [{
        nodeNames: 'TABLE'
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.table) === null || _a === void 0 ? void 0 : _a.deserialize)), ...getElementDeserializer(Object.assign({
      type: tr.type,
      rules: [{
        nodeNames: 'TR'
      }]
    }, (_b = options === null || options === void 0 ? void 0 : options.tr) === null || _b === void 0 ? void 0 : _b.deserialize)), ...getElementDeserializer(Object.assign({
      type: td.type,
      attributes: ['rowspan', 'colspan'],
      rules: [{
        nodeNames: 'TD'
      }]
    }, (_c = options === null || options === void 0 ? void 0 : options.td) === null || _c === void 0 ? void 0 : _c.deserialize)), ...getElementDeserializer(Object.assign({
      type: th.type,
      attributes: ['rowspan', 'colspan'],
      rules: [{
        nodeNames: 'TH'
      }]
    }, (_d = options === null || options === void 0 ? void 0 : options.th) === null || _d === void 0 ? void 0 : _d.deserialize))]
  };
};

function getCellInNextTableRow(editor, currentRowPath) {
  var _a;

  try {
    const nextRow = Editor.node(editor, Path.next(currentRowPath)); // TODO: Many tables in rich text editors (Google Docs, Word),
    // add a new row if we're in the last cell. Should we do the same?

    const [nextRowNode, nextRowPath] = nextRow;
    const nextCell = (_a = nextRowNode === null || nextRowNode === void 0 ? void 0 : nextRowNode.children) === null || _a === void 0 ? void 0 : _a[0];
    const nextCellPath = nextRowPath.concat(0);

    if (nextCell && nextCellPath) {
      return Editor.node(editor, nextCellPath);
    }
  } catch (err) {}
}

function getNextTableCell(editor, currentCell, currentPath, currentRow) {
  try {
    return Editor.node(editor, Path.next(currentPath));
  } catch (err) {
    const [, currentRowPath] = currentRow;
    return getCellInNextTableRow(editor, currentRowPath);
  }
}

function getCellInPreviousTableRow(editor, currentRowPath) {
  var _a;

  try {
    const previousRow = Editor.node(editor, Path.previous(currentRowPath));
    const [previousRowNode, previousRowPath] = previousRow;
    const previousCell = (_a = previousRowNode === null || previousRowNode === void 0 ? void 0 : previousRowNode.children) === null || _a === void 0 ? void 0 : _a[previousRowNode.children.length - 1];
    const previousCellPath = previousRowPath.concat(previousRowNode.children.length - 1);

    if (previousCell && previousCellPath) {
      return Editor.node(editor, previousCellPath);
    }
  } catch (err) {}
}

function getPreviousTableCell(editor, currentCell, currentPath, currentRow) {
  try {
    return Editor.node(editor, Path.previous(currentPath));
  } catch (err) {
    const [, currentRowPath] = currentRow;
    return getCellInPreviousTableRow(editor, currentRowPath);
  }
}

/**
 * If at (default = selection) is in table>tr>td, return table, tr, and td
 * node entries.
 */

const getTableCellEntry = (editor, {
  at = editor.selection
} = {}, options) => {
  const {
    td,
    tr,
    table
  } = setDefaults(options, DEFAULTS_TABLE);

  if (at && someNode(editor, {
    at,
    match: {
      type: td.type
    }
  })) {
    const selectionParent = getParent(editor, at);
    if (!selectionParent) return;
    const [, paragraphPath] = selectionParent;
    const tableCell = getAbove(editor, {
      at,
      match: {
        type: td.type
      }
    }) || getParent(editor, paragraphPath);
    if (!tableCell) return;
    const [tableCellNode, tableCellPath] = tableCell;
    if (tableCellNode.type !== td.type) return;
    const tableRow = getParent(editor, tableCellPath);
    if (!tableRow) return;
    const [tableRowNode, tableRowPath] = tableRow;
    if (tableRowNode.type !== tr.type) return;
    const tableElement = getParent(editor, tableRowPath);
    if (!table) return;
    return {
      tableElement,
      tableRow,
      tableCell
    };
  }
};

const TableHotKey = {
  TAB: 'Tab'
};

const onKeyDownTable = options => (e, editor) => {
  if (e.key === TableHotKey.TAB) {
    e.preventDefault();
    const res = getTableCellEntry(editor, {}, options);
    if (!res) return;
    const {
      tableRow,
      tableCell
    } = res;
    const [, tableCellPath] = tableCell;
    const shiftTab = e.shiftKey;
    const tab = !e.shiftKey;

    if (shiftTab) {
      // move left with shift+tab
      const previousCell = getPreviousTableCell(editor, tableCell, tableCellPath, tableRow);

      if (previousCell) {
        const [, previousCellPath] = previousCell;
        Transforms.select(editor, previousCellPath);
      }
    } else if (tab) {
      // move right with tab
      const nextCell = getNextTableCell(editor, tableCell, tableCellPath, tableRow);

      if (nextCell) {
        const [, nextCellPath] = nextCell;
        Transforms.select(editor, nextCellPath);
      }
    }
  } // FIXME: would prefer this as mod+a, but doesn't work


  if (e.key === 'a' && (e.metaKey || e.ctrlKey)) {
    const {
      table
    } = setDefaults(options, DEFAULTS_TABLE);
    const res = getAbove(editor, {
      match: {
        type: table.type
      }
    });
    if (!res) return;
    const [, tablePath] = res; // select the whole table

    Transforms.select(editor, tablePath);
    e.preventDefault();
    e.stopPropagation();
  }
};

const renderElementTable = options => {
  const {
    table,
    td,
    th,
    tr
  } = setDefaults(options, DEFAULTS_TABLE);
  return getRenderElements([table, th, tr, td]);
};

/**
 * Enables support for tables.
 */

const TablePlugin = options => ({
  renderElement: renderElementTable(options),
  deserialize: deserializeTable(options),
  onKeyDown: onKeyDownTable(options)
});

const getEmptyCellNode = options => {
  const {
    th,
    td,
    header,
    p
  } = setDefaults(options, Object.assign(Object.assign({}, DEFAULTS_TABLE), DEFAULTS_PARAGRAPH));
  return {
    type: header ? th.type : td.type,
    children: [{
      type: p.type,
      children: [{
        text: ''
      }]
    }]
  };
};

const getEmptyRowNode = (colCount, options) => {
  const {
    tr
  } = setDefaults(options, DEFAULTS_TABLE);
  return {
    type: tr.type,
    children: Array(colCount).fill(colCount).map(() => getEmptyCellNode(options))
  };
};

const getEmptyTableNode = options => {
  const {
    table
  } = setDefaults(options, DEFAULTS_TABLE);
  return {
    type: table.type,
    children: [getEmptyRowNode(2, options), getEmptyRowNode(2, options)]
  };
};

const addColumn = (editor, options) => {
  const {
    table,
    td,
    th
  } = setDefaults(options, DEFAULTS_TABLE);

  if (someNode(editor, {
    match: {
      type: table.type
    }
  })) {
    const currentCellItem = getAbove(editor, {
      match: {
        type: [td.type, th.type]
      }
    });
    const currentTableItem = getAbove(editor, {
      match: {
        type: table.type
      }
    });

    if (currentCellItem && currentTableItem) {
      const nextCellPath = Path.next(currentCellItem[1]);
      const newCellPath = nextCellPath.slice();
      const replacePathPos = newCellPath.length - 2;
      const currentRowIdx = nextCellPath[replacePathPos];
      currentTableItem[0].children.forEach((row, rowIdx) => {
        newCellPath[replacePathPos] = rowIdx;
        Transforms.insertNodes(editor, getEmptyCellNode(Object.assign({}, options)), {
          at: newCellPath,
          select: rowIdx === currentRowIdx
        });
      });
    }
  }
};

const addRow = (editor, options) => {
  const {
    table,
    tr
  } = setDefaults(options, DEFAULTS_TABLE);

  if (someNode(editor, {
    match: {
      type: table.type
    }
  })) {
    const currentRowItem = getAbove(editor, {
      match: {
        type: tr.type
      }
    });

    if (currentRowItem) {
      const [currentRowElem, currentRowPath] = currentRowItem;
      Transforms.insertNodes(editor, getEmptyRowNode(currentRowElem.children.length, options), {
        at: Path.next(currentRowPath),
        select: true
      });
    }
  }
};

const deleteColumn = (editor, options) => {
  const {
    table,
    tr,
    td,
    th
  } = setDefaults(options, DEFAULTS_TABLE);

  if (someNode(editor, {
    match: {
      type: table.type
    }
  })) {
    const currentCellItem = getAbove(editor, {
      match: {
        type: [td.type, th.type]
      }
    });
    const currentRowItem = getAbove(editor, {
      match: {
        type: tr.type
      }
    });
    const currentTableItem = getAbove(editor, {
      match: {
        type: table.type
      }
    });

    if (currentCellItem && currentRowItem && currentTableItem && // Cannot delete the last cell
    currentRowItem[0].children.length > 1) {
      const currentCellPath = currentCellItem[1];
      const pathToDelete = currentCellPath.slice();
      const replacePathPos = pathToDelete.length - 2;
      currentTableItem[0].children.forEach((row, rowIdx) => {
        pathToDelete[replacePathPos] = rowIdx;
        Transforms.removeNodes(editor, {
          at: pathToDelete
        });
      });
    }
  }
};

const deleteRow = (editor, options) => {
  const {
    table,
    tr
  } = setDefaults(options, DEFAULTS_TABLE);

  if (someNode(editor, {
    match: {
      type: table.type
    }
  })) {
    const currentTableItem = getAbove(editor, {
      match: {
        type: table.type
      }
    });
    const currentRowItem = getAbove(editor, {
      match: {
        type: tr.type
      }
    });

    if (currentRowItem && currentTableItem && // Cannot delete the last row
    currentTableItem[0].children.length > 1) {
      Transforms.removeNodes(editor, {
        at: currentRowItem[1]
      });
    }
  }
};

const deleteTable = (editor, options) => {
  const {
    table
  } = setDefaults(options, DEFAULTS_TABLE);

  if (someNode(editor, {
    match: {
      type: table.type
    }
  })) {
    const tableItem = getAbove(editor, {
      match: {
        type: table.type
      }
    });

    if (tableItem) {
      Transforms.removeNodes(editor, {
        at: tableItem[1]
      });
    }
  }
};

const insertTable = (editor, options) => {
  const {
    table
  } = setDefaults(options, DEFAULTS_TABLE);

  if (!someNode(editor, {
    match: {
      type: table.type
    }
  })) {
    Transforms.insertNodes(editor, getEmptyTableNode(options));
  }
};

const withTable = options => editor => {
  const {
    td,
    th
  } = setDefaults(options, DEFAULTS_TABLE);

  const matchCells = node => node.type === td.type || node.type === th.type;

  const {
    deleteBackward,
    deleteForward,
    deleteFragment,
    insertText
  } = editor;

  const preventDeleteCell = (operation, pointCallback, nextPoint) => unit => {
    const {
      selection
    } = editor;

    if (isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: matchCells
      });

      if (cell) {
        // Prevent deletions within a cell
        const [, cellPath] = cell;
        const start = pointCallback(editor, cellPath);

        if (selection && Point.equals(selection.anchor, start)) {
          return;
        }
      } else {
        // Prevent deleting cell when selection is before or after a table
        const next = nextPoint(editor, selection, {
          unit
        });
        const [nextCell] = Editor.nodes(editor, {
          match: matchCells,
          at: next
        });
        if (nextCell) return;
      }
    }

    operation(unit);
  };

  editor.deleteFragment = () => {
    const {
      selection
    } = editor;
    const [start] = Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.anchor.path
    });
    const [end] = Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.focus.path
    }); // Skip deletes if they start or end in a table cell, unless start & end in the same cell

    if ((start || end) && (start === null || start === void 0 ? void 0 : start[0]) !== (end === null || end === void 0 ? void 0 : end[0])) {
      // Clear cells content
      const cells = Editor.nodes(editor, {
        match: matchCells
      });

      for (const [, path] of cells) {
        for (const [, childPath] of Node$1.children(editor, path, {
          reverse: true
        })) {
          Transforms.removeNodes(editor, {
            at: childPath
          });
        }
      }

      Transforms.collapse(editor);
      return;
    }

    deleteFragment();
  };

  editor.insertText = text => {
    const {
      selection
    } = editor;
    const [start] = Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.anchor.path
    });
    const [end] = Editor.nodes(editor, {
      match: matchCells,
      at: selection === null || selection === void 0 ? void 0 : selection.focus.path
    }); // Collapse selection if multiple cells are selected to avoid breaking the table

    if (!isCollapsed(selection) && (start || end) && (start === null || start === void 0 ? void 0 : start[0]) !== (end === null || end === void 0 ? void 0 : end[0])) {
      const [cell] = Editor.nodes(editor, {
        match: matchCells
      });

      if (cell) {
        Transforms.collapse(editor, {
          edge: 'end'
        });
        insertText(text);
        return;
      }
    }

    insertText(text);
  }; // prevent deleting cells with deleteBackward


  editor.deleteBackward = preventDeleteCell(deleteBackward, Editor.start, Editor.before); // prevent deleting cells with deleteForward

  editor.deleteForward = preventDeleteCell(deleteForward, Editor.end, Editor.after);
  return editor;
};

const getMediaEmbedElementStyles = ({
  className
}) => {
  return {
    root: [{
      // Insert css properties
      position: 'relative'
    }, className],
    iframeWrapper: {
      padding: '75% 0 0 0',
      position: 'relative'
    },
    iframe: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%'
    },
    input: {
      fontSize: '0.85em',
      width: '100%',
      padding: '0.5em',
      border: '2px solid #ddd',
      background: '#fafafa',
      marginTop: '5px'
    }
  };
};

const MediaEmbedUrlInput = _a => {
  var {
    className,
    url,
    onChange
  } = _a,
      props = __rest(_a, ["className", "url", "onChange"]);

  const [value, setValue] = useState(url);
  return /*#__PURE__*/createElement("input", Object.assign({
    className: className,
    value: value,
    onClick: e => e.stopPropagation(),
    onChange: e => {
      const newUrl = e.target.value;
      setValue(newUrl);
      onChange(newUrl);
    }
  }, props));
};

const getClassNames$g = classNamesFunction();
/**
 * MediaEmbedElement with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */

const MediaEmbedElementBase = ({
  attributes,
  children,
  element,
  className,
  styles,
  htmlAttributes
}) => {
  const classNames = getClassNames$g(styles, {
    className
  });
  const editor = useEditor();
  const {
    url
  } = element;
  return /*#__PURE__*/createElement("div", Object.assign({}, attributes, {
    className: classNames.root
  }), /*#__PURE__*/createElement("div", {
    contentEditable: false
  }, /*#__PURE__*/createElement("div", {
    className: classNames.iframeWrapper
  }, /*#__PURE__*/createElement("iframe", Object.assign({
    className: classNames.iframe,
    title: "embed",
    src: `${url}?title=0&byline=0&portrait=0`,
    frameBorder: "0"
  }, htmlAttributes))), /*#__PURE__*/createElement(MediaEmbedUrlInput, {
    "data-testid": "MediaEmbedUrlInput",
    className: classNames.input,
    url: url,
    onChange: val => {
      const path = ReactEditor.findPath(editor, element);
      Transforms.setNodes(editor, {
        url: val
      }, {
        at: path
      });
    }
  })), children);
};
/**
 * MediaEmbedElement
 */

const MediaEmbedElement = styled(MediaEmbedElementBase, getMediaEmbedElementStyles, undefined, {
  scope: 'MediaEmbedElement'
});

const ELEMENT_MEDIA_EMBED = 'media_embed';
const DEFAULTS_MEDIA_EMBED = {
  media_embed: {
    component: MediaEmbedElement,
    type: ELEMENT_MEDIA_EMBED,
    rootProps: {
      className: 'slate-media-embed'
    }
  }
};

const deserializeIframe = options => {
  var _a;

  const {
    media_embed
  } = setDefaults(options, DEFAULTS_MEDIA_EMBED);
  return {
    element: getNodeDeserializer(Object.assign({
      type: media_embed.type,
      node: el => {
        let url = el.getAttribute('src');

        if (url) {
          [url] = url.split('?');
          return {
            type: media_embed.type,
            url
          };
        }
      },
      rules: [{
        nodeNames: 'IFRAME'
      }, {
        className: media_embed.rootProps.className
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.media_embed) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderElementMediaEmbed = options => {
  const {
    media_embed
  } = setDefaults(options, DEFAULTS_MEDIA_EMBED);
  return getRenderElement(media_embed);
};

/**
 * Enables support for embeddable media such as YouTube
 * or Vimeo videos, Instagram posts and tweets or Google Maps.
 */

const MediaEmbedPlugin = options => {
  const {
    media_embed
  } = setDefaults(options, DEFAULTS_MEDIA_EMBED);
  return {
    renderElement: renderElementMediaEmbed(options),
    deserialize: deserializeIframe(options),
    voidTypes: [media_embed.type]
  };
};

const ELEMENT_ALIGN_LEFT = 'align_left';
const ELEMENT_ALIGN_CENTER = 'align_center';
const ELEMENT_ALIGN_RIGHT = 'align_right';
const ELEMENT_ALIGN_JUSTIFY = 'align_justify';
const DEFAULTS_ALIGN = {
  align_left: {
    component: StyledElement,
    type: ELEMENT_ALIGN_LEFT,
    rootProps: {
      className: 'slate-align-left',
      styles: {
        root: {
          textAlign: 'left'
        }
      }
    }
  },
  align_center: {
    component: StyledElement,
    type: ELEMENT_ALIGN_CENTER,
    rootProps: {
      className: 'slate-align-center',
      styles: {
        root: {
          textAlign: 'center'
        }
      }
    }
  },
  align_right: {
    component: StyledElement,
    type: ELEMENT_ALIGN_RIGHT,
    rootProps: {
      className: 'slate-align-right',
      styles: {
        root: {
          textAlign: 'right'
        }
      }
    }
  },
  align_justify: {
    component: StyledElement,
    type: ELEMENT_ALIGN_JUSTIFY,
    rootProps: {
      className: 'slate-align-justify',
      styles: {
        root: {
          textAlign: 'justify'
        }
      }
    }
  }
};

const upsertAlign = (editor, {
  type,
  unwrapTypes = [ELEMENT_ALIGN_LEFT, ELEMENT_ALIGN_CENTER, ELEMENT_ALIGN_RIGHT, ELEMENT_ALIGN_JUSTIFY]
}) => {
  if (!editor.selection) return;
  unwrapNodes(editor, {
    match: {
      type: unwrapTypes
    }
  });
  if (!type) return;
  wrapNodes(editor, {
    type,
    children: []
  }, {
    mode: 'lowest'
  });
};

const ToolbarAlign = _a => {
  var {
    type,
    unwrapTypes = [ELEMENT_ALIGN_LEFT, ELEMENT_ALIGN_CENTER, ELEMENT_ALIGN_RIGHT, ELEMENT_ALIGN_JUSTIFY]
  } = _a,
      props = __rest(_a, ["type", "unwrapTypes"]);

  const editor = useSlate();
  return /*#__PURE__*/createElement(ToolbarButton, Object.assign({
    active: !!type && someNode(editor, {
      match: {
        type
      }
    }),
    onMouseDown: getPreventDefaultHandler(upsertAlign, editor, {
      type,
      unwrapTypes
    })
  }, props));
};

const deserializeAlign = options => {
  var _a, _b, _c;

  const {
    align_center,
    align_right,
    align_justify
  } = setDefaults(options, DEFAULTS_ALIGN);
  return {
    element: [...getElementDeserializer(Object.assign({
      type: align_center.type,
      rules: [{
        className: align_center.rootProps.className
      }, {
        nodeNames: 'DIV',
        style: {
          textAlign: 'center'
        }
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.align_center) === null || _a === void 0 ? void 0 : _a.deserialize)), ...getElementDeserializer(Object.assign({
      type: align_right.type,
      rules: [{
        className: align_right.rootProps.className
      }, {
        nodeNames: 'DIV',
        style: {
          textAlign: 'right'
        }
      }]
    }, (_b = options === null || options === void 0 ? void 0 : options.align_right) === null || _b === void 0 ? void 0 : _b.deserialize)), ...getElementDeserializer(Object.assign({
      type: align_justify.type,
      rules: [{
        className: align_justify.rootProps.className
      }, {
        nodeNames: 'DIV',
        style: {
          textAlign: 'justify'
        }
      }]
    }, (_c = options === null || options === void 0 ? void 0 : options.align_justify) === null || _c === void 0 ? void 0 : _c.deserialize))]
  };
};

const renderElementAlign = options => {
  const {
    align_left,
    align_center,
    align_right,
    align_justify
  } = setDefaults(options, DEFAULTS_ALIGN);
  return getRenderElements([Object.assign({}, align_left), align_center, align_right, align_justify]);
};

/**
 * Enables support for text alignment, useful to align your content
 * to left, right and center it.
 */

const AlignPlugin = options => ({
  renderElement: renderElementAlign(options),
  deserialize: deserializeAlign(options)
});

const autoformatBlock = (editor, type, at, {
  preFormat,
  format
}) => {
  const selectionRef = Editor.rangeRef(editor, editor.selection);
  Transforms.delete(editor, {
    at
  });

  if (!selectionRef.current) {
    // XXX: we lost selection during this delete, but current selection is before the deleted node.
    const nextPosition = Editor.after(editor, editor.selection.anchor);
    Transforms.select(editor, nextPosition);
  } else {
    selectionRef.unref();
  }

  preFormat === null || preFormat === void 0 ? void 0 : preFormat(editor);

  if (!format) {
    Transforms.setNodes(editor, {
      type
    }, {
      match: n => Editor.isBlock(editor, n)
    });
  } else {
    format(editor);
  }
};

const autoformatInline = (editor, {
  type,
  between,
  markup,
  ignoreTrim
}) => {
  const selection = editor.selection;
  const startMarkup = between ? between[0] : markup;
  const endMarkup = between ? between[1] : '';
  let endMarkupPointBefore = selection.anchor;

  if (endMarkup) {
    endMarkupPointBefore = getPointBefore(editor, selection, {
      matchString: endMarkup
    });
    if (!endMarkupPointBefore) return false;
  }

  const startMarkupPointAfter = getPointBefore(editor, endMarkupPointBefore, {
    matchString: startMarkup,
    skipInvalid: true,
    afterMatch: true
  });
  if (!startMarkupPointAfter) return false; // found

  const markupRange = {
    anchor: startMarkupPointAfter,
    focus: endMarkupPointBefore
  };

  if (!ignoreTrim) {
    const markupText = getText(editor, markupRange);
    if (markupText.trim() !== markupText) return false;
  } // delete end markup


  if (endMarkup) {
    endMarkupPointBefore = getPointBefore(editor, selection, {
      matchString: endMarkup
    });
    Transforms.delete(editor, {
      at: {
        anchor: endMarkupPointBefore,
        focus: selection.anchor
      }
    });
  } // add mark to the text between the markups


  Transforms.select(editor, markupRange);
  editor.addMark(type, true);
  Transforms.collapse(editor, {
    edge: 'end'
  });
  editor.removeMark(type, false); // delete start markup

  const startMarkupPointBefore = getPointBefore(editor, selection, {
    matchString: startMarkup,
    skipInvalid: true
  });
  Transforms.delete(editor, {
    at: {
      anchor: startMarkupPointBefore,
      focus: startMarkupPointAfter
    }
  });
  return true;
};

/**
 * Enables support for autoformatting actions.
 * Once a markup rule is validated, it does not check the following rules.
 */

const withAutoformat = ({
  rules
}) => editor => {
  const {
    insertText
  } = editor;

  editor.insertText = text => {
    if (!isCollapsed(editor.selection)) return insertText(text);

    for (let _a of rules) {
      const {
        query
      } = _a,
            rule = __rest(_a, ["query"]);

      const {
        trigger = ' ',
        mode = 'block',
        allowSameTypeAbove = false,
        triggerAtBlockStart = true,
        type,
        markup,
        preFormat,
        format,
        between,
        ignoreTrim,
        insertTrigger
      } = rule;
      const triggers = castArray_1(trigger); // Check trigger

      if (!triggers.includes(text)) continue;
      if (query && !query(editor, rule)) continue;

      const valid = () => insertTrigger && insertText(text);

      if (mode === 'block') {
        const markups = castArray_1(markup);
        let markupRange;

        if (triggerAtBlockStart) {
          markupRange = getRangeFromBlockStart(editor); // Don't autoformat if there is void nodes.

          const hasVoidNode = someNode(editor, {
            at: markupRange,
            match: n => Editor.isVoid(editor, n)
          });
          if (hasVoidNode) continue;
          const textFromBlockStart = getText(editor, markupRange);
          if (!markups.includes(textFromBlockStart)) continue;
        } else {
          markupRange = getRangeBefore(editor, editor.selection, {
            matchString: markup
          });
          if (!markupRange) continue;
        }

        if (!allowSameTypeAbove) {
          // Don't autoformat if already in a block of the same type.
          const isBelowSameBlockType = someNode(editor, {
            match: {
              type
            }
          });
          if (isBelowSameBlockType) continue;
        } // Start of the block


        autoformatBlock(editor, type, markupRange, {
          preFormat,
          format
        });
        return valid();
      }

      if (mode === 'inline') {
        if (autoformatInline(editor, {
          type,
          between,
          ignoreTrim,
          markup: Array.isArray(markup) ? markup[0] : markup
        })) {
          return valid();
        }
      }
    }

    insertText(text);
  };

  return editor;
};

/**
 * Check if the selection is at the edge of its parent block.
 * If it is and if the selection is expanded, delete its content.
 */

const exitBreakAtEdges = (editor, {
  start,
  end
}) => {
  let queryEdge = false;
  let isEdge = false;
  let isStart = false;

  if (start || end) {
    queryEdge = true;

    if (start && isSelectionAtBlockStart(editor)) {
      isEdge = true;
      isStart = true;
    }

    if (end && isSelectionAtBlockEnd(editor)) {
      isEdge = true;
    }

    if (isEdge && isExpanded(editor.selection)) {
      editor.deleteFragment();
    }
  }

  return {
    queryEdge,
    isEdge,
    isStart
  };
};
const onKeyDownExitBreak = ({
  rules = [{
    hotkey: 'mod+enter'
  }, {
    hotkey: 'mod+shift+enter',
    before: true
  }]
} = {}) => (event, editor) => {
  const entry = getBlockAbove(editor);
  if (!entry) return;
  rules.forEach(({
    hotkey,
    query = {},
    level = 1,
    before,
    defaultType = DEFAULT_ELEMENT
  }) => {
    if (isHotkey(hotkey, event) && queryNode(entry, query)) {
      if (!editor.selection) return;
      const {
        queryEdge,
        isEdge,
        isStart
      } = exitBreakAtEdges(editor, query);
      if (isStart) before = true;
      if (queryEdge && !isEdge) return;
      event.preventDefault();
      const selectionPath = Editor.path(editor, editor.selection);
      let insertPath;

      if (before) {
        insertPath = selectionPath.slice(0, level + 1);
      } else {
        insertPath = Path.next(selectionPath.slice(0, level + 1));
      }

      Transforms.insertNodes(editor, {
        type: defaultType,
        children: [{
          text: ''
        }]
      }, {
        at: insertPath,
        select: !isStart
      });
    }
  });
};

/**
 * Insert soft break following configurable rules.
 * Each rule specifies a hotkey and query options.
 */

const ExitBreakPlugin = (options = {}) => ({
  onKeyDown: onKeyDownExitBreak(options)
});

/**
 * Enables support for resetting block type from rules.
 */

const ResetBlockTypePlugin = options => ({
  onKeyDown: onKeyDownResetBlockType(options)
});

const onKeyDownSoftBreak = ({
  rules = [{
    hotkey: 'shift+enter'
  }]
} = {}) => (event, editor) => {
  const entry = getBlockAbove(editor);
  if (!entry) return;
  rules.forEach(({
    hotkey,
    query
  }) => {
    if (isHotkey(hotkey, event) && queryNode(entry, query)) {
      event.preventDefault();
      editor.insertText('\n');
    }
  });
};

/**
 * Insert soft break following configurable rules.
 * Each rule specifies a hotkey and query options.
 */

const SoftBreakPlugin = (options = {}) => ({
  onKeyDown: onKeyDownSoftBreak(options)
});

const MARK_BOLD = 'bold';
const DEFAULTS_BOLD = {
  bold: {
    component: StyledLeaf,
    type: MARK_BOLD,
    hotkey: 'mod+b',
    rootProps: {
      className: `slate-bold`,
      as: 'strong'
    }
  }
};

const deserializeBold = options => {
  var _a;

  const {
    bold
  } = setDefaults(options, DEFAULTS_BOLD);
  return {
    leaf: getLeafDeserializer(Object.assign({
      type: bold.type,
      rules: [{
        nodeNames: ['STRONG']
      }, {
        style: {
          fontWeight: ['600', '700', 'bold']
        }
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.bold) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderLeafBold = options => getRenderLeafDefault({
  key: 'bold',
  defaultOptions: DEFAULTS_BOLD,
  options
});

/**
 * Enables support for bold formatting
 */

const BoldPlugin = options => ({
  renderLeaf: renderLeafBold(options),
  deserialize: deserializeBold(options),
  onKeyDown: getOnHotkeyToggleMarkDefault({
    key: 'bold',
    defaultOptions: DEFAULTS_BOLD,
    options
  })
});

const MARK_CODE = 'code';
const DEFAULTS_CODE = {
  code: {
    component: StyledLeaf,
    type: MARK_CODE,
    hotkey: 'mod+e',
    rootProps: {
      className: `slate-code`,
      as: 'code',
      styles: {
        root: {
          whiteSpace: 'pre-wrap',
          fontSize: '85%',
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;',
          backgroundColor: 'rgba(135,131,120,0.15)',
          borderRadius: '3px',
          padding: '0.2em 0.4em',
          lineHeight: 'normal'
        }
      }
    }
  }
};

const deserializeCode = options => {
  var _a;

  const {
    code
  } = setDefaults(options, DEFAULTS_CODE);
  return {
    leaf: getLeafDeserializer(Object.assign({
      type: code.type,
      rules: [{
        nodeNames: ['CODE']
      }, {
        style: {
          wordWrap: 'break-word'
        }
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.code) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderLeafCode = options => getRenderLeafDefault({
  key: 'code',
  defaultOptions: DEFAULTS_CODE,
  options
});

/**
 * Enables support for code formatting
 */

const CodePlugin = options => ({
  renderLeaf: renderLeafCode(options),
  deserialize: deserializeCode(options),
  onKeyDown: getOnHotkeyToggleMarkDefault({
    key: 'code',
    defaultOptions: DEFAULTS_CODE,
    options
  })
});

const MARK_ITALIC = 'italic';
const DEFAULTS_ITALIC = {
  italic: {
    component: StyledLeaf,
    type: MARK_ITALIC,
    hotkey: 'mod+i',
    rootProps: {
      className: `slate-italic`,
      as: 'em'
    }
  }
};

const deserializeItalic = options => {
  var _a;

  const {
    italic
  } = setDefaults(options, DEFAULTS_ITALIC);
  return {
    leaf: getLeafDeserializer(Object.assign({
      type: italic.type,
      rules: [{
        nodeNames: ['EM', 'I']
      }, {
        style: {
          fontStyle: 'italic'
        }
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.italic) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderLeafItalic = options => getRenderLeafDefault({
  key: 'italic',
  defaultOptions: DEFAULTS_ITALIC,
  options
});

/**
 * Enables support for italic formatting.
 */

const ItalicPlugin = options => ({
  renderLeaf: renderLeafItalic(options),
  deserialize: deserializeItalic(options),
  onKeyDown: getOnHotkeyToggleMarkDefault({
    key: 'italic',
    defaultOptions: DEFAULTS_ITALIC,
    options
  })
});

const MARK_STRIKETHROUGH = 'strikethrough';
const DEFAULTS_STRIKETHROUGH = {
  strikethrough: {
    component: StyledLeaf,
    type: MARK_STRIKETHROUGH,
    hotkey: 'mod+shift+s',
    rootProps: {
      className: `slate-strikethrough`,
      as: 's'
    }
  }
};

const deserializeStrikethrough = options => {
  var _a;

  const {
    strikethrough
  } = setDefaults(options, DEFAULTS_STRIKETHROUGH);
  return {
    leaf: getLeafDeserializer(Object.assign({
      type: strikethrough.type,
      rules: [{
        nodeNames: ['S', 'DEL', 'STRIKE']
      }, {
        style: {
          textDecoration: 'line-through'
        }
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.strikethrough) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderLeafStrikethrough = options => getRenderLeafDefault({
  key: 'strikethrough',
  defaultOptions: DEFAULTS_STRIKETHROUGH,
  options
});

/**
 * Enables support for strikethrough formatting.
 */

const StrikethroughPlugin = options => ({
  renderLeaf: renderLeafStrikethrough(options),
  deserialize: deserializeStrikethrough(options),
  onKeyDown: getOnHotkeyToggleMarkDefault({
    key: 'strikethrough',
    defaultOptions: DEFAULTS_STRIKETHROUGH,
    options
  })
});

const MARK_SUPERSCRIPT = 'superscript';
const MARK_SUBSCRIPT = 'subscript';
const DEFAULTS_SUBSUPSCRIPT = {
  subscript: {
    component: StyledLeaf,
    type: MARK_SUBSCRIPT,
    hotkey: 'mod+,',
    clear: MARK_SUPERSCRIPT,
    rootProps: {
      className: `slate-subscript`,
      as: 'sub'
    }
  },
  superscript: {
    component: StyledLeaf,
    type: MARK_SUPERSCRIPT,
    hotkey: 'mod+.',
    clear: MARK_SUBSCRIPT,
    rootProps: {
      className: `slate-superscript`,
      as: 'sup'
    }
  }
};

const deserializeSubscript = options => {
  var _a;

  const {
    subscript
  } = setDefaults(options, DEFAULTS_SUBSUPSCRIPT);
  return {
    leaf: getLeafDeserializer(Object.assign({
      type: subscript.type,
      rules: [{
        nodeNames: ['SUB']
      }, {
        style: {
          verticalAlign: 'sub'
        }
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.subscript) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderLeafSubscript = options => getRenderLeafDefault({
  key: 'subscript',
  defaultOptions: DEFAULTS_SUBSUPSCRIPT,
  options
});

/**
 * Enables support for subscript formatting.
 */

const SubscriptPlugin = options => ({
  renderLeaf: renderLeafSubscript(options),
  deserialize: deserializeSubscript(options),
  onKeyDown: getOnHotkeyToggleMarkDefault({
    key: 'subscript',
    defaultOptions: DEFAULTS_SUBSUPSCRIPT,
    options
  })
});

const deserializeSuperscript = options => {
  var _a;

  const {
    superscript
  } = setDefaults(options, DEFAULTS_SUBSUPSCRIPT);
  return {
    leaf: getLeafDeserializer(Object.assign({
      type: superscript.type,
      rules: [{
        nodeNames: ['SUP']
      }, {
        style: {
          verticalAlign: 'super'
        }
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.superscript) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderLeafSuperscript = options => getRenderLeafDefault({
  key: 'superscript',
  defaultOptions: DEFAULTS_SUBSUPSCRIPT,
  options
});

/**
 * Enables support for superscript formatting.
 */

const SuperscriptPlugin = options => ({
  renderLeaf: renderLeafSuperscript(options),
  deserialize: deserializeSuperscript(options),
  onKeyDown: getOnHotkeyToggleMarkDefault({
    key: 'superscript',
    defaultOptions: DEFAULTS_SUBSUPSCRIPT,
    options
  })
});

const MARK_UNDERLINE = 'underline';
const DEFAULTS_UNDERLINE = {
  underline: {
    component: StyledLeaf,
    type: MARK_UNDERLINE,
    hotkey: 'mod+u',
    rootProps: {
      className: `slate-underline`,
      as: 'u'
    }
  }
};

const deserializeUnderline = options => {
  var _a;

  const {
    underline
  } = setDefaults(options, DEFAULTS_UNDERLINE);
  return {
    leaf: getLeafDeserializer(Object.assign({
      type: underline.type,
      rules: [{
        nodeNames: ['U']
      }, {
        style: {
          textDecoration: 'underline'
        }
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.underline) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderLeafUnderline = options => getRenderLeafDefault({
  key: 'underline',
  defaultOptions: DEFAULTS_UNDERLINE,
  options
});

/**
 * Enables support for underline formatting.
 */

const UnderlinePlugin = options => ({
  renderLeaf: renderLeafUnderline(options),
  deserialize: deserializeUnderline(options),
  onKeyDown: getOnHotkeyToggleMarkDefault({
    key: 'underline',
    defaultOptions: DEFAULTS_UNDERLINE,
    options
  })
});

/**
 * Enables support for basic marks:
 * - Bold
 * - Code
 * - Italic
 * - Strikethrough
 * - Subscript
 * - Superscript
 * - Underline
 */

const BasicMarkPlugins = options => [BoldPlugin(options), CodePlugin(options), ItalicPlugin(options), StrikethroughPlugin(options), SubscriptPlugin(options), SuperscriptPlugin(options), UnderlinePlugin(options)];

const MARK_HIGHLIGHT = 'highlight';
const DEFAULTS_HIGHLIGHT = {
  highlight: {
    component: StyledLeaf,
    type: MARK_HIGHLIGHT,
    hotkey: 'mod+shift+h',
    rootProps: {
      className: 'slate-highlight',
      as: 'mark',
      styles: {
        root: {
          backgroundColor: '#FEF3B7'
        }
      }
    }
  }
};

const deserializeHighlight = options => {
  var _a;

  const {
    highlight
  } = setDefaults(options, DEFAULTS_HIGHLIGHT);
  return {
    leaf: getLeafDeserializer(Object.assign({
      type: highlight.type,
      rules: [{
        nodeNames: ['MARK']
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.highlight) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderLeafHighlight = options => getRenderLeafDefault({
  key: 'highlight',
  defaultOptions: DEFAULTS_HIGHLIGHT,
  options
});

/**
 * Enables support for highlights, useful when reviewing
 * content or highlighting it for future reference.
 */

const HighlightPlugin = options => ({
  renderLeaf: renderLeafHighlight(options),
  deserialize: deserializeHighlight(options),
  onKeyDown: getOnHotkeyToggleMarkDefault({
    key: 'highlight',
    defaultOptions: DEFAULTS_HIGHLIGHT,
    options
  })
});

const MARK_KBD = 'kbd';
const DEFAULTS_KBD = {
  kbd: {
    component: StyledLeaf,
    type: MARK_KBD,
    // hotkey: "mod+e", TODO: What hotkey for keyboard shortcut?
    rootProps: {
      className: `slate-kbd`,
      as: 'kbd',
      styles: {
        root: {
          whiteSpace: 'pre-wrap',
          fontSize: '75%',
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;',
          backgroundColor: 'white',
          border: '1px solid black',
          borderRadius: '3px',
          padding: '0.2em 0.4em',
          marginRight: '0.2em',
          lineHeight: 'normal',
          boxShadow: '2px 2px 3px 0px rgba(0,0,0,0.75)'
        }
      }
    }
  }
};

const deserializeKbd = options => {
  var _a;

  const {
    kbd
  } = setDefaults(options, DEFAULTS_KBD);
  return {
    leaf: getLeafDeserializer(Object.assign({
      type: kbd.type,
      rules: [{
        nodeNames: ['KBD']
      }, {
        style: {
          wordWrap: 'break-word'
        }
      }]
    }, (_a = options === null || options === void 0 ? void 0 : options.kbd) === null || _a === void 0 ? void 0 : _a.deserialize))
  };
};

const renderLeafKbd = options => getRenderLeafDefault({
  key: 'kbd',
  defaultOptions: DEFAULTS_KBD,
  options
});

/**
 * Enables support for code formatting
 */

const KbdPlugin = options => ({
  renderLeaf: renderLeafKbd(options),
  deserialize: deserializeKbd(options),
  onKeyDown: getOnHotkeyToggleMarkDefault({
    key: 'kbd',
    defaultOptions: DEFAULTS_KBD,
    options
  })
});

const withMarks = () => editor => {
  const e = editor;

  e.removeMark = (key, shouldChange = true) => {
    const {
      selection
    } = editor;

    if (selection) {
      if (Range.isExpanded(selection)) {
        Transforms.unsetNodes(editor, key, {
          match: Text.isText,
          split: true
        });
      } else {
        const marks = Object.assign({}, Editor.marks(editor) || {});
        delete marks[key];
        editor.marks = marks;
        shouldChange && editor.onChange();
      }
    }
  };

  return e;
};

const withNormalizeTypes = ({
  rules,
  onError
}) => editor => {
  const {
    normalizeNode
  } = editor;

  editor.normalizeNode = ([currentNode, currentPath]) => {
    if (!currentPath.length) {
      const endCurrentNormalizationPass = rules.some(({
        strictType,
        type,
        path
      }) => {
        const node = getNode(editor, path);

        if (node) {
          if (strictType && node.type !== strictType) {
            Transforms.setNodes(editor, {
              type: strictType
            }, {
              at: path
            });
            return true;
          }
        } else {
          try {
            Transforms.insertNodes(editor, {
              type: strictType !== null && strictType !== void 0 ? strictType : type,
              children: [{
                text: ''
              }]
            }, {
              at: path
            });
            return true;
          } catch (err) {
            onError === null || onError === void 0 ? void 0 : onError(err);
          }
        }

        return false;
      });

      if (endCurrentNormalizationPass) {
        return;
      }
    }

    return normalizeNode([currentNode, currentPath]);
  };

  return editor;
};

/**
 * Add a trailing block when the last node type is not `type`
 */

const withTrailingNode = (_a = {}) => {
  var {
    type = ELEMENT_PARAGRAPH,
    level = 1
  } = _a,
      query = __rest(_a, ["type", "level"]);

  return editor => {
    const {
      normalizeNode
    } = editor;

    editor.normalizeNode = ([currentNode, currentPath]) => {
      if (!currentPath.length) {
        const entry = getLastNode(editor, level);
        const [lastNode, lastPath] = entry;

        if (lastNode.type !== type && queryNode(entry, query)) {
          Transforms.insertNodes(editor, {
            type,
            children: [{
              text: ''
            }]
          }, {
            at: Path.next(lastPath)
          });
          return;
        }
      }

      return normalizeNode([currentNode, currentPath]);
    };

    return editor;
  };
};

const ToolbarSearchHighlight = ({
  icon: Icon,
  setSearch
}) => /*#__PURE__*/createElement(HeadingToolbar, {
  styles: {
    root: {
      height: '38px'
    }
  }
}, /*#__PURE__*/createElement("div", {
  style: {
    position: 'relative',
    paddingBottom: '10px',
    marginBottom: '10px'
  }
}, /*#__PURE__*/createElement(Icon, {
  size: 18,
  style: {
    position: 'absolute',
    top: '0.5em',
    left: '0.5em',
    color: '#ccc'
  }
}), /*#__PURE__*/createElement("input", {
  "data-testid": "ToolbarSearchHighlightInput",
  type: "search",
  placeholder: "Search the text...",
  onChange: e => setSearch(e.target.value),
  style: {
    boxSizing: 'border-box',
    fontSize: '0.85em',
    width: '100%',
    padding: '0.5em',
    paddingLeft: '2em',
    border: '2px solid #ddd',
    background: '#fafafa'
  }
})));

const MARK_SEARCH_HIGHLIGHT = 'search_highlight';
const DEFAULTS_SEARCH_HIGHLIGHT = {
  search_highlight: {
    type: MARK_SEARCH_HIGHLIGHT,
    rootProps: {
      as: 'span',
      className: 'slate-search-highlight',
      styles: {
        root: {
          backgroundColor: '#fff59d'
        }
      }
    }
  }
};

const decorateSearchHighlight = options => ([node, path]) => {
  const {
    search_highlight,
    search
  } = setDefaults(options, DEFAULTS_SEARCH_HIGHLIGHT);
  const ranges = [];

  if (search && Text.isText(node)) {
    const {
      text
    } = node;
    const parts = text.split(search);
    let offset = 0;
    parts.forEach((part, i) => {
      if (i !== 0) {
        ranges.push({
          anchor: {
            path,
            offset: offset - search.length
          },
          focus: {
            path,
            offset
          },
          [search_highlight.type]: true
        });
      }

      offset = offset + part.length + search.length;
    });
  }

  return ranges;
};

const SearchHighlightPlugin = options => {
  const {
    search_highlight
  } = setDefaults(options, DEFAULTS_SEARCH_HIGHLIGHT);
  return Object.assign({}, HighlightPlugin({
    highlight: search_highlight
  }));
};

export { ATTRIBUTE_LINK, AlignPlugin, BalloonToolbar, BasicElementPlugins, BasicMarkPlugins, BlockquoteElement, BlockquoteElementBase, BlockquotePlugin, BoldPlugin, CLASS_TODO_LIST, CLASS_TODO_LIST_CHECKED, CODE_BLOCK_LANGUAGES, CodeBlockElement, CodeBlockElementBase, CodeBlockPlugin, CodeLineElement, CodeLineElementBase, CodePlugin, DEFAULTS_ALIGN, DEFAULTS_BLOCKQUOTE, DEFAULTS_BOLD, DEFAULTS_CODE, DEFAULTS_CODE_BLOCK, DEFAULTS_HEADING, DEFAULTS_HIGHLIGHT, DEFAULTS_IMAGE, DEFAULTS_ITALIC, DEFAULTS_KBD, DEFAULTS_LINK, DEFAULTS_LIST, DEFAULTS_MEDIA_EMBED, DEFAULTS_MENTION, DEFAULTS_PARAGRAPH, DEFAULTS_SEARCH_HIGHLIGHT, DEFAULTS_STRIKETHROUGH, DEFAULTS_SUBSUPSCRIPT, DEFAULTS_TABLE, DEFAULTS_TODO_LIST, DEFAULTS_UNDERLINE, DEFAULT_ELEMENT, ELEMENT_ALIGN_CENTER, ELEMENT_ALIGN_JUSTIFY, ELEMENT_ALIGN_LEFT, ELEMENT_ALIGN_RIGHT, ELEMENT_BLOCKQUOTE, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4, ELEMENT_H5, ELEMENT_H6, ELEMENT_IMAGE, ELEMENT_LI, ELEMENT_LINK, ELEMENT_MEDIA_EMBED, ELEMENT_MENTION, ELEMENT_OL, ELEMENT_PARAGRAPH, ELEMENT_TABLE, ELEMENT_TD, ELEMENT_TH, ELEMENT_TODO_LI, ELEMENT_TR, ELEMENT_UL, ExitBreakPlugin, HeadingPlugin, HeadingToolbar, HighlightPlugin, ImageElement, ImageElementBase, ImagePlugin, ItalicPlugin, KbdPlugin, LinkElement, LinkElementBase, LinkPlugin, ListHotkey, ListPlugin, MARK_BOLD, MARK_CODE, MARK_HIGHLIGHT, MARK_ITALIC, MARK_KBD, MARK_PRISM, MARK_SEARCH_HIGHLIGHT, MARK_STRIKETHROUGH, MARK_SUBSCRIPT, MARK_SUPERSCRIPT, MARK_UNDERLINE, MediaEmbedElement, MediaEmbedElementBase, MediaEmbedPlugin, MentionElement, MentionElementBase, MentionPlugin, MentionSelect, MentionSelectBase, ParagraphPlugin, PortalBody, PreviewLeaf, PreviewLeafBase, PreviewPlugin, ResetBlockTypePlugin, SearchHighlightPlugin, Selectable, SoftBreakPlugin, StrikethroughPlugin, StyledComponent, StyledComponentBase, StyledElement, StyledElementBase, StyledLeaf, StyledLeafBase, SubscriptPlugin, SuperscriptPlugin, TableElement, TableElementBase, TableHotKey, TablePlugin, TodoListElement, TodoListElementBase, TodoListPlugin, Toolbar, ToolbarAlign, ToolbarBase, ToolbarButton, ToolbarButtonBase, ToolbarCodeBlock, ToolbarElement, ToolbarImage, ToolbarLink, ToolbarList, ToolbarMark, ToolbarSearchHighlight, ToolbarTable, UnderlinePlugin, addColumn, addRow, applyDeepToNodes, autoformatBlock, autoformatInline, createDocumentNode, createNode, decorateCodeBlock, decoratePreview, decorateSearchHighlight, defaultsDeepToNodes, deleteBackwardList, deleteColumn, deleteFragment, deleteFragmentList, deleteRow, deleteStartSpace, deleteTable, deserializeAlign, deserializeBlockquote, deserializeBold, deserializeCode, deserializeCodeBlock, deserializeHTMLElement, deserializeHTMLToBreak, deserializeHTMLToDocument, deserializeHTMLToDocumentFragment, deserializeHTMLToElement, deserializeHTMLToFragment, deserializeHTMLToMarks, deserializeHTMLToText, deserializeHeading, deserializeHighlight, deserializeIframe, deserializeItalic, deserializeKbd, deserializeLink, deserializeList, deserializeMention, deserializeParagraph, deserializeStrikethrough, deserializeSubscript, deserializeSuperscript, deserializeTable, deserializeTodoList, deserializeUnderline, escapeRegExp, exitBreakAtEdges, filterBreaklines, findDescendant, findNode, focusBlockStartById, getAbove, getBalloonToolbarStyles, getBlockAbove, getBlockquoteElementStyles, getBlocksWithId, getCellInNextTableRow, getCellInPreviousTableRow, getChildren, getCodeBlockElementStyles, getCodeLineElementStyles, getCodeLineEntry, getCodeLines, getElementDeserializer, getEmptyCellNode, getEmptyRowNode, getEmptyTableNode, getHandler, getHeadingToolbarStyles, getHighestEmptyList, getHoverDirection, getImageElementStyles, getIndentDepth, getLastChild, getLastChildPath, getLastNode, getLeafDeserializer, getLinkElementStyles, getListItemEntry, getListNormalizer, getListRoot, getListTypes, getMediaEmbedElementStyles, getMentionElementStyles, getMentionSelectStyles, getNewDirection, getNextIndex, getNextSiblingNodes, getNextTableCell, getNode, getNodeDeserializer, getNodes, getNodesRange, getOnHotkeyToggleMark, getOnHotkeyToggleMarkDefault, getOnHotkeyToggleNodeType, getOnHotkeyToggleNodeTypeDefault, getParent, getPointBefore, getPointFromLocation, getPointNextToVoid, getPreventDefaultHandler, getPreviewLeafStyles, getPreviousBlockById, getPreviousIndex, getPreviousPath, getPreviousTableCell, getQueryOptions, getRangeBefore, getRangeFromBlockStart, getRenderElement, getRenderElements, getRenderLeaf, getRenderLeafDefault, getSelectableElement, getSelectableStyles, getSelectionText, getStyledComponentStyles, getTableCellEntry, getTableElementStyles, getText, getTodoListElementStyles, getToolbarButtonStyles, getToolbarStyles, grabberTooltipProps, hasListChild, htmlStringToDOMNode, indentCodeLine, insertBreakList, insertCodeBlock, insertCodeLine, insertEmptyCodeBlock, insertEmptyElement, insertImage, insertListItem, insertMention, insertTable, isAcrossListItems, isAncestor, isAncestorEmpty, isBlockAboveEmpty, isBlockTextEmptyAfterSelection, isCollapsed, isDescendant, isEnd, isExpanded, isFirstChild, isImageUrl, isLastChild, isListNested, isMarkActive, isPointAtWordEnd, isRangeAcrossBlocks, isRangeInSingleText, isSelectionAtBlockEnd, isSelectionAtBlockStart, isSelectionExpanded, isStart, isTextByPath, isUrl, isWordAfterTrigger, match, matchPredicate, matchesTriggerAndPattern, mergeDeepToNodes, mergeNodes, moveChildren, moveListItemDown, moveListItemSublistItemsToListItemSublist, moveListItemUp, moveListItemsToList, moveListSiblingsAfterCursor, normalizeDescendantsToDocumentFragment, normalizeListItem, onKeyDownCodeBlock, onKeyDownExitBreak, onKeyDownList, onKeyDownResetBlockType, onKeyDownSoftBreak, onKeyDownTable, outdentCodeLine, parseMD, pipe, queryNode, removeBlocksAndFocus, removeFirstListItem, removeListItem, renderElementAlign, renderElementBlockquote, renderElementCodeBlock, renderElementHeading, renderElementImage, renderElementLink, renderElementList, renderElementMediaEmbed, renderElementMention, renderElementParagraph, renderElementTable, renderElementTodoList, renderLeafBold, renderLeafCode, renderLeafCodeBlock, renderLeafHighlight, renderLeafItalic, renderLeafKbd, renderLeafPreview, renderLeafStrikethrough, renderLeafSubscript, renderLeafSuperscript, renderLeafUnderline, selectBlockById, selectBlocksBySelectionOrId, selectEndOfBlockAboveSelection, serializeHTMLFromNodes, setDefaults, setPositionAtSelection, someNode, toggleCodeBlock, toggleList, toggleMark, toggleNodeType, toggleWrapNodes, unhangRange, unwrapCodeBlock, unwrapList, unwrapNodes, upsertAlign, upsertLinkAtSelection, useBalloonMove, useBalloonShow, useDndBlock, useDragBlock, useDropBlockOnEditor, useMention, withAutoformat, withCodeBlock, withDeserializeHTML, withDeserializeMd, withImageUpload, withInlineVoid, withLink, withList, withMarks, withNodeID, withNormalizeTypes, withRemoveEmptyNodes, withSelectOnBackspace, withTable, withTrailingNode, wrapLink, wrapNodes };
//# sourceMappingURL=index.es.js.map
