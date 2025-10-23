var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import require$$0, { useMemo, useState, useCallback, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { select } from "d3-selection";
import { line, curveCardinal, curveBasis, curveStep, curveLinear, area } from "d3-shape";
import { scaleTime } from "d3-scale";
import { axisBottom } from "d3-axis";
import { timeFormat } from "d3-time-format";
import { timeSecond, timeMinute, timeHour, timeDay, timeWeek, timeMonth } from "d3-time";
import { zoom, zoomIdentity } from "d3-zoom";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = require$$0, k = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, g) {
    var b, d = {}, e = null, h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var React = require$$0;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              c--;
            }
            for (; s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {
              }
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self) ;
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type, config, maybeKey, source, self) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === void 0 || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      var didWarnAboutKeySpread = {};
      function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum();
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== void 0) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          {
            if (hasOwnProperty.call(props, "key")) {
              var componentName = getComponentNameFromType(type);
              var keys = Object.keys(props).filter(function(k) {
                return k !== "key";
              });
              var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
              if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                var afterExample = keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}";
                error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                didWarnAboutKeySpread[componentName + beforeExample] = true;
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      var jsx = jsxWithValidationDynamic;
      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  if (process.env.NODE_ENV === "production") {
    jsxRuntime.exports = requireReactJsxRuntime_production_min();
  } else {
    jsxRuntime.exports = requireReactJsxRuntime_development();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
function generateItemAriaLabel(item) {
  const baseLabel = item.label?.text || `Item ${item.id}`;
  switch (item.type) {
    case "curve":
      const pointCount = item.dataPoints.length;
      return `${baseLabel}, curve with ${pointCount} data points`;
    case "event":
      const eventTime = item.time.toLocaleString();
      return `${baseLabel}, event at ${eventTime}`;
    case "time-range":
      const startTime = item.startTime.toLocaleString();
      const endTime = item.endTime.toLocaleString();
      const duration = formatDuration(item.endTime.getTime() - item.startTime.getTime());
      return `${baseLabel}, time range from ${startTime} to ${endTime}, duration ${duration}`;
    default:
      return baseLabel;
  }
}
function generateLaneAriaLabel(lane, itemCount) {
  const baseLabel = lane.label || `Lane ${lane.id}`;
  return `${baseLabel}, contains ${itemCount} items`;
}
function generateTimelineAriaDescription(lanes, items, timeRange) {
  const laneCount = lanes.length;
  const itemCount = items.length;
  const startTime = timeRange.start.toLocaleString();
  const endTime = timeRange.end.toLocaleString();
  return `Timeline with ${laneCount} lanes and ${itemCount} items, showing data from ${startTime} to ${endTime}. Use arrow keys to navigate, plus and minus keys to zoom.`;
}
function formatDuration(milliseconds) {
  const seconds = Math.floor(milliseconds / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
}
function createKeyboardNavigationHandler(options) {
  return (event) => {
    const handledKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "+",
      "=",
      "-",
      "_",
      "0",
      "Home",
      "End",
      "Enter",
      " "
    ];
    if (handledKeys.includes(event.key)) {
      event.preventDefault();
    }
    switch (event.key) {
      case "ArrowLeft":
        if (event.shiftKey) {
          options.onSelectPreviousItem();
        } else {
          options.onPanLeft();
        }
        break;
      case "ArrowRight":
        if (event.shiftKey) {
          options.onSelectNextItem();
        } else {
          options.onPanRight();
        }
        break;
      case "ArrowUp":
        options.onSelectPreviousItem();
        break;
      case "ArrowDown":
        options.onSelectNextItem();
        break;
      case "+":
      case "=":
        options.onZoomIn();
        break;
      case "-":
      case "_":
        options.onZoomOut();
        break;
      case "0":
      case "Home":
        options.onResetZoom();
        break;
      case "Enter":
      case " ":
        options.onActivateSelectedItem();
        break;
    }
  };
}
class FocusManager {
  constructor(container) {
    __publicField(this, "focusableElements", []);
    __publicField(this, "currentFocusIndex", -1);
    this.container = container;
    this.updateFocusableElements();
  }
  updateFocusableElements() {
    const selector = [
      '[tabindex]:not([tabindex="-1"])',
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[role="button"]:not([aria-disabled="true"])'
    ].join(", ");
    this.focusableElements = Array.from(
      this.container.querySelectorAll(selector)
    );
  }
  focusNext() {
    if (this.focusableElements.length === 0) return false;
    this.currentFocusIndex = (this.currentFocusIndex + 1) % this.focusableElements.length;
    this.focusableElements[this.currentFocusIndex].focus();
    return true;
  }
  focusPrevious() {
    if (this.focusableElements.length === 0) return false;
    this.currentFocusIndex = this.currentFocusIndex <= 0 ? this.focusableElements.length - 1 : this.currentFocusIndex - 1;
    this.focusableElements[this.currentFocusIndex].focus();
    return true;
  }
  focusFirst() {
    if (this.focusableElements.length === 0) return false;
    this.currentFocusIndex = 0;
    this.focusableElements[0].focus();
    return true;
  }
  getCurrentFocusedElement() {
    return this.currentFocusIndex >= 0 ? this.focusableElements[this.currentFocusIndex] : null;
  }
}
class ScreenReaderAnnouncer {
  constructor(container) {
    __publicField(this, "liveRegion");
    this.liveRegion = this.createLiveRegion();
    container.appendChild(this.liveRegion);
  }
  createLiveRegion() {
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.style.position = "absolute";
    liveRegion.style.left = "-10000px";
    liveRegion.style.width = "1px";
    liveRegion.style.height = "1px";
    liveRegion.style.overflow = "hidden";
    return liveRegion;
  }
  announce(message, priority = "polite") {
    this.liveRegion.setAttribute("aria-live", priority);
    this.liveRegion.textContent = message;
    setTimeout(() => {
      this.liveRegion.textContent = "";
    }, 1e3);
  }
  announceTimeRangeChange(timeRange) {
    const startTime = timeRange.start.toLocaleString();
    const endTime = timeRange.end.toLocaleString();
    this.announce(`Timeline view changed to show data from ${startTime} to ${endTime}`);
  }
  announceItemSelection(item) {
    const label = generateItemAriaLabel(item);
    this.announce(`Selected ${label}`);
  }
  announceZoomChange(zoomLevel) {
    this.announce(`Zoom level changed to ${zoomLevel}`);
  }
  destroy() {
    if (this.liveRegion.parentNode) {
      this.liveRegion.parentNode.removeChild(this.liveRegion);
    }
  }
}
function getContrastRatio(color1, color2) {
  const getLuminance = (color) => {
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0.5;
    const [r, g, b] = rgb.map((c) => {
      const val = parseInt(c) / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
function meetsWCAGContrast(foreground, background, level = "AA") {
  const ratio = getContrastRatio(foreground, background);
  return level === "AA" ? ratio >= 4.5 : ratio >= 7;
}
const interpolationMap = {
  linear: curveLinear,
  step: curveStep,
  basis: curveBasis,
  cardinal: curveCardinal
};
const CurveItem = ({
  id,
  type,
  laneId,
  dataPoints,
  style,
  interpolation = "linear",
  label,
  metadata,
  timeScale,
  laneHeight,
  onItemClick,
  onItemHover,
  isSelected = false,
  isHovered = false,
  yScale
}) => {
  const { linePath, areaPath } = useMemo(() => {
    if (!timeScale || dataPoints.length < 2) {
      return { linePath: "", areaPath: "" };
    }
    const curve = interpolationMap[interpolation];
    let effectiveYScale = yScale;
    if (!effectiveYScale) {
      const values = dataPoints.map((d) => d.value);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const valueRange = maxValue - minValue;
      if (valueRange > 0) {
        effectiveYScale = (value) => {
          const normalizedValue = (value - minValue) / valueRange;
          return laneHeight - normalizedValue * laneHeight * 0.8 - laneHeight * 0.1;
        };
      } else {
        effectiveYScale = () => laneHeight / 2;
      }
    }
    const lineGenerator = line().x((d) => timeScale.scale(d.time)).y((d) => effectiveYScale(d.value)).curve(curve);
    const areaGenerator = style?.fillColor ? area().x((d) => timeScale.scale(d.time)).y0(laneHeight).y1((d) => effectiveYScale(d.value)).curve(curve) : null;
    return {
      linePath: lineGenerator(dataPoints) || "",
      areaPath: areaGenerator ? areaGenerator(dataPoints) || "" : ""
    };
  }, [dataPoints, timeScale, yScale, laneHeight, interpolation, style?.fillColor]);
  const ariaLabel = useMemo(() => {
    return generateItemAriaLabel({ id, type, dataPoints, label });
  }, [id, type, laneId, dataPoints, style, interpolation, label, metadata]);
  if (!timeScale || dataPoints.length < 2) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "g",
    {
      "data-testid": "curve-item",
      "data-item-id": id,
      role: "button",
      tabIndex: 0,
      "aria-label": ariaLabel,
      style: {
        outline: "none",
        pointerEvents: "none"
      },
      className: `curve-item ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`,
      children: [
        style?.fillColor && areaPath && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: areaPath,
            fill: style.fillColor,
            opacity: isSelected ? 1 : isHovered ? 1 : style?.opacity || 0.15,
            className: "curve-fill",
            style: {
              transition: "all 0.2s ease-in-out",
              pointerEvents: "none"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: linePath,
            fill: "none",
            stroke: style.strokeColor,
            strokeWidth: isSelected ? (style.strokeWidth || 2) + 2 : isHovered ? (style.strokeWidth || 2) + 1 : style.strokeWidth || 2,
            opacity: 1,
            className: "curve-line",
            style: {
              transition: "all 0.2s ease-in-out",
              pointerEvents: "none"
            }
          }
        ),
        dataPoints.map((point, index) => {
          let effectiveYScale = yScale;
          if (!effectiveYScale) {
            const values = dataPoints.map((d) => d.value);
            const minValue = Math.min(...values);
            const maxValue = Math.max(...values);
            const valueRange = maxValue - minValue;
            if (valueRange > 0) {
              effectiveYScale = (value) => {
                const normalizedValue = (value - minValue) / valueRange;
                return laneHeight - normalizedValue * laneHeight * 0.8 - laneHeight * 0.1;
              };
            } else {
              effectiveYScale = () => laneHeight / 2;
            }
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: timeScale.scale(point.time),
              cy: effectiveYScale(point.value),
              r: 2,
              fill: style.strokeColor,
              opacity: 0,
              className: "curve-point",
              style: {
                cursor: onItemClick ? "pointer" : "default"
              }
            },
            index
          );
        }),
        label && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: timeScale.scale(dataPoints[Math.floor(dataPoints.length / 2)].time),
            y: label.position === "top" ? -5 : laneHeight + 15,
            textAnchor: "middle",
            fontSize: label.style?.fontSize || 12,
            fill: label.style?.color || "#333",
            className: "curve-label",
            children: label.text
          }
        )
      ]
    }
  );
};
const EventItem = ({
  id,
  type,
  laneId,
  time,
  style,
  label,
  metadata,
  timeScale,
  laneHeight,
  onItemClick,
  onItemHover,
  isSelected = false,
  isHovered = false
}) => {
  const x = useMemo(() => {
    return timeScale ? timeScale.scale(time) : 0;
  }, [timeScale, time]);
  const y = laneHeight / 2;
  const handleClick = (event) => {
    event.stopPropagation();
    onItemClick?.({ id, type, laneId, time, style, label, metadata }, event);
  };
  const handleMouseEnter = (event) => {
    onItemHover?.({ id, type, laneId, time, style, label, metadata }, event);
  };
  const ariaLabel = useMemo(() => {
    return generateItemAriaLabel({ id, type, time, label });
  }, [id, type, laneId, time, style, label, metadata]);
  const renderMarker = () => {
    const size = isSelected ? (style.size || 8) + 2 : isHovered ? (style.size || 8) + 1 : style.size || 8;
    const strokeWidth = isSelected ? (style.strokeWidth || 2) + 1 : isHovered ? (style.strokeWidth || 2) + 0.5 : style.strokeWidth || 2;
    const dropShadow = isSelected ? "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 4px rgba(0, 0, 0, 0.2))" : isHovered ? "drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2))" : "none";
    const commonProps = {
      fill: style.color,
      stroke: style.color,
      strokeWidth,
      opacity: isSelected ? 1 : isHovered ? 0.9 : 1,
      className: "event-marker",
      style: {
        transition: "all 0.2s ease-in-out",
        filter: dropShadow
      }
    };
    switch (style.markerType) {
      case "line":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: x,
            y1: 0,
            x2: x,
            y2: laneHeight,
            stroke: style.color,
            strokeWidth,
            className: "event-marker",
            style: {
              transition: "all 0.2s ease-in-out",
              filter: dropShadow
            }
          }
        );
      case "circle":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: size,
            ...commonProps
          }
        );
      case "triangle":
        const trianglePath = `M${x},${y - size} L${x - size},${y + size} L${x + size},${y + size} Z`;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: trianglePath,
            ...commonProps
          }
        );
      case "square":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: x - size,
            y: y - size,
            width: size * 2,
            height: size * 2,
            ...commonProps
          }
        );
      case "diamond":
        const diamondPath = `M${x},${y - size} L${x + size},${y} L${x},${y + size} L${x - size},${y} Z`;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            d: diamondPath,
            ...commonProps
          }
        );
      case "custom":
        if (style.customSvg) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              d: style.customSvg,
              transform: `translate(${x}, ${y})`,
              ...commonProps
            }
          );
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: size,
            ...commonProps
          }
        );
      case "icon":
        if (style.iconClass) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "foreignObject",
            {
              x: x - size,
              y: y - size,
              width: size * 2,
              height: size * 2,
              style: {
                overflow: "visible",
                transition: "all 0.2s ease-in-out",
                filter: dropShadow
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    color: style.color,
                    fontSize: `${size * 1.5}px`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("i", { className: style.iconClass })
                }
              )
            }
          );
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: size,
            ...commonProps
          }
        );
      case "image":
        if (style.imageUrl) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "image",
            {
              href: style.imageUrl,
              x: x - size,
              y: y - size,
              width: size * 2,
              height: size * 2,
              preserveAspectRatio: "xMidYMid meet",
              className: "event-marker event-marker-image",
              style: {
                transition: "all 0.2s ease-in-out",
                filter: dropShadow
              }
            }
          );
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: size,
            ...commonProps
          }
        );
      case "svg":
        if (style.customElement) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "g",
            {
              transform: `translate(${x}, ${y})`,
              style: {
                transition: "all 0.2s ease-in-out",
                filter: dropShadow
              },
              children: style.customElement
            }
          );
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: size,
            ...commonProps
          }
        );
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: x,
            cy: y,
            r: size,
            ...commonProps
          }
        );
    }
  };
  if (!timeScale) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "g",
    {
      "data-testid": "event-item",
      "data-item-id": id,
      "data-marker-type": style.markerType,
      role: "button",
      tabIndex: 0,
      "aria-label": ariaLabel,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      style: {
        cursor: onItemClick ? "pointer" : "default",
        outline: "none"
      },
      className: `event-item ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`,
      transform: `translate(0, 0)`,
      children: [
        renderMarker(),
        label && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x,
            y: label.position === "top" ? -10 : laneHeight + 15,
            textAnchor: "middle",
            fontSize: label.style?.fontSize || 12,
            fill: label.style?.color || "#333",
            className: "event-label",
            children: label.text
          }
        )
      ]
    }
  );
};
const TimeRangeItem = ({
  id,
  type,
  laneId,
  startTime,
  endTime,
  style,
  stackLevel = 0,
  label,
  metadata,
  timeScale,
  laneHeight,
  onItemClick,
  onItemHover,
  isSelected = false,
  isHovered = false
}) => {
  const { x, width, y, height } = useMemo(() => {
    if (!timeScale) {
      return { x: 0, width: 0, y: 0, height: 0 };
    }
    const x2 = timeScale.scale(startTime);
    const endX = timeScale.scale(endTime);
    const width2 = Math.max(1, endX - x2);
    const itemHeight = Math.min(20, laneHeight / 4);
    const stackSpacing = itemHeight + 2;
    const y2 = stackLevel * stackSpacing;
    return { x: x2, width: width2, y: y2, height: itemHeight };
  }, [timeScale, startTime, endTime, stackLevel, laneHeight]);
  const handleClick = (event) => {
    event.stopPropagation();
    onItemClick?.({ id, type, laneId, startTime, endTime, style, stackLevel, label, metadata }, event);
  };
  const handleMouseEnter = (event) => {
    onItemHover?.({ id, type, laneId, startTime, endTime, style, stackLevel, label, metadata }, event);
  };
  const ariaLabel = useMemo(() => {
    return generateItemAriaLabel({ id, type, startTime, endTime, label });
  }, [id, type, laneId, startTime, endTime, style, stackLevel, label, metadata]);
  if (!timeScale || width <= 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "g",
    {
      "data-testid": "time-range-item",
      "data-item-id": id,
      role: "button",
      tabIndex: 0,
      "aria-label": ariaLabel,
      onClick: handleClick,
      onMouseEnter: handleMouseEnter,
      style: {
        cursor: onItemClick ? "pointer" : "default",
        outline: "none"
      },
      className: `time-range-item ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x,
            y,
            width,
            height,
            fill: style.backgroundColor,
            stroke: style.borderColor || style.backgroundColor,
            strokeWidth: isSelected ? (style.borderWidth || 1) + 2 : isHovered ? (style.borderWidth || 1) + 1 : style.borderWidth || 1,
            opacity: isSelected ? 0.95 : isHovered ? 0.85 : style.opacity || 0.7,
            rx: style.borderRadius || 2,
            ry: style.borderRadius || 2,
            className: "time-range-rect",
            style: {
              transition: "all 0.2s ease-in-out",
              filter: isSelected ? "drop-shadow(0 3px 12px rgba(0, 0, 0, 0.4)) drop-shadow(0 1px 6px rgba(0, 0, 0, 0.3))" : isHovered ? "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.2))" : "none"
            }
          }
        ),
        label && label.position === "inline" && width > 50 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: x + width / 2,
            y: y + height / 2,
            textAnchor: "middle",
            dominantBaseline: "middle",
            fontSize: label.style?.fontSize || 11,
            fill: label.style?.color || "#fff",
            className: "time-range-label",
            children: label.text
          }
        ),
        label && label.position !== "inline" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: x + width / 2,
            y: label.position === "top" ? y - 5 : y + height + 15,
            textAnchor: "middle",
            fontSize: label.style?.fontSize || 12,
            fill: label.style?.color || "#333",
            className: "time-range-label",
            children: label.text
          }
        ),
        onItemClick && (isSelected || isHovered) && width > 20 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: x - 2,
              y,
              width: 4,
              height,
              fill: "#007bff",
              className: "time-range-handle time-range-handle-start",
              style: { cursor: "ew-resize" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: x + width - 2,
              y,
              width: 4,
              height,
              fill: "#007bff",
              className: "time-range-handle time-range-handle-end",
              style: { cursor: "ew-resize" }
            }
          )
        ] })
      ]
    }
  );
};
function createTimeScale(timeRange, pixelRange) {
  const scale = scaleTime().domain([timeRange.start, timeRange.end]).range(pixelRange);
  return {
    domain: [timeRange.start, timeRange.end],
    range: pixelRange,
    scale
  };
}
function updateTimeScale(timeScale, newTimeRange, newPixelRange) {
  const domain = newTimeRange ? [newTimeRange.start, newTimeRange.end] : timeScale.domain;
  const range = newPixelRange || timeScale.range;
  const scale = scaleTime().domain(domain).range(range);
  return {
    domain,
    range,
    scale
  };
}
function timeToPixel(time, timeScale) {
  return timeScale.scale(time);
}
function pixelToTime(pixel, timeScale) {
  return timeScale.scale.invert(pixel);
}
function pixelRangeToTimeRange(pixelRange, timeScale) {
  return {
    start: pixelToTime(pixelRange[0], timeScale),
    end: pixelToTime(pixelRange[1], timeScale)
  };
}
function timeRangeToPixelRange(timeRange, timeScale) {
  return [
    timeToPixel(timeRange.start, timeScale),
    timeToPixel(timeRange.end, timeScale)
  ];
}
function getTimeRangeDuration(timeRange) {
  return timeRange.end.getTime() - timeRange.start.getTime();
}
function getTimeRangeCenter(timeRange) {
  const centerTime = (timeRange.start.getTime() + timeRange.end.getTime()) / 2;
  return new Date(centerTime);
}
function expandTimeRange(timeRange, factor) {
  const center = getTimeRangeCenter(timeRange);
  const duration = getTimeRangeDuration(timeRange);
  const newHalfDuration = duration * factor / 2;
  return {
    start: new Date(center.getTime() - newHalfDuration),
    end: new Date(center.getTime() + newHalfDuration)
  };
}
function shiftTimeRange(timeRange, offsetMs) {
  return {
    start: new Date(timeRange.start.getTime() + offsetMs),
    end: new Date(timeRange.end.getTime() + offsetMs)
  };
}
function timeRangesOverlap(range1, range2) {
  return range1.start < range2.end && range2.start < range1.end;
}
function timeInRange(time, timeRange) {
  return time >= timeRange.start && time <= timeRange.end;
}
function clampTimeRange(timeRange, bounds) {
  const duration = getTimeRangeDuration(timeRange);
  let start = timeRange.start;
  let end = timeRange.end;
  if (start < bounds.start) {
    start = bounds.start;
    end = new Date(start.getTime() + duration);
  }
  if (end > bounds.end) {
    end = bounds.end;
    start = new Date(end.getTime() - duration);
  }
  if (duration > getTimeRangeDuration(bounds)) {
    const center = getTimeRangeCenter(bounds);
    const halfDuration = getTimeRangeDuration(bounds) / 2;
    return {
      start: new Date(center.getTime() - halfDuration),
      end: new Date(center.getTime() + halfDuration)
    };
  }
  return { start, end };
}
function calculateVisibleItems(items, visibleTimeRange, bufferZone = 0.5) {
  const bufferedTimeRange = expandTimeRange(visibleTimeRange, 1 + bufferZone * 2);
  const visibleItems = items.filter((item) => isItemInTimeRange(item, bufferedTimeRange));
  return {
    visibleTimeRange,
    bufferedTimeRange,
    visibleItems,
    totalItems: items.length,
    renderCount: visibleItems.length
  };
}
function isItemInTimeRange(item, timeRange) {
  switch (item.type) {
    case "curve":
      return isCurveItemInTimeRange(item, timeRange);
    case "event":
      return isEventItemInTimeRange(item, timeRange);
    case "time-range":
      return isTimeRangeItemInTimeRange(item, timeRange);
    default:
      return false;
  }
}
function isCurveItemInTimeRange(item, timeRange) {
  if (item.dataPoints.length === 0) return false;
  const firstPoint = item.dataPoints[0];
  const lastPoint = item.dataPoints[item.dataPoints.length - 1];
  const curveTimeRange = {
    start: firstPoint.time,
    end: lastPoint.time
  };
  return timeRangesOverlap(curveTimeRange, timeRange);
}
function isEventItemInTimeRange(item, timeRange) {
  return timeInRange(item.time, timeRange);
}
function isTimeRangeItemInTimeRange(item, timeRange) {
  const itemTimeRange = {
    start: item.startTime,
    end: item.endTime
  };
  return timeRangesOverlap(itemTimeRange, timeRange);
}
function groupItemsByLane(items) {
  const itemsByLane = /* @__PURE__ */ new Map();
  for (const item of items) {
    const laneItems = itemsByLane.get(item.laneId) || [];
    laneItems.push(item);
    itemsByLane.set(item.laneId, laneItems);
  }
  return itemsByLane;
}
function calculateStackingLevels(timeRangeItems, stackingOrder = "recent-top") {
  const stackLevels = /* @__PURE__ */ new Map();
  const sortedItems = [...timeRangeItems].sort((a, b) => {
    if (stackingOrder === "recent-top") {
      return b.startTime.getTime() - a.startTime.getTime();
    } else if (stackingOrder === "recent-bottom") {
      return a.startTime.getTime() - b.startTime.getTime();
    } else {
      return (a.stackLevel || 0) - (b.stackLevel || 0);
    }
  });
  const occupiedLevels = [];
  for (const item of sortedItems) {
    let stackLevel = 0;
    while (stackLevel < occupiedLevels.length) {
      const occupied = occupiedLevels[stackLevel];
      if (!occupied || item.startTime >= occupied.end || item.endTime <= occupied.start) {
        break;
      }
      stackLevel++;
    }
    occupiedLevels[stackLevel] = {
      start: item.startTime,
      end: item.endTime
    };
    stackLevels.set(item.id, stackLevel);
  }
  return stackLevels;
}
function estimateMemoryUsage(itemCount) {
  const bytesPerItem = 1024;
  return itemCount * bytesPerItem;
}
function checkPerformanceTargets(virtualizationState, maxRenderCount = 1e3, maxMemoryMB = 50) {
  const renderCountOk = virtualizationState.renderCount <= maxRenderCount;
  const memoryUsage = estimateMemoryUsage(virtualizationState.renderCount);
  const memoryUsageOk = memoryUsage <= maxMemoryMB * 1024 * 1024;
  const recommendations = [];
  if (!renderCountOk) {
    recommendations.push(`Reduce buffer zone or viewport size. Currently rendering ${virtualizationState.renderCount} items, target is ${maxRenderCount}.`);
  }
  if (!memoryUsageOk) {
    recommendations.push(`Reduce dataset size or implement more aggressive virtualization. Current memory usage: ${Math.round(memoryUsage / 1024 / 1024)}MB, target is ${maxMemoryMB}MB.`);
  }
  return {
    renderCountOk,
    memoryUsageOk,
    recommendations
  };
}
function optimizeBufferZone(interactionFrequency, panSpeed, baseBufferZone = 0.5) {
  const interactionMultiplier = Math.min(interactionFrequency / 10, 2);
  const speedMultiplier = Math.min(panSpeed / 100, 2);
  return Math.min(baseBufferZone * (1 + interactionMultiplier + speedMultiplier), 2);
}
function createVirtualizationDebouncer(updateFn, delay = 16) {
  let timeoutId = null;
  return (items, timeRange, bufferZone) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      const state = calculateVisibleItems(items, timeRange, bufferZone);
      updateFn(state);
    }, delay);
  };
}
function useVirtualization(items, visibleTimeRange, bufferZone = 0.5) {
  return useMemo(() => {
    return calculateVisibleItems(items, visibleTimeRange, bufferZone);
  }, [
    items,
    visibleTimeRange.start.getTime(),
    visibleTimeRange.end.getTime(),
    bufferZone
  ]);
}
function useVirtualizationWithPerformance(items, visibleTimeRange, bufferZone = 0.5, maxRenderCount = 1e3, maxMemoryMB = 50) {
  const virtualizationState = useVirtualization(items, visibleTimeRange, bufferZone);
  const performanceMetrics = useMemo(() => {
    return checkPerformanceTargets(virtualizationState, maxRenderCount, maxMemoryMB);
  }, [virtualizationState, maxRenderCount, maxMemoryMB]);
  const itemsByLane = useMemo(() => {
    return groupItemsByLane(virtualizationState.visibleItems);
  }, [virtualizationState.visibleItems]);
  return {
    virtualizationState,
    performanceMetrics,
    itemsByLane
  };
}
function useStackingLevels(items, stackingOrder = "recent-top") {
  return useMemo(() => {
    const timeRangeItems = items.filter((item) => item.type === "time-range");
    return calculateStackingLevels(timeRangeItems, stackingOrder);
  }, [items, stackingOrder]);
}
function interpolateCurveValue(dataPoints, targetTime, interpolationType = "linear") {
  if (dataPoints.length === 0) {
    return null;
  }
  if (dataPoints.length === 1) return dataPoints[0].value;
  const targetTimestamp = targetTime.getTime();
  let leftPoint = null;
  let rightPoint = null;
  for (let i = 0; i < dataPoints.length - 1; i++) {
    const current = dataPoints[i];
    const next = dataPoints[i + 1];
    if (current.time.getTime() <= targetTimestamp && next.time.getTime() >= targetTimestamp) {
      leftPoint = current;
      rightPoint = next;
      break;
    }
  }
  if (!leftPoint && !rightPoint) {
    if (targetTimestamp < dataPoints[0].time.getTime()) {
      return dataPoints[0].value;
    } else {
      return dataPoints[dataPoints.length - 1].value;
    }
  }
  if (!leftPoint) leftPoint = dataPoints[0];
  if (!rightPoint) rightPoint = dataPoints[dataPoints.length - 1];
  if (leftPoint.time.getTime() === targetTimestamp) return leftPoint.value;
  if (rightPoint.time.getTime() === targetTimestamp) return rightPoint.value;
  switch (interpolationType) {
    case "step":
      return leftPoint.value;
    case "linear":
    default:
      const leftTime = leftPoint.time.getTime();
      const rightTime = rightPoint.time.getTime();
      const timeRange = rightTime - leftTime;
      if (timeRange === 0) return leftPoint.value;
      const progress = (targetTimestamp - leftTime) / timeRange;
      return leftPoint.value + (rightPoint.value - leftPoint.value) * progress;
    case "basis":
    case "cardinal":
      const leftTimeB = leftPoint.time.getTime();
      const rightTimeB = rightPoint.time.getTime();
      const timeRangeB = rightTimeB - leftTimeB;
      if (timeRangeB === 0) return leftPoint.value;
      const progressB = (targetTimestamp - leftTimeB) / timeRangeB;
      return leftPoint.value + (rightPoint.value - leftPoint.value) * progressB;
  }
}
function pixelToTimeFromScale(pixelX, timeScale) {
  return timeScale.scale.invert(pixelX);
}
function findHighestCurveAtPixel(curves, pixelX, timeScale, laneHeight = 100) {
  if (curves.length === 0) return null;
  const targetTime = pixelToTimeFromScale(pixelX, timeScale);
  let highestCurve = null;
  for (const curve of curves) {
    const value = interpolateCurveValue(
      curve.dataPoints,
      targetTime,
      curve.interpolation || "linear"
    );
    if (value !== null) {
      const values = curve.dataPoints.map((d) => d.value);
      const minValue = Math.min(...values);
      const maxValue = Math.max(...values);
      const valueRange = maxValue - minValue;
      let yPosition;
      if (valueRange > 0) {
        const normalizedValue = (value - minValue) / valueRange;
        yPosition = laneHeight - normalizedValue * laneHeight * 0.8 - laneHeight * 0.1;
      } else {
        yPosition = laneHeight / 2;
      }
      if (!highestCurve || yPosition < highestCurve.yPosition) {
        highestCurve = {
          curveId: curve.id,
          value,
          time: targetTime,
          yPosition
        };
      }
    }
  }
  return highestCurve;
}
const Lane = ({
  id,
  height,
  style,
  label,
  stackingOrder = "recent-top",
  items,
  timeScale,
  viewport,
  onItemClick,
  onItemHover
}) => {
  const [hoveredCurveId, setHoveredCurveId] = useState(null);
  const [selectedCurveId, setSelectedCurveId] = useState(null);
  const stackLevels = useStackingLevels(items, stackingOrder);
  const ariaLabel = useMemo(() => {
    return generateLaneAriaLabel({ id, label }, items.length);
  }, [id, height, style, label, stackingOrder, items.length]);
  const curveItems = useMemo(() => {
    return items.filter((item) => item.type === "curve");
  }, [items]);
  const handleLaneMouseMove = useCallback((event) => {
    if (!timeScale || curveItems.length === 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const highestCurve = findHighestCurveAtPixel(
      curveItems.map((item) => ({
        id: item.id,
        dataPoints: item.dataPoints,
        interpolation: item.interpolation
      })),
      mouseX,
      timeScale,
      height
    );
    if (highestCurve) {
      setHoveredCurveId(highestCurve.curveId);
      const curveItem = curveItems.find((item) => item.id === highestCurve.curveId);
      if (curveItem && onItemHover) {
        const enhancedEvent = {
          ...event,
          interpolatedValue: highestCurve.value,
          interpolatedTime: highestCurve.time,
          mouseX
        };
        onItemHover(curveItem, enhancedEvent);
      }
    } else {
      setHoveredCurveId(null);
    }
  }, [timeScale, curveItems, onItemHover, height]);
  const handleLaneMouseLeave = useCallback(() => {
    setHoveredCurveId(null);
  }, []);
  const handleLaneClick = useCallback((event) => {
    if (!timeScale || curveItems.length === 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const highestCurve = findHighestCurveAtPixel(
      curveItems.map((item) => ({
        id: item.id,
        dataPoints: item.dataPoints,
        interpolation: item.interpolation
      })),
      mouseX,
      timeScale,
      height
    );
    if (highestCurve) {
      setSelectedCurveId(highestCurve.curveId);
      const curveItem = curveItems.find((item) => item.id === highestCurve.curveId);
      if (curveItem && onItemClick) {
        const enhancedEvent = {
          ...event,
          interpolatedValue: highestCurve.value,
          interpolatedTime: highestCurve.time,
          mouseX
        };
        onItemClick(curveItem, enhancedEvent);
      }
    }
  }, [timeScale, curveItems, onItemClick]);
  const renderItem = (item, index) => {
    const commonProps = {
      timeScale,
      laneHeight: height,
      onItemClick,
      onItemHover
    };
    switch (item.type) {
      case "curve":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          CurveItem,
          {
            ...item,
            ...commonProps,
            isSelected: selectedCurveId === item.id,
            isHovered: hoveredCurveId === item.id
          },
          item.id
        );
      case "event":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(EventItem, { ...item, ...commonProps }, item.id);
      case "time-range":
        const stackLevel = stackLevels.get(item.id) || 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TimeRangeItem, { ...item, ...commonProps, stackLevel }, item.id);
      default:
        return null;
    }
  };
  const isEmpty = items.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-testid": "lane",
      "data-lane-id": id,
      className: `timeline-lane ${isEmpty ? "empty" : ""}`,
      style: {
        position: "relative",
        width: "100%",
        height: `${height}px`,
        backgroundColor: style?.backgroundColor,
        borderColor: style?.borderColor,
        borderWidth: style?.borderWidth ? `${style.borderWidth}px` : void 0,
        borderStyle: style?.borderWidth ? "solid" : void 0,
        overflow: "hidden"
      },
      role: "region",
      "aria-label": ariaLabel,
      children: [
        label && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "lane-label",
            style: {
              position: "absolute",
              left: 8,
              top: 4,
              fontSize: "12px",
              fontWeight: "bold",
              color: "#666",
              pointerEvents: "none",
              zIndex: 10
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "100%",
            height,
            style: {
              position: "absolute",
              top: 0,
              left: 0
            },
            className: "lane-svg",
            onMouseMove: handleLaneMouseMove,
            onMouseLeave: handleLaneMouseLeave,
            onClick: handleLaneClick,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "pattern",
                {
                  id: `grid-${id}`,
                  width: "50",
                  height: "20",
                  patternUnits: "userSpaceOnUse",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M 50 0 L 0 0 0 20",
                      fill: "none",
                      stroke: "#f0f0f0",
                      strokeWidth: "0.5"
                    }
                  )
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "rect",
                {
                  width: "100%",
                  height: "100%",
                  fill: `url(#grid-${id})`,
                  opacity: 0.3
                }
              ),
              items.sort((a, b) => {
                const aSelected = a.type === "curve" && a.isSelected;
                const bSelected = b.type === "curve" && b.isSelected;
                if (aSelected && !bSelected) return 1;
                if (!aSelected && bSelected) return -1;
                return 0;
              }).map(renderItem)
            ]
          }
        ),
        isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "data-testid": "no-data-message",
            className: "no-data-message",
            style: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#999",
              fontSize: "14px",
              fontStyle: "italic",
              pointerEvents: "none"
            },
            children: "No data available"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "lane-resize-handle",
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "2px",
              cursor: "ns-resize",
              backgroundColor: "transparent"
            },
            onMouseDown: (e) => {
              e.preventDefault();
            }
          }
        )
      ]
    }
  );
};
function useTimeScale(timeRange, pixelRange) {
  return useMemo(() => {
    return createTimeScale(timeRange, pixelRange);
  }, [timeRange.start.getTime(), timeRange.end.getTime(), pixelRange[0], pixelRange[1]]);
}
const TimelineAxis = ({
  timeRange,
  width,
  height,
  className,
  style
}) => {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const timeScale = useTimeScale(timeRange, [0, width]);
  const { interval, format } = useMemo(() => {
    const duration = timeRange.end.getTime() - timeRange.start.getTime();
    if (duration <= 60 * 1e3) {
      return { interval: timeSecond.every(10), format: timeFormat("%H:%M:%S") };
    } else if (duration <= 60 * 60 * 1e3) {
      return { interval: timeMinute.every(5), format: timeFormat("%H:%M") };
    } else if (duration <= 24 * 60 * 60 * 1e3) {
      return { interval: timeHour.every(2), format: timeFormat("%H:%M") };
    } else if (duration <= 7 * 24 * 60 * 60 * 1e3) {
      return { interval: timeDay.every(1), format: timeFormat("%m/%d") };
    } else if (duration <= 30 * 24 * 60 * 60 * 1e3) {
      return { interval: timeDay.every(Math.ceil(duration / (7 * 24 * 60 * 60 * 1e3))), format: timeFormat("%m/%d") };
    } else if (duration <= 365 * 24 * 60 * 60 * 1e3) {
      return { interval: timeWeek.every(1), format: timeFormat("%m/%d") };
    } else {
      return { interval: timeMonth.every(1), format: timeFormat("%b %Y") };
    }
  }, [timeRange, width]);
  useEffect(() => {
    if (!gRef.current || !interval) return;
    const axis = axisBottom(timeScale.scale).ticks(interval).tickFormat(format);
    select(gRef.current).call(axis).selectAll("text").attr("data-testid", "time-label").style("font-size", "12px").style("fill", "#666");
    select(gRef.current).selectAll(".domain").style("stroke", "#ccc");
    select(gRef.current).selectAll(".tick line").style("stroke", "#ccc");
  }, [timeScale, interval, format]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      ref: svgRef,
      "data-testid": "timeline-axis",
      width,
      height,
      className,
      style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        ...style
      },
      role: "img",
      "aria-label": `Timeline axis showing time from ${timeRange.start.toLocaleString()} to ${timeRange.end.toLocaleString()}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "g",
        {
          ref: gRef,
          transform: `translate(0, 0)`
        }
      )
    }
  );
};
const Cursor = ({
  visible,
  x,
  height,
  style = {}
}) => {
  if (!visible) {
    return null;
  }
  const {
    color = "#666",
    width = 1,
    opacity = 0.7,
    dashArray = "2,2"
  } = style;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "line",
    {
      x1: x,
      y1: 0,
      x2: x,
      y2: height,
      stroke: color,
      strokeWidth: width,
      opacity,
      strokeDasharray: dashArray,
      pointerEvents: "none",
      className: "timeline-cursor",
      style: {
        transition: "x1 0.05s ease-out, x2 0.05s ease-out"
      }
    }
  );
};
function useD3Zoom(initialTimeRange, onViewChange, width, options = {}) {
  const {
    minScale = 0.1,
    maxScale = 100,
    minDuration = 1e3,
    // 1 second
    maxDuration = 365 * 24 * 60 * 60 * 1e3,
    // 1 year
    enableTouch = true,
    enableWheel = true,
    enableDrag = true
  } = options;
  const [currentTimeRange, setCurrentTimeRange] = useState(initialTimeRange);
  const zoomBehaviorRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const zoomBehavior = zoom().scaleExtent([minScale, maxScale]).on("zoom", (event) => {
      const { transform } = event;
      handleZoomTransform(transform);
    });
    if (!enableTouch) {
      zoomBehavior.touchable(() => false);
    }
    if (!enableWheel) {
      zoomBehavior.wheelDelta(() => 0);
    }
    if (!enableDrag) {
      zoomBehavior.on("start drag", null);
    }
    zoomBehaviorRef.current = zoomBehavior;
  }, [minScale, maxScale, enableTouch, enableWheel, enableDrag]);
  const handleZoomTransform = useCallback((transform) => {
    const { k: scale, x: translateX } = transform;
    const originalDuration = getTimeRangeDuration(initialTimeRange);
    const newDuration = Math.max(minDuration, Math.min(maxDuration, originalDuration / scale));
    const originalTimeScale = scaleTime().domain([initialTimeRange.start, initialTimeRange.end]).range([0, width]);
    const newStart = originalTimeScale.invert(-translateX / scale);
    const newEnd = new Date(newStart.getTime() + newDuration);
    let newTimeRange = {
      start: newStart,
      end: newEnd
    };
    const maxBounds = {
      start: new Date(initialTimeRange.start.getTime() - maxDuration),
      end: new Date(initialTimeRange.end.getTime() + maxDuration)
    };
    newTimeRange = clampTimeRange(newTimeRange, maxBounds);
    setCurrentTimeRange(newTimeRange);
    onViewChange(newTimeRange);
  }, [initialTimeRange, width, minDuration, maxDuration, onViewChange]);
  const applyZoom = useCallback((scale, translateX) => {
    const transform = { k: scale, x: translateX, y: 0 };
    handleZoomTransform(transform);
  }, [handleZoomTransform]);
  const zoomIn = useCallback(() => {
    const newTimeRange = expandTimeRange(currentTimeRange, 0.5);
    setCurrentTimeRange(newTimeRange);
    onViewChange(newTimeRange);
  }, [currentTimeRange, onViewChange]);
  const zoomOut = useCallback(() => {
    const newTimeRange = expandTimeRange(currentTimeRange, 2);
    setCurrentTimeRange(newTimeRange);
    onViewChange(newTimeRange);
  }, [currentTimeRange, onViewChange]);
  const resetZoom = useCallback(() => {
    setCurrentTimeRange(initialTimeRange);
    onViewChange(initialTimeRange);
    if (zoomBehaviorRef.current && containerRef.current) {
      select(containerRef.current).call(
        zoomBehaviorRef.current.transform,
        zoomIdentity
      );
    }
  }, [initialTimeRange, onViewChange]);
  const zoomToFit = useCallback((timeRange) => {
    setCurrentTimeRange(timeRange);
    onViewChange(timeRange);
  }, [onViewChange]);
  useEffect(() => {
    setCurrentTimeRange(initialTimeRange);
  }, [initialTimeRange.start.getTime(), initialTimeRange.end.getTime()]);
  return {
    currentTimeRange,
    zoomBehavior: zoomBehaviorRef.current,
    applyZoom,
    zoomIn,
    zoomOut,
    resetZoom,
    zoomToFit
  };
}
const PowerTimeline = forwardRef(({
  lanes,
  items,
  initialTimeRange,
  onViewChange,
  onItemClick,
  onItemHover,
  width,
  height,
  bufferZone = 0.5,
  className,
  style,
  ariaLabel
}, ref) => {
  const containerRef = useRef(null);
  const [currentTimeRange, setCurrentTimeRange] = useState(initialTimeRange);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [focusManager, setFocusManager] = useState(null);
  const [announcer, setAnnouncer] = useState(null);
  const [cursor, setCursor] = useState({
    visible: false,
    x: 0
  });
  const timeScale = useTimeScale(currentTimeRange, [0, width]);
  const { virtualizationState, performanceMetrics, itemsByLane } = useVirtualizationWithPerformance(
    items,
    currentTimeRange,
    bufferZone
  );
  const {
    currentTimeRange: zoomTimeRange,
    zoomBehavior,
    zoomIn,
    zoomOut,
    resetZoom,
    zoomToFit
  } = useD3Zoom(
    initialTimeRange,
    handleViewChange,
    width,
    {
      enableTouch: true,
      enableWheel: true,
      enableDrag: true
    }
  );
  useEffect(() => {
    if (containerRef.current && zoomBehavior) {
      const container = select(containerRef.current);
      container.call(zoomBehavior);
    }
  }, [zoomBehavior]);
  function handleViewChange(newTimeRange) {
    setCurrentTimeRange(newTimeRange);
    onViewChange(newTimeRange);
    announcer?.announceTimeRangeChange(newTimeRange);
  }
  const handleItemClick = useCallback((item, event) => {
    setSelectedItemId(item.id);
    onItemClick?.(item, event);
    announcer?.announceItemSelection(item);
  }, [onItemClick, announcer]);
  const handleItemHover = useCallback((item, event) => {
    onItemHover?.(item, event);
  }, [onItemHover]);
  const handleTimelineMouseMove = useCallback((event) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      setCursor({
        visible: true,
        x: mouseX
      });
    }
  }, []);
  const handleTimelineMouseLeave = useCallback(() => {
    setCursor({
      visible: false,
      x: 0
    });
  }, []);
  const handleKeyDown = createKeyboardNavigationHandler({
    onPanLeft: () => {
      const duration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();
      const panAmount = duration * 0.1;
      const newRange = {
        start: new Date(currentTimeRange.start.getTime() - panAmount),
        end: new Date(currentTimeRange.end.getTime() - panAmount)
      };
      handleViewChange(newRange);
    },
    onPanRight: () => {
      const duration = currentTimeRange.end.getTime() - currentTimeRange.start.getTime();
      const panAmount = duration * 0.1;
      const newRange = {
        start: new Date(currentTimeRange.start.getTime() + panAmount),
        end: new Date(currentTimeRange.end.getTime() + panAmount)
      };
      handleViewChange(newRange);
    },
    onZoomIn: () => zoomIn?.(),
    onZoomOut: () => zoomOut?.(),
    onResetZoom: () => resetZoom?.(),
    onSelectNextItem: () => {
      focusManager?.focusNext();
    },
    onSelectPreviousItem: () => {
      focusManager?.focusPrevious();
    },
    onActivateSelectedItem: () => {
      const focusedElement = focusManager?.getCurrentFocusedElement();
      if (focusedElement) {
        focusedElement.click();
      }
    }
  });
  useEffect(() => {
    if (containerRef.current) {
      const fm = new FocusManager(containerRef.current);
      const sa = new ScreenReaderAnnouncer(containerRef.current);
      setFocusManager(fm);
      setAnnouncer(sa);
      return () => {
        sa.destroy();
      };
    }
  }, []);
  useEffect(() => {
    focusManager?.updateFocusableElements();
  }, [virtualizationState.visibleItems, focusManager]);
  useImperativeHandle(ref, () => ({
    getTimeRange: () => currentTimeRange,
    setTimeRange: (timeRange) => {
      handleViewChange(timeRange);
    },
    zoomToFit: () => {
      if (items.length === 0) return;
      let minTime = /* @__PURE__ */ new Date();
      let maxTime = /* @__PURE__ */ new Date();
      items.forEach((item) => {
        switch (item.type) {
          case "event":
            if (item.time < minTime) minTime = item.time;
            if (item.time > maxTime) maxTime = item.time;
            break;
          case "time-range":
            if (item.startTime < minTime) minTime = item.startTime;
            if (item.endTime > maxTime) maxTime = item.endTime;
            break;
          case "curve":
            item.dataPoints.forEach((point) => {
              if (point.time < minTime) minTime = point.time;
              if (point.time > maxTime) maxTime = point.time;
            });
            break;
        }
      });
      zoomToFit?.({ start: minTime, end: maxTime });
    },
    getViewport: () => ({
      timeRange: currentTimeRange,
      pixelRange: [0, width],
      bufferZone,
      visibleItems: virtualizationState.visibleItems
    })
  }), [currentTimeRange, width, bufferZone, virtualizationState.visibleItems, items, zoomToFit]);
  const totalHeight = lanes.reduce((sum, lane) => sum + lane.height, 0);
  const axisHeight = 40;
  const ariaDescription = generateTimelineAriaDescription(lanes, items, currentTimeRange);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      "data-testid": "power-timeline",
      className: `power-timeline ${className || ""}`,
      style: {
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        overflow: "hidden",
        border: "1px solid #ddd",
        ...style
      },
      role: "application",
      "aria-label": ariaLabel || "Interactive timeline",
      "aria-description": ariaDescription,
      tabIndex: 0,
      onKeyDown: handleKeyDown,
      "data-total-items": virtualizationState.totalItems,
      "data-rendered-items": virtualizationState.renderCount,
      children: [
        !performanceMetrics.renderCountOk && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "performance-warning",
            style: {
              position: "absolute",
              top: 4,
              right: 4,
              background: "#fff3cd",
              border: "1px solid #ffeaa7",
              padding: "4px 8px",
              fontSize: "12px",
              borderRadius: "4px",
              zIndex: 1e3
            },
            children: [
              "⚠️ Performance: ",
              virtualizationState.renderCount,
              " items rendered"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "lanes-container",
            style: {
              position: "relative",
              width: "100%",
              height: `${totalHeight}px`,
              overflow: "hidden"
            },
            onMouseMove: handleTimelineMouseMove,
            onMouseLeave: handleTimelineMouseLeave,
            children: [
              lanes.map((lane) => {
                const laneItems = (itemsByLane.get(lane.id) || []).map((item) => ({
                  ...item,
                  isSelected: selectedItemId === item.id
                }));
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Lane,
                  {
                    ...lane,
                    items: laneItems,
                    timeScale,
                    viewport: virtualizationState,
                    onItemClick: handleItemClick,
                    onItemHover: handleItemHover
                  },
                  lane.id
                );
              }),
              cursor.visible && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  style: {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                    zIndex: 10
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Cursor,
                    {
                      visible: cursor.visible,
                      x: cursor.x,
                      height: totalHeight,
                      style: {
                        color: "#007bff",
                        width: 1,
                        opacity: 0.8,
                        dashArray: "3,3"
                      }
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TimelineAxis,
          {
            timeRange: currentTimeRange,
            width,
            height: axisHeight,
            style: {
              position: "absolute",
              bottom: 0,
              left: 0
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            id: "timeline-tooltip",
            className: "timeline-tooltip",
            style: {
              position: "absolute",
              pointerEvents: "none",
              background: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              zIndex: 1e3,
              opacity: 0,
              transition: "opacity 0.2s"
            }
          }
        )
      ]
    }
  );
});
PowerTimeline.displayName = "PowerTimeline";
const Tooltip = ({
  visible,
  x,
  y,
  item,
  context
}) => {
  if (!visible || !item) {
    return null;
  }
  const formatValue = (value) => {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  };
  const formatTime = (time) => {
    return time.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };
  const renderContent = () => {
    switch (item.type) {
      case "curve":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "tooltip-color-indicator",
                style: { backgroundColor: item.style?.strokeColor || "#007bff" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-title", children: item.label?.text || `Curve ${item.id}` })
          ] }),
          context?.value !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip-value", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formatValue(context.value) }) }),
          context?.timestamp && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip-time", children: formatTime(context.timestamp) }),
          context?.isInterpolated && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip-info", children: "Interpolated value" })
        ] });
      case "event":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "tooltip-color-indicator",
                style: { backgroundColor: item.style?.color || "#dc3545" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-title", children: item.label?.text || `Event ${item.id}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip-time", children: formatTime(item.time) }),
          item.metadata && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip-metadata", children: Object.entries(item.metadata).map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-metadata-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tooltip-metadata-key", children: [
              key,
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-metadata-value", children: String(value) })
          ] }, key)) })
        ] });
      case "time-range":
        const duration = item.endTime.getTime() - item.startTime.getTime();
        const durationStr = duration < 6e4 ? `${Math.round(duration / 1e3)}s` : duration < 36e5 ? `${Math.round(duration / 6e4)}m` : `${Math.round(duration / 36e5)}h`;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "tooltip-color-indicator",
                style: { backgroundColor: item.style?.backgroundColor || "#28a745" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-title", children: item.label?.text || `Range ${item.id}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-time-range", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Start: ",
              formatTime(item.startTime)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "End: ",
              formatTime(item.endTime)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              "Duration: ",
              durationStr
            ] })
          ] }),
          item.metadata && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip-metadata", children: Object.entries(item.metadata).map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-metadata-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tooltip-metadata-key", children: [
              key,
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-metadata-value", children: String(value) })
          ] }, key)) })
        ] });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip-title", children: item.id }) });
    }
  };
  const tooltipStyle = {
    position: "fixed",
    // Use fixed positioning for better cursor tracking
    left: x + 8,
    // Closer offset from cursor
    top: y - 8,
    transform: x > window.innerWidth / 2 ? "translateX(-100%) translateX(-8px)" : "none",
    zIndex: 1e3,
    pointerEvents: "none"
    // Ensure tooltip doesn't interfere with mouse events
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "timeline-tooltip", style: tooltipStyle, children: renderContent() });
};
export {
  Cursor,
  CurveItem,
  EventItem,
  FocusManager,
  Lane,
  PowerTimeline,
  ScreenReaderAnnouncer,
  TimeRangeItem,
  TimelineAxis,
  Tooltip,
  calculateStackingLevels,
  calculateVisibleItems,
  checkPerformanceTargets,
  clampTimeRange,
  createKeyboardNavigationHandler,
  createTimeScale,
  createVirtualizationDebouncer,
  PowerTimeline as default,
  estimateMemoryUsage,
  expandTimeRange,
  formatDuration,
  generateItemAriaLabel,
  generateLaneAriaLabel,
  generateTimelineAriaDescription,
  getContrastRatio,
  getTimeRangeCenter,
  getTimeRangeDuration,
  groupItemsByLane,
  isItemInTimeRange,
  meetsWCAGContrast,
  optimizeBufferZone,
  pixelRangeToTimeRange,
  pixelToTime,
  shiftTimeRange,
  timeInRange,
  timeRangeToPixelRange,
  timeRangesOverlap,
  timeToPixel,
  updateTimeScale,
  useD3Zoom,
  useTimeScale,
  useVirtualization
};
