import { v4 as uuidv4 } from 'uuid';
import { IS_BROWSER, WINDOW } from './constants';

const { hasOwnProperty } = Object.prototype;
const REGEXP_SPACES = /\s\s*/;
const onceSupported = (() => {
  let supported = false;

  if (IS_BROWSER) {
    let once = false;
    const listener = () => {};
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

export function genUuid() {
  return uuidv4();
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isObject(value) {
  return typeof value === 'object' && value !== null;
}

export function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }

  try {
    const { constructor } = value;
    const { prototype } = constructor;

    return constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (error) {
    return false;
  }
}

export const assign = (() => {
  if (Object.assign) return Object.assign;

  return function (target, ...args) {
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
})();

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
          element.removeEventListener(event, listeners[event][listener], options);
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

export function copy(str) {
  if (!IS_BROWSER) return false;
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

export function query(element, selector) {
  if (!IS_BROWSER) return null;
  return element.querySelector(selector);
}

export function queryAll(element, selector) {
  if (!IS_BROWSER) return null;
  return element.querySelectorAll(selector);
}

export function hasClass(element, className) {
  return element.classList.contains(className);
}

export function toggleClass(element, className) {
  if (hasClass(element, className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

export function forEach(arr, handler) {
  return [].forEach.call(arr, handler);
}

export function setStyle(element, key, value) {
  if (element) {
    element.style[key] = value;
  }
}

export function setHTML(element, htmlStr) {
  if (element) {
    element.innerHTML = htmlStr;
  }
}

export function setText(element, str) {
  if (element) {
    element.innerText = str;
  }
}

export function pureAssign(source, target) {
  const obj = assign({}, source);
  Object.keys(obj).forEach((key) => {
    if (target[key] !== undefined) {
      obj[key] = target[key];
    }
  });
  return obj;
}

export function toFixed(num, decimal, cmd) {
  if (!decimal && decimal !== 0) {
    decimal = 2;
  }
  let func;
  if (typeof cmd === 'function') {
    func = cmd;
  } else {
    switch (cmd) {
      case 'floor':
        func = Math.floor;
        break;
      case 'round':
        func = Math.round;
        break;
      case 'ceil':
        func = Math.ceil;
        break;
      default:
        func = Math.round;
    }
  }
  const rate = 1 / `1e${-decimal}`;
  return (func((num * rate).toFixed(10)) / rate).toFixed(decimal);
}
