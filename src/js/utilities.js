import createMd5 from 'crypto-js/md5';
import { WINDOW, IS_BROWSER } from './constants';

const REGEXP_SPACES = /\s\s*/;
const onceSupported = (() => {
  let supported = false;

  if (IS_BROWSER) {
    let once = false;
    const listener = () => { };
    const options = Object.defineProperty({}, 'once', {
      get() {
        supported = true;
        return once;
      },
      set(value) {
        once = value;
      },
    });

    WINDOW.addEventListener('test', listener, options);
    WINDOW.removeEventListener('test', listener, options);
  }

  return supported;
})();

export function isArray(value) {
  return Array.isArray(value);
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isObject(value) {
  return typeof value === 'object' && value !== null;
}

const { hasOwnProperty } = Object.prototype;

export function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }

  try {
    const { constructor } = value;
    const { prototype } = constructor;

    return (
      constructor
      && prototype
      && hasOwnProperty.call(prototype, 'isPrototypeOf')
    );
  } catch (error) {
    return false;
  }
}

export const assign = Object.assign
  || function assign(target, ...args) {
    if (isObject(target) && args.length > 0) {
      args.forEach((arg) => {
        if (isObject(arg)) {
          Object.keys(arg).forEach((key) => {
            target[key] = arg[key];
          });
        }
      });
    }

    return target;
  };

export function removeListener(element, type, listener, options = {}) {
  let handler = listener;

  type
    .trim()
    .split(REGEXP_SPACES)
    .forEach((event) => {
      if (!onceSupported) {
        const { listeners } = element;

        if (listeners && listeners[event] && listeners[event][listener]) {
          handler = listeners[event][listener];
          delete listeners[event][listener];

          if (Object.keys(listeners[event]).length === 0) {
            delete listeners[event];
          }

          if (Object.keys(listeners).length === 0) {
            delete element.listeners;
          }
        }
      }

      element.removeEventListener(event, handler, options);
    });
}

export function addListener(element, type, listener, options = {}) {
  let handler = listener;

  type
    .trim()
    .split(REGEXP_SPACES)
    .forEach((event) => {
      if (options.once && !onceSupported) {
        const { listeners = {} } = element;

        handler = (...args) => {
          delete listeners[event][listener];
          element.removeEventListener(event, handler, options);
          listener.apply(element, args);
        };

        if (!listeners[event]) {
          listeners[event] = {};
        }

        if (listeners[event][listener]) {
          element.removeEventListener(
            event,
            listeners[event][listener],
            options,
          );
        }

        listeners[event][listener] = handler;
        element.listeners = listeners;
      }

      element.addEventListener(event, handler, options);
    });
}

export function dispatchEvent(element, type, data) {
  let event;

  // Event and CustomEvent on IE9-11 are global objects, not constructors
  if (isFunction(Event) && isFunction(CustomEvent)) {
    event = new CustomEvent(type, {
      detail: data,
      bubbles: true,
      cancelable: true,
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);
  }

  return element.dispatchEvent(event);
}

export function copyTemplate(template, source) {
  const obj = {};
  if (!isObject(template)) {
    return obj;
  }
  if (!isObject(source)) {
    return assign(obj, template);
  }
  Object.keys(template).forEach((key) => {
    if (source[key] !== undefined && hasOwnProperty.call(source, key)) {
      obj[key] = source[key];
    } else {
      obj[key] = template[key];
    }
  });
  return obj;
}

export function copy(str) {
  const e = document.createElement('textarea');
  e.value = str;
  e.setAttribute('readonly', '');
  e.style.cssText = 'position:absolute;left:-9999px';
  document.body.appendChild(e);
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    const n = document.createRange();
    n.selectNodeContents(e);
    const r = window.getSelection();
    r.removeAllRanges();
    r.addRange(n);
    e.setSelectionRange(0, 999999);
  } else {
    e.select();
  }

  try {
    document.execCommand('copy');
    e.remove();
  } catch (t) {
    e.remove();
    return false;
  }
  return true;
}

export function genUuid() {
  const ran = Math.random().toString(36).substr(2);
  const md5 = createMd5(ran).toString();
  return `${md5.substr(0, 8)}-${md5.substr(8, 4)}-${md5.substr(12, 4)}-${md5.substr(16, 4)}-${md5.substr(20, 12)}`;
}
