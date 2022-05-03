/*!
 * mixpayjs v1.0.1
 * https://MixPayHQ.github.io/mixpayjs
 *
 * Copyright 2022 gypsophila@mathunion.xyz
 * Released under the MIT license
 *
 * Date: 2022-05-03T10:34:33.683Z
 */

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var DEFAULT = {
  apiUrl: 'https://api.mixpay.me/v1',
  isModal: true,
  hasMask: true,
  onReady: null,
  onPaymentCreate: null,
  onPaymentSuccess: null,
  onPaymentFail: null
};
var PAYMENT_DEFAULT = {
  clientId: '',
  expireSeconds: 240,
  isChain: false,
  note: '',
  payeeId: '',
  paymentAssetId: '',
  quoteAmount: '',
  quoteAssetId: '',
  remark: '',
  settlementAssetId: '',
  settlementMemo: '',
  settlementMethod: 'mixin',
  // 'mixin', 'mixpay'
  traceId: ''
};

var NAMESPACE = '--mixpay';
var LOGO_IMAGE_URL = 'https://mixpay.me/plugins/logo.svg';
var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
var WINDOW = IS_BROWSER ? window : {};
var IS_MIXIN = !!(WINDOW.webkit && WINDOW.webkit.messageHandlers && WINDOW.webkit.messageHandlers.MixinContext || WINDOW.MixinContext && WINDOW.MixinContext.getContext);
var EVENT_READY = 'ready';
var EVENT_MODAL_CLOSE = 'close';
var EVENT_PAYMENT_CREATE = 'create';
var EVENT_PAYMENT_SUCCESS = 'success';
var EVENT_PAYMENT_ERROR = 'error';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

var _nodeResolve_empty = {};

var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': _nodeResolve_empty
});

var require$$0 = getCjsExportFromNamespace(_nodeResolve_empty$1);

var core = createCommonjsModule(function (module, exports) {

  (function (root, factory) {
    {
      // CommonJS
      module.exports = factory();
    }
  })(commonjsGlobal, function () {
    /*globals window, global, require*/

    /**
     * CryptoJS core components.
     */
    var CryptoJS = CryptoJS || function (Math, undefined$1) {
      var crypto; // Native crypto from window (Browser)

      if (typeof window !== 'undefined' && window.crypto) {
        crypto = window.crypto;
      } // Native crypto in web worker (Browser)


      if (typeof self !== 'undefined' && self.crypto) {
        crypto = self.crypto;
      } // Native crypto from worker


      if (typeof globalThis !== 'undefined' && globalThis.crypto) {
        crypto = globalThis.crypto;
      } // Native (experimental IE 11) crypto from window (Browser)


      if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
        crypto = window.msCrypto;
      } // Native crypto from global (NodeJS)


      if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
        crypto = commonjsGlobal.crypto;
      } // Native crypto import via require (NodeJS)


      if (!crypto && typeof commonjsRequire === 'function') {
        try {
          crypto = require$$0;
        } catch (err) {}
      }
      /*
       * Cryptographically secure pseudorandom number generator
       *
       * As Math.random() is cryptographically not safe to use
       */


      var cryptoSecureRandomInt = function () {
        if (crypto) {
          // Use getRandomValues method (Browser)
          if (typeof crypto.getRandomValues === 'function') {
            try {
              return crypto.getRandomValues(new Uint32Array(1))[0];
            } catch (err) {}
          } // Use randomBytes method (NodeJS)


          if (typeof crypto.randomBytes === 'function') {
            try {
              return crypto.randomBytes(4).readInt32LE();
            } catch (err) {}
          }
        }

        throw new Error('Native crypto module could not be used to get secure random number.');
      };
      /*
       * Local polyfill of Object.create
        */


      var create = Object.create || function () {
        function F() {}

        return function (obj) {
          var subtype;
          F.prototype = obj;
          subtype = new F();
          F.prototype = null;
          return subtype;
        };
      }();
      /**
       * CryptoJS namespace.
       */


      var C = {};
      /**
       * Library namespace.
       */

      var C_lib = C.lib = {};
      /**
       * Base object for prototypal inheritance.
       */

      var Base = C_lib.Base = function () {
        return {
          /**
           * Creates a new object that inherits from this object.
           *
           * @param {Object} overrides Properties to copy into the new object.
           *
           * @return {Object} The new object.
           *
           * @static
           *
           * @example
           *
           *     var MyType = CryptoJS.lib.Base.extend({
           *         field: 'value',
           *
           *         method: function () {
           *         }
           *     });
           */
          extend: function (overrides) {
            // Spawn
            var subtype = create(this); // Augment

            if (overrides) {
              subtype.mixIn(overrides);
            } // Create default initializer


            if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
              subtype.init = function () {
                subtype.$super.init.apply(this, arguments);
              };
            } // Initializer's prototype is the subtype object


            subtype.init.prototype = subtype; // Reference supertype

            subtype.$super = this;
            return subtype;
          },

          /**
           * Extends this object and runs the init method.
           * Arguments to create() will be passed to init().
           *
           * @return {Object} The new object.
           *
           * @static
           *
           * @example
           *
           *     var instance = MyType.create();
           */
          create: function () {
            var instance = this.extend();
            instance.init.apply(instance, arguments);
            return instance;
          },

          /**
           * Initializes a newly created object.
           * Override this method to add some logic when your objects are created.
           *
           * @example
           *
           *     var MyType = CryptoJS.lib.Base.extend({
           *         init: function () {
           *             // ...
           *         }
           *     });
           */
          init: function () {},

          /**
           * Copies properties into this object.
           *
           * @param {Object} properties The properties to mix in.
           *
           * @example
           *
           *     MyType.mixIn({
           *         field: 'value'
           *     });
           */
          mixIn: function (properties) {
            for (var propertyName in properties) {
              if (properties.hasOwnProperty(propertyName)) {
                this[propertyName] = properties[propertyName];
              }
            } // IE won't copy toString using the loop above


            if (properties.hasOwnProperty('toString')) {
              this.toString = properties.toString;
            }
          },

          /**
           * Creates a copy of this object.
           *
           * @return {Object} The clone.
           *
           * @example
           *
           *     var clone = instance.clone();
           */
          clone: function () {
            return this.init.prototype.extend(this);
          }
        };
      }();
      /**
       * An array of 32-bit words.
       *
       * @property {Array} words The array of 32-bit words.
       * @property {number} sigBytes The number of significant bytes in this word array.
       */


      var WordArray = C_lib.WordArray = Base.extend({
        /**
         * Initializes a newly created word array.
         *
         * @param {Array} words (Optional) An array of 32-bit words.
         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.create();
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
         */
        init: function (words, sigBytes) {
          words = this.words = words || [];

          if (sigBytes != undefined$1) {
            this.sigBytes = sigBytes;
          } else {
            this.sigBytes = words.length * 4;
          }
        },

        /**
         * Converts this word array to a string.
         *
         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
         *
         * @return {string} The stringified word array.
         *
         * @example
         *
         *     var string = wordArray + '';
         *     var string = wordArray.toString();
         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
         */
        toString: function (encoder) {
          return (encoder || Hex).stringify(this);
        },

        /**
         * Concatenates a word array to this word array.
         *
         * @param {WordArray} wordArray The word array to append.
         *
         * @return {WordArray} This word array.
         *
         * @example
         *
         *     wordArray1.concat(wordArray2);
         */
        concat: function (wordArray) {
          // Shortcuts
          var thisWords = this.words;
          var thatWords = wordArray.words;
          var thisSigBytes = this.sigBytes;
          var thatSigBytes = wordArray.sigBytes; // Clamp excess bits

          this.clamp(); // Concat

          if (thisSigBytes % 4) {
            // Copy one byte at a time
            for (var i = 0; i < thatSigBytes; i++) {
              var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
              thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
            }
          } else {
            // Copy one word at a time
            for (var j = 0; j < thatSigBytes; j += 4) {
              thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
            }
          }

          this.sigBytes += thatSigBytes; // Chainable

          return this;
        },

        /**
         * Removes insignificant bits.
         *
         * @example
         *
         *     wordArray.clamp();
         */
        clamp: function () {
          // Shortcuts
          var words = this.words;
          var sigBytes = this.sigBytes; // Clamp

          words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
          words.length = Math.ceil(sigBytes / 4);
        },

        /**
         * Creates a copy of this word array.
         *
         * @return {WordArray} The clone.
         *
         * @example
         *
         *     var clone = wordArray.clone();
         */
        clone: function () {
          var clone = Base.clone.call(this);
          clone.words = this.words.slice(0);
          return clone;
        },

        /**
         * Creates a word array filled with random bytes.
         *
         * @param {number} nBytes The number of random bytes to generate.
         *
         * @return {WordArray} The random word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.lib.WordArray.random(16);
         */
        random: function (nBytes) {
          var words = [];

          for (var i = 0; i < nBytes; i += 4) {
            words.push(cryptoSecureRandomInt());
          }

          return new WordArray.init(words, nBytes);
        }
      });
      /**
       * Encoder namespace.
       */

      var C_enc = C.enc = {};
      /**
       * Hex encoding strategy.
       */

      var Hex = C_enc.Hex = {
        /**
         * Converts a word array to a hex string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The hex string.
         *
         * @static
         *
         * @example
         *
         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
         */
        stringify: function (wordArray) {
          // Shortcuts
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes; // Convert

          var hexChars = [];

          for (var i = 0; i < sigBytes; i++) {
            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            hexChars.push((bite >>> 4).toString(16));
            hexChars.push((bite & 0x0f).toString(16));
          }

          return hexChars.join('');
        },

        /**
         * Converts a hex string to a word array.
         *
         * @param {string} hexStr The hex string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
         */
        parse: function (hexStr) {
          // Shortcut
          var hexStrLength = hexStr.length; // Convert

          var words = [];

          for (var i = 0; i < hexStrLength; i += 2) {
            words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
          }

          return new WordArray.init(words, hexStrLength / 2);
        }
      };
      /**
       * Latin1 encoding strategy.
       */

      var Latin1 = C_enc.Latin1 = {
        /**
         * Converts a word array to a Latin1 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The Latin1 string.
         *
         * @static
         *
         * @example
         *
         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
         */
        stringify: function (wordArray) {
          // Shortcuts
          var words = wordArray.words;
          var sigBytes = wordArray.sigBytes; // Convert

          var latin1Chars = [];

          for (var i = 0; i < sigBytes; i++) {
            var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            latin1Chars.push(String.fromCharCode(bite));
          }

          return latin1Chars.join('');
        },

        /**
         * Converts a Latin1 string to a word array.
         *
         * @param {string} latin1Str The Latin1 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
         */
        parse: function (latin1Str) {
          // Shortcut
          var latin1StrLength = latin1Str.length; // Convert

          var words = [];

          for (var i = 0; i < latin1StrLength; i++) {
            words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
          }

          return new WordArray.init(words, latin1StrLength);
        }
      };
      /**
       * UTF-8 encoding strategy.
       */

      var Utf8 = C_enc.Utf8 = {
        /**
         * Converts a word array to a UTF-8 string.
         *
         * @param {WordArray} wordArray The word array.
         *
         * @return {string} The UTF-8 string.
         *
         * @static
         *
         * @example
         *
         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
         */
        stringify: function (wordArray) {
          try {
            return decodeURIComponent(escape(Latin1.stringify(wordArray)));
          } catch (e) {
            throw new Error('Malformed UTF-8 data');
          }
        },

        /**
         * Converts a UTF-8 string to a word array.
         *
         * @param {string} utf8Str The UTF-8 string.
         *
         * @return {WordArray} The word array.
         *
         * @static
         *
         * @example
         *
         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
         */
        parse: function (utf8Str) {
          return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
        }
      };
      /**
       * Abstract buffered block algorithm template.
       *
       * The property blockSize must be implemented in a concrete subtype.
       *
       * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
       */

      var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
        /**
         * Resets this block algorithm's data buffer to its initial state.
         *
         * @example
         *
         *     bufferedBlockAlgorithm.reset();
         */
        reset: function () {
          // Initial values
          this._data = new WordArray.init();
          this._nDataBytes = 0;
        },

        /**
         * Adds new data to this block algorithm's buffer.
         *
         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
         *
         * @example
         *
         *     bufferedBlockAlgorithm._append('data');
         *     bufferedBlockAlgorithm._append(wordArray);
         */
        _append: function (data) {
          // Convert string to WordArray, else assume WordArray already
          if (typeof data == 'string') {
            data = Utf8.parse(data);
          } // Append


          this._data.concat(data);

          this._nDataBytes += data.sigBytes;
        },

        /**
         * Processes available data blocks.
         *
         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
         *
         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
         *
         * @return {WordArray} The processed data.
         *
         * @example
         *
         *     var processedData = bufferedBlockAlgorithm._process();
         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
         */
        _process: function (doFlush) {
          var processedWords; // Shortcuts

          var data = this._data;
          var dataWords = data.words;
          var dataSigBytes = data.sigBytes;
          var blockSize = this.blockSize;
          var blockSizeBytes = blockSize * 4; // Count blocks ready

          var nBlocksReady = dataSigBytes / blockSizeBytes;

          if (doFlush) {
            // Round up to include partial blocks
            nBlocksReady = Math.ceil(nBlocksReady);
          } else {
            // Round down to include only full blocks,
            // less the number of blocks that must remain in the buffer
            nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
          } // Count words ready


          var nWordsReady = nBlocksReady * blockSize; // Count bytes ready

          var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes); // Process blocks

          if (nWordsReady) {
            for (var offset = 0; offset < nWordsReady; offset += blockSize) {
              // Perform concrete-algorithm logic
              this._doProcessBlock(dataWords, offset);
            } // Remove processed words


            processedWords = dataWords.splice(0, nWordsReady);
            data.sigBytes -= nBytesReady;
          } // Return processed words


          return new WordArray.init(processedWords, nBytesReady);
        },

        /**
         * Creates a copy of this object.
         *
         * @return {Object} The clone.
         *
         * @example
         *
         *     var clone = bufferedBlockAlgorithm.clone();
         */
        clone: function () {
          var clone = Base.clone.call(this);
          clone._data = this._data.clone();
          return clone;
        },
        _minBufferSize: 0
      });
      /**
       * Abstract hasher template.
       *
       * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
       */

      C_lib.Hasher = BufferedBlockAlgorithm.extend({
        /**
         * Configuration options.
         */
        cfg: Base.extend(),

        /**
         * Initializes a newly created hasher.
         *
         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
         *
         * @example
         *
         *     var hasher = CryptoJS.algo.SHA256.create();
         */
        init: function (cfg) {
          // Apply config defaults
          this.cfg = this.cfg.extend(cfg); // Set initial values

          this.reset();
        },

        /**
         * Resets this hasher to its initial state.
         *
         * @example
         *
         *     hasher.reset();
         */
        reset: function () {
          // Reset data buffer
          BufferedBlockAlgorithm.reset.call(this); // Perform concrete-hasher logic

          this._doReset();
        },

        /**
         * Updates this hasher with a message.
         *
         * @param {WordArray|string} messageUpdate The message to append.
         *
         * @return {Hasher} This hasher.
         *
         * @example
         *
         *     hasher.update('message');
         *     hasher.update(wordArray);
         */
        update: function (messageUpdate) {
          // Append
          this._append(messageUpdate); // Update the hash


          this._process(); // Chainable


          return this;
        },

        /**
         * Finalizes the hash computation.
         * Note that the finalize operation is effectively a destructive, read-once operation.
         *
         * @param {WordArray|string} messageUpdate (Optional) A final message update.
         *
         * @return {WordArray} The hash.
         *
         * @example
         *
         *     var hash = hasher.finalize();
         *     var hash = hasher.finalize('message');
         *     var hash = hasher.finalize(wordArray);
         */
        finalize: function (messageUpdate) {
          // Final message update
          if (messageUpdate) {
            this._append(messageUpdate);
          } // Perform concrete-hasher logic


          var hash = this._doFinalize();

          return hash;
        },
        blockSize: 512 / 32,

        /**
         * Creates a shortcut function to a hasher's object interface.
         *
         * @param {Hasher} hasher The hasher to create a helper for.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
         */
        _createHelper: function (hasher) {
          return function (message, cfg) {
            return new hasher.init(cfg).finalize(message);
          };
        },

        /**
         * Creates a shortcut function to the HMAC's object interface.
         *
         * @param {Hasher} hasher The hasher to use in this HMAC helper.
         *
         * @return {Function} The shortcut function.
         *
         * @static
         *
         * @example
         *
         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
         */
        _createHmacHelper: function (hasher) {
          return function (message, key) {
            return new C_algo.HMAC.init(hasher, key).finalize(message);
          };
        }
      });
      /**
       * Algorithm namespace.
       */

      var C_algo = C.algo = {};
      return C;
    }(Math);

    return CryptoJS;
  });
});

var md5 = createCommonjsModule(function (module, exports) {

  (function (root, factory) {
    {
      // CommonJS
      module.exports = factory(core);
    }
  })(commonjsGlobal, function (CryptoJS) {
    (function (Math) {
      // Shortcuts
      var C = CryptoJS;
      var C_lib = C.lib;
      var WordArray = C_lib.WordArray;
      var Hasher = C_lib.Hasher;
      var C_algo = C.algo; // Constants table

      var T = []; // Compute constants

      (function () {
        for (var i = 0; i < 64; i++) {
          T[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 | 0;
        }
      })();
      /**
       * MD5 hash algorithm.
       */


      var MD5 = C_algo.MD5 = Hasher.extend({
        _doReset: function () {
          this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
        },
        _doProcessBlock: function (M, offset) {
          // Swap endian
          for (var i = 0; i < 16; i++) {
            // Shortcuts
            var offset_i = offset + i;
            var M_offset_i = M[offset_i];
            M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
          } // Shortcuts


          var H = this._hash.words;
          var M_offset_0 = M[offset + 0];
          var M_offset_1 = M[offset + 1];
          var M_offset_2 = M[offset + 2];
          var M_offset_3 = M[offset + 3];
          var M_offset_4 = M[offset + 4];
          var M_offset_5 = M[offset + 5];
          var M_offset_6 = M[offset + 6];
          var M_offset_7 = M[offset + 7];
          var M_offset_8 = M[offset + 8];
          var M_offset_9 = M[offset + 9];
          var M_offset_10 = M[offset + 10];
          var M_offset_11 = M[offset + 11];
          var M_offset_12 = M[offset + 12];
          var M_offset_13 = M[offset + 13];
          var M_offset_14 = M[offset + 14];
          var M_offset_15 = M[offset + 15]; // Working varialbes

          var a = H[0];
          var b = H[1];
          var c = H[2];
          var d = H[3]; // Computation

          a = FF(a, b, c, d, M_offset_0, 7, T[0]);
          d = FF(d, a, b, c, M_offset_1, 12, T[1]);
          c = FF(c, d, a, b, M_offset_2, 17, T[2]);
          b = FF(b, c, d, a, M_offset_3, 22, T[3]);
          a = FF(a, b, c, d, M_offset_4, 7, T[4]);
          d = FF(d, a, b, c, M_offset_5, 12, T[5]);
          c = FF(c, d, a, b, M_offset_6, 17, T[6]);
          b = FF(b, c, d, a, M_offset_7, 22, T[7]);
          a = FF(a, b, c, d, M_offset_8, 7, T[8]);
          d = FF(d, a, b, c, M_offset_9, 12, T[9]);
          c = FF(c, d, a, b, M_offset_10, 17, T[10]);
          b = FF(b, c, d, a, M_offset_11, 22, T[11]);
          a = FF(a, b, c, d, M_offset_12, 7, T[12]);
          d = FF(d, a, b, c, M_offset_13, 12, T[13]);
          c = FF(c, d, a, b, M_offset_14, 17, T[14]);
          b = FF(b, c, d, a, M_offset_15, 22, T[15]);
          a = GG(a, b, c, d, M_offset_1, 5, T[16]);
          d = GG(d, a, b, c, M_offset_6, 9, T[17]);
          c = GG(c, d, a, b, M_offset_11, 14, T[18]);
          b = GG(b, c, d, a, M_offset_0, 20, T[19]);
          a = GG(a, b, c, d, M_offset_5, 5, T[20]);
          d = GG(d, a, b, c, M_offset_10, 9, T[21]);
          c = GG(c, d, a, b, M_offset_15, 14, T[22]);
          b = GG(b, c, d, a, M_offset_4, 20, T[23]);
          a = GG(a, b, c, d, M_offset_9, 5, T[24]);
          d = GG(d, a, b, c, M_offset_14, 9, T[25]);
          c = GG(c, d, a, b, M_offset_3, 14, T[26]);
          b = GG(b, c, d, a, M_offset_8, 20, T[27]);
          a = GG(a, b, c, d, M_offset_13, 5, T[28]);
          d = GG(d, a, b, c, M_offset_2, 9, T[29]);
          c = GG(c, d, a, b, M_offset_7, 14, T[30]);
          b = GG(b, c, d, a, M_offset_12, 20, T[31]);
          a = HH(a, b, c, d, M_offset_5, 4, T[32]);
          d = HH(d, a, b, c, M_offset_8, 11, T[33]);
          c = HH(c, d, a, b, M_offset_11, 16, T[34]);
          b = HH(b, c, d, a, M_offset_14, 23, T[35]);
          a = HH(a, b, c, d, M_offset_1, 4, T[36]);
          d = HH(d, a, b, c, M_offset_4, 11, T[37]);
          c = HH(c, d, a, b, M_offset_7, 16, T[38]);
          b = HH(b, c, d, a, M_offset_10, 23, T[39]);
          a = HH(a, b, c, d, M_offset_13, 4, T[40]);
          d = HH(d, a, b, c, M_offset_0, 11, T[41]);
          c = HH(c, d, a, b, M_offset_3, 16, T[42]);
          b = HH(b, c, d, a, M_offset_6, 23, T[43]);
          a = HH(a, b, c, d, M_offset_9, 4, T[44]);
          d = HH(d, a, b, c, M_offset_12, 11, T[45]);
          c = HH(c, d, a, b, M_offset_15, 16, T[46]);
          b = HH(b, c, d, a, M_offset_2, 23, T[47]);
          a = II(a, b, c, d, M_offset_0, 6, T[48]);
          d = II(d, a, b, c, M_offset_7, 10, T[49]);
          c = II(c, d, a, b, M_offset_14, 15, T[50]);
          b = II(b, c, d, a, M_offset_5, 21, T[51]);
          a = II(a, b, c, d, M_offset_12, 6, T[52]);
          d = II(d, a, b, c, M_offset_3, 10, T[53]);
          c = II(c, d, a, b, M_offset_10, 15, T[54]);
          b = II(b, c, d, a, M_offset_1, 21, T[55]);
          a = II(a, b, c, d, M_offset_8, 6, T[56]);
          d = II(d, a, b, c, M_offset_15, 10, T[57]);
          c = II(c, d, a, b, M_offset_6, 15, T[58]);
          b = II(b, c, d, a, M_offset_13, 21, T[59]);
          a = II(a, b, c, d, M_offset_4, 6, T[60]);
          d = II(d, a, b, c, M_offset_11, 10, T[61]);
          c = II(c, d, a, b, M_offset_2, 15, T[62]);
          b = II(b, c, d, a, M_offset_9, 21, T[63]); // Intermediate hash value

          H[0] = H[0] + a | 0;
          H[1] = H[1] + b | 0;
          H[2] = H[2] + c | 0;
          H[3] = H[3] + d | 0;
        },
        _doFinalize: function () {
          // Shortcuts
          var data = this._data;
          var dataWords = data.words;
          var nBitsTotal = this._nDataBytes * 8;
          var nBitsLeft = data.sigBytes * 8; // Add padding

          dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
          var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
          var nBitsTotalL = nBitsTotal;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 0x00ff00ff | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 0xff00ff00;
          dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 0x00ff00ff | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 0xff00ff00;
          data.sigBytes = (dataWords.length + 1) * 4; // Hash final blocks

          this._process(); // Shortcuts


          var hash = this._hash;
          var H = hash.words; // Swap endian

          for (var i = 0; i < 4; i++) {
            // Shortcut
            var H_i = H[i];
            H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
          } // Return final computed hash


          return hash;
        },
        clone: function () {
          var clone = Hasher.clone.call(this);
          clone._hash = this._hash.clone();
          return clone;
        }
      });

      function FF(a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }

      function GG(a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }

      function HH(a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }

      function II(a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + x + t;
        return (n << s | n >>> 32 - s) + b;
      }
      /**
       * Shortcut function to the hasher's object interface.
       *
       * @param {WordArray|string} message The message to hash.
       *
       * @return {WordArray} The hash.
       *
       * @static
       *
       * @example
       *
       *     var hash = CryptoJS.MD5('message');
       *     var hash = CryptoJS.MD5(wordArray);
       */


      C.MD5 = Hasher._createHelper(MD5);
      /**
       * Shortcut function to the HMAC's object interface.
       *
       * @param {WordArray|string} message The message to hash.
       * @param {WordArray|string} key The secret key.
       *
       * @return {WordArray} The HMAC.
       *
       * @static
       *
       * @example
       *
       *     var hmac = CryptoJS.HmacMD5(message, key);
       */

      C.HmacMD5 = Hasher._createHmacHelper(MD5);
    })(Math);

    return CryptoJS.MD5;
  });
});

var REGEXP_SPACES = /\s\s*/;

var onceSupported = function () {
  var supported = false;

  if (IS_BROWSER) {
    var once = false;

    var listener = function listener() {};

    var options = Object.defineProperty({}, 'once', {
      get: function get() {
        supported = true;
        return once;
      },
      set: function set(value) {
        once = value;
      }
    });
    WINDOW.addEventListener('test', listener, options);
    WINDOW.removeEventListener('test', listener, options);
  }

  return supported;
}();

function isArray(value) {
  return Array.isArray(value);
}
function isFunction(value) {
  return typeof value === 'function';
}
function isObject(value) {
  return _typeof(value) === 'object' && value !== null;
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }

  try {
    var _constructor = value.constructor;
    var prototype = _constructor.prototype;
    return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
  } catch (error) {
    return false;
  }
}
var assign = Object.assign || function assign(target) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (isObject(target) && args.length > 0) {
    args.forEach(function (arg) {
      if (isObject(arg)) {
        Object.keys(arg).forEach(function (key) {
          target[key] = arg[key];
        });
      }
    });
  }

  return target;
};
function removeListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var handler = listener;
  type.trim().split(REGEXP_SPACES).forEach(function (event) {
    if (!onceSupported) {
      var listeners = element.listeners;

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
function addListener(element, type, listener) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _handler = listener;
  type.trim().split(REGEXP_SPACES).forEach(function (event) {
    if (options.once && !onceSupported) {
      var _element$listeners = element.listeners,
          listeners = _element$listeners === void 0 ? {} : _element$listeners;

      _handler = function handler() {
        delete listeners[event][listener];
        element.removeEventListener(event, _handler, options);

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        listener.apply(element, args);
      };

      if (!listeners[event]) {
        listeners[event] = {};
      }

      if (listeners[event][listener]) {
        element.removeEventListener(event, listeners[event][listener], options);
      }

      listeners[event][listener] = _handler;
      element.listeners = listeners;
    }

    element.addEventListener(event, _handler, options);
  });
}
function dispatchEvent(element, type, data) {
  var event; // Event and CustomEvent on IE9-11 are global objects, not constructors

  if (isFunction(Event) && isFunction(CustomEvent)) {
    event = new CustomEvent(type, {
      detail: data,
      bubbles: true,
      cancelable: true
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, data);
  }

  return element.dispatchEvent(event);
}
function copyTemplate(template, source) {
  var obj = {};

  if (!isObject(template)) {
    return obj;
  }

  if (!isObject(source)) {
    return assign(obj, template);
  }

  Object.keys(template).forEach(function (key) {
    if (source[key] !== undefined && hasOwnProperty.call(source, key)) {
      obj[key] = source[key];
    } else {
      obj[key] = template[key];
    }
  });
  return obj;
}
function copy(str) {
  var e = document.createElement('textarea');
  e.value = str;
  e.setAttribute('readonly', '');
  e.style.cssText = 'position:absolute;left:-9999px';
  document.body.appendChild(e);

  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var n = document.createRange();
    n.selectNodeContents(e);
    var r = window.getSelection();
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
function genUuid() {
  var ran = Math.random().toString(36).substr(2);
  var md5$1 = md5(ran).toString();
  return "".concat(md5$1.substr(0, 8), "-").concat(md5$1.substr(8, 4), "-").concat(md5$1.substr(12, 4), "-").concat(md5$1.substr(16, 4), "-").concat(md5$1.substr(20, 12));
}

var events = {
  bind: function bind() {
    var element = this.element,
        options = this.options;

    if (isFunction(options.onReady)) {
      addListener(element, EVENT_READY, options.onReady);
    }

    if (isFunction(options.onClose)) {
      addListener(element, EVENT_MODAL_CLOSE, options.onClose);
    }

    if (isFunction(options.onPaymentCreate)) {
      addListener(element, EVENT_PAYMENT_CREATE, options.onPaymentCreate);
    }

    if (isFunction(options.onPaymentSuccess)) {
      addListener(element, EVENT_PAYMENT_SUCCESS, options.onPaymentSuccess);
    }

    if (isFunction(options.onPaymentFail)) {
      addListener(element, EVENT_PAYMENT_ERROR, options.onPaymentFail);
    }
  },
  unbind: function unbind() {
    var element = this.element,
        options = this.options;

    if (isFunction(options.onReady)) {
      removeListener(element, EVENT_READY, options.onReady);
    }

    if (isFunction(options.onClose)) {
      removeListener(element, EVENT_MODAL_CLOSE, options.onClose);
    }

    if (isFunction(options.onPaymentCreate)) {
      removeListener(element, EVENT_PAYMENT_CREATE, options.onPaymentCreate);
    }

    if (isFunction(options.onPaymentSuccess)) {
      removeListener(element, EVENT_PAYMENT_SUCCESS, options.onPaymentSuccess);
    }

    if (isFunction(options.onPaymentFail)) {
      removeListener(element, EVENT_PAYMENT_ERROR, options.onPaymentFail);
    }
  }
};

var qrious = createCommonjsModule(function (module, exports) {
  /*
   * QRious v4.0.2
   * Copyright (C) 2017 Alasdair Mercer
   * Copyright (C) 2010 Tom Zerucha
   *
   * This program is free software: you can redistribute it and/or modify
   * it under the terms of the GNU General Public License as published by
   * the Free Software Foundation, either version 3 of the License, or
   * (at your option) any later version.
   *
   * This program is distributed in the hope that it will be useful,
   * but WITHOUT ANY WARRANTY; without even the implied warranty of
   * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   * GNU General Public License for more details.
   *
   * You should have received a copy of the GNU General Public License
   * along with this program.  If not, see <http://www.gnu.org/licenses/>.
   */
  (function (global, factory) {
    module.exports = factory() ;
  })(commonjsGlobal, function () {
    /*
     * Copyright (C) 2017 Alasdair Mercer, !ninja
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */

    /**
     * A bare-bones constructor for surrogate prototype swapping.
     *
     * @private
     * @constructor
     */

    var Constructor =
    /* istanbul ignore next */
    function () {};
    /**
     * A reference to <code>Object.prototype.hasOwnProperty</code>.
     *
     * @private
     * @type {Function}
     */


    var hasOwnProperty = Object.prototype.hasOwnProperty;
    /**
     * A reference to <code>Array.prototype.slice</code>.
     *
     * @private
     * @type {Function}
     */

    var slice = Array.prototype.slice;
    /**
     * Creates an object which inherits the given <code>prototype</code>.
     *
     * Optionally, the created object can be extended further with the specified <code>properties</code>.
     *
     * @param {Object} prototype - the prototype to be inherited by the created object
     * @param {Object} [properties] - the optional properties to be extended by the created object
     * @return {Object} The newly created object.
     * @private
     */

    function createObject(prototype, properties) {
      var result;
      /* istanbul ignore next */

      if (typeof Object.create === 'function') {
        result = Object.create(prototype);
      } else {
        Constructor.prototype = prototype;
        result = new Constructor();
        Constructor.prototype = null;
      }

      if (properties) {
        extendObject(true, result, properties);
      }

      return result;
    }
    /**
     * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
     * <code>statics</code> provided.
     *
     * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
     * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
     * instead. The class name may also be used string representation for instances of the child constructor (via
     * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
     *
     * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
     * constructor which only calls the super constructor will be used instead.
     *
     * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
     *
     * @param {string} [name=this.class_] - the class name to be used for the child constructor
     * @param {Function} [constructor] - the constructor for the child
     * @param {Object} [prototype] - the prototype properties to be defined for the child
     * @param {Object} [statics] - the static properties to be defined for the child
     * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
     * @public
     */


    function extend(name, constructor, prototype, statics) {
      var superConstructor = this;

      if (typeof name !== 'string') {
        statics = prototype;
        prototype = constructor;
        constructor = name;
        name = null;
      }

      if (typeof constructor !== 'function') {
        statics = prototype;
        prototype = constructor;

        constructor = function () {
          return superConstructor.apply(this, arguments);
        };
      }

      extendObject(false, constructor, superConstructor, statics);
      constructor.prototype = createObject(superConstructor.prototype, prototype);
      constructor.prototype.constructor = constructor;
      constructor.class_ = name || superConstructor.class_;
      constructor.super_ = superConstructor;
      return constructor;
    }
    /**
     * Extends the specified <code>target</code> object with the properties in each of the <code>sources</code> provided.
     *
     * if any source is <code>null</code> it will be ignored.
     *
     * @param {boolean} own - <code>true</code> to only copy <b>own</b> properties from <code>sources</code> onto
     * <code>target</code>; otherwise <code>false</code>
     * @param {Object} target - the target object which should be extended
     * @param {...Object} [sources] - the source objects whose properties are to be copied onto <code>target</code>
     * @return {void}
     * @private
     */


    function extendObject(own, target, sources) {
      sources = slice.call(arguments, 2);
      var property;
      var source;

      for (var i = 0, length = sources.length; i < length; i++) {
        source = sources[i];

        for (property in source) {
          if (!own || hasOwnProperty.call(source, property)) {
            target[property] = source[property];
          }
        }
      }
    }

    var extend_1 = extend;
    /**
     * The base class from which all others should extend.
     *
     * @public
     * @constructor
     */

    function Nevis() {}

    Nevis.class_ = 'Nevis';
    Nevis.super_ = Object;
    /**
     * Extends the constructor to which this method is associated with the <code>prototype</code> and/or
     * <code>statics</code> provided.
     *
     * If <code>name</code> is provided, it will be used as the class name and can be accessed via a special
     * <code>class_</code> property on the child constructor, otherwise the class name of the super constructor will be used
     * instead. The class name may also be used string representation for instances of the child constructor (via
     * <code>toString</code>), but this is not applicable to the <i>lite</i> version of Nevis.
     *
     * If <code>constructor</code> is provided, it will be used as the constructor for the child, otherwise a simple
     * constructor which only calls the super constructor will be used instead.
     *
     * The super constructor can be accessed via a special <code>super_</code> property on the child constructor.
     *
     * @param {string} [name=this.class_] - the class name to be used for the child constructor
     * @param {Function} [constructor] - the constructor for the child
     * @param {Object} [prototype] - the prototype properties to be defined for the child
     * @param {Object} [statics] - the static properties to be defined for the child
     * @return {Function} The child <code>constructor</code> provided or the one created if none was given.
     * @public
     * @static
     * @memberof Nevis
     */

    Nevis.extend = extend_1;
    var nevis = Nevis;
    var lite = nevis;
    /**
     * Responsible for rendering a QR code {@link Frame} on a specific type of element.
     *
     * A renderer may be dependant on the rendering of another element, so the ordering of their execution is important.
     *
     * The rendering of a element can be deferred by disabling the renderer initially, however, any attempt get the element
     * from the renderer will result in it being immediately enabled and the element being rendered.
     *
     * @param {QRious} qrious - the {@link QRious} instance to be used
     * @param {*} element - the element onto which the QR code is to be rendered
     * @param {boolean} [enabled] - <code>true</code> this {@link Renderer} is enabled; otherwise <code>false</code>.
     * @public
     * @class
     * @extends Nevis
     */

    var Renderer = lite.extend(function (qrious, element, enabled) {
      /**
       * The {@link QRious} instance.
       *
       * @protected
       * @type {QRious}
       * @memberof Renderer#
       */
      this.qrious = qrious;
      /**
       * The element onto which this {@link Renderer} is rendering the QR code.
       *
       * @protected
       * @type {*}
       * @memberof Renderer#
       */

      this.element = element;
      this.element.qrious = qrious;
      /**
       * Whether this {@link Renderer} is enabled.
       *
       * @protected
       * @type {boolean}
       * @memberof Renderer#
       */

      this.enabled = Boolean(enabled);
    }, {
      /**
       * Draws the specified QR code <code>frame</code> on the underlying element.
       *
       * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
       *
       * @param {Frame} frame - the {@link Frame} to be drawn
       * @return {void}
       * @protected
       * @abstract
       * @memberof Renderer#
       */
      draw: function (frame) {},

      /**
       * Returns the element onto which this {@link Renderer} is rendering the QR code.
       *
       * If this method is called while this {@link Renderer} is disabled, it will be immediately enabled and rendered
       * before the element is returned.
       *
       * @return {*} The element.
       * @public
       * @memberof Renderer#
       */
      getElement: function () {
        if (!this.enabled) {
          this.enabled = true;
          this.render();
        }

        return this.element;
      },

      /**
       * Calculates the size (in pixel units) to represent an individual module within the QR code based on the
       * <code>frame</code> provided.
       *
       * Any configured padding will be excluded from the returned size.
       *
       * The returned value will be at least one, even in cases where the size of the QR code does not fit its contents.
       * This is done so that the inevitable clipping is handled more gracefully since this way at least something is
       * displayed instead of just a blank space filled by the background color.
       *
       * @param {Frame} frame - the {@link Frame} from which the module size is to be derived
       * @return {number} The pixel size for each module in the QR code which will be no less than one.
       * @protected
       * @memberof Renderer#
       */
      getModuleSize: function (frame) {
        var qrious = this.qrious;
        var padding = qrious.padding || 0;
        var pixels = Math.floor((qrious.size - padding * 2) / frame.width);
        return Math.max(1, pixels);
      },

      /**
       * Calculates the offset/padding (in pixel units) to be inserted before the QR code based on the <code>frame</code>
       * provided.
       *
       * The returned value will be zero if there is no available offset or if the size of the QR code does not fit its
       * contents. It will never be a negative value. This is done so that the inevitable clipping appears more naturally
       * and it is not clipped from all directions.
       *
       * @param {Frame} frame - the {@link Frame} from which the offset is to be derived
       * @return {number} The pixel offset for the QR code which will be no less than zero.
       * @protected
       * @memberof Renderer#
       */
      getOffset: function (frame) {
        var qrious = this.qrious;
        var padding = qrious.padding;

        if (padding != null) {
          return padding;
        }

        var moduleSize = this.getModuleSize(frame);
        var offset = Math.floor((qrious.size - moduleSize * frame.width) / 2);
        return Math.max(0, offset);
      },

      /**
       * Renders a QR code on the underlying element based on the <code>frame</code> provided.
       *
       * @param {Frame} frame - the {@link Frame} to be rendered
       * @return {void}
       * @public
       * @memberof Renderer#
       */
      render: function (frame) {
        if (this.enabled) {
          this.resize();
          this.reset();
          this.draw(frame);
        }
      },

      /**
       * Resets the underlying element, effectively clearing any previously rendered QR code.
       *
       * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
       *
       * @return {void}
       * @protected
       * @abstract
       * @memberof Renderer#
       */
      reset: function () {},

      /**
       * Ensures that the size of the underlying element matches that defined on the associated {@link QRious} instance.
       *
       * Implementations of {@link Renderer} <b>must</b> override this method with their own specific logic.
       *
       * @return {void}
       * @protected
       * @abstract
       * @memberof Renderer#
       */
      resize: function () {}
    });
    var Renderer_1 = Renderer;
    /**
     * An implementation of {@link Renderer} for working with <code>canvas</code> elements.
     *
     * @public
     * @class
     * @extends Renderer
     */

    var CanvasRenderer = Renderer_1.extend({
      /**
       * @override
       */
      draw: function (frame) {
        var i, j;
        var qrious = this.qrious;
        var moduleSize = this.getModuleSize(frame);
        var offset = this.getOffset(frame);
        var context = this.element.getContext('2d');
        context.fillStyle = qrious.foreground;
        context.globalAlpha = qrious.foregroundAlpha;

        for (i = 0; i < frame.width; i++) {
          for (j = 0; j < frame.width; j++) {
            if (frame.buffer[j * frame.width + i]) {
              context.fillRect(moduleSize * i + offset, moduleSize * j + offset, moduleSize, moduleSize);
            }
          }
        }
      },

      /**
       * @override
       */
      reset: function () {
        var qrious = this.qrious;
        var context = this.element.getContext('2d');
        var size = qrious.size;
        context.lineWidth = 1;
        context.clearRect(0, 0, size, size);
        context.fillStyle = qrious.background;
        context.globalAlpha = qrious.backgroundAlpha;
        context.fillRect(0, 0, size, size);
      },

      /**
       * @override
       */
      resize: function () {
        var element = this.element;
        element.width = element.height = this.qrious.size;
      }
    });
    var CanvasRenderer_1 = CanvasRenderer;
    /* eslint no-multi-spaces: "off" */

    /**
     * Contains alignment pattern information.
     *
     * @public
     * @class
     * @extends Nevis
     */

    var Alignment = lite.extend(null, {
      /**
       * The alignment pattern block.
       *
       * @public
       * @static
       * @type {number[]}
       * @memberof Alignment
       */
      BLOCK: [0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28]
    });
    var Alignment_1 = Alignment;
    /* eslint no-multi-spaces: "off" */

    /**
     * Contains error correction information.
     *
     * @public
     * @class
     * @extends Nevis
     */

    var ErrorCorrection = lite.extend(null, {
      /**
       * The error correction blocks.
       *
       * There are four elements per version. The first two indicate the number of blocks, then the data width, and finally
       * the ECC width.
       *
       * @public
       * @static
       * @type {number[]}
       * @memberof ErrorCorrection
       */
      BLOCKS: [1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30, 4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30],

      /**
       * The final format bits with mask (level << 3 | mask).
       *
       * @public
       * @static
       * @type {number[]}
       * @memberof ErrorCorrection
       */
      FINAL_FORMAT: [// L
      0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976, // M
      0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0, // Q
      0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed, // H
      0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b],

      /**
       * A map of human-readable ECC levels.
       *
       * @public
       * @static
       * @type {Object.<string, number>}
       * @memberof ErrorCorrection
       */
      LEVELS: {
        L: 1,
        M: 2,
        Q: 3,
        H: 4
      }
    });
    var ErrorCorrection_1 = ErrorCorrection;
    /**
     * Contains Galois field information.
     *
     * @public
     * @class
     * @extends Nevis
     */

    var Galois = lite.extend(null, {
      /**
       * The Galois field exponent table.
       *
       * @public
       * @static
       * @type {number[]}
       * @memberof Galois
       */
      EXPONENT: [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26, 0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0, 0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23, 0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1, 0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0, 0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2, 0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce, 0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc, 0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54, 0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73, 0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff, 0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41, 0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6, 0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09, 0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16, 0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00],

      /**
       * The Galois field log table.
       *
       * @public
       * @static
       * @type {number[]}
       * @memberof Galois
       */
      LOG: [0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b, 0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71, 0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45, 0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6, 0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88, 0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40, 0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d, 0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57, 0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18, 0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e, 0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61, 0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2, 0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6, 0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a, 0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7, 0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf]
    });
    var Galois_1 = Galois;
    /**
     * Contains version pattern information.
     *
     * @public
     * @class
     * @extends Nevis
     */

    var Version = lite.extend(null, {
      /**
       * The version pattern block.
       *
       * @public
       * @static
       * @type {number[]}
       * @memberof Version
       */
      BLOCK: [0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d, 0x928, 0xb78, 0x45d, 0xa17, 0x532, 0x9a6, 0x683, 0x8c9, 0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75, 0x250, 0x9d5, 0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64, 0x541, 0xc69]
    });
    var Version_1 = Version;
    /**
     * Generates information for a QR code frame based on a specific value to be encoded.
     *
     * @param {Frame~Options} options - the options to be used
     * @public
     * @class
     * @extends Nevis
     */

    var Frame = lite.extend(function (options) {
      var dataBlock, eccBlock, index, neccBlock1, neccBlock2;
      var valueLength = options.value.length;
      this._badness = [];
      this._level = ErrorCorrection_1.LEVELS[options.level];
      this._polynomial = [];
      this._value = options.value;
      this._version = 0;
      this._stringBuffer = [];

      while (this._version < 40) {
        this._version++;
        index = (this._level - 1) * 4 + (this._version - 1) * 16;
        neccBlock1 = ErrorCorrection_1.BLOCKS[index++];
        neccBlock2 = ErrorCorrection_1.BLOCKS[index++];
        dataBlock = ErrorCorrection_1.BLOCKS[index++];
        eccBlock = ErrorCorrection_1.BLOCKS[index];
        index = dataBlock * (neccBlock1 + neccBlock2) + neccBlock2 - 3 + (this._version <= 9);

        if (valueLength <= index) {
          break;
        }
      }

      this._dataBlock = dataBlock;
      this._eccBlock = eccBlock;
      this._neccBlock1 = neccBlock1;
      this._neccBlock2 = neccBlock2;
      /**
       * The data width is based on version.
       *
       * @public
       * @type {number}
       * @memberof Frame#
       */
      // FIXME: Ensure that it fits instead of being truncated.

      var width = this.width = 17 + 4 * this._version;
      /**
       * The image buffer.
       *
       * @public
       * @type {number[]}
       * @memberof Frame#
       */

      this.buffer = Frame._createArray(width * width);
      this._ecc = Frame._createArray(dataBlock + (dataBlock + eccBlock) * (neccBlock1 + neccBlock2) + neccBlock2);
      this._mask = Frame._createArray((width * (width + 1) + 1) / 2);

      this._insertFinders();

      this._insertAlignments(); // Insert single foreground cell.


      this.buffer[8 + width * (width - 8)] = 1;

      this._insertTimingGap();

      this._reverseMask();

      this._insertTimingRowAndColumn();

      this._insertVersion();

      this._syncMask();

      this._convertBitStream(valueLength);

      this._calculatePolynomial();

      this._appendEccToData();

      this._interleaveBlocks();

      this._pack();

      this._finish();
    }, {
      _addAlignment: function (x, y) {
        var i;
        var buffer = this.buffer;
        var width = this.width;
        buffer[x + width * y] = 1;

        for (i = -2; i < 2; i++) {
          buffer[x + i + width * (y - 2)] = 1;
          buffer[x - 2 + width * (y + i + 1)] = 1;
          buffer[x + 2 + width * (y + i)] = 1;
          buffer[x + i + 1 + width * (y + 2)] = 1;
        }

        for (i = 0; i < 2; i++) {
          this._setMask(x - 1, y + i);

          this._setMask(x + 1, y - i);

          this._setMask(x - i, y - 1);

          this._setMask(x + i, y + 1);
        }
      },
      _appendData: function (data, dataLength, ecc, eccLength) {
        var bit, i, j;
        var polynomial = this._polynomial;
        var stringBuffer = this._stringBuffer;

        for (i = 0; i < eccLength; i++) {
          stringBuffer[ecc + i] = 0;
        }

        for (i = 0; i < dataLength; i++) {
          bit = Galois_1.LOG[stringBuffer[data + i] ^ stringBuffer[ecc]];

          if (bit !== 255) {
            for (j = 1; j < eccLength; j++) {
              stringBuffer[ecc + j - 1] = stringBuffer[ecc + j] ^ Galois_1.EXPONENT[Frame._modN(bit + polynomial[eccLength - j])];
            }
          } else {
            for (j = ecc; j < ecc + eccLength; j++) {
              stringBuffer[j] = stringBuffer[j + 1];
            }
          }

          stringBuffer[ecc + eccLength - 1] = bit === 255 ? 0 : Galois_1.EXPONENT[Frame._modN(bit + polynomial[0])];
        }
      },
      _appendEccToData: function () {
        var i;
        var data = 0;
        var dataBlock = this._dataBlock;

        var ecc = this._calculateMaxLength();

        var eccBlock = this._eccBlock;

        for (i = 0; i < this._neccBlock1; i++) {
          this._appendData(data, dataBlock, ecc, eccBlock);

          data += dataBlock;
          ecc += eccBlock;
        }

        for (i = 0; i < this._neccBlock2; i++) {
          this._appendData(data, dataBlock + 1, ecc, eccBlock);

          data += dataBlock + 1;
          ecc += eccBlock;
        }
      },
      _applyMask: function (mask) {
        var r3x, r3y, x, y;
        var buffer = this.buffer;
        var width = this.width;

        switch (mask) {
          case 0:
            for (y = 0; y < width; y++) {
              for (x = 0; x < width; x++) {
                if (!(x + y & 1) && !this._isMasked(x, y)) {
                  buffer[x + y * width] ^= 1;
                }
              }
            }

            break;

          case 1:
            for (y = 0; y < width; y++) {
              for (x = 0; x < width; x++) {
                if (!(y & 1) && !this._isMasked(x, y)) {
                  buffer[x + y * width] ^= 1;
                }
              }
            }

            break;

          case 2:
            for (y = 0; y < width; y++) {
              for (r3x = 0, x = 0; x < width; x++, r3x++) {
                if (r3x === 3) {
                  r3x = 0;
                }

                if (!r3x && !this._isMasked(x, y)) {
                  buffer[x + y * width] ^= 1;
                }
              }
            }

            break;

          case 3:
            for (r3y = 0, y = 0; y < width; y++, r3y++) {
              if (r3y === 3) {
                r3y = 0;
              }

              for (r3x = r3y, x = 0; x < width; x++, r3x++) {
                if (r3x === 3) {
                  r3x = 0;
                }

                if (!r3x && !this._isMasked(x, y)) {
                  buffer[x + y * width] ^= 1;
                }
              }
            }

            break;

          case 4:
            for (y = 0; y < width; y++) {
              for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
                if (r3x === 3) {
                  r3x = 0;
                  r3y = !r3y;
                }

                if (!r3y && !this._isMasked(x, y)) {
                  buffer[x + y * width] ^= 1;
                }
              }
            }

            break;

          case 5:
            for (r3y = 0, y = 0; y < width; y++, r3y++) {
              if (r3y === 3) {
                r3y = 0;
              }

              for (r3x = 0, x = 0; x < width; x++, r3x++) {
                if (r3x === 3) {
                  r3x = 0;
                }

                if (!((x & y & 1) + !(!r3x | !r3y)) && !this._isMasked(x, y)) {
                  buffer[x + y * width] ^= 1;
                }
              }
            }

            break;

          case 6:
            for (r3y = 0, y = 0; y < width; y++, r3y++) {
              if (r3y === 3) {
                r3y = 0;
              }

              for (r3x = 0, x = 0; x < width; x++, r3x++) {
                if (r3x === 3) {
                  r3x = 0;
                }

                if (!((x & y & 1) + (r3x && r3x === r3y) & 1) && !this._isMasked(x, y)) {
                  buffer[x + y * width] ^= 1;
                }
              }
            }

            break;

          case 7:
            for (r3y = 0, y = 0; y < width; y++, r3y++) {
              if (r3y === 3) {
                r3y = 0;
              }

              for (r3x = 0, x = 0; x < width; x++, r3x++) {
                if (r3x === 3) {
                  r3x = 0;
                }

                if (!((r3x && r3x === r3y) + (x + y & 1) & 1) && !this._isMasked(x, y)) {
                  buffer[x + y * width] ^= 1;
                }
              }
            }

            break;
        }
      },
      _calculateMaxLength: function () {
        return this._dataBlock * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;
      },
      _calculatePolynomial: function () {
        var i, j;
        var eccBlock = this._eccBlock;
        var polynomial = this._polynomial;
        polynomial[0] = 1;

        for (i = 0; i < eccBlock; i++) {
          polynomial[i + 1] = 1;

          for (j = i; j > 0; j--) {
            polynomial[j] = polynomial[j] ? polynomial[j - 1] ^ Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[j]] + i)] : polynomial[j - 1];
          }

          polynomial[0] = Galois_1.EXPONENT[Frame._modN(Galois_1.LOG[polynomial[0]] + i)];
        } // Use logs for generator polynomial to save calculation step.


        for (i = 0; i <= eccBlock; i++) {
          polynomial[i] = Galois_1.LOG[polynomial[i]];
        }
      },
      _checkBadness: function () {
        var b, b1, h, x, y;
        var bad = 0;
        var badness = this._badness;
        var buffer = this.buffer;
        var width = this.width; // Blocks of same colour.

        for (y = 0; y < width - 1; y++) {
          for (x = 0; x < width - 1; x++) {
            // All foreground colour.
            if (buffer[x + width * y] && buffer[x + 1 + width * y] && buffer[x + width * (y + 1)] && buffer[x + 1 + width * (y + 1)] || // All background colour.
            !(buffer[x + width * y] || buffer[x + 1 + width * y] || buffer[x + width * (y + 1)] || buffer[x + 1 + width * (y + 1)])) {
              bad += Frame.N2;
            }
          }
        }

        var bw = 0; // X runs.

        for (y = 0; y < width; y++) {
          h = 0;
          badness[0] = 0;

          for (b = 0, x = 0; x < width; x++) {
            b1 = buffer[x + width * y];

            if (b === b1) {
              badness[h]++;
            } else {
              badness[++h] = 1;
            }

            b = b1;
            bw += b ? 1 : -1;
          }

          bad += this._getBadness(h);
        }

        if (bw < 0) {
          bw = -bw;
        }

        var count = 0;
        var big = bw;
        big += big << 2;
        big <<= 1;

        while (big > width * width) {
          big -= width * width;
          count++;
        }

        bad += count * Frame.N4; // Y runs.

        for (x = 0; x < width; x++) {
          h = 0;
          badness[0] = 0;

          for (b = 0, y = 0; y < width; y++) {
            b1 = buffer[x + width * y];

            if (b === b1) {
              badness[h]++;
            } else {
              badness[++h] = 1;
            }

            b = b1;
          }

          bad += this._getBadness(h);
        }

        return bad;
      },
      _convertBitStream: function (length) {
        var bit, i;
        var ecc = this._ecc;
        var version = this._version; // Convert string to bit stream. 8-bit data to QR-coded 8-bit data (numeric, alphanumeric, or kanji not supported).

        for (i = 0; i < length; i++) {
          ecc[i] = this._value.charCodeAt(i);
        }

        var stringBuffer = this._stringBuffer = ecc.slice();

        var maxLength = this._calculateMaxLength();

        if (length >= maxLength - 2) {
          length = maxLength - 2;

          if (version > 9) {
            length--;
          }
        } // Shift and re-pack to insert length prefix.


        var index = length;

        if (version > 9) {
          stringBuffer[index + 2] = 0;
          stringBuffer[index + 3] = 0;

          while (index--) {
            bit = stringBuffer[index];
            stringBuffer[index + 3] |= 255 & bit << 4;
            stringBuffer[index + 2] = bit >> 4;
          }

          stringBuffer[2] |= 255 & length << 4;
          stringBuffer[1] = length >> 4;
          stringBuffer[0] = 0x40 | length >> 12;
        } else {
          stringBuffer[index + 1] = 0;
          stringBuffer[index + 2] = 0;

          while (index--) {
            bit = stringBuffer[index];
            stringBuffer[index + 2] |= 255 & bit << 4;
            stringBuffer[index + 1] = bit >> 4;
          }

          stringBuffer[1] |= 255 & length << 4;
          stringBuffer[0] = 0x40 | length >> 4;
        } // Fill to end with pad pattern.


        index = length + 3 - (version < 10);

        while (index < maxLength) {
          stringBuffer[index++] = 0xec;
          stringBuffer[index++] = 0x11;
        }
      },
      _getBadness: function (length) {
        var i;
        var badRuns = 0;
        var badness = this._badness;

        for (i = 0; i <= length; i++) {
          if (badness[i] >= 5) {
            badRuns += Frame.N1 + badness[i] - 5;
          }
        } // FBFFFBF as in finder.


        for (i = 3; i < length - 1; i += 2) {
          if (badness[i - 2] === badness[i + 2] && badness[i + 2] === badness[i - 1] && badness[i - 1] === badness[i + 1] && badness[i - 1] * 3 === badness[i] && ( // Background around the foreground pattern? Not part of the specs.
          badness[i - 3] === 0 || i + 3 > length || badness[i - 3] * 3 >= badness[i] * 4 || badness[i + 3] * 3 >= badness[i] * 4)) {
            badRuns += Frame.N3;
          }
        }

        return badRuns;
      },
      _finish: function () {
        // Save pre-mask copy of frame.
        this._stringBuffer = this.buffer.slice();
        var currentMask, i;
        var bit = 0;
        var mask = 30000;
        /*
         * Using for instead of while since in original Arduino code if an early mask was "good enough" it wouldn't try for
         * a better one since they get more complex and take longer.
         */

        for (i = 0; i < 8; i++) {
          // Returns foreground-background imbalance.
          this._applyMask(i);

          currentMask = this._checkBadness(); // Is current mask better than previous best?

          if (currentMask < mask) {
            mask = currentMask;
            bit = i;
          } // Don't increment "i" to a void redoing mask.


          if (bit === 7) {
            break;
          } // Reset for next pass.


          this.buffer = this._stringBuffer.slice();
        } // Redo best mask as none were "good enough" (i.e. last wasn't bit).


        if (bit !== i) {
          this._applyMask(bit);
        } // Add in final mask/ECC level bytes.


        mask = ErrorCorrection_1.FINAL_FORMAT[bit + (this._level - 1 << 3)];
        var buffer = this.buffer;
        var width = this.width; // Low byte.

        for (i = 0; i < 8; i++, mask >>= 1) {
          if (mask & 1) {
            buffer[width - 1 - i + width * 8] = 1;

            if (i < 6) {
              buffer[8 + width * i] = 1;
            } else {
              buffer[8 + width * (i + 1)] = 1;
            }
          }
        } // High byte.


        for (i = 0; i < 7; i++, mask >>= 1) {
          if (mask & 1) {
            buffer[8 + width * (width - 7 + i)] = 1;

            if (i) {
              buffer[6 - i + width * 8] = 1;
            } else {
              buffer[7 + width * 8] = 1;
            }
          }
        }
      },
      _interleaveBlocks: function () {
        var i, j;
        var dataBlock = this._dataBlock;
        var ecc = this._ecc;
        var eccBlock = this._eccBlock;
        var k = 0;

        var maxLength = this._calculateMaxLength();

        var neccBlock1 = this._neccBlock1;
        var neccBlock2 = this._neccBlock2;
        var stringBuffer = this._stringBuffer;

        for (i = 0; i < dataBlock; i++) {
          for (j = 0; j < neccBlock1; j++) {
            ecc[k++] = stringBuffer[i + j * dataBlock];
          }

          for (j = 0; j < neccBlock2; j++) {
            ecc[k++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
          }
        }

        for (j = 0; j < neccBlock2; j++) {
          ecc[k++] = stringBuffer[neccBlock1 * dataBlock + i + j * (dataBlock + 1)];
        }

        for (i = 0; i < eccBlock; i++) {
          for (j = 0; j < neccBlock1 + neccBlock2; j++) {
            ecc[k++] = stringBuffer[maxLength + i + j * eccBlock];
          }
        }

        this._stringBuffer = ecc;
      },
      _insertAlignments: function () {
        var i, x, y;
        var version = this._version;
        var width = this.width;

        if (version > 1) {
          i = Alignment_1.BLOCK[version];
          y = width - 7;

          for (;;) {
            x = width - 7;

            while (x > i - 3) {
              this._addAlignment(x, y);

              if (x < i) {
                break;
              }

              x -= i;
            }

            if (y <= i + 9) {
              break;
            }

            y -= i;

            this._addAlignment(6, y);

            this._addAlignment(y, 6);
          }
        }
      },
      _insertFinders: function () {
        var i, j, x, y;
        var buffer = this.buffer;
        var width = this.width;

        for (i = 0; i < 3; i++) {
          j = 0;
          y = 0;

          if (i === 1) {
            j = width - 7;
          }

          if (i === 2) {
            y = width - 7;
          }

          buffer[y + 3 + width * (j + 3)] = 1;

          for (x = 0; x < 6; x++) {
            buffer[y + x + width * j] = 1;
            buffer[y + width * (j + x + 1)] = 1;
            buffer[y + 6 + width * (j + x)] = 1;
            buffer[y + x + 1 + width * (j + 6)] = 1;
          }

          for (x = 1; x < 5; x++) {
            this._setMask(y + x, j + 1);

            this._setMask(y + 1, j + x + 1);

            this._setMask(y + 5, j + x);

            this._setMask(y + x + 1, j + 5);
          }

          for (x = 2; x < 4; x++) {
            buffer[y + x + width * (j + 2)] = 1;
            buffer[y + 2 + width * (j + x + 1)] = 1;
            buffer[y + 4 + width * (j + x)] = 1;
            buffer[y + x + 1 + width * (j + 4)] = 1;
          }
        }
      },
      _insertTimingGap: function () {
        var x, y;
        var width = this.width;

        for (y = 0; y < 7; y++) {
          this._setMask(7, y);

          this._setMask(width - 8, y);

          this._setMask(7, y + width - 7);
        }

        for (x = 0; x < 8; x++) {
          this._setMask(x, 7);

          this._setMask(x + width - 8, 7);

          this._setMask(x, width - 8);
        }
      },
      _insertTimingRowAndColumn: function () {
        var x;
        var buffer = this.buffer;
        var width = this.width;

        for (x = 0; x < width - 14; x++) {
          if (x & 1) {
            this._setMask(8 + x, 6);

            this._setMask(6, 8 + x);
          } else {
            buffer[8 + x + width * 6] = 1;
            buffer[6 + width * (8 + x)] = 1;
          }
        }
      },
      _insertVersion: function () {
        var i, j, x, y;
        var buffer = this.buffer;
        var version = this._version;
        var width = this.width;

        if (version > 6) {
          i = Version_1.BLOCK[version - 7];
          j = 17;

          for (x = 0; x < 6; x++) {
            for (y = 0; y < 3; y++, j--) {
              if (1 & (j > 11 ? version >> j - 12 : i >> j)) {
                buffer[5 - x + width * (2 - y + width - 11)] = 1;
                buffer[2 - y + width - 11 + width * (5 - x)] = 1;
              } else {
                this._setMask(5 - x, 2 - y + width - 11);

                this._setMask(2 - y + width - 11, 5 - x);
              }
            }
          }
        }
      },
      _isMasked: function (x, y) {
        var bit = Frame._getMaskBit(x, y);

        return this._mask[bit] === 1;
      },
      _pack: function () {
        var bit, i, j;
        var k = 1;
        var v = 1;
        var width = this.width;
        var x = width - 1;
        var y = width - 1; // Interleaved data and ECC codes.

        var length = (this._dataBlock + this._eccBlock) * (this._neccBlock1 + this._neccBlock2) + this._neccBlock2;

        for (i = 0; i < length; i++) {
          bit = this._stringBuffer[i];

          for (j = 0; j < 8; j++, bit <<= 1) {
            if (0x80 & bit) {
              this.buffer[x + width * y] = 1;
            } // Find next fill position.


            do {
              if (v) {
                x--;
              } else {
                x++;

                if (k) {
                  if (y !== 0) {
                    y--;
                  } else {
                    x -= 2;
                    k = !k;

                    if (x === 6) {
                      x--;
                      y = 9;
                    }
                  }
                } else if (y !== width - 1) {
                  y++;
                } else {
                  x -= 2;
                  k = !k;

                  if (x === 6) {
                    x--;
                    y -= 8;
                  }
                }
              }

              v = !v;
            } while (this._isMasked(x, y));
          }
        }
      },
      _reverseMask: function () {
        var x, y;
        var width = this.width;

        for (x = 0; x < 9; x++) {
          this._setMask(x, 8);
        }

        for (x = 0; x < 8; x++) {
          this._setMask(x + width - 8, 8);

          this._setMask(8, x);
        }

        for (y = 0; y < 7; y++) {
          this._setMask(8, y + width - 7);
        }
      },
      _setMask: function (x, y) {
        var bit = Frame._getMaskBit(x, y);

        this._mask[bit] = 1;
      },
      _syncMask: function () {
        var x, y;
        var width = this.width;

        for (y = 0; y < width; y++) {
          for (x = 0; x <= y; x++) {
            if (this.buffer[x + width * y]) {
              this._setMask(x, y);
            }
          }
        }
      }
    }, {
      _createArray: function (length) {
        var i;
        var array = [];

        for (i = 0; i < length; i++) {
          array[i] = 0;
        }

        return array;
      },
      _getMaskBit: function (x, y) {
        var bit;

        if (x > y) {
          bit = x;
          x = y;
          y = bit;
        }

        bit = y;
        bit += y * y;
        bit >>= 1;
        bit += x;
        return bit;
      },
      _modN: function (x) {
        while (x >= 255) {
          x -= 255;
          x = (x >> 8) + (x & 255);
        }

        return x;
      },
      // *Badness* coefficients.
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    });
    var Frame_1 = Frame;
    /**
     * The options used by {@link Frame}.
     *
     * @typedef {Object} Frame~Options
     * @property {string} level - The ECC level to be used.
     * @property {string} value - The value to be encoded.
     */

    /**
     * An implementation of {@link Renderer} for working with <code>img</code> elements.
     *
     * This depends on {@link CanvasRenderer} being executed first as this implementation simply applies the data URL from
     * the rendered <code>canvas</code> element as the <code>src</code> for the <code>img</code> element being rendered.
     *
     * @public
     * @class
     * @extends Renderer
     */

    var ImageRenderer = Renderer_1.extend({
      /**
       * @override
       */
      draw: function () {
        this.element.src = this.qrious.toDataURL();
      },

      /**
       * @override
       */
      reset: function () {
        this.element.src = '';
      },

      /**
       * @override
       */
      resize: function () {
        var element = this.element;
        element.width = element.height = this.qrious.size;
      }
    });
    var ImageRenderer_1 = ImageRenderer;
    /**
     * Defines an available option while also configuring how values are applied to the target object.
     *
     * Optionally, a default value can be specified as well a value transformer for greater control over how the option
     * value is applied.
     *
     * If no value transformer is specified, then any specified option will be applied directly. All values are maintained
     * on the target object itself as a field using the option name prefixed with a single underscore.
     *
     * When an option is specified as modifiable, the {@link OptionManager} will be required to include a setter for the
     * property that is defined on the target object that uses the option name.
     *
     * @param {string} name - the name to be used
     * @param {boolean} [modifiable] - <code>true</code> if the property defined on target objects should include a setter;
     * otherwise <code>false</code>
     * @param {*} [defaultValue] - the default value to be used
     * @param {Option~ValueTransformer} [valueTransformer] - the value transformer to be used
     * @public
     * @class
     * @extends Nevis
     */

    var Option = lite.extend(function (name, modifiable, defaultValue, valueTransformer) {
      /**
       * The name for this {@link Option}.
       *
       * @public
       * @type {string}
       * @memberof Option#
       */
      this.name = name;
      /**
       * Whether a setter should be included on the property defined on target objects for this {@link Option}.
       *
       * @public
       * @type {boolean}
       * @memberof Option#
       */

      this.modifiable = Boolean(modifiable);
      /**
       * The default value for this {@link Option}.
       *
       * @public
       * @type {*}
       * @memberof Option#
       */

      this.defaultValue = defaultValue;
      this._valueTransformer = valueTransformer;
    }, {
      /**
       * Transforms the specified <code>value</code> so that it can be applied for this {@link Option}.
       *
       * If a value transformer has been specified for this {@link Option}, it will be called upon to transform
       * <code>value</code>. Otherwise, <code>value</code> will be returned directly.
       *
       * @param {*} value - the value to be transformed
       * @return {*} The transformed value or <code>value</code> if no value transformer is specified.
       * @public
       * @memberof Option#
       */
      transform: function (value) {
        var transformer = this._valueTransformer;

        if (typeof transformer === 'function') {
          return transformer(value, this);
        }

        return value;
      }
    });
    var Option_1 = Option;
    /**
     * Returns a transformed value for the specified <code>value</code> to be applied for the <code>option</code> provided.
     *
     * @callback Option~ValueTransformer
     * @param {*} value - the value to be transformed
     * @param {Option} option - the {@link Option} for which <code>value</code> is being transformed
     * @return {*} The transform value.
     */

    /**
     * Contains utility methods that are useful throughout the library.
     *
     * @public
     * @class
     * @extends Nevis
     */

    var Utilities = lite.extend(null, {
      /**
       * Returns the absolute value of a given number.
       *
       * This method is simply a convenient shorthand for <code>Math.abs</code> while ensuring that nulls are returned as
       * <code>null</code> instead of zero.
       *
       * @param {number} value - the number whose absolute value is to be returned
       * @return {number} The absolute value of <code>value</code> or <code>null</code> if <code>value</code> is
       * <code>null</code>.
       * @public
       * @static
       * @memberof Utilities
       */
      abs: function (value) {
        return value != null ? Math.abs(value) : null;
      },

      /**
       * Returns whether the specified <code>object</code> has a property with the specified <code>name</code> as an own
       * (not inherited) property.
       *
       * @param {Object} object - the object on which the property is to be checked
       * @param {string} name - the name of the property to be checked
       * @return {boolean} <code>true</code> if <code>object</code> has an own property with <code>name</code>.
       * @public
       * @static
       * @memberof Utilities
       */
      hasOwn: function (object, name) {
        return Object.prototype.hasOwnProperty.call(object, name);
      },

      /**
       * A non-operation method that does absolutely nothing.
       *
       * @return {void}
       * @public
       * @static
       * @memberof Utilities
       */
      noop: function () {},

      /**
       * Transforms the specified <code>string</code> to upper case while remaining null-safe.
       *
       * @param {string} string - the string to be transformed to upper case
       * @return {string} <code>string</code> transformed to upper case if <code>string</code> is not <code>null</code>.
       * @public
       * @static
       * @memberof Utilities
       */
      toUpperCase: function (string) {
        return string != null ? string.toUpperCase() : null;
      }
    });
    var Utilities_1 = Utilities;
    /**
     * Manages multiple {@link Option} instances that are intended to be used by multiple implementations.
     *
     * Although the option definitions are shared between targets, the values are maintained on the targets themselves.
     *
     * @param {Option[]} options - the options to be used
     * @public
     * @class
     * @extends Nevis
     */

    var OptionManager = lite.extend(function (options) {
      /**
       * The available options for this {@link OptionManager}.
       *
       * @public
       * @type {Object.<string, Option>}
       * @memberof OptionManager#
       */
      this.options = {};
      options.forEach(function (option) {
        this.options[option.name] = option;
      }, this);
    }, {
      /**
       * Returns whether an option with the specified <code>name</code> is available.
       *
       * @param {string} name - the name of the {@link Option} whose existence is to be checked
       * @return {boolean} <code>true</code> if an {@link Option} exists with <code>name</code>; otherwise
       * <code>false</code>.
       * @public
       * @memberof OptionManager#
       */
      exists: function (name) {
        return this.options[name] != null;
      },

      /**
       * Returns the value of the option with the specified <code>name</code> on the <code>target</code> object provided.
       *
       * @param {string} name - the name of the {@link Option} whose value on <code>target</code> is to be returned
       * @param {Object} target - the object from which the value of the named {@link Option} is to be returned
       * @return {*} The value of the {@link Option} with <code>name</code> on <code>target</code>.
       * @public
       * @memberof OptionManager#
       */
      get: function (name, target) {
        return OptionManager._get(this.options[name], target);
      },

      /**
       * Returns a copy of all of the available options on the <code>target</code> object provided.
       *
       * @param {Object} target - the object from which the option name/value pairs are to be returned
       * @return {Object.<string, *>} A hash containing the name/value pairs of all options on <code>target</code>.
       * @public
       * @memberof OptionManager#
       */
      getAll: function (target) {
        var name;
        var options = this.options;
        var result = {};

        for (name in options) {
          if (Utilities_1.hasOwn(options, name)) {
            result[name] = OptionManager._get(options[name], target);
          }
        }

        return result;
      },

      /**
       * Initializes the available options for the <code>target</code> object provided and then applies the initial values
       * within the speciifed <code>options</code>.
       *
       * This method will throw an error if any of the names within <code>options</code> does not match an available option.
       *
       * This involves setting the default values and defining properties for all of the available options on
       * <code>target</code> before finally calling {@link OptionMananger#setAll} with <code>options</code> and
       * <code>target</code>. Any options that are configured to be modifiable will have a setter included in their defined
       * property that will allow its corresponding value to be modified.
       *
       * If a change handler is specified, it will be called whenever the value changes on <code>target</code> for a
       * modifiable option, but only when done so via the defined property's setter.
       *
       * @param {Object.<string, *>} options - the name/value pairs of the initial options to be set
       * @param {Object} target - the object on which the options are to be initialized
       * @param {Function} [changeHandler] - the function to be called whenever the value of an modifiable option changes on
       * <code>target</code>
       * @return {void}
       * @throws {Error} If <code>options</code> contains an invalid option name.
       * @public
       * @memberof OptionManager#
       */
      init: function (options, target, changeHandler) {
        if (typeof changeHandler !== 'function') {
          changeHandler = Utilities_1.noop;
        }

        var name, option;

        for (name in this.options) {
          if (Utilities_1.hasOwn(this.options, name)) {
            option = this.options[name];

            OptionManager._set(option, option.defaultValue, target);

            OptionManager._createAccessor(option, target, changeHandler);
          }
        }

        this._setAll(options, target, true);
      },

      /**
       * Sets the value of the option with the specified <code>name</code> on the <code>target</code> object provided to
       * <code>value</code>.
       *
       * This method will throw an error if <code>name</code> does not match an available option or matches an option that
       * cannot be modified.
       *
       * If <code>value</code> is <code>null</code> and the {@link Option} has a default value configured, then that default
       * value will be used instead. If the {@link Option} also has a value transformer configured, it will be used to
       * transform whichever value was determined to be used.
       *
       * This method returns whether the value of the underlying field on <code>target</code> was changed as a result.
       *
       * @param {string} name - the name of the {@link Option} whose value is to be set
       * @param {*} value - the value to be set for the named {@link Option} on <code>target</code>
       * @param {Object} target - the object on which <code>value</code> is to be set for the named {@link Option}
       * @return {boolean} <code>true</code> if the underlying field on <code>target</code> was changed; otherwise
       * <code>false</code>.
       * @throws {Error} If <code>name</code> is invalid or is for an option that cannot be modified.
       * @public
       * @memberof OptionManager#
       */
      set: function (name, value, target) {
        return this._set(name, value, target);
      },

      /**
       * Sets all of the specified <code>options</code> on the <code>target</code> object provided to their corresponding
       * values.
       *
       * This method will throw an error if any of the names within <code>options</code> does not match an available option
       * or matches an option that cannot be modified.
       *
       * If any value within <code>options</code> is <code>null</code> and the corresponding {@link Option} has a default
       * value configured, then that default value will be used instead. If an {@link Option} also has a value transformer
       * configured, it will be used to transform whichever value was determined to be used.
       *
       * This method returns whether the value for any of the underlying fields on <code>target</code> were changed as a
       * result.
       *
       * @param {Object.<string, *>} options - the name/value pairs of options to be set
       * @param {Object} target - the object on which the options are to be set
       * @return {boolean} <code>true</code> if any of the underlying fields on <code>target</code> were changed; otherwise
       * <code>false</code>.
       * @throws {Error} If <code>options</code> contains an invalid option name or an option that cannot be modiifed.
       * @public
       * @memberof OptionManager#
       */
      setAll: function (options, target) {
        return this._setAll(options, target);
      },
      _set: function (name, value, target, allowUnmodifiable) {
        var option = this.options[name];

        if (!option) {
          throw new Error('Invalid option: ' + name);
        }

        if (!option.modifiable && !allowUnmodifiable) {
          throw new Error('Option cannot be modified: ' + name);
        }

        return OptionManager._set(option, value, target);
      },
      _setAll: function (options, target, allowUnmodifiable) {
        if (!options) {
          return false;
        }

        var name;
        var changed = false;

        for (name in options) {
          if (Utilities_1.hasOwn(options, name) && this._set(name, options[name], target, allowUnmodifiable)) {
            changed = true;
          }
        }

        return changed;
      }
    }, {
      _createAccessor: function (option, target, changeHandler) {
        var descriptor = {
          get: function () {
            return OptionManager._get(option, target);
          }
        };

        if (option.modifiable) {
          descriptor.set = function (value) {
            if (OptionManager._set(option, value, target)) {
              changeHandler(value, option);
            }
          };
        }

        Object.defineProperty(target, option.name, descriptor);
      },
      _get: function (option, target) {
        return target['_' + option.name];
      },
      _set: function (option, value, target) {
        var fieldName = '_' + option.name;
        var oldValue = target[fieldName];
        var newValue = option.transform(value != null ? value : option.defaultValue);
        target[fieldName] = newValue;
        return newValue !== oldValue;
      }
    });
    var OptionManager_1 = OptionManager;
    /**
     * Called whenever the value of a modifiable {@link Option} is changed on a target object via the defined property's
     * setter.
     *
     * @callback OptionManager~ChangeHandler
     * @param {*} value - the new value for <code>option</code> on the target object
     * @param {Option} option - the modifable {@link Option} whose value has changed on the target object.
     * @return {void}
     */

    /**
     * A basic manager for {@link Service} implementations that are mapped to simple names.
     *
     * @public
     * @class
     * @extends Nevis
     */

    var ServiceManager = lite.extend(function () {
      this._services = {};
    }, {
      /**
       * Returns the {@link Service} being managed with the specified <code>name</code>.
       *
       * @param {string} name - the name of the {@link Service} to be returned
       * @return {Service} The {@link Service} is being managed with <code>name</code>.
       * @throws {Error} If no {@link Service} is being managed with <code>name</code>.
       * @public
       * @memberof ServiceManager#
       */
      getService: function (name) {
        var service = this._services[name];

        if (!service) {
          throw new Error('Service is not being managed with name: ' + name);
        }

        return service;
      },

      /**
       * Sets the {@link Service} implementation to be managed for the specified <code>name</code> to the
       * <code>service</code> provided.
       *
       * @param {string} name - the name of the {@link Service} to be managed with <code>name</code>
       * @param {Service} service - the {@link Service} implementation to be managed
       * @return {void}
       * @throws {Error} If a {@link Service} is already being managed with the same <code>name</code>.
       * @public
       * @memberof ServiceManager#
       */
      setService: function (name, service) {
        if (this._services[name]) {
          throw new Error('Service is already managed with name: ' + name);
        }

        if (service) {
          this._services[name] = service;
        }
      }
    });
    var ServiceManager_1 = ServiceManager;
    var optionManager = new OptionManager_1([new Option_1('background', true, 'white'), new Option_1('backgroundAlpha', true, 1, Utilities_1.abs), new Option_1('element'), new Option_1('foreground', true, 'black'), new Option_1('foregroundAlpha', true, 1, Utilities_1.abs), new Option_1('level', true, 'L', Utilities_1.toUpperCase), new Option_1('mime', true, 'image/png'), new Option_1('padding', true, null, Utilities_1.abs), new Option_1('size', true, 100, Utilities_1.abs), new Option_1('value', true, '')]);
    var serviceManager = new ServiceManager_1();
    /**
     * Enables configuration of a QR code generator which uses HTML5 <code>canvas</code> for rendering.
     *
     * @param {QRious~Options} [options] - the options to be used
     * @throws {Error} If any <code>options</code> are invalid.
     * @public
     * @class
     * @extends Nevis
     */

    var QRious = lite.extend(function (options) {
      optionManager.init(options, this, this.update.bind(this));
      var element = optionManager.get('element', this);
      var elementService = serviceManager.getService('element');
      var canvas = element && elementService.isCanvas(element) ? element : elementService.createCanvas();
      var image = element && elementService.isImage(element) ? element : elementService.createImage();
      this._canvasRenderer = new CanvasRenderer_1(this, canvas, true);
      this._imageRenderer = new ImageRenderer_1(this, image, image === element);
      this.update();
    }, {
      /**
       * Returns all of the options configured for this {@link QRious}.
       *
       * Any changes made to the returned object will not be reflected in the options themselves or their corresponding
       * underlying fields.
       *
       * @return {Object.<string, *>} A copy of the applied options.
       * @public
       * @memberof QRious#
       */
      get: function () {
        return optionManager.getAll(this);
      },

      /**
       * Sets all of the specified <code>options</code> and automatically updates this {@link QRious} if any of the
       * underlying fields are changed as a result.
       *
       * This is the preferred method for updating multiple options at one time to avoid unnecessary updates between
       * changes.
       *
       * @param {QRious~Options} options - the options to be set
       * @return {void}
       * @throws {Error} If any <code>options</code> are invalid or cannot be modified.
       * @public
       * @memberof QRious#
       */
      set: function (options) {
        if (optionManager.setAll(options, this)) {
          this.update();
        }
      },

      /**
       * Returns the image data URI for the generated QR code using the <code>mime</code> provided.
       *
       * @param {string} [mime] - the MIME type for the image
       * @return {string} The image data URI for the QR code.
       * @public
       * @memberof QRious#
       */
      toDataURL: function (mime) {
        return this.canvas.toDataURL(mime || this.mime);
      },

      /**
       * Updates this {@link QRious} by generating a new {@link Frame} and re-rendering the QR code.
       *
       * @return {void}
       * @protected
       * @memberof QRious#
       */
      update: function () {
        var frame = new Frame_1({
          level: this.level,
          value: this.value
        });

        this._canvasRenderer.render(frame);

        this._imageRenderer.render(frame);
      }
    }, {
      /**
       * Configures the <code>service</code> provided to be used by all {@link QRious} instances.
       *
       * @param {Service} service - the {@link Service} to be configured
       * @return {void}
       * @throws {Error} If a {@link Service} has already been configured with the same name.
       * @public
       * @static
       * @memberof QRious
       */
      use: function (service) {
        serviceManager.setService(service.getName(), service);
      }
    });
    Object.defineProperties(QRious.prototype, {
      canvas: {
        /**
         * Returns the <code>canvas</code> element being used to render the QR code for this {@link QRious}.
         *
         * @return {*} The <code>canvas</code> element.
         * @public
         * @memberof QRious#
         * @alias canvas
         */
        get: function () {
          return this._canvasRenderer.getElement();
        }
      },
      image: {
        /**
         * Returns the <code>img</code> element being used to render the QR code for this {@link QRious}.
         *
         * @return {*} The <code>img</code> element.
         * @public
         * @memberof QRious#
         * @alias image
         */
        get: function () {
          return this._imageRenderer.getElement();
        }
      }
    });
    var QRious_1$2 = QRious;
    /**
     * The options used by {@link QRious}.
     *
     * @typedef {Object} QRious~Options
     * @property {string} [background="white"] - The background color to be applied to the QR code.
     * @property {number} [backgroundAlpha=1] - The background alpha to be applied to the QR code.
     * @property {*} [element] - The element to be used to render the QR code which may either be an <code>canvas</code> or
     * <code>img</code>. The element(s) will be created if needed.
     * @property {string} [foreground="black"] - The foreground color to be applied to the QR code.
     * @property {number} [foregroundAlpha=1] - The foreground alpha to be applied to the QR code.
     * @property {string} [level="L"] - The error correction level to be applied to the QR code.
     * @property {string} [mime="image/png"] - The MIME type to be used to render the image for the QR code.
     * @property {number} [padding] - The padding for the QR code in pixels.
     * @property {number} [size=100] - The size of the QR code in pixels.
     * @property {string} [value=""] - The value to be encoded within the QR code.
     */

    var index = QRious_1$2;
    /**
     * Defines a service contract that must be met by all implementations.
     *
     * @public
     * @class
     * @extends Nevis
     */

    var Service = lite.extend({
      /**
       * Returns the name of this {@link Service}.
       *
       * @return {string} The service name.
       * @public
       * @abstract
       * @memberof Service#
       */
      getName: function () {}
    });
    var Service_1 = Service;
    /**
     * A service for working with elements.
     *
     * @public
     * @class
     * @extends Service
     */

    var ElementService = Service_1.extend({
      /**
       * Creates an instance of a canvas element.
       *
       * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
       *
       * @return {*} The newly created canvas element.
       * @public
       * @abstract
       * @memberof ElementService#
       */
      createCanvas: function () {},

      /**
       * Creates an instance of a image element.
       *
       * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
       *
       * @return {*} The newly created image element.
       * @public
       * @abstract
       * @memberof ElementService#
       */
      createImage: function () {},

      /**
       * @override
       */
      getName: function () {
        return 'element';
      },

      /**
       * Returns whether the specified <code>element</code> is a canvas.
       *
       * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
       *
       * @param {*} element - the element to be checked
       * @return {boolean} <code>true</code> if <code>element</code> is a canvas; otherwise <code>false</code>.
       * @public
       * @abstract
       * @memberof ElementService#
       */
      isCanvas: function (element) {},

      /**
       * Returns whether the specified <code>element</code> is an image.
       *
       * Implementations of {@link ElementService} <b>must</b> override this method with their own specific logic.
       *
       * @param {*} element - the element to be checked
       * @return {boolean} <code>true</code> if <code>element</code> is an image; otherwise <code>false</code>.
       * @public
       * @abstract
       * @memberof ElementService#
       */
      isImage: function (element) {}
    });
    var ElementService_1 = ElementService;
    /**
     * An implementation of {@link ElementService} intended for use within a browser environment.
     *
     * @public
     * @class
     * @extends ElementService
     */

    var BrowserElementService = ElementService_1.extend({
      /**
       * @override
       */
      createCanvas: function () {
        return document.createElement('canvas');
      },

      /**
       * @override
       */
      createImage: function () {
        return document.createElement('img');
      },

      /**
       * @override
       */
      isCanvas: function (element) {
        return element instanceof HTMLCanvasElement;
      },

      /**
       * @override
       */
      isImage: function (element) {
        return element instanceof HTMLImageElement;
      }
    });
    var BrowserElementService_1 = BrowserElementService;
    index.use(new BrowserElementService_1());
    var QRious_1 = index;
    return QRious_1;
  });
});

var t = function t(name) {
  return "".concat(NAMESPACE, "-").concat(name);
};

var TEMPLATE_DEFAULT = "<div class=\"".concat(t('content'), "\">  <div class=\"").concat(t('step'), " ").concat(t('quote'), "\">    <div class=\"").concat(t('step-content'), "\">      <div class=\"").concat(t('selector'), "\">        <div class=\"").concat(t('selector__title'), "\">Quote Asset</div>        <div class=\"").concat(t('selector__content'), "\">          <div class=\"").concat(t('selector__control'), "\">\n            <div class=\"").concat(t('selector__selected'), "\"></div>            <div class=\"").concat(t('selector__icon'), "\"></div>          </div>          <ul class=\"").concat(t('selector__list'), "\"></ul>        </div>      </div>      <div class=\"").concat(t('input'), "\">        <div class=\"").concat(t('input__title'), "\">Quote Amount</div>        <div class=\"").concat(t('input__content'), "\">          <div class=\"").concat(t('input__control'), "\">            <input type=\"number\" name=\"quoteAmount\" placeholder=\"Please enter the amount\" />\n          </div>          <div class=\"").concat(t('input__right'), "\">USDT</div>        </div>      </div>      <div class=\"").concat(t('step-error'), "\"></div>    </div>    <div class=\"").concat(t('step-footer'), "\">      <button>Next</button>    </div>  </div>  <div class=\"").concat(t('step'), " ").concat(t('payment'), "\">    <div class=\"").concat(t('step-title'), "\"></div>    <div class=\"").concat(t('step-content'), "\">      <div class=\"").concat(t('selector'), "\">        <div class=\"").concat(t('selector__title'), "\">Payment Asset</div>        <div class=\"").concat(t('selector__content'), "\">          <div class=\"").concat(t('selector__control'), "\">\n            <div class=\"").concat(t('selector__selected'), "\"></div>            <div class=\"").concat(t('selector__icon'), "\"></div>          </div>          <ul class=\"").concat(t('selector__list'), "\"></ul>        </div>      </div>      <div class=\"").concat(t('radio'), "\">        <div class=\"").concat(t('radio__title'), "\">Payment Wallet</div>        <div class=\"").concat(t('radio__content'), "\">          <label>            <input name=\"paymentMethod\" type=\"radio\" value=\"mixin\" />            <span>Mixin Wallet</span>          </label>          <label>            <input name=\"paymentMethod\" type=\"radio\" value=\"chain\" />            <span>On-chain Transfer</span>          </label>        </div>      </div>      <div class=\"").concat(t('step-error'), "\"></div>    </div>    <div class=\"").concat(t('step-footer'), "\">      <button>Confirm</button>\n    </div>  </div>  <div class=\"").concat(t('step'), " ").concat(t('info'), "\">    <div class=\"").concat(t('step-title'), "\"></div>    <div class=\"").concat(t('step-content'), "\">      <div class=\"qrious\"></div>      <p class=\"countdown\"></p>    </div>    <div class=\"").concat(t('step-footer'), "\">      <button>Pay with Wallet</button>    </div>  </div>  <div class=\"").concat(t('step'), " ").concat(t('result'), "\">    <div class=\"").concat(t('step-content'), "\">      <div class=\"").concat(t('result__success'), "\">        <svg viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\" class=\"icon-success\"><path d=\"M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M34.5548098,16.4485711 C33.9612228,15.8504763 32.9988282,15.8504763 32.4052412,16.4485711 L32.4052412,16.4485711 L21.413757,27.5805811 L21.413757,27.5805811 L21.4034642,27.590855 C21.0097542,27.9781674 20.3766105,27.9729811 19.9892981,27.5792711 L19.9892981,27.5792711 L15.5947588,23.1121428 C15.0011718,22.514048 14.0387772,22.514048 13.4451902,23.1121428 C12.8516033,23.7102376 12.8516033,24.6799409 13.4451902,25.2780357 L13.4451902,25.2780357 L19.6260786,31.5514289 C20.2196656,32.1495237 21.1820602,32.1495237 21.7756472,31.5514289 L21.7756472,31.5514289 L34.5548098,18.614464 C35.1483967,18.0163692 35.1483967,17.0466659 34.5548098,16.4485711 Z\"></path></svg>        <span>Thank you! Your payment is finished.</span>      </div>      <div class=\"").concat(t('result__failed'), "\">        <svg viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\" class=\"icon-error\"><path d=\"M24,4 C35.045695,4 44,12.954305 44,24 C44,35.045695 35.045695,44 24,44 C12.954305,44 4,35.045695 4,24 C4,12.954305 12.954305,4 24,4 Z M32.57818,15.42182 C32.0157534,14.8593933 31.1038797,14.8593933 30.541453,15.42182 L30.541453,15.42182 L24.0006789,21.9625941 L17.458547,15.42182 C16.8961203,14.8593933 15.9842466,14.8593933 15.42182,15.42182 C14.8593933,15.9842466 14.8593933,16.8961203 15.42182,17.458547 L15.42182,17.458547 L21.9639519,23.9993211 L15.42182,30.541453 C14.8593933,31.1038797 14.8593933,32.0157534 15.42182,32.57818 C15.9842466,33.1406067 16.8961203,33.1406067 17.458547,32.57818 L17.458547,32.57818 L24.0006789,26.0360481 L30.541453,32.57818 C31.1038797,33.1406067 32.0157534,33.1406067 32.57818,32.57818 C33.1406067,32.0157534 33.1406067,31.1038797 32.57818,30.541453 L32.57818,30.541453 L26.0374059,23.9993211 L32.57818,17.458547 C33.1406067,16.8961203 33.1406067,15.9842466 32.57818,15.42182 Z\"></path></svg>        <span>Payment is invalid, please try again.</span>      </div>    </div>    <div class=\"").concat(t('step-footer'), "\">\n      <button>Pay it again</button>    </div>  </div></div>");
var TEMPLATE_MODAL = "<div class=\"".concat(t('header'), "\"><img src=\"").concat(LOGO_IMAGE_URL, "\" class=\"").concat(t('header__logo'), "\" /><i class=\"").concat(t('header__close'), "\"></i></div>").concat(TEMPLATE_DEFAULT);

var render = {
  render: function render() {
    var options = this.options,
        element = this.element;
    element.setAttribute('class', options.isModal ? "".concat(NAMESPACE, " ").concat(NAMESPACE, "-modal") : NAMESPACE);

    if (options.isModal) {
      if (options.hasMask) {
        var mask = document.createElement('div');
        mask.setAttribute('class', "".concat(NAMESPACE, "-mask"));
        element.appendChild(mask);
      }
    }

    var container = document.createElement('div');
    container.setAttribute('class', "".concat(NAMESPACE, "-container"));
    container.innerHTML = options.isModal ? TEMPLATE_MODAL : TEMPLATE_DEFAULT;
    element.appendChild(container);
    this.$quoteSelectorToggle = this.element.querySelector(".".concat(NAMESPACE, "-quote .").concat(NAMESPACE, "-selector__control"));
    this.$quoteSelectorSelected = this.element.querySelector(".".concat(NAMESPACE, "-quote .").concat(NAMESPACE, "-selector__selected"));
    this.$quoteSelectorList = this.element.querySelector(".".concat(NAMESPACE, "-quote .").concat(NAMESPACE, "-selector__list"));
    this.$quoteInput = this.element.querySelector(".".concat(NAMESPACE, "-input input"));
    this.$quoteInputUnit = this.element.querySelector(".".concat(NAMESPACE, "-input__right"));
    this.$quoteInputErr = this.element.querySelector(".".concat(NAMESPACE, "-quote .").concat(NAMESPACE, "-step-error"));
    this.$quoteBtn = this.element.querySelector(".".concat(NAMESPACE, "-quote button"));
    this.$paymentSelectorToggle = this.element.querySelector(".".concat(NAMESPACE, "-payment .").concat(NAMESPACE, "-selector__control"));
    this.$paymentSelectorSelected = this.element.querySelector(".".concat(NAMESPACE, "-payment .").concat(NAMESPACE, "-selector__selected"));
    this.$paymentSelectorList = this.element.querySelector(".".concat(NAMESPACE, "-payment .").concat(NAMESPACE, "-selector__list"));
    this.$paymentMethods = this.element.querySelectorAll(".".concat(NAMESPACE, "-radio input"));
    this.$paymentBtn = this.element.querySelector(".".concat(NAMESPACE, "-payment button"));
    this.$paymentErr = this.element.querySelector(".".concat(NAMESPACE, "-payment .").concat(NAMESPACE, "-step-error"));
    this.$countdown = this.element.querySelector('.countdown');
    this.$payInfoBtn = this.element.querySelector(".".concat(NAMESPACE, "-info button"));
    this.$resultBtn = this.element.querySelector(".".concat(NAMESPACE, "-result button"));
    var that = this;

    if (options.isModal) {
      that.element.querySelector(".".concat(NAMESPACE, "-header__close")).onclick = function () {
        that.hide();
      };
    }

    that.$quoteSelectorList.innerHTML = this.quoteAssets.map(function (item) {
      return "<li data-id=\"".concat(item.assetId, "\" /><img src=\"").concat(item.iconUrl, "\" /><span>").concat(item.symbol, "</span></li>");
    }).join('');
    that.$paymentSelectorList.innerHTML = this.paymentAssets.map(function (item) {
      return "<li data-id=\"".concat(item.assetId, "\" /><img src=\"").concat(item.iconUrl, "\" /><span>").concat(item.symbol, "</span>").concat(item.network ? "<em>".concat(item.network, "</em>") : '');
    }).join('');

    that.$quoteSelectorToggle.onclick = function () {
      var payConfig = that.payConfig,
          payInfo = that.payInfo;
      var quoteAssetId = payConfig.quoteAssetId;
      var quoteAsset = payInfo.quoteAsset;

      if (quoteAssetId && quoteAsset && quoteAsset.assetId === quoteAssetId) {
        return;
      }

      if (that.$quoteSelectorList.classList.contains('show')) {
        that.$quoteSelectorList.classList.remove('show');
      } else {
        that.$quoteSelectorList.classList.add('show');
      }
    };

    that.$quoteSelectorList.onclick = function (e) {
      var target = e.target || e.srcElement;
      if (target === this) return;

      while (String(target.tagName).toUpperCase() !== 'LI') {
        target = target.parentNode;
      }

      that.setQuoteAsset(target.dataset.id);
      this.classList.remove('show');
    };

    that.$quoteInput.oninput = function (e) {
      if (/[0-9]/.test(e.data)) {
        that.setQuoteAmount(e.target.value);
      }

      if (e.data === null) {
        that.setQuoteAmount(e.target.value);
      }
    };

    that.$quoteBtn.onclick = function () {
      var _that$payInfo$quoteAs = that.payInfo.quoteAsset,
          maxQuoteAmount = _that$payInfo$quoteAs.maxQuoteAmount,
          minQuoteAmount = _that$payInfo$quoteAs.minQuoteAmount;
      var quoteAmount = that.payInfo.quoteAmount;
      var errMsg = '';

      if (+quoteAmount > +maxQuoteAmount || +quoteAmount < +minQuoteAmount) {
        errMsg = "<span>Out of range ".concat(minQuoteAmount, "-").concat(maxQuoteAmount, "</span>");
      }

      that.$quoteInputErr.innerHTML = errMsg;

      if (!errMsg) {
        that.renderStep(1);
      }
    };

    that.$paymentSelectorToggle.onclick = function () {
      if (that.$paymentSelectorList.classList.contains('show')) {
        that.$paymentSelectorList.classList.remove('show');
      } else {
        that.$paymentSelectorList.classList.add('show');
      }
    };

    that.$paymentSelectorList.onclick = function (e) {
      var target = e.target || e.srcElement;
      if (target === this) return;

      while (String(target.tagName).toUpperCase() !== 'LI') {
        target = target.parentNode;
      }

      that.setPaymentAsset(target.dataset.id);
      this.classList.remove('show');
    };

    that.$paymentBtn.onclick = function () {
      var _this = this;

      if (this.isSubmitting) return;
      this.isSubmitting = true;
      that.createPayment().then(function () {
        _this.isSubmitting = false;
        that.renderStep(2);
      }).catch(function (err) {
        _this.isSubmitting = false;
        that.$paymentErr.innerHTML = "<span>".concat(err.message, "</span>");
      });
    };

    [].forEach.call(that.$paymentMethods, function (el) {
      el.onclick = function () {
        that.setPaymentMethod(this.value);
      };
    });
  },
  renderStep: function renderStep(step) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    step = String(step);

    switch (step) {
      case '0':
        this.renderQuote();
        break;

      case '1':
        this.renderPayment();
        break;

      case '2':
        this.renderPayInfo();
        this.startCountdown();
        this.startPollResult();
        break;

      case '3':
        this.renderResult(options.status);
        break;
    }

    var steps = this.element.querySelectorAll(".".concat(NAMESPACE, "-step"));
    [].forEach.call(steps, function (el, index) {
      el.style.display = String(index) === step ? 'block' : 'none';
    });
  },
  renderQuote: function renderQuote() {
    var _this$payConfig = this.payConfig,
        quoteAssetId = _this$payConfig.quoteAssetId,
        quoteAmount = _this$payConfig.quoteAmount,
        paymentMethod = _this$payConfig.paymentMethod,
        paymentAssetId = _this$payConfig.paymentAssetId;
    this.setQuoteAsset(quoteAssetId);
    this.setQuoteAmount(quoteAmount);
    this.setPaymentMethod(paymentMethod || 'mixin');
    this.setPaymentAsset(paymentAssetId);
    this.$quoteInputErr.innerHTML = '';
    this.element.querySelector(".".concat(NAMESPACE, "-quote  .").concat(NAMESPACE, "-selector__icon")).style.opacity = quoteAssetId ? 0 : 1;
  },
  renderPayment: function renderPayment() {
    var _this$payInfo = this.payInfo,
        quoteAsset = _this$payInfo.quoteAsset,
        quoteAmount = _this$payInfo.quoteAmount;
    var $title = this.element.querySelector(".".concat(NAMESPACE, "-payment .").concat(NAMESPACE, "-step-title"));
    $title.innerHTML = "<img src=\"".concat(quoteAsset.iconUrl, "\" /><strong>").concat(quoteAmount, " ").concat(quoteAsset.symbol, "</strong>");
    this.$paymentErr.innerHTML = '';
  },
  renderPayInfo: function renderPayInfo() {
    var element = this.element,
        paymentInfo = this.paymentInfo,
        paymentAssets = this.paymentAssets;
    var paymentAssetId = paymentInfo.paymentAssetId,
        paymentAmount = paymentInfo.paymentAmount,
        isChain = paymentInfo.isChain,
        destination = paymentInfo.destination,
        tag = paymentInfo.tag,
        traceId = paymentInfo.traceId,
        memo = paymentInfo.memo,
        recipient = paymentInfo.recipient;
    var paymentAsset = paymentAssets.find(function (item) {
      return item.assetId === paymentAssetId;
    });
    var $qrious = element.querySelector('.qrious');
    var $title = element.querySelector(".".concat(NAMESPACE, "-info .").concat(NAMESPACE, "-step-title"));
    $qrious.innerHTML = '';
    $title.innerHTML = "<img src=\"".concat(paymentAsset.iconUrl, "\" /><strong>").concat(paymentAmount, " ").concat(paymentAsset.symbol, "</strong>");

    if (isChain) {
      var wrapperAddress = document.createElement('div');
      wrapperAddress.setAttribute('class', 'qrious-item');
      var canvasAddress = document.createElement('canvas');
      var textAddress = document.createElement('span');
      textAddress.setAttribute('data-id', 'address');
      textAddress.innerHTML = "Address: <br/><em>".concat(destination, "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"><path d=\"M18.167 10h-6.375c-.783 0-1.417.597-1.417 1.333v6c0 .737.634 1.334 1.417 1.334h6.375c.782 0 1.416-.597 1.416-1.334v-6c0-.736-.634-1.333-1.416-1.333z\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M7.542 14h-.709a1.46 1.46 0 01-1.001-.39 1.295 1.295 0 01-.415-.943v-6c0-.354.149-.693.415-.943a1.46 1.46 0 011.001-.39h6.375c.376 0 .736.14 1.002.39s.415.589.415.943v.666\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></em>"); // eslint-disable-next-line no-new

      new qrious({
        element: canvasAddress,
        value: destination,
        size: 600,
        level: 'H'
      });
      wrapperAddress.appendChild(textAddress);
      wrapperAddress.appendChild(canvasAddress);
      $qrious.appendChild(wrapperAddress);

      if (tag) {
        var wrapperMemo = document.createElement('div');
        wrapperMemo.setAttribute('class', 'qrious-item');
        var canvasMemo = document.createElement('canvas');
        var textMemo = document.createElement('span');
        textMemo.setAttribute('data-id', 'memo');
        textMemo.innerHTML = "Memo: <br/><em>".concat(tag, "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\"><path d=\"M18.167 10h-6.375c-.783 0-1.417.597-1.417 1.333v6c0 .737.634 1.334 1.417 1.334h6.375c.782 0 1.416-.597 1.416-1.334v-6c0-.736-.634-1.333-1.416-1.333z\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path d=\"M7.542 14h-.709a1.46 1.46 0 01-1.001-.39 1.295 1.295 0 01-.415-.943v-6c0-.354.149-.693.415-.943a1.46 1.46 0 011.001-.39h6.375c.376 0 .736.14 1.002.39s.415.589.415.943v.666\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg></em>"); // eslint-disable-next-line no-new

        new qrious({
          element: canvasMemo,
          value: tag,
          size: 600,
          level: 'H'
        });
        wrapperMemo.appendChild(textMemo);
        wrapperMemo.appendChild(canvasMemo);
        $qrious.appendChild(wrapperMemo);
      }

      [].forEach.call($qrious.querySelectorAll('em'), function (el) {
        el.onclick = function () {
          var _this2 = this;

          clearTimeout(this.timeout);

          if (copy(this.textContent)) {
            this.classList.add('copy-success');
          }

          this.timeout = setTimeout(function () {
            _this2.classList.remove('copy-success');
          }, 2000);
        };
      });
      this.$payInfoBtn.innerText = 'Pay with any wallet';
      this.$payInfoBtn.style.display = 'none';
    } else {
      var wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'qrious-item');
      var canvas = document.createElement('canvas'); // eslint-disable-next-line no-new

      new qrious({
        element: canvas,
        value: "https://mixin.one/pay?recipient=".concat(recipient, "&asset=").concat(paymentAssetId, "&amount=").concat(paymentAmount, "&trace=").concat(traceId, "&memo=").concat(memo),
        size: 600,
        level: 'H'
      });
      wrapper.appendChild(canvas);
      $qrious.appendChild(wrapper);
      this.$payInfoBtn.innerText = 'Pay with Mixin Wallet';
      this.$payInfoBtn.style.display = IS_MIXIN ? 'block' : 'none';

      this.$payInfoBtn.onclick = function () {
        window.location.href = "https://mixin.one/pay?recipient=".concat(recipient, "&asset=").concat(paymentAssetId, "&amount=").concat(paymentAmount, "&trace=").concat(traceId, "&memo=").concat(memo);
      };
    }
  },
  renderResult: function renderResult() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';
    var element = this.element;
    var $success = element.querySelector(".".concat(NAMESPACE, "-result__success"));
    var $failed = element.querySelector(".".concat(NAMESPACE, "-result__failed"));
    var $button = element.querySelector(".".concat(NAMESPACE, "-result button"));
    var that = this;

    if (status === 'success') {
      $success.style.display = 'flex';
      $failed.style.display = 'none';
      $button.style.display = 'none';
    }

    if (status === 'failed') {
      $success.style.display = 'none';
      $failed.style.display = 'flex';
      $button.style.display = 'block';

      $button.onclick = function () {
        that.show();
      };
    }
  },
  startCountdown: function startCountdown() {
    var _this3 = this;

    clearInterval(this.countdownInterval);
    var paymentInfo = this.paymentInfo,
        element = this.element;

    var countdown = function countdown() {
      var diff = paymentInfo.expire - Math.ceil(new Date().getTime() / 1000);

      if (diff >= 0) {
        _this3.$countdown.innerHTML = "Please complete the payment within <strong>".concat(diff, "s</strong>");
      } else {
        clearInterval(_this3.countdownInterval);
        clearInterval(_this3.pollResultInterval);

        _this3.getPaymentInfo().then(function (status) {
          if (status !== 'unpaid') {
            dispatchEvent(element, EVENT_PAYMENT_SUCCESS);

            _this3.renderStep(3, {
              status: 'success'
            });
          } else {
            dispatchEvent(element, EVENT_PAYMENT_ERROR);

            _this3.renderStep(3, {
              status: 'failed'
            });
          }
        }).catch(function (err) {
          dispatchEvent(element, EVENT_PAYMENT_ERROR, err);

          _this3.renderStep(3, {
            status: 'failed'
          });
        });
      }
    };

    this.countdownInterval = setInterval(countdown, 1000);
    countdown();
  },
  startPollResult: function startPollResult() {
    var _this4 = this;

    clearInterval(this.pollResultInterval);
    this.pollResultInterval = setInterval(function () {
      _this4.getPaymentInfo().then(function (status) {
        if (status !== 'unpaid') {
          clearInterval(_this4.pollResultInterval);
          clearInterval(_this4.countdownInterval);

          _this4.renderStep(3, {
            status: 'success'
          });
        }
      }).catch(function () {});
    }, 2000);
  },
  setQuoteAsset: function setQuoteAsset(value) {
    var selected = this.quoteAssets.find(function (item) {
      return item.assetId === value;
    }) || this.quoteAssets[0];
    this.payInfo.quoteAsset = selected;
    this.$quoteSelectorSelected.innerHTML = "<img src=\"".concat(selected.iconUrl, "\" /><span>").concat(selected.symbol, "</span>");
    this.$quoteInputUnit.innerHTML = selected.symbol;
    this.$quoteInputErr.innerHTML = '';
  },
  setQuoteAmount: function setQuoteAmount(value) {
    var decimalDigit = this.payInfo.quoteAsset.decimalDigit;
    var output = String(value).replace(/[^0-9.]/g, '');

    if (output === '.') {
      output = '0.';
    }

    var len = output.length - 1;

    if (output[len - 1] === '.' && output.indexOf('.') !== len - 1) {
      output = output.slice(0, len - 2);
    }

    var outputArr = output.split('.');

    if (decimalDigit <= 0) {
      var _outputArr = _slicedToArray(outputArr, 1);

      output = _outputArr[0];
    } else if (outputArr[1] !== undefined) {
      output = "".concat(outputArr[0], ".").concat(outputArr[1].slice(0, decimalDigit));
    }

    this.payInfo.quoteAmount = output;
    this.$quoteInput.value = output;
  },
  setPaymentAsset: function setPaymentAsset(value) {
    var selected = this.paymentAssets.find(function (item) {
      return item.assetId === value;
    }) || this.paymentAssets[0];
    this.payInfo.paymentAsset = selected;
    this.$paymentSelectorSelected.innerHTML = "<img src=\"".concat(selected.iconUrl, "\" /><span>").concat(selected.symbol, "</span>").concat(selected.network ? "<em>".concat(selected.network, "</em>") : '');
  },
  setPaymentMethod: function setPaymentMethod(paymentMethod) {
    if (paymentMethod === 'mixin') {
      this.payInfo.isChain = false;
      this.$paymentMethods[0].checked = true;
      this.$paymentMethods[1].checked = false;
    }

    if (paymentMethod === 'chain') {
      this.payInfo.isChain = true;
      this.$paymentMethods[0].checked = false;
      this.$paymentMethods[1].checked = true;
    }
  }
};

var API_URL = DEFAULT.apiUrl;
var ajax = {
  get: function get(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url.startsWith('/') ? API_URL + url : url, true);

      xhr.ontimeout = function () {
        reject(new Error('Request timeout, please try it again later.'));
      };

      xhr.onerror = function (e) {
        reject(e);
      };

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            try {
              var response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            try {
              var error = JSON.parse(xhr.responseText);
              reject(error);
            } catch (e) {
              reject(new Error(xhr.responseText));
            }
          }
        }
      };

      xhr.send();
    });
  },
  post: function post(url, data) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url.startsWith('/') ? API_URL + url : url, true);
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

      xhr.ontimeout = function () {
        reject(new Error('Request timeout, please try it again later.'));
      };

      xhr.onerror = function (e) {
        reject(e);
      };

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            try {
              var response = JSON.parse(xhr.responseText);
              resolve(response);
            } catch (e) {
              resolve(xhr.responseText);
            }
          } else {
            try {
              var error = JSON.parse(xhr.responseText);
              reject(error);
            } catch (e) {
              reject(new Error(xhr.responseText));
            }
          }
        }
      };

      xhr.send(JSON.stringify(data));
    });
  }
};
var APIS = {
  getQuoteAssets: function getQuoteAssets() {
    return ajax.get('/setting/quote_assets');
  },
  getPaymentAssets: function getPaymentAssets() {
    return ajax.get('/setting/payment_assets');
  },
  getSettlementAssets: function getSettlementAssets() {
    return ajax.get('/setting/settlement_assets');
  },
  getPaymentResult: function getPaymentResult(traceId) {
    return ajax.get("/payments_result?traceId=".concat(traceId));
  },
  createPayment: function createPayment(data) {
    return ajax.post('/payments', data);
  }
};

var MixPay = /*#__PURE__*/function () {
  function MixPay() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, MixPay);

    this.options = assign({}, DEFAULT, isPlainObject(options) && options);
    this.ready = false;
    this.quoteAssets = [];
    this.paymentAssets = [];
    var container = document.createElement('div');

    if (!element || !(element instanceof HTMLElement)) {
      element = document.body;
    }

    element.appendChild(container);
    this.element = container;
    this.payConfig = copyTemplate(PAYMENT_DEFAULT, this.options);
    this.payInfo = {};
    this.paymentInfo = {};
    this.isSubmitting = false;
    this.countdownInterval = null;
    this.pollResultInterval = null;
    this.init();
  }

  _createClass(MixPay, [{
    key: "init",
    value: function init() {
      this.bind();
      this.load();
    }
  }, {
    key: "load",
    value: function load() {
      var _this = this;

      var element = this.element;
      var promises = [];

      if (!this.quoteAssets.length) {
        promises.push(MixPay.getQuoteAssets().then(function (data) {
          _this.quoteAssets = isArray(data.data) ? data.data : [];
        }));
      }

      if (!this.paymentAssets.length) {
        promises.push(MixPay.getPaymentAssets().then(function (data) {
          _this.paymentAssets = isArray(data.data) ? data.data : [];
        }));
      }

      Promise.all(promises).then(function () {
        _this.ready = true;

        _this.build();

        dispatchEvent(element, EVENT_READY);
      }).catch(function () {
        setTimeout(function () {
          _this.load();
        }, 1000);
      });
    }
  }, {
    key: "build",
    value: function build() {
      this.render();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (!this.ready) return;
      this.ready = false;
      var element = this.element;
      var parentNode = element && element.parentNode;

      if (parentNode) {
        parentNode.removeChild(element);
      }

      this.unbind();
    }
  }, {
    key: "pay",
    value: function pay() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.payConfig = copyTemplate(copyTemplate(PAYMENT_DEFAULT, this.options), isPlainObject(options) && options);

      if (this.ready) {
        this.show();
      } else {
        addListener(this.element, EVENT_READY, function () {
          _this2.show();
        }, {
          once: true
        });
      }
    }
  }, {
    key: "show",
    value: function show() {
      var element = this.element,
          payConfig = this.payConfig;
      this.renderStep(0);

      if (payConfig.quoteAssetId && payConfig.quoteAmount > 0) {
        this.renderStep(1);
      }

      if (!element.classList.contains('show')) {
        element.classList.add('show');
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      clearInterval(this.countdownInterval);
      clearInterval(this.pollResultInterval);
      dispatchEvent(this.element, EVENT_MODAL_CLOSE);
      var element = this.element;

      if (element.classList.contains('show')) {
        element.classList.remove('show');
      }
    }
  }, {
    key: "createPayment",
    value: function createPayment() {
      var _this3 = this;

      var payInfo = this.payInfo,
          payConfig = this.payConfig,
          element = this.element;
      var obj = copyTemplate(payConfig, {
        quoteAssetId: payInfo.quoteAsset.assetId,
        quoteAmount: payInfo.quoteAmount,
        paymentAssetId: payInfo.paymentAsset.assetId,
        note: payInfo.note,
        isChain: payInfo.isChain
      });

      if (!obj.traceId) {
        obj.traceId = genUuid();
      }

      if (!obj.clientId) {
        obj.clientId = genUuid();
      }

      return APIS.createPayment(obj).then(function (data) {
        var d = data.data;
        _this3.paymentInfo = {
          clientId: d.clientId,
          destination: d.destination,
          tag: d.tag,
          expire: d.expire,
          isChain: d.isChain,
          quoteAssetId: d.quoteAssetId,
          quoteAmount: d.quoteAmount,
          paymentAssetId: d.paymentAssetId,
          paymentAmount: d.paymentAmount,
          memo: d.memo,
          recipient: d.recipient,
          traceId: d.traceId
        };
        dispatchEvent(element, EVENT_PAYMENT_CREATE, _this3.paymentInfo);
      }).catch(function (err) {
        return Promise.reject(err);
      });
    }
  }, {
    key: "getPaymentInfo",
    value: function getPaymentInfo() {
      return APIS.getPaymentResult(this.paymentInfo.traceId).then(function (data) {
        var d = data.data;
        return Promise.resolve(d.status);
      }).catch(function (err) {
        return Promise.reject(err);
      });
    }
  }], [{
    key: "setDefaults",
    value: function setDefaults(options) {
      assign(DEFAULT, isPlainObject(options) && options);
    }
  }]);

  return MixPay;
}();

assign(MixPay.prototype, events, render);
assign(MixPay, APIS, {
  newUUID: function newUUID() {
    return genUuid();
  }
});

export { MixPay as default };
