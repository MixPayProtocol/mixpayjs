/*!
 * mixpayjs v2.0.2
 * https://mixpay.me
 *
 * Copyright 2022 gypsophila@mathunion.xyz
 * Released under the MIT license
 *
 * Date: 2022-07-04T06:58:01.886Z
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MixPay = factory());
})(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

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

	var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
	var WINDOW = IS_BROWSER ? window : {};
	var EVENT_READY = 'ready';
	var EVENT_MODAL_CLOSE = 'close';
	var EVENT_MODAL_SHOW = 'show';
	var EVENT_PAYMENT_CREATE = 'create';
	var EVENT_PAYMENT_SUCCESS = 'success';
	var EVENT_PAYMENT_FAILED = 'failed';
	var NAMESPACE = '--mixpay';
	var IS_MIXIN = !!(WINDOW.webkit && WINDOW.webkit.messageHandlers && WINDOW.webkit.messageHandlers.MixinContext || WINDOW.MixinContext && WINDOW.MixinContext.getContext);
	var CONFIG = {
	  API_URL: 'https://api.mixpay.me/v1'
	};
	var OPTIONS_DEFAULT = {
	  isModal: true,
	  hasMask: true,
	  fontSize: 14,
	  onReady: null,
	  onPaymentCreate: null,
	  onPaymentSuccess: null,
	  onPaymentFail: null
	};
	var PAYMENT_DEFAULT = {
	  clientId: '',
	  expireSeconds: null,
	  orderId: null,
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
	var LANG = {
	  quote: {
	    asset: 'Quote Asset',
	    amount: 'Quote Amount'
	  },
	  payment: {
	    asset: 'Payment Asset',
	    wallet: 'Payment Wallet',
	    mixin: 'Mixin Wallet',
	    chain: 'On-chain Wallet'
	  },
	  checkout: {
	    scanWithMixin: 'Scan with Mixin Messenger',
	    countdown: 'Payment amount will be refreshed after <strong>$1</strong>',
	    network: 'Network:',
	    address: 'Address:',
	    memo: 'Memo:'
	  },
	  result: {
	    checking: 'Checking',
	    checkingDesc: 'Payment information is being checked, please wait patlently.',
	    pending: 'Pending',
	    pendingDesc: 'Block confirmation takes time, please wait patiently.',
	    success: 'Success',
	    failed: 'Failed',
	    overtime: 'Overtime',
	    overtimeDesc: 'Payment overtime, please refresh and pay again.',
	    refundDesc: 'The payable amount is $1, but you paid $2, Please tap "Help" to contact customer service for a refund.'
	  },
	  error: {
	    notSupportChain: '<span>This crypto is not supported On-chain transaction.</span>',
	    codeTable: {
	      40000: 'Payment overtime.',
	      40001: 'Receipt address is invalid. Maybe repeat transfer or timeout.',
	      40020: 'Wrong asset paid.',
	      40021: 'Double payment.',
	      40022: 'Trace ID does not exist',
	      40024: 'The payable amount is $1, but you paid $2, Please tap "Help" to contact customer service for a refund.'
	    }
	  },
	  common: {
	    copied: 'Copied',
	    next: 'Next',
	    back: 'Back',
	    refresh: 'Refresh',
	    confirmed: 'I have paid',
	    help: 'Help',
	    termsOfUse: 'Terms Of Use',
	    openMixinMessenger: 'Open Mixin Messenger',
	    payAgain: 'Pay again'
	  }
	};

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

	// Unique ID creation requires a high quality random # generator. In the browser we therefore
	// require the crypto API and do not support built-in fallback to lower quality random number
	// generators (like Math.random()).
	var getRandomValues;
	var rnds8 = new Uint8Array(16);
	function rng() {
	  // lazy load so that environments that need to polyfill have a chance to do so
	  if (!getRandomValues) {
	    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
	    // find the complete implementation of crypto (msCrypto) on IE11.
	    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

	    if (!getRandomValues) {
	      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
	    }
	  }

	  return getRandomValues(rnds8);
	}

	var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

	function validate(uuid) {
	  return typeof uuid === 'string' && REGEX.test(uuid);
	}

	/**
	 * Convert array of 16 byte values to UUID string format of the form:
	 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	 */

	var byteToHex = [];

	for (var i = 0; i < 256; ++i) {
	  byteToHex.push((i + 0x100).toString(16).substr(1));
	}

	function stringify(arr) {
	  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
	  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

	  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
	  // of the following:
	  // - One or more input array values don't map to a hex octet (leading to
	  // "undefined" in the uuid)
	  // - Invalid input values for the RFC `version` or `variant` fields

	  if (!validate(uuid)) {
	    throw TypeError('Stringified UUID is invalid');
	  }

	  return uuid;
	}

	function v4(options, buf, offset) {
	  options = options || {};
	  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

	  rnds[6] = rnds[6] & 0x0f | 0x40;
	  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

	  if (buf) {
	    offset = offset || 0;

	    for (var i = 0; i < 16; ++i) {
	      buf[offset + i] = rnds[i];
	    }

	    return buf;
	  }

	  return stringify(rnds);
	}

	var hasOwnProperty = Object.prototype.hasOwnProperty;
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

	function genUuid() {
	  return v4();
	}
	function isArray(value) {
	  return Array.isArray(value);
	}
	function isFunction(value) {
	  return typeof value === 'function';
	}
	function isObject(value) {
	  return _typeof(value) === 'object' && value !== null;
	}
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
	var assign = function () {
	  if (Object.assign) return Object.assign;
	  return function (target) {
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
	}();
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
	function copy(str) {
	  if (!IS_BROWSER) return false;
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
	function query(element, selector) {
	  if (!IS_BROWSER) return null;
	  return element.querySelector(selector);
	}
	function queryAll(element, selector) {
	  if (!IS_BROWSER) return null;
	  return element.querySelectorAll(selector);
	}
	function hasClass(element, className) {
	  return element.classList.contains(className);
	}
	function toggleClass(element, className) {
	  if (hasClass(element, className)) {
	    element.classList.remove(className);
	  } else {
	    element.classList.add(className);
	  }
	}
	function forEach(arr, handler) {
	  return [].forEach.call(arr, handler);
	}
	function setStyle(element, key, value) {
	  if (element) {
	    element.style[key] = value;
	  }
	}
	function setHTML(element, htmlStr) {
	  if (element) {
	    element.innerHTML = htmlStr;
	  }
	}
	function setText(element, str) {
	  if (element) {
	    element.innerText = str;
	  }
	}
	function pureAssign(source, target) {
	  var obj = assign({}, source);
	  Object.keys(obj).forEach(function (key) {
	    if (target[key] !== undefined) {
	      obj[key] = target[key];
	    }
	  });
	  return obj;
	}
	function toFixed(num, decimal, cmd) {
	  if (!decimal && decimal !== 0) {
	    decimal = 2;
	  }

	  var func;

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

	  var rate = 1 / "1e".concat(-decimal);
	  return (func((num * rate).toFixed(10)) / rate).toFixed(decimal);
	}

	var ajax = {
	  get: function get(url) {
	    return new Promise(function (resolve, reject) {
	      var xhr = new XMLHttpRequest();
	      xhr.open('GET', url.startsWith('/') ? CONFIG.API_URL + url : url, true);
	      xhr.timeout = 20000;

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
	      xhr.open('POST', url.startsWith('/') ? CONFIG.API_URL + url : url, true);
	      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	      xhr.timeout = 20000;

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

	var APIS = /*#__PURE__*/function () {
	  function APIS() {
	    _classCallCheck(this, APIS);

	    this.isReady = false;
	    this.callbacks = [];
	    this.quoteAssets = [];
	    this.paymentAssets = [];
	    this.ready();
	  }

	  _createClass(APIS, [{
	    key: "ready",
	    value: function ready() {
	      var _this = this;

	      this.isReady = false;
	      var promises = [];

	      if (!this.quoteAssets.length) {
	        promises.push(this.getQuoteAssets().then(function (data) {
	          _this.quoteAssets = isArray(data.data) ? data.data : [];
	        }));
	      }

	      if (!this.paymentAssets.length) {
	        promises.push(this.getPaymentAssets().then(function (data) {
	          _this.paymentAssets = isArray(data.data) ? data.data : [];
	        }));
	      }

	      Promise.all(promises).then(function () {
	        _this.isReady = true;

	        for (var i = _this.callbacks.length - 1; i >= 0; i--) {
	          var callback = _this.callbacks.pop();

	          callback();
	        }
	      }).catch(function (e) {
	        console.log(e);
	        setTimeout(function () {
	          _this.ready();
	        }, 3000);
	      });
	    }
	  }, {
	    key: "addReadyCallback",
	    value: function addReadyCallback(callback) {
	      if (typeof callback !== 'function') return;
	      if (this.isReady) return callback();
	      this.callbacks.push(callback);
	    }
	  }, {
	    key: "getQuoteAssets",
	    value: function getQuoteAssets() {
	      return ajax.get('/setting/quote_assets');
	    }
	  }, {
	    key: "getPaymentAssets",
	    value: function getPaymentAssets() {
	      return ajax.get('/setting/payment_assets');
	    }
	  }, {
	    key: "getSettlementAssets",
	    value: function getSettlementAssets() {
	      return ajax.get('/setting/settlement_assets');
	    }
	  }, {
	    key: "getEstAmount",
	    value: function getEstAmount(data) {
	      var url = '/payments_estimated?';
	      Object.keys(data).forEach(function (key) {
	        url += "&".concat(key, "=").concat(encodeURIComponent(data[key]));
	      });
	      return ajax.get(url);
	    }
	  }, {
	    key: "getPaymentResult",
	    value: function getPaymentResult(clientId, traceId) {
	      return ajax.get("/payments_result?clientId=".concat(clientId, "&traceId=").concat(traceId));
	    }
	  }, {
	    key: "createPayment",
	    value: function createPayment(data) {
	      return ajax.post('/payments', data);
	    }
	  }]);

	  return APIS;
	}();

	var t$1 = function t(name) {
	  return "".concat(NAMESPACE, "-").concat(name);
	};

	var SVG_TEMPLATE = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" style=\"position:absolute;width:0;height:0;\">\n  <symbol id=\"".concat(t$1('dropdown'), "\" viewBox=\"0 0 24 24\">\n    <g transform=\"translate(10, 7)\" fill=\"currentColor\" fill-rule=\"nonzero\">\n      <path d=\"M4.40520237,5.5090561 L0.202466642,9.84599534 C-0.0472238789,10.1132757 -0.043539068,10.5375965 0.210753136,10.8002185 C0.465045341,11.0628404 0.8763269,11.0670789 1.13565329,10.80975 L5.80643471,5.99094423 C5.93036786,5.86317168 6,5.68982177 6,5.50906149 C6,5.32830121 5.93036786,5.15495131 5.80643471,5.02717876 L1.13564285,0.208362174 C0.969842975,0.0309899854 0.724125318,-0.0401838942 0.493069824,0.0222362957 C0.26201433,0.0846564856 0.0816416076,0.270939692 0.0213794845,0.509383065 C-0.0388826385,0.747826438 0.0303604565,1.00125763 0.202456194,1.17212765 L4.40520237,5.5090561 Z\" />\n    </g>\n  </symbol>\n  <symbol id=\"").concat(t$1('arrow-right'), "\" viewBox=\"0 0 16 16\">\n    <g transform=\"translate(3.2, 4)\" fill=\"currentColor\" fill-rule=\"nonzero\">\n      <path d=\"M10.2982295,3.74492096 L7.16479538,0.152861348 C7.07609585,0.0397927224 6.92950167,-0.0172240407 6.78357711,0.00458921255 C6.63765254,0.0264024658 6.51618606,0.123489761 6.46770344,0.257064796 C6.41922082,0.390639832 6.45162564,0.538927339 6.55197221,0.642686571 L9.13917859,3.61735832 L0.399672715,3.61735832 C0.17893957,3.61735832 0,3.78868818 0,4.00003427 C0,4.21138037 0.17893957,4.38271023 0.399672715,4.38271023 L9.13917859,4.38271023 L6.54929939,7.35738198 C6.44899449,7.46114893 6.4166209,7.60941633 6.46510846,7.74296703 C6.51359601,7.87651774 6.63504282,7.97358733 6.78094372,7.99540678 C6.92684462,8.01722622 7.07342252,7.96023966 7.16213505,7.8472072 L10.2982295,4.25514759 C10.4339235,4.10988469 10.4339235,3.89018385 10.2982295,3.74492096 Z\"/>\n    </g>\n  </symbol>\n  <symbol id=\"").concat(t$1('mixin-logo'), "\" viewBox=\"0 0 32 32\">\n    <g stroke=\"none\" stroke-width=\"1\" fill=\"#007AFF\" fill-rule=\"nonzero\" transform=\"translate(4, 4)\">\n      <path d=\"M20.8983819,4.03671846 L17.8265372,5.39540967 C17.6453074,5.49438718 17.5275081,5.68334423 17.5275081,5.8902972 L17.5275081,16.8048166 C17.5275081,17.0117696 17.6453074,17.2097246 17.8265372,17.2997041 L20.8983819,18.6134056 C21.0886731,18.721381 21.3242718,18.5774138 21.3242718,18.3614628 L21.3242718,4.2886612 C21.3152104,4.07271028 21.0886731,3.928743 20.8983819,4.03671846 Z M6.24595469,5.38641172 L3.09255663,4.03671846 C2.90226537,3.928743 2.66666667,4.07271028 2.66666667,4.2886612 L2.66666667,18.3704608 C2.66666667,18.5954097 2.92038835,18.730379 3.11067961,18.6134056 L6.28220065,17.0477614 C6.44530744,16.9397859 6.55404531,16.7598268 6.55404531,16.5708698 L6.55404531,5.88129924 C6.54498382,5.67434628 6.43624595,5.48538922 6.24595469,5.38641172 Z M15.5067961,9.12056305 L12.3624595,7.27598227 C12.1902913,7.17700476 11.963754,7.17700476 11.7915858,7.27598227 L8.57475728,9.06657532 C8.402589,9.16555282 8.28478964,9.35450988 8.28478964,9.56146284 L8.28478964,13.2596223 C8.28478964,13.4665753 8.39352751,13.6555324 8.57475728,13.7545099 L11.8006472,15.6440804 C11.9728155,15.7430579 12.1993528,15.7430579 12.371521,15.6440804 L15.5158576,13.8084976 C15.6880259,13.7095201 15.8058252,13.520563 15.8058252,13.3136101 L15.8058252,9.61545057 C15.7967638,9.41749556 15.6880259,9.22853851 15.5067961,9.12056305 Z\" />\n    </g>\n  </symbol>\n  <symbol id=\"").concat(t$1('chain-logo'), "\" viewBox=\"0 0 32 32\">\n    <g transform=\"translate(10, 9)\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"nonzero\">\n    <path d=\"M5.45584747,11.2107815 C5.13805736,11.2111534 4.8589697,10.9918836 4.77331364,10.6745369 C4.68765758,10.3571903 4.81642557,10.0195417 5.0882273,9.84878722 L7.75754417,8.17122868 C7.91809115,8.07027319 8.11074421,8.03961062 8.2930982,8.08599015 C8.47545218,8.13236967 8.63256035,8.25198977 8.72984139,8.41852068 C8.93245828,8.76523411 8.82569467,9.21662723 8.49136865,9.42677573 L5.82205176,11.1043343 C5.71174024,11.1739606 5.58508746,11.2107815 5.4559486,11.2107815\" fill=\"#FFA527\"/>\n    <path d=\"M2.22210467,9.31047088 C1.88697783,9.31047088 1.61530384,9.02874975 1.61530384,8.68122913 L1.61530384,5.32317558 C1.61530384,4.97565496 1.88697783,4.69393383 2.22210467,4.69393383 C2.55723152,4.69393383 2.8289055,4.97565496 2.8289055,5.32317558 L2.8289055,8.68122913 C2.8289055,9.02874975 2.55723152,9.31047088 2.22210467,9.31047088\" fill=\"#164AFF\"/>\n    <path d=\"M8.33946617,5.90113465 C8.22383016,5.90113465 8.10997657,5.87157857 8.00795066,5.81513776 L5.07963094,4.20165701 C4.73437927,4.01141258 4.60317255,3.56699057 4.78654614,3.20892326 C4.97008012,2.85099066 5.39859916,2.71499549 5.74387559,2.90510435 L8.67219529,4.51858511 C8.95949687,4.67671966 9.10591799,5.01751976 9.02715935,5.34477598 C8.94840072,5.67203219 8.6647303,5.90152749 8.33946617,5.90113465\" fill=\"#62D37E\"/>\n    <path d=\"M3.04917422,1.46823078 C2.14858063,1.46823078 1.41586862,2.22804021 1.41586862,3.16193987 C1.41586862,4.09604926 2.14858063,4.85585869 3.04917422,4.85585869 C3.94986893,4.85585869 4.68258094,4.09604926 4.68258094,3.16204474 C4.68258094,2.22804021 3.94986893,1.46823078 3.04927534,1.46823078 M3.04927534,6.32408947 C1.36772909,6.32408947 0,4.90556879 0,3.16193987 C0,1.41841582 1.36772909,0 3.04917422,0 C4.7305182,0 6.09834841,1.41841582 6.09834841,3.16193987 C6.09834841,4.90556879 4.7305182,6.32408947 3.04917422,6.32408947\" fill=\"#164AFF\"/>\n    <path d=\"M3.13958754,9.14403644 C2.23889283,9.14403644 1.50618082,9.90384587 1.50618082,10.8378504 C1.50618082,11.7719598 2.23889283,12.5317692 3.13948641,12.5317692 C4.04028225,12.5317692 4.77299426,11.7719598 4.77299426,10.8378504 C4.77299426,9.90384587 4.04028225,9.14414132 3.13958754,9.14414131 M3.13958754,14 C1.45814243,14 0.0903121962,12.5814793 0.0903121962,10.8378504 C0.0903121962,9.09432634 1.45814241,7.67591053 3.13948641,7.67591053 C4.82103267,7.67591053 6.18886288,9.09432633 6.18886288,10.8378504 C6.18886288,12.5814793 4.82103267,14 3.13958754,14\" fill=\"#FFA527\"/>\n    <path d=\"M9.95072466,5.2351866 C9.05002995,5.2351866 8.31731795,5.9951009 8.31731795,6.92889569 C8.31731795,7.86300508 9.05002996,8.62281451 9.95062353,8.62281451 C10.8514194,8.62281451 11.5841314,7.86300508 11.5841314,6.92900056 C11.5841314,5.99510091 10.8514194,5.2351866 9.95072466,5.2351866 M9.95072466,10.0911502 C8.26927955,10.0911502 6.90144933,8.67262948 6.90144933,6.92900056 C6.90144933,5.1854765 8.26927955,3.76695582 9.95062353,3.76695582 C11.6321698,3.76695582 13,5.1854765 13,6.92889569 C13,8.67262949 11.6321698,10.0911502 9.95072466,10.0911502\" fill=\"#62D37E\"/></g>\n  </symbol>\n  <symbol id=\"").concat(t$1('status-success'), "\" viewBox=\"0 0 68 68\">\n    <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"nonzero\">\n      <circle  fill=\"currentColor\" cx=\"34\" cy=\"34\" r=\"34\" />\n      <path transform=\"translate(20.255319, 25.319149)\" fill=\"#FFFFFF\" d=\"M11.5146349,15.2816164 L26.2568801,0.340112637 C26.7043161,-0.113370896 27.4297531,-0.113370877 27.877189,0.340112679 C28.3246249,0.793596235 28.3246249,1.52883834 27.877189,1.98232192 L12.3247894,17.7449303 C12.1099427,17.9627383 11.8185141,18.0851064 11.5146349,18.0851064 C11.2107558,18.0851064 10.9193272,17.9627383 10.7044805,17.7449303 L0.335603095,7.23590548 C0.0461627628,6.94255305 -0.0668765612,6.51498255 0.0390659437,6.11425566 C0.145008449,5.71352877 0.453837595,5.40052544 0.849220427,5.293151 C1.24460326,5.18577656 1.66647171,5.30034374 1.95591202,5.59369619 L11.5146349,15.2816164 Z\"/>\n    </g>\n  </symbol>\n  <symbol id=\"").concat(t$1('status-pending'), "\" viewBox=\"0 0 68 68\">\n    <g stroke=\"none\" stroke-width=\"1\" fill-rule=\"nonzero\">\n      <circle fill=\"currentColor\" cx=\"34\" cy=\"34\" r=\"34\" />\n      <path transform=\"translate(22, 24)\" stroke=\"#FFFFFF\" fill=\"#FFFFFF\" d=\"M23.8812991,12.6785217 L22.3149952,10.3557391 C22.1350787,10.0959635 21.8141821,9.98254896 21.5167314,10.0736087 C21.2216465,10.1577093 21.0161949,10.4320028 21.0127051,10.7465217 C21.0127051,15.6258261 16.9973847,19.5948261 12.0602386,19.5948261 C9.2218684,19.5948261 6.52039428,18.2416957 4.83941778,15.9773478 C4.59961008,15.6641033 4.16327204,15.5979599 3.84558821,15.8266957 C3.69354767,15.9322847 3.59091033,16.0978715 3.5621044,16.2840457 C3.53329847,16.4702199 3.58090026,16.6603305 3.6935803,16.8091304 C5.64212629,19.4332174 8.77117826,21 12.0602386,21 C17.0809447,21 21.2802746,17.4573913 22.2305464,12.767087 L22.6981263,13.4591739 C22.8047101,13.6158371 22.9668303,13.723352 23.1497054,13.7586522 C23.3346039,13.7951739 23.5266139,13.7586522 23.6830665,13.6545652 C23.8389918,13.5550509 23.9484251,13.3942782 23.9858794,13.2096909 C24.0233336,13.0251037 23.9855395,12.8328149 23.8812991,12.6776087 L23.8812991,12.6785217 Z M11.7766682,1.40517392 C14.7368225,1.40517392 17.4942996,2.86513045 19.1539416,5.31117392 C19.3781202,5.63395832 19.8102418,5.71773228 20.1335482,5.50108695 C20.2876585,5.40023006 20.3950668,5.2391903 20.4309686,5.05515774 C20.4668704,4.87112518 20.4281611,4.68001315 20.3237803,4.52595652 C18.4027913,1.6927826 15.2070692,0 11.7775572,0 C6.84574458,0 2.71308474,3.46317392 1.70592115,8.07495652 L1.31301178,7.413 C1.10756684,7.07730509 0.680928088,6.96775275 0.345850263,7.16465217 C0.186220494,7.25584087 0.0695393668,7.40976331 0.0226006025,7.59107397 C-0.0243381618,7.77238462 0.00249863341,7.96550445 0.0969484012,8.12608695 L1.56991406,10.6095652 C1.73617351,10.8857564 2.05982657,11.0162745 2.36462215,10.9300435 C2.66695601,10.8514331 2.88000033,10.5737837 2.8837603,10.2534783 C2.8837603,5.37508695 6.87241262,1.40426085 11.7766682,1.40426087 L11.7766682,1.40517392 Z\" />\n    </g>\n  </symbol>\n  <symbol id=\"").concat(t$1('status-failed'), "\" viewBox=\"0 0 68 68\">\n    <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"nonzero\">\n      <circle fill=\"currentColor\" cx=\"34\" cy=\"34\" r=\"34\" />\n      <path transform=\"translate(25, 26)\" fill=\"#fff\" d=\"M10.7497315,8.99927446 L17.6403867,2.11065458 C18.1198711,1.63131178 18.1198711,0.838849896 17.6403867,0.359507098 C17.1609023,-0.119835699 16.3682062,-0.119835699 15.8887218,0.359507098 L8.9980666,7.24812698 L2.10741139,0.363372766 C1.62792696,-0.115970032 0.839097744,-0.115970032 0.359613319,0.359507098 C-0.119871106,0.838849896 -0.119871106,1.63131178 0.359613319,2.11065458 L7.25026853,8.99927446 L0.359613319,15.8878943 C-0.119871106,16.3672371 -0.119871106,17.1558334 0.359613319,17.6390418 C0.839097744,18.1222503 1.63179377,18.1183846 2.1112782,17.6390418 L8.9980666,10.7465563 L15.8887218,17.6351762 C16.3682062,18.114519 17.1609023,18.114519 17.6403867,17.6351762 C18.1198711,17.1558334 18.1198711,16.3633715 17.6403867,15.8840287 L10.7497315,8.99927446 Z\" />\n    </g>\n  </symbol>\n  <symbol id=\"").concat(t$1('copy'), "\" viewBox=\"0 0 20 20\">\n    <g transform=\"translate(4, 4)\" stroke=\"none\" stroke-width=\"1\" fill=\"currentColor\" fill-rule=\"nonzero\">\n      <path d=\"M10.1096996,9.25294899 C9.75782624,9.25294899 9.47257652,8.96921363 9.47257652,8.61920833 C9.47257652,8.26920302 9.75782624,7.98546766 10.1096996,7.98546766 C10.449937,7.98546766 10.7257538,7.71111509 10.7257538,7.37268403 L10.7257538,1.88026496 C10.7257538,1.5418339 10.449937,1.26748133 10.1096996,1.26748133 L4.58796616,1.26748133 C4.24772881,1.26748133 3.97191195,1.5418339 3.97191195,1.88026496 C3.97191195,2.23027026 3.68666223,2.51400562 3.33478886,2.51400562 C2.98291549,2.51400562 2.69766577,2.23027026 2.69766577,1.88026496 C2.69998309,0.842779565 3.54494345,0.00230501939 4.58796616,0 L10.1096996,0 C11.1527223,0.00230501939 11.9976827,0.842779565 12,1.88026496 L12,7.37268403 C11.9976827,8.41016942 11.1527223,9.25064397 10.1096996,9.25294899 L10.1096996,9.25294899 Z\" /><path d=\"M7.28478347,11.9999984 L1.99649326,11.9999984 C1.46678609,12.0006653 0.958581084,11.7916531 0.584021248,11.4190817 C0.209461413,11.0465104 -0.000666381253,10.5410034 2.8382467e-06,10.0141084 L2.8382467e-06,4.73293622 C-0.000890512228,4.20589607 0.209138329,3.70017341 0.583722514,3.32742058 C0.958306698,2.95466775 1.46663984,2.74554052 1.99649326,2.74620794 L7.28478347,2.74620794 C7.81449065,2.74554103 8.32269565,2.95455328 8.69725549,3.32712461 C9.07181532,3.69969594 9.28194312,4.20520293 9.28127104,4.73209794 L9.28127104,10.0132701 C9.30233993,11.1122569 8.38963582,11.9999984 7.28478347,11.9999984 Z M1.99649326,4.01366647 C1.8044605,4.01211123 1.61983144,4.08729297 1.48403913,4.22236437 C1.34824681,4.35743578 1.27266381,4.54108466 1.27422735,4.73209794 L1.27422735,10.0132701 C1.27266381,10.2042834 1.34824681,10.3879323 1.48403913,10.5230037 C1.61983144,10.6580751 1.8044605,10.7332568 1.99649326,10.7317016 L7.28478347,10.7317016 C7.47681623,10.7332568 7.6614453,10.6580751 7.79723761,10.5230037 C7.93302992,10.3879323 8.00861293,10.2042834 8.00704939,10.0132701 L8.00704939,4.73209794 C8.00861293,4.54108466 7.93302992,4.35743578 7.79723761,4.22236437 C7.6614453,4.08729297 7.47681623,4.01211123 7.28478347,4.01366647 L1.99649326,4.01366647 Z\" />\n    </g>\n  </symbol>\n</svg>");
	var TEMPLATE = "\n<div class=\"".concat(t$1('header'), "\">\n  <div class=\"").concat(t$1('header__title'), "\">\n    <svg class=\"").concat(t$1('header__title-icon'), "\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      viewBox=\"0 0 104 29\">\n      <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"nonzero\">\n        <g fill=\"#164aff\">\n          <path d=\"M1.22762799,2.27470289 C0.478910149,2.55597394 -0.0110200719,3.26346228 0,4.04719864 L0,4.04719864 L0,15.881562 C0,22.120747 9.04978437,27.3535484 12.0931897,28.803056 L12.0931897,28.803056 C12.3553209,28.9277353 12.642163,28.9949504 12.9336533,29 L12.9336533,29 C13.2252015,28.9953969 13.5121413,28.9281589 13.7741169,28.803056 L13.7741169,28.803056 C16.8134912,27.3535484 25.8671183,22.120747 25.8671183,15.881562 L25.8671183,15.881562 L25.8671183,8.36027165 L11.1539666,19.1705263 C10.7230567,19.4864235 10.1738854,19.6058907 9.64652556,19.4984563 C9.11916572,19.391022 8.66460252,19.0670728 8.3987778,18.609236 L8.3987778,18.609236 L3.9646773,11.9308659 C3.84248658,11.7276391 3.87740658,11.4692473 4.04939678,11.3039808 C4.22138699,11.1387144 4.48637009,11.1089275 4.69227288,11.2317148 L4.69227288,11.2317148 L9.17272988,14.2410187 L9.26342739,14.2902547 C9.68814332,14.5050461 10.1931276,14.5050461 10.6178435,14.2902547 L10.6178435,14.2902547 L25.8854354,6.49127334 L25.8854354,4.04129032 C25.8961507,3.25705652 25.4053141,2.54942134 24.6558026,2.26879457 L24.6558026,2.26879457 C20.9069722,0.821256367 17.3536453,0 12.9659013,0 L12.9659013,0 C8.57009531,0 5.01676842,0.821256367 1.276,2.26879457 L1.22762799,2.27470289 Z\"/>\n          <path d=\"M70.8651763,25.3132088 L69.8009922,21.2167742 L70.3733942,21.2167742 L70.8712228,23.2886248 C70.9961838,23.8065874 71.1070363,24.310764 71.1816098,24.7066214 L71.1957183,24.7066214 C71.2622298,24.2989474 71.3972683,23.8124958 71.5363379,23.2827165 L72.0966469,21.2167742 L72.6630025,21.2167742 L73.172924,23.2945331 C73.2918386,23.786893 73.4026911,24.2674363 73.4651716,24.6987436 L73.4772646,24.6987436 C73.5659466,24.2497114 73.6788146,23.7947708 73.8138531,23.2827165 L74.3721467,21.2167742 L74.9264092,21.2167742 L73.7372641,25.3132088 L73.1628465,25.3132088 L72.6347855,23.1862139 C72.5189044,22.7436057 72.4274036,22.2952423 72.3606775,21.843056 L72.3566465,21.843056 C72.2764047,22.2948377 72.1680383,22.7414167 72.0321509,23.1803056 L71.4275009,25.3132088 L70.8651763,25.3132088 Z\"/>\n          <path d=\"M75.8495083,23.9405093 C75.8616013,24.6573854 76.3291974,24.9547708 76.8774135,24.9547708 C77.1628665,24.9639925 77.446941,24.9122398 77.7098151,24.8031239 L77.8105901,25.1871647 C77.4917476,25.317668 77.1484469,25.3814045 76.80284,25.3742615 C75.8817564,25.3742615 75.3214473,24.7834295 75.3214473,23.8912733 C75.3214473,22.9991171 75.8616013,22.3039049 76.7322974,22.3039049 C77.7138461,22.3039049 77.9698146,23.1487946 77.9698146,23.6825127 C77.9717394,23.7662554 77.9656666,23.849991 77.9516751,23.9326316 L75.8495083,23.9405093 Z M77.4498155,23.5564686 C77.4498155,23.2157555 77.306715,22.6879457 76.6960184,22.6879457 C76.1357094,22.6879457 75.8998959,23.1862139 75.8555548,23.5564686 L77.4498155,23.5564686 Z\"/>\n          <path d=\"M78.9735337,21.0021053 L79.5217498,21.0021053 L79.5217498,22.8435314 L79.5338428,22.8435314 C79.746777,22.4909623 80.143485,22.2842199 80.5617479,22.3078438 C81.307483,22.3078438 81.8294975,22.9164007 81.8294975,23.804618 C81.8294975,24.8622071 81.1462429,25.3801698 80.4730659,25.3801698 C80.055667,25.4025864 79.6627406,25.1868083 79.4653158,24.8267572 L79.4532228,24.8267572 L79.4229902,25.3132088 L78.9493477,25.3132088 C78.9674872,25.1162649 78.9735337,24.8149406 78.9735337,24.5530051 L78.9735337,21.0021053 Z M79.5217339,24.1374533 C79.5213803,24.2035153 79.5274542,24.2694614 79.5398893,24.3343973 C79.6362045,24.7016899 79.9741904,24.9590999 80.3622134,24.9606791 C80.9406619,24.9606791 81.2772505,24.5057385 81.2772505,23.8302207 C81.2772505,23.2393888 80.9648479,22.7293039 80.3803529,22.7293039 C79.9829332,22.7380825 79.6420591,23.0087639 79.5519823,23.3870968 C79.5318288,23.4603077 79.5216633,23.5357997 79.5217339,23.6116129 L79.5217339,24.1374533 Z\"/>\n          <path d=\"M82.7888756,24.7066214 C83.0625179,24.8591246 83.3708223,24.9423939 83.6857732,24.9488625 C84.3811208,24.9488625 84.6048413,24.5175552 84.5987948,24.1827504 C84.5987948,23.6293379 84.0828268,23.3949745 83.5547657,23.3949745 L83.2504252,23.3949745 L83.2504252,23.0010866 L83.5547657,23.0010866 C83.9578658,23.0010866 84.4556943,22.8041426 84.4556943,22.3334465 C84.4556943,22.0163667 84.2541443,21.7426146 83.7462382,21.7426146 C83.457138,21.7513672 83.1769419,21.8424032 82.9400381,22.0045501 L82.7908911,21.6106621 C83.10853,21.4119704 83.4779273,21.3066917 83.8550752,21.3073652 C84.6511978,21.3073652 85.0119724,21.7682173 85.0119724,22.2487606 C85.0119724,22.662343 84.7580193,23.0089643 84.2662373,23.1862139 L84.2662373,23.1980306 C84.7826719,23.2661216 85.1678063,23.6971785 85.1671667,24.2063837 C85.1671667,24.8385739 84.6572443,25.3880475 83.6938352,25.3880475 C83.3248703,25.392834 82.9614127,25.3003041 82.6417441,25.1202037 L82.7888756,24.7066214 Z\"/>\n        </g>\n        <g fill=\"#1e1e22\">\n          <path d=\"M49.6883154,17.3724278 L50.8089335,17.3724278 L49.6883154,2.01079796 L48.3258373,2.01079796 L44.3734413,11.1962649 C43.4946832,13.234635 42.8577852,14.7786757 42.4405766,16.0666893 L42.3962356,16.0666893 C41.9346861,14.672326 41.3199585,13.0849576 40.5298824,11.174601 L36.7306645,2.00685908 L35.4125273,2.00685908 L34.1609017,17.368489 L35.2815198,17.368489 L35.8519064,10.3513752 C36.0715959,7.81867572 36.1824484,5.03388795 36.2550064,3.24760611 L36.2993474,3.24760611 C36.805238,4.87830221 37.5288026,6.7020034 38.5163977,9.1066893 L41.922593,17.3724278 L42.7791806,17.3724278 L46.4151431,8.98852292 C47.4228932,6.6724618 48.1504887,4.89011885 48.7652163,3.23775891 L48.8095573,3.23775891 C48.8095573,4.86845501 49.0292468,7.8521562 49.1824249,10.130798 L49.6883154,17.3724278 Z\"/>\n          <path d=\"M55.5292351,17.3724278 L55.5292351,6.42825127 L54.3884619,6.42825127 L54.3884619,17.3724278 L55.5292351,17.3724278 Z M54.9588485,4.17718166 C55.5154135,4.18316395 55.9715616,3.74713947 55.9776838,3.20329372 C55.9838061,2.65944797 55.537584,2.21372425 54.981019,2.20774194 C54.4410494,2.22992175 54.0151175,2.66436639 54.015594,3.1924618 C54.015594,3.70845501 54.3884619,4.17718166 54.9145075,4.17718166 L54.9588485,4.17718166 Z\"/>\n          <path d=\"M58.0989979,6.42825127 L62.3819358,11.7457385 L57.8450448,17.350764 L59.183337,17.350764 L61.3802322,14.5620374 C61.9949598,13.7880475 62.4786799,13.1834295 62.9402294,12.4803396 L62.9825549,12.4803396 C63.4884455,13.1440407 63.990305,13.8313752 64.5647226,14.5620374 L66.8039433,17.350764 L68.144251,17.350764 L63.611391,11.7457385 L67.922546,6.44991511 L66.6487498,6.44991511 L64.4679786,9.13229202 C63.9641035,9.77629881 63.4803835,10.3336503 63.0188339,10.977657 L62.9744929,10.977657 C62.5129434,10.3336503 62.0957348,9.79599321 61.5475187,9.13229202 L59.417135,6.42825127 L58.0989979,6.42825127 Z\"/>\n          <path d=\"M70.6172698,17.3724278 L71.7519964,17.3724278 L71.7519964,10.8279796 C72.411065,11.0406791 73.1789705,11.062343 73.9912171,11.062343 C76.0792754,11.062343 77.8791171,10.4833277 78.9332237,9.38831919 C79.7232998,8.61629881 80.1425238,7.564618 80.1425238,6.21358234 C80.1762872,5.09074364 79.7214707,4.00652444 78.8908982,3.22988115 C77.9476441,2.37120543 76.4319879,1.85117778 74.3459452,1.85117778 C73.0946128,1.84763706 71.8452219,1.94778138 70.6112233,2.15062818 L70.6172698,17.3724278 Z M71.7519964,3.01521222 C72.6002522,2.86842141 73.4603135,2.79657493 74.3217592,2.80054329 C76.8693515,2.80054329 79.0219057,3.70254669 79.0219057,6.36325976 C79.0219057,8.72658744 77.2643895,10.1189813 74.1464107,10.1189813 C73.2676526,10.1189813 72.411065,10.0539898 71.7741669,9.83932088 L71.7741669,3.01521222 L71.7519964,3.01521222 Z\"/>\n          <path d=\"M91.0866901,10.7610187 C91.0866901,9.0220034 90.6694815,6.14658524 86.8541396,6.14658524 C85.5460054,6.14240197 84.2644857,6.5076081 83.1637587,7.19830221 L83.5366262,7.9860781 C84.4933852,7.37368066 85.6179911,7.0598059 86.7614266,7.08604414 C89.7483979,7.06438031 89.9459169,9.53208829 89.9459169,10.3474363 L89.9459169,10.6054329 C84.7197248,10.5404414 82.3474811,12.1494737 82.3474811,14.6388455 C82.3474811,15.9701868 83.3794172,17.6442105 85.9270095,17.6442105 C87.5236295,17.6671357 89.0346812,16.9405944 89.9902579,15.6905263 L90.0345989,15.6905263 L90.236149,17.3862139 L91.2902556,17.3862139 C91.1580375,16.5124305 91.0906784,15.6304458 91.0887056,14.7471647 L91.0866901,10.7610187 Z M89.9439014,13.8727334 C89.9361353,14.0929097 89.8918922,14.3103997 89.8128939,14.5167402 C89.3735149,15.5014601 88.2004937,16.7481154 86.0358465,16.7481154 C84.7177093,16.7481154 83.5749207,15.9977589 83.5749207,14.4517487 C83.5749207,11.9190492 86.9791006,11.4680475 89.9439014,11.5547029 L89.9439014,13.8727334 Z\"/>\n          <path d=\"M93.1727328,6.42825127 L97.8285383,16.6004075 C97.9078574,16.7548304 97.9596586,16.9213348 97.9817163,17.0927674 C97.9654285,17.2425326 97.9210168,17.3880789 97.8507088,17.5221053 C97.1472992,19.0681154 96.2907116,19.9898132 95.6981546,20.4624788 C95.0951258,20.9581401 94.3918495,21.3238884 93.6342823,21.5358234 L93.9406384,22.4791851 C94.6890512,22.2874511 95.3911899,21.9527718 96.0065261,21.4944652 C97.5000118,20.4427844 98.5097774,18.7372496 100.037527,15.2710357 L104,6.42825127 L102.770545,6.42825127 L99.6303955,13.660034 C99.2555125,14.5403735 98.9491564,15.3773854 98.6851259,16.0627504 L98.6407849,16.0627504 C98.4210954,15.3773854 98.0482278,14.475382 97.7398563,13.7663837 L94.4021879,6.44991511 L93.1727328,6.44991511 L93.1727328,6.42825127 Z\"/>\n        </g>\n        <g fill=\"#9D9D9D\">\n          <path d=\"M33.9432277,21.2719185 C34.285624,21.2109149 34.6331859,21.1818989 34.9812103,21.1852632 C35.5173333,21.1852632 35.9083404,21.3073684 36.1582624,21.5259762 C36.4042099,21.7424316 36.5405244,22.0534699 36.5311299,22.3767742 C36.5487942,22.7008671 36.4292629,23.0177929 36.2005879,23.2531749 C35.8536347,23.5670594 35.3907454,23.7292085 34.9187298,23.7022071 C34.7727058,23.7066239 34.6266434,23.6947302 34.4833817,23.6667572 L34.4833817,25.3132088 L33.9432277,25.3132088 L33.9432277,21.2719185 Z M34.4833817,23.2413582 C34.6302853,23.2726678 34.7805167,23.2865541 34.9308228,23.2827165 C35.5858603,23.2827165 35.9829139,22.9735144 35.9829139,22.4141935 C35.9829139,21.8548727 35.5919068,21.6106621 34.9933033,21.6106621 C34.8222126,21.606633 34.6511927,21.6211644 34.4833817,21.6539898 L34.4833817,23.2413582 Z\"/>\n          <path d=\"M39.5039928,24.6081494 C39.5009044,24.8439174 39.5157254,25.0795843 39.5483338,25.3132088 L39.0565517,25.3132088 L39.0061642,24.9429542 L38.9880247,24.9429542 C38.7715167,25.2257798 38.428293,25.3886997 38.0669411,25.3801698 C37.8273989,25.3978616 37.5912622,25.3164524 37.4161163,25.155795 C37.2409704,24.9951376 37.1429133,24.7699981 37.1458575,24.5352801 C37.1458575,23.8243124 37.7928331,23.4343633 38.9598077,23.4422411 L38.9598077,23.3811885 C38.9598077,23.1369779 38.8912807,22.693854 38.2765531,22.6997623 C37.9971481,22.6967854 37.7228046,22.7726941 37.4864771,22.9183701 L37.361516,22.5599321 C37.6639929,22.3891078 38.0078262,22.3006932 38.3571732,22.3039049 C39.2843033,22.3039049 39.5080238,22.9183701 39.5080238,23.509202 L39.5039928,24.6081494 Z M38.9678697,23.8203735 C38.3632197,23.8085569 37.6940736,23.9109677 37.6940736,24.4821053 C37.6807392,24.6190477 37.7296405,24.7548011 37.8278182,24.8533894 C37.925996,24.9519778 38.0635382,25.0034479 38.2039951,24.9941596 C38.533625,25.0037681 38.83216,24.8050539 38.9436837,24.5017997 C38.9606007,24.4462169 38.9687562,24.3884407 38.9678697,24.3304584 L38.9678697,23.8203735 Z\"/>\n          <path d=\"M40.8563934,22.3807131 L41.5094155,24.1197284 C41.583989,24.3166723 41.6585625,24.5451273 41.7109655,24.7223769 L41.721043,24.7223769 C41.777477,24.5451273 41.8399575,24.328489 41.922593,24.1079117 L42.5272431,22.3807131 L43.1056917,22.3807131 L42.2853831,24.4781664 C41.882283,25.488489 41.6263145,25.9985739 41.2514315,26.321562 C41.060208,26.4875245 40.8294523,26.6039898 40.5802699,26.6603056 L40.4432159,26.2171817 C40.61697,26.1573209 40.7771523,26.0650133 40.9148429,25.945399 C41.1112288,25.7844365 41.2682464,25.5825559 41.374377,25.3545671 C41.3970695,25.3149154 41.4121002,25.2715215 41.418718,25.2265535 C41.4138826,25.1774702 41.398791,25.1298786 41.374377,25.0867233 L40.2598054,22.3807131 L40.8563934,22.3807131 Z\"/>\n          <path d=\"M43.9058453,23.168489 C43.9058453,22.8573175 43.8937523,22.6150764 43.8816593,22.3708659 L44.3593328,22.3708659 L44.3855343,22.8455008 L44.4036738,22.8455008 C44.5889583,22.5023059 44.9580737,22.292164 45.3549899,22.3039049 C45.7379561,22.3020834 46.0790582,22.5401597 46.2015,22.8947368 L46.213593,22.8947368 C46.2966532,22.7403392 46.4136646,22.6058247 46.5562281,22.5008489 C46.745403,22.361554 46.9787473,22.2918257 47.2152966,22.3039049 C47.6183967,22.3039049 48.2109538,22.5599321 48.2109538,23.5801019 L48.2109538,25.3132088 L47.6768462,25.3132088 L47.6768462,23.6470628 C47.6768462,23.0759253 47.4591722,22.74309 47.0238241,22.74309 C46.7254457,22.7543003 46.4653616,22.9449056 46.370802,23.2216638 C46.3425516,23.3083121 46.3276087,23.3985753 46.326461,23.4895076 L46.326461,25.3132088 L45.790338,25.3132088 L45.790338,23.5407131 C45.790338,23.0719864 45.5787105,22.7391511 45.1635174,22.7391511 C44.8441293,22.7581574 44.5718249,22.972128 44.4842938,23.2728693 C44.4545894,23.3570837 44.4402629,23.4457442 44.4419683,23.5348048 L44.4419683,25.3073005 L43.9058453,25.3073005 L43.9058453,23.168489 Z\"/>\n          <path d=\"M49.7245944,23.9405093 C49.7366874,24.6573854 50.2042835,24.9547708 50.750484,24.9547708 C51.0366023,24.9641535 51.3213685,24.9124001 51.5849011,24.8031239 L51.6836606,25.1871647 C51.3649577,25.3181206 51.0215576,25.3818756 50.6759105,25.3742615 C49.7568424,25.3742615 49.1965334,24.7834295 49.1965334,23.8912733 C49.1965334,22.9991171 49.7366874,22.3039049 50.6073835,22.3039049 C51.5889321,22.3039049 51.8449007,23.1487946 51.8449007,23.6825127 C51.8468255,23.7662554 51.8407527,23.849991 51.8267612,23.9326316 L49.7245944,23.9405093 Z M51.3228861,23.5564686 C51.3228861,23.2157555 51.1797856,22.6879457 50.5711045,22.6879457 C50.0107955,22.6879457 49.7649044,23.1862139 49.7306409,23.5564686 L51.3228861,23.5564686 Z\"/>\n          <path d=\"M52.8486198,23.168489 C52.8486198,22.8573175 52.8486198,22.6150764 52.8244338,22.3708659 L53.3101693,22.3708659 L53.3404018,22.8514092 L53.3524948,22.8514092 C53.5561428,22.5039344 53.9384993,22.2936795 54.3481519,22.3039049 C54.7653605,22.3039049 55.4123361,22.5481154 55.4123361,23.5564686 L55.4123361,25.3132088 L54.86412,25.3132088 L54.86412,23.6175212 C54.86412,23.1428862 54.6847405,22.74309 54.1687724,22.74309 C53.82921,22.7519868 53.5332559,22.9714548 53.4331148,23.2886248 C53.4079561,23.3696841 53.3957197,23.4540454 53.3968358,23.5387436 L53.3968358,25.3112394 L52.8486198,25.3112394 L52.8486198,23.168489 Z\"/>\n          <path d=\"M57.2545033,21.6658065 L57.2545033,22.3807131 L58.0465949,22.3807131 L58.0465949,22.774601 L57.2625653,22.774601 L57.2625653,24.3501528 C57.2625653,24.7144992 57.3693868,24.9212903 57.6656653,24.9212903 C57.7725307,24.9258898 57.8794413,24.9132473 57.9820988,24.883871 L58.0083004,25.291545 C57.8516962,25.3421988 57.6875071,25.3668302 57.5225648,25.3644143 C57.3020319,25.3748488 57.0873484,25.293229 56.9320232,25.1398981 C56.7691389,24.9156272 56.6940437,24.6416786 56.7203957,24.3678778 L56.7203957,22.774601 L56.2527997,22.774601 L56.2527997,22.3807131 L56.7203957,22.3807131 L56.7203957,21.8410866 L57.2545033,21.6658065 Z\"/>\n          <path d=\"M60.6667451,25.3132088 L60.6667451,22.774601 L60.2495366,22.774601 L60.2495366,22.3807131 L60.6667451,22.3807131 L60.6667451,22.2408829 C60.6382021,21.8660663 60.7661648,21.4959243 61.0214732,21.2148048 C61.2186141,21.0349901 61.4794217,20.9368633 61.7490688,20.9410526 C61.9090758,20.9394266 62.0678824,20.968188 62.2166648,21.0257385 L62.1481378,21.4393209 C62.0363185,21.3919549 61.915238,21.3690989 61.7934098,21.3723599 C61.3338757,21.3723599 61.2089147,21.7662479 61.2089147,22.2231579 L61.2089147,22.3807131 L61.9365103,22.3807131 L61.9365103,22.774601 L61.2149612,22.774601 L61.2149612,25.3092699 L60.6667451,25.3132088 Z\"/>\n          <path d=\"M63.8915455,25.3801698 C63.0853454,25.3801698 62.4464318,24.7893379 62.4464318,23.8676401 C62.4464318,22.8829202 63.1135624,22.3039049 63.9399175,22.3039049 C64.8045671,22.3039049 65.3910777,22.9183701 65.3910777,23.8124958 C65.3910777,24.9055348 64.6130946,25.3880475 63.897592,25.3880475 L63.8915455,25.3801698 Z M63.9157315,24.9862818 C64.4377461,24.9862818 64.8307686,24.5057385 64.8307686,23.836129 C64.8307686,23.3378608 64.5748001,22.7115789 63.9278245,22.7115789 C63.2808489,22.7115789 63.0067409,23.3024109 63.0067409,23.853854 C63.0067409,24.4998302 63.3796085,24.9862818 63.909685,24.9862818 L63.9157315,24.9862818 Z\"/>\n          <path d=\"M66.3968123,23.2886248 C66.3968123,22.9420034 66.3968123,22.644618 66.3726263,22.3708659 L66.8502998,22.3708659 L66.8765013,22.9498812 L66.8946408,22.9498812 C67.0029534,22.5800056 67.341716,22.3196343 67.7351044,22.3039049 C67.7850304,22.3046669 67.8348521,22.3086142 67.8842515,22.3157216 L67.8842515,22.8218676 C67.8221048,22.8136556 67.7595144,22.8090521 67.6968099,22.8080815 C67.3118494,22.8080815 67.0377414,23.0956197 66.9631679,23.4895076 C66.9508994,23.5723381 66.9448367,23.6559333 66.9450284,23.7396265 L66.9450284,25.3151783 L66.3968123,25.3151783 L66.3968123,23.2886248 Z\"/>\n        </g>\n      </g>\n    </svg>\n  </div>\n  <div class=\"").concat(t$1('header__action'), "\"></div>\n</div>\n<div class=\"").concat(t$1('body'), "\">\n  <div class=\"").concat(t$1('field'), "\" data-page=\"loading\">\n    <div class=\"").concat(t$1('loading'), "\"><svg viewBox=\"25 25 50 50\"><circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\"></circle></svg></div>\n  </div>\n  <div class=\"").concat(t$1('field'), "\" data-page=\"quote\">\n    <div class=\"").concat(t$1('field__content'), "\">\n      <div class=\"").concat(t$1('field-item'), "\">\n        <div class=\"").concat(t$1('field-item__header'), "\">\n          <span class=\"").concat(t$1('field-item__title'), "\">").concat(LANG.quote.asset, "</span>\n        </div>\n        <div class=\"").concat(t$1('field-item__content'), "\">\n          <div class=\"").concat(t$1('dropdown'), "\">\n            <div class=\"").concat(t$1('dropdown__toggle'), "\">\n              <div class=\"").concat(t$1('dropdown__selected'), "\"></div>\n              <svg class=\"").concat(t$1('dropdown__icon'), "\"><use xlink:href=\"#").concat(t$1('dropdown'), "\" /></svg>\n            </div>\n            <ul class=\"").concat(t$1('dropdown__menu'), "\"></ul>\n          </div>\n        </div>\n      </div>\n      <div class=\"").concat(t$1('field-item'), "\">\n        <div class=\"").concat(t$1('field-item__header'), "\">\n          <span class=\"").concat(t$1('field-item__title'), "\">").concat(LANG.quote.amount, "</span>\n        </div>\n        <div class=\"").concat(t$1('field-item__content'), "\">\n          <div class=\"").concat(t$1('input-item'), "\">\n            <div class=\"").concat(t$1('input-item__control'), "\">\n              <input class=\"").concat(t$1('input-item__input'), "\" type=\"number\">\n            </div>\n            <span class=\"").concat(t$1('input-item__right'), "\">USD</span>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"").concat(t$1('field__footer'), "\">\n      <div class=\"").concat(t$1('field__error'), "\"></div>\n      <div class=\"").concat(t$1('btn-group'), "\">\n        <button class=\"").concat(t$1('btn-primary'), "\">\n        ").concat(LANG.common.next, "\n        </button>\n      </div>\n    </div>\n  </div>\n  <div class=\"").concat(t$1('field'), "\" data-page=\"payment\">\n    <div class=\"").concat(t$1('field__header'), "\">\n      <p class=\"").concat(t$1('field__header-main'), "\">\n        <img />\n        <span></span>\n      </p>\n    </div>\n    <div class=\"").concat(t$1('field__content'), "\">\n      <div class=\"").concat(t$1('field-item'), "\">\n        <div class=\"").concat(t$1('field-item__header'), "\">\n          <span class=\"").concat(t$1('field-item__title'), "\">").concat(LANG.payment.asset, "</span>\n        </div>\n        <div class=\"").concat(t$1('field-item__content'), "\">\n          <div class=\"").concat(t$1('dropdown'), "\">\n            <div class=\"").concat(t$1('dropdown__toggle'), "\">\n              <div class=\"").concat(t$1('dropdown__selected'), "\">\n                <img />\n                <span></span>\n                <em></em>\n              </div>\n              <svg class=\"").concat(t$1('dropdown__icon'), "\"><use xlink:href=\"#").concat(t$1('dropdown'), "\" /></svg>\n            </div>\n            <ul class=\"").concat(t$1('dropdown__menu'), "\"></ul>\n          </div>\n        </div>\n        <div class=\"").concat(t$1('field-item__footer'), "\"></div>\n      </div>\n      <div class=\"").concat(t$1('field-item'), "\">\n        <div class=\"").concat(t$1('field-item__header'), "\">\n          <span class=\"").concat(t$1('field-item__title'), "\">").concat(LANG.payment.wallet, "</span>\n        </div>\n        <div class=\"").concat(t$1('field-item__content'), "\">\n          <div class=\"").concat(t$1('radio-item'), "\">\n            <input class=\"").concat(t$1('radio-item__radio'), "\" type=\"radio\" name=\"paymentWallet\" value=\"mixin\" checked>\n            <div class=\"").concat(t$1('radio-item__content'), "\">\n              <svg class=\"").concat(t$1('radio-item__logo'), "\"><use xlink:href=\"#").concat(t$1('mixin-logo'), "\" /></svg>\n              <p>").concat(LANG.payment.mixin, "</p>\n              <svg class=\"").concat(t$1('radio-item__checked'), "\"><use xlink:href=\"#").concat(t$1('status-success'), "\" /></svg>\n            </div>\n          </div>\n          <div class=\"").concat(t$1('radio-item'), "\">\n            <input class=\"").concat(t$1('radio-item__radio'), "\" type=\"radio\" name=\"paymentWallet\" value=\"chain\">\n            <div class=\"").concat(t$1('radio-item__content'), "\">\n              <svg class=\"").concat(t$1('radio-item__logo'), "\"><use xlink:href=\"#").concat(t$1('chain-logo'), "\" /></svg>\n              <p>").concat(LANG.payment.chain, "</p>\n              <svg class=\"").concat(t$1('radio-item__checked'), "\"><use xlink:href=\"#").concat(t$1('status-success'), "\" /></svg>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"").concat(t$1('field__footer'), "\">\n      <div class=\"").concat(t$1('field__error'), "\"></div>\n      <div class=\"").concat(t$1('btn-group'), "\">\n        <button class=\"").concat(t$1('btn-primary'), "\">").concat(LANG.common.next, "</button>\n        <button class=\"").concat(t$1('btn-inline'), "\">\n          <svg class=\"").concat(t$1('btn-icon'), "\"><use xlink:href=\"#").concat(t$1('arrow-right'), "\" /></svg>\n          <span>").concat(LANG.common.back, "</span>\n        </button>\n      </div>\n    </div>\n  </div>\n  <div class=\"").concat(t$1('field'), "\" data-page=\"checkout-mixin\">\n    <div class=\"").concat(t$1('field__header'), "\">\n      <p class=\"").concat(t$1('field__header-main'), "\">\n        <img />\n        <span class=\"").concat(t$1('copy-toggle'), "\" data-success=\"").concat(LANG.common.copied, "\">\n          <span class=\"").concat(t$1('field__header-main-text'), "\"><span class=\"").concat(t$1('copy-content'), "\">0.1111</span> XIN</span>\n          <svg class=\"").concat(t$1('copy-icon'), "\"><use xlink:href=\"#").concat(t$1('copy'), "\" /></svg>\n        </span>\n      </p>\n      <p class=\"").concat(t$1('field__header-sub'), "\"></p>\n    </div>\n    <div class=\"").concat(t$1('field__content'), "\">\n      <p class=\"").concat(t$1('checkout__brief'), "\">").concat(LANG.checkout.scanWithMixin, "</p>\n      <div class=\"").concat(t$1('checkout__qrious'), "\">\n        <div class=\"").concat(t$1('checkout__qrious-box'), "\">\n          <canvas></canvas>\n        </div>\n      </div>\n      <p class=\"").concat(t$1('checkout__countdown'), "\">").concat(LANG.checkout.countdown, "</p>\n    </div>\n    <div class=\"").concat(t$1('field__footer'), "\">\n      <div class=\"").concat(t$1('btn-group'), "\">\n        <button class=\"").concat(t$1('btn-primary'), "\">").concat(LANG.common.openMixinMessenger, "</button>\n        <button class=\"").concat(t$1('btn-inline'), "\"><svg class=\"").concat(t$1('btn-icon'), "\"><use xlink:href=\"#").concat(t$1('arrow-right'), "\" /></svg><span>Back</span></button>\n      </div>\n    </div>\n  </div>\n  <div class=\"").concat(t$1('field'), "\" data-page=\"checkout-chain\">\n    <div class=\"").concat(t$1('field__header'), "\">\n      <p class=\"").concat(t$1('field__header-main'), "\">\n        <img />\n        <span class=\"").concat(t$1('copy-toggle'), "\" data-success=\"").concat(LANG.common.copied, "\">\n          <span class=\"").concat(t$1('field__header-main-text'), "\"><span class=\"").concat(t$1('copy-content'), "\">0.1111</span> XIN</span>\n          <svg class=\"").concat(t$1('copy-icon'), "\"><use xlink:href=\"#").concat(t$1('copy'), "\" /></svg>\n        </span>\n      </p>\n      <p class=\"").concat(t$1('field__header-sub'), "\"></p>\n    </div>\n    <div class=\"").concat(t$1('field__content'), "\">\n      <div class=\"").concat(t$1('checkout__content'), "\">\n        <div class=\"").concat(t$1('checkout__info'), "\">\n          <div class=\"").concat(t$1('checkout__info-item'), "\">\n            <h4>").concat(LANG.checkout.network, "</h4>\n            <p>XIN</p>\n          </div>\n          <div class=\"").concat(t$1('checkout__info-item'), "\">\n            <h4>").concat(LANG.checkout.address, "</h4>\n            <p class=\"").concat(t$1('copy-toggle'), "\" data-success=\"").concat(LANG.common.copied, "\">\n              <span class=\"").concat(t$1('copy-content'), "\"></span>\n              <svg class=\"").concat(t$1('copy-icon'), "\"><use xlink:href=\"#").concat(t$1('copy'), "\" /></svg>\n            </p>\n          </div>\n          <div class=\"").concat(t$1('checkout__info-item'), "\">\n            <h4>").concat(LANG.checkout.memo, "</h4>\n            <p class=\"").concat(t$1('copy-toggle'), "\" data-success=\"").concat(LANG.common.copied, "\">\n              <span class=\"").concat(t$1('copy-content'), "\">1231231</span>\n              <svg class=\"").concat(t$1('copy-icon'), "\"><use xlink:href=\"#").concat(t$1('copy'), "\" /></svg>\n            </p>\n          </div>\n        </div>\n        <div class=\"").concat(t$1('checkout__qrious'), "\">\n          <div class=\"").concat(t$1('checkout__qrious-box'), "\">\n            <canvas></canvas>\n          </div>\n        </div>\n      </div>\n      <p class=\"").concat(t$1('checkout__countdown'), "\">").concat(LANG.checkout.countdown, "</p>\n    </div>\n    <div class=\"").concat(t$1('field__footer'), "\">\n      <div class=\"").concat(t$1('btn-group'), "\">\n        <button class=\"").concat(t$1('btn-primary'), "\">").concat(LANG.common.confirmed, "</button>\n        <button class=\"").concat(t$1('btn-inline'), "\">\n          <svg class=\"").concat(t$1('btn-icon'), "\"><use xlink:href=\"#").concat(t$1('arrow-right'), "\" /></svg>\n          <span>").concat(LANG.common.back, "</span>\n        </button>\n      </div>\n    </div>\n  </div>\n  <div class=\"").concat(t$1('field'), "\" data-page=\"checking\">\n    <div class=\"").concat(t$1('field__header'), "\">\n      <svg class=\"").concat(t$1('status-icon'), "\"><use xlink:href=\"#").concat(t$1('status-pending'), "\" /></svg>\n    </div>\n    <div class=\"").concat(t$1('field__content'), "\">\n      <h4 class=\"").concat(t$1('status-title'), "\">").concat(LANG.result.checking, "</h4>\n      <p class=\"").concat(t$1('status-des'), "\">").concat(LANG.result.checkingDesc, "</p>\n      <p class=\"").concat(t$1('status-payment'), "\"></p>\n      <p class=\"").concat(t$1('status-quote'), "\"></p>\n    </div>\n    <div class=\"").concat(t$1('field__footer'), "\">\n      <div class=\"").concat(t$1('btn-group'), "\">\n        <button class=\"").concat(t$1('btn-inline'), "\"><svg class=\"").concat(t$1('btn-icon'), "\"><use xlink:href=\"#").concat(t$1('arrow-right'), "\" /></svg><span>Back</span></button>\n      </div>\n    </div>\n  </div>\n  <div class=\"").concat(t$1('field'), "\" data-page=\"pending\">\n    <div class=\"").concat(t$1('field__header'), "\">\n      <svg class=\"").concat(t$1('status-icon'), "\"><use xlink:href=\"#").concat(t$1('status-pending'), "\" /></svg>\n    </div>\n    <div class=\"").concat(t$1('field__content'), "\">\n      <h4 class=\"").concat(t$1('status-title'), "\">").concat(LANG.result.pending, "</h4>\n      <p class=\"").concat(t$1('status-des'), "\">").concat(LANG.result.pendingDesc, "</p>\n      <p class=\"").concat(t$1('status-payment'), "\"></p>\n      <p class=\"").concat(t$1('status-quote'), "\"></p>\n    </div>\n  </div>\n  <div class=\"").concat(t$1('field'), "\" data-page=\"success\">\n    <div class=\"").concat(t$1('field__header'), "\">\n      <svg class=\"").concat(t$1('status-icon'), "\"><use xlink:href=\"#").concat(t$1('status-success'), "\" /></svg>\n    </div>\n    <div class=\"").concat(t$1('field__content'), "\">\n      <h4 class=\"").concat(t$1('status-title'), "\">").concat(LANG.result.success, "</h4>\n      <p class=\"").concat(t$1('status-des'), "\"></p>\n      <p class=\"").concat(t$1('status-payment'), "\"></p>\n      <p class=\"").concat(t$1('status-quote'), "\"></p>\n    </div>\n  </div>\n  <div class=\"").concat(t$1('field'), "\" data-page=\"failed\">\n    <div class=\"").concat(t$1('field__header'), "\">\n      <svg class=\"").concat(t$1('status-icon'), "\"><use xlink:href=\"#").concat(t$1('status-failed'), "\" /></svg>\n    </div>\n    <div class=\"").concat(t$1('field__content'), "\">\n      <h4 class=\"").concat(t$1('status-title'), "\">").concat(LANG.result.failed, "</h4>\n      <p class=\"").concat(t$1('status-des'), "\"></p>\n      <p class=\"").concat(t$1('status-payment'), "\"></p>\n      <p class=\"").concat(t$1('status-quote'), "\"></p>\n    </div>\n    <div class=\"").concat(t$1('field__footer'), "\">\n      <div class=\"").concat(t$1('btn-group'), "\">\n        <button class=\"").concat(t$1('btn-primary'), "\">").concat(LANG.common.payAgain, "</button>\n      </div>\n    </div>\n  </div>\n  <div class=\"").concat(t$1('field'), "\" data-page=\"overtime\">\n    <div class=\"").concat(t$1('field__header'), "\">\n      <svg class=\"").concat(t$1('status-icon'), "\"><use xlink:href=\"#").concat(t$1('status-failed'), "\" /></svg>\n    </div>\n    <div class=\"").concat(t$1('field__content'), "\">\n      <h4 class=\"").concat(t$1('status-title'), "\">").concat(LANG.result.overtime, "</h4>\n      <p class=\"").concat(t$1('status-des'), "\">").concat(LANG.result.overtimeDesc, "</p>\n      <p class=\"").concat(t$1('status-payment'), "\"></p>\n      <p class=\"").concat(t$1('status-quote'), "\"></p>\n    </div>\n    <div class=\"").concat(t$1('field__footer'), "\">\n      <div class=\"").concat(t$1('field__error'), "\"></div>\n      <div class=\"").concat(t$1('btn-group'), "\">\n        <button class=\"").concat(t$1('btn-primary'), "\">").concat(LANG.common.refresh, "</button>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"").concat(t$1('footer'), "\">\n  <a class=\"").concat(t$1('link'), "\" href=\"https://help.mixpay.me/en_US/faq/how-to-contact-customer-service\"  target=\"_blank\">").concat(LANG.common.help, "</a>\n  <a class=\"").concat(t$1('link'), "\" href=\"https://mixpay.me/user-agreement\"  target=\"_blank\">").concat(LANG.common.termsOfUse, "</a>\n</div>"); // const result = template.replace(new RegExp('(?<=>)\s*?(?=<)', 'g'), '');

	var t = function t(name) {
	  return ".".concat(NAMESPACE, "-").concat(name);
	};

	function MixPay(wrapper, options) {
	  if (!IS_BROWSER) {
	    throw new Error('A browser is needed!');
	  }

	  this.$wrapper = wrapper || document.body;
	  this.$element = null;
	  this.options = assign({}, OPTIONS_DEFAULT, isPlainObject(options) && options);
	  this.options.clientId = this.options.clientId || MixPay.newUUID();
	  this.isShow = false;
	  this.isUserConfirmed = false;
	  this.countdownPoll = null;
	  this.paymentResultPoll = null;
	  this.params = {
	    quoteAsset: {},
	    quoteAmount: '',
	    paymentAsset: {},
	    paymentMethod: 'mixin'
	  };
	  this.payments = {
	    isChain: false,
	    clientId: '',
	    traceId: '',
	    destination: '',
	    tag: '',
	    paymentAmount: '',
	    paymentAssetId: '',
	    quoteAmount: '',
	    quoteAssetId: '',
	    recipient: '',
	    memo: '',
	    expire: ''
	  };
	  this.result = {
	    status: 'unpaid',
	    payableAmount: '',
	    paymentAmount: '',
	    paymentSymbol: '',
	    quoteAmount: '',
	    quoteSymbol: '',
	    txid: '',
	    date: '',
	    failureCode: '',
	    failureReason: '',
	    surplusAmount: ''
	  };
	  this.init();
	}

	MixPay.prototype = {
	  $svg: {
	    isSVGLoaded: false
	  },
	  $apis: new APIS(),
	  init: function init() {
	    var _this = this;

	    this.renderSVG();
	    this.render();
	    this.bind();
	    this.renderPage('loading');
	    this.$apis.addReadyCallback(function () {
	      var _this$options = _this.options,
	          quoteAssetId = _this$options.quoteAssetId,
	          quoteAmount = _this$options.quoteAmount;

	      var asset = _this.$apis.quoteAssets.find(function (item) {
	        return item.assetId === quoteAssetId;
	      });

	      _this.params.quoteAsset = asset || _this.$apis.quoteAssets[0];
	      _this.params.quoteAmount = quoteAmount > 0 ? quoteAmount : '';
	      _this.params.paymentAsset = _this.$apis.paymentAssets[0];
	      _this.params.paymentMethod = 'mixin';

	      if (quoteAssetId && quoteAmount > 0) {
	        _this.renderPage('payment');
	      } else {
	        _this.renderPage('quote');
	      }

	      dispatchEvent(_this.$element, EVENT_READY);
	    });
	  },
	  renderSVG: function renderSVG() {
	    if (this.$svg.isSVGLoaded) return;
	    var wrapper = document.createElement('div');
	    wrapper.setAttribute('style', 'position:absolute;width:0;height:0;');
	    wrapper.innerHTML = SVG_TEMPLATE;
	    var body = document.body;
	    body.insertBefore(wrapper, body.childNodes[0]);
	    this.$svg.isSVGLoaded = true;
	  },
	  render: function render() {
	    var _this$options2 = this.options,
	        isModal = _this$options2.isModal,
	        hasMask = _this$options2.hasMask,
	        fontSize = _this$options2.fontSize;
	    var $wrapper = this.$wrapper;
	    var $element = document.createElement('div');

	    var _fontSize = parseFloat(fontSize);

	    if (Number.isNaN(_fontSize)) {
	      _fontSize = 14;
	    }

	    $element.classList.add(NAMESPACE);
	    setStyle($element, 'font-size', _fontSize + 'px');

	    if (isModal) {
	      toggleClass($element, 'is-modal');
	      setStyle($element, 'display', 'none');

	      if (hasMask) {
	        var mask = document.createElement('div');
	        toggleClass(mask, "".concat(NAMESPACE, "-mask"));
	        $element.appendChild(mask);
	      }
	    }

	    var container = document.createElement('div');
	    toggleClass(container, "".concat(NAMESPACE, "-container"));
	    container.innerHTML = TEMPLATE;
	    $element.appendChild(container);
	    $wrapper.appendChild($element);
	    this.$element = $element;
	    var $closeBtn = query($element, t('header__action'));
	    var $quote = query($element, t('field[data-page=quote]'));
	    var $quoteDropdown = query($quote, t('dropdown__toggle'));
	    var $quoteList = query($quote, t('dropdown__menu'));
	    var $quoteSelected = query($quote, t('dropdown__selected'));
	    var $quoteInput = query($quote, t('input-item__input'));
	    var $quoteUnit = query($quote, t('input-item__right'));
	    var $quoteError = query($quote, t('field__error'));
	    var $quoteNextBtn = query($quote, 'button');
	    var $payment = query($element, t('field[data-page=payment'));
	    var $paymentDropdown = query($payment, t('dropdown__toggle'));
	    var $paymentList = query($payment, t('dropdown__menu'));
	    var $paymentSelected = query($payment, t('dropdown__selected'));
	    var $paymentError = query($payment, t('field__error'));
	    var $paymentNextBtn = query($payment, t('btn-primary'));
	    var $paymentBackBtn = query($payment, t('btn-inline'));
	    var $paymentRadios = query($payment, "".concat(t('field-item:nth-child(2)'), " ").concat(t('field-item__content')));
	    var $mixin = query($element, t('field[data-page="checkout-mixin"]'));
	    var $mixinPaidBtn = query($mixin, t('btn-primary'));
	    var $mixinBackBtn = query($mixin, t('btn-inline'));
	    var $mixinCountdown = query($mixin, t('checkout__countdown'));
	    var $chain = query($element, t('field[data-page=checkout-chain]'));
	    var $chainPaidBtn = query($chain, t('btn-primary'));
	    var $chainBackBtn = query($chain, t('btn-inline'));
	    var $chainCountdown = query($chain, t('checkout__countdown'));
	    var $checking = query($element, t('field[data-page=checking]'));
	    var $checkingBackBtn = query($checking, t('btn-inline'));
	    var $failed = query($element, t('field[data-page=failed]'));
	    var $failedBtn = query($failed, t('btn-primary'));
	    var $overtime = query($element, t('field[data-page=overtime]'));
	    var $overtimeBtn = query($overtime, t('btn-primary'));
	    var $overtimeError = query($overtime, t('field__error'));
	    var that = this;

	    var copyEvent = function copyEvent() {
	      var _this2 = this;

	      var content = query(this, t('copy-content'));
	      if (!content) return;

	      if (copy(content.innerText)) {
	        clearTimeout(this.timeout);

	        if (!hasClass(this, 'copy-success')) {
	          toggleClass(this, 'copy-success');
	        }

	        this.timeout = setTimeout(function () {
	          toggleClass(_this2, 'copy-success');
	        }, 3000);
	      }
	    };

	    forEach(queryAll($element, t('copy-toggle')), function (ele) {
	      ele.onclick = copyEvent;
	    });

	    var regularTaskFn = function regularTaskFn(isChain) {
	      var countdown = isChain ? $chainCountdown : $mixinCountdown;
	      return function (diff) {
	        countdown.innerHTML = LANG.checkout.countdown.replace(/\$1/, "".concat(diff, "s"));
	      };
	    };

	    var endTask = function endTask() {
	      var _that$payments = that.payments,
	          clientId = _that$payments.clientId,
	          traceId = _that$payments.traceId,
	          isChain = _that$payments.isChain,
	          paymentAssetId = _that$payments.paymentAssetId,
	          quoteAmount = _that$payments.quoteAmount,
	          quoteAssetId = _that$payments.quoteAssetId;
	      var $field = query(that.$element, t("field[data-page=checkout-".concat(isChain ? 'chain' : 'mixin', "]")));
	      var $btns = query($field, t('btn-group'));
	      setStyle($btns, 'visibility', 'hidden');
	      that.$apis.getPaymentResult(clientId, traceId).then(function (result) {
	        var r = result.data;
	        that.result.status = r.status;
	        that.result.payableAmount = r.payableAmount;
	        that.result.paymentAmount = r.paymentAmount;
	        that.result.paymentSymbol = r.paymentSymbol;
	        that.result.quoteAmount = r.quoteAmount;
	        that.result.quoteSymbol = r.quoteSymbol;
	        that.result.txid = r.txid;
	        that.result.date = r.date;
	        that.result.failureCode = r.failureCode;
	        that.result.failureReason = r.failureReason;
	        that.result.surplusAmount = r.surplusAmount;

	        if (r.status === 'unpaid') {
	          var data = assign({}, pureAssign(PAYMENT_DEFAULT, that.options), {
	            quoteAssetId: quoteAssetId,
	            quoteAmount: quoteAmount,
	            paymentAssetId: paymentAssetId,
	            isChain: isChain,
	            traceId: traceId
	          });
	          return that.$apis.createPayment(data).then(function (_data) {
	            var d = _data.data;
	            that.payments = {
	              isChain: d.isChain,
	              clientId: d.clientId,
	              traceId: d.traceId,
	              destination: d.destination,
	              tag: d.tag,
	              paymentAmount: d.paymentAmount,
	              paymentAssetId: d.paymentAssetId,
	              quoteAmount: d.quoteAmount,
	              quoteAssetId: d.quoteAssetId,
	              recipient: d.recipient,
	              memo: d.memo,
	              expire: d.expire
	            };
	            dispatchEvent(that.$element, EVENT_PAYMENT_CREATE, d);
	            var regularTask = regularTaskFn(d.isChain);
	            that.startCountdown(regularTask, endTask);
	            that.startQueryOrder();
	            that.renderPage(d.isChain ? 'checkoutChain' : 'checkoutMixin');
	          });
	        }

	        switch (r.status) {
	          case 'pending':
	            that.renderPage('pending');
	            break;

	          case 'success':
	            that.renderPage('success');
	            dispatchEvent(that.$element, EVENT_PAYMENT_SUCCESS);
	            break;

	          case 'failed':
	            that.renderPage('failed');
	            dispatchEvent(that.$element, EVENT_PAYMENT_FAILED, {
	              code: r.failureCode,
	              reason: r.failureReason
	            });
	            break;
	        }
	      }).catch(function (e) {
	        console.error(e);
	        that.renderPage('overtime');
	      });
	    };

	    $closeBtn.onclick = function () {
	      that.hide();
	    };

	    $quoteDropdown.onclick = function () {
	      if (hasClass(this, 'disabled')) return;
	      toggleClass($quoteList, 'show');
	    };

	    $quoteList.onclick = function (e) {
	      var quoteAssets = that.$apis.quoteAssets,
	          quoteAsset = that.params.quoteAsset;
	      var target = e.target || e.srcElement;
	      if (target === this) return;

	      while (String(target.tagName).toUpperCase() !== 'LI') {
	        target = target.parentNode;
	      }

	      var assetId = target.dataset.id;
	      var asset = quoteAssets.find(function (item) {
	        return item.assetId === assetId;
	      });
	      if (!asset) return;

	      if (asset.assetId === quoteAsset.assetId) {
	        toggleClass($quoteList, 'show');
	        return;
	      }

	      setHTML($quoteSelected, "<img src=\"".concat(asset.iconUrl, "\" /><span>").concat(asset.symbol, "</span>"));
	      $quoteInput.value = '';
	      $quoteInput.setAttribute('placeholder', "".concat(asset.minQuoteAmount, " - ").concat(asset.maxQuoteAmount));
	      setText($quoteUnit, asset.symbol);
	      setHTML($quoteError, '');
	      that.params.quoteAsset = asset;
	      that.params.quoteAmount = '';
	      toggleClass($quoteList, 'show');
	    };

	    $quoteInput.oninput = function (e) {
	      var decimalDigit = that.params.quoteAsset.decimalDigit;
	      var output = e.target.value;
	      var outputArr = output.split('.');

	      if (outputArr[1] !== undefined) {
	        output = "".concat(outputArr[0] || '0', ".").concat(outputArr[1].slice(0, decimalDigit));
	      }

	      if (output !== this.value) {
	        this.value = output;
	      }

	      that.params.quoteAmount = this.value;
	    };

	    $quoteNextBtn.onclick = function () {
	      if (this.isSubmitting) return;
	      this.isSubmitting = true;
	      var _that$params = that.params,
	          _that$params$quoteAss = _that$params.quoteAsset,
	          minQuoteAmount = _that$params$quoteAss.minQuoteAmount,
	          maxQuoteAmount = _that$params$quoteAss.maxQuoteAmount,
	          symbol = _that$params$quoteAss.symbol,
	          quoteAmount = _that$params.quoteAmount;

	      if (+quoteAmount < +minQuoteAmount || +quoteAmount > +maxQuoteAmount) {
	        setHTML($quoteError, "<span>Out of range ".concat(minQuoteAmount, " - ").concat(maxQuoteAmount, " ").concat(symbol, "</span>"));
	      } else {
	        setHTML($quoteError, '');
	        that.renderPage('payment');
	      }

	      this.isSubmitting = false;
	    };

	    $paymentDropdown.onclick = function () {
	      toggleClass($paymentList, 'show');
	    };

	    $paymentList.onclick = function (e) {
	      var paymentAssets = that.$apis.paymentAssets,
	          _that$params2 = that.params,
	          paymentAsset = _that$params2.paymentAsset,
	          paymentMethod = _that$params2.paymentMethod;
	      var target = e.target || e.srcElement;
	      if (target === this) return;

	      while (String(target.tagName).toUpperCase() !== 'LI') {
	        target = target.parentNode;
	      }

	      var assetId = target.dataset.id;
	      var asset = paymentAssets.find(function (item) {
	        return item.assetId === assetId;
	      });

	      if (!asset) {
	        return;
	      }

	      if (paymentAsset.assetId === assetId) {
	        toggleClass(this, 'show');
	        return;
	      }

	      setHTML($paymentSelected, "<img src=\"".concat(asset.iconUrl, "\" /><span>").concat(asset.symbol, "</span><em>").concat(asset.network, "</em>"));
	      setHTML($paymentError, !asset.onChainSupported && paymentMethod === 'chain' ? LANG.error.notSupportChain : '');
	      that.params.paymentAsset = asset;
	      toggleClass(this, 'show');
	    };

	    $paymentRadios.onclick = function (e) {
	      var target = e.target || e.srcElement;
	      var onChainSupported = that.params.paymentAsset.onChainSupported;

	      if (String(target.tagName).toUpperCase() === 'INPUT') {
	        that.params.paymentMethod = target.value;
	        setHTML($paymentError, !onChainSupported && target.value === 'chain' ? LANG.error.notSupportChain : '');
	      }
	    };

	    $paymentNextBtn.onclick = function () {
	      var _this3 = this;

	      if (this.isSubmitting) return;
	      var _that$params3 = that.params,
	          paymentAsset = _that$params3.paymentAsset,
	          paymentMethod = _that$params3.paymentMethod,
	          quoteAsset = _that$params3.quoteAsset,
	          quoteAmount = _that$params3.quoteAmount;

	      if (!paymentAsset.onChainSupported && paymentMethod === 'chain') {
	        setHTML($paymentError, LANG.error.notSupportChain);
	        return;
	      }

	      $paymentError.innerHTML = '';
	      toggleClass(this, 'inactive');
	      this.isSubmitting = true;
	      var data = assign({}, pureAssign(PAYMENT_DEFAULT, that.options), {
	        quoteAssetId: quoteAsset.assetId,
	        quoteAmount: quoteAmount,
	        paymentAssetId: paymentAsset.assetId,
	        isChain: paymentMethod === 'chain'
	      });
	      data.traceId = data.traceId || genUuid();
	      that.$apis.createPayment(data).then(function (_data) {
	        var d = _data.data;
	        that.payments = {
	          isChain: d.isChain,
	          clientId: d.clientId,
	          traceId: d.traceId,
	          destination: d.destination,
	          tag: d.tag,
	          paymentAmount: d.paymentAmount,
	          paymentAssetId: d.paymentAssetId,
	          quoteAmount: d.quoteAmount,
	          quoteAssetId: d.quoteAssetId,
	          recipient: d.recipient,
	          memo: d.memo,
	          expire: d.expire
	        };
	        dispatchEvent(that.$element, EVENT_PAYMENT_CREATE, d);
	        var regularTask = regularTaskFn(d.isChain);
	        that.startCountdown(regularTask, endTask);
	        that.startQueryOrder();
	        that.renderPage(d.isChain ? 'checkoutChain' : 'checkoutMixin');
	      }).catch(function (_err) {
	        setHTML($paymentError, "<span>".concat(_err.message, "</span>"));
	      }).finally(function () {
	        _this3.isSubmitting = false;
	        toggleClass(_this3, 'inactive');
	      });
	    };

	    $paymentBackBtn.onclick = function () {
	      that.renderPage('quote');
	    };

	    $mixinPaidBtn.onclick = function () {
	      var _this4 = this;

	      if (this.isSubmitting) return;
	      this.isSubmitting = true;
	      var _that$payments2 = that.payments,
	          recipient = _that$payments2.recipient,
	          paymentAssetId = _that$payments2.paymentAssetId,
	          paymentAmount = _that$payments2.paymentAmount,
	          traceId = _that$payments2.traceId,
	          memo = _that$payments2.memo;
	      window.location.href = "mixin://pay?recipient=".concat(recipient, "&asset=").concat(paymentAssetId, "&amount=").concat(paymentAmount, "&trace=").concat(traceId, "&memo=").concat(memo);
	      setTimeout(function () {
	        _this4.isSubmitting = false;
	      }, 3000);
	    };

	    $mixinBackBtn.onclick = function () {
	      clearInterval(that.countdownPoll);
	      clearInterval(that.paymentResultPoll);
	      that.renderPage('payment');
	    };

	    $chainPaidBtn.onclick = function () {
	      clearInterval(that.countdownPoll);
	      that.isUserConfirmed = true;
	      that.renderPage('checking');
	    };

	    $chainBackBtn.onclick = function () {
	      clearInterval(that.countdownPoll);
	      clearInterval(that.paymentResultPoll);
	      that.renderPage('payment');
	    };

	    $checkingBackBtn.onclick = function () {
	      var isChain = that.payments.isChain;
	      that.isUserConfirmed = false;
	      var regularTask = regularTaskFn(isChain);
	      that.startCountdown(regularTask, endTask);
	      that.startQueryOrder();
	      that.renderPage(isChain ? 'checkoutChain' : 'checkoutMixin');
	    };

	    $failedBtn.onclick = function () {
	      var _that$options = that.options,
	          quoteAssetId = _that$options.quoteAssetId,
	          quoteAmount = _that$options.quoteAmount;

	      if (quoteAssetId && quoteAmount > 0) {
	        that.renderPage('payment');
	      } else {
	        that.renderPage('quote');
	      }
	    };

	    $overtimeBtn.onclick = function () {
	      var _this5 = this;

	      if (this.isSubmitting) return;
	      this.isSubmitting = true;
	      toggleClass(this, 'inactive');
	      var _that$payments3 = that.payments,
	          traceId = _that$payments3.traceId,
	          isChain = _that$payments3.isChain,
	          paymentAssetId = _that$payments3.paymentAssetId,
	          quoteAmount = _that$payments3.quoteAmount,
	          quoteAssetId = _that$payments3.quoteAssetId;
	      var data = assign({}, pureAssign(PAYMENT_DEFAULT, that.options), {
	        quoteAssetId: quoteAssetId,
	        quoteAmount: quoteAmount,
	        paymentAssetId: paymentAssetId,
	        isChain: isChain,
	        traceId: traceId
	      });
	      that.$apis.createPayment(data).then(function (_data) {
	        var d = _data.data;
	        that.payments = {
	          isChain: d.isChain,
	          clientId: d.clientId,
	          traceId: d.traceId,
	          destination: d.destination,
	          tag: d.tag,
	          paymentAmount: d.paymentAmount,
	          paymentAssetId: d.paymentAssetId,
	          quoteAmount: d.quoteAmount,
	          quoteAssetId: d.quoteAssetId,
	          recipient: d.recipient,
	          memo: d.memo,
	          expire: d.expire
	        };
	        dispatchEvent(that.$element, EVENT_PAYMENT_CREATE, d);
	        var regularTask = regularTaskFn(d.isChain);
	        that.startCountdown(regularTask, endTask);
	        that.startQueryOrder();
	        that.renderPage(d.isChain ? 'checkoutChain' : 'checkoutMixin');
	      }).catch(function (err) {
	        setHTML($overtimeError, "<span>".concat(err.message, "</span>"));
	      }).finally(function () {
	        _this5.isSubmitting = false;
	        toggleClass(_this5, 'inactive');
	      });
	    };
	  },
	  renderPage: function renderPage(page) {
	    var _this$$apis = this.$apis,
	        quoteAssets = _this$$apis.quoteAssets,
	        paymentAssets = _this$$apis.paymentAssets,
	        _this$payments = this.payments,
	        paymentAmount = _this$payments.paymentAmount,
	        destination = _this$payments.destination,
	        paymentAssetId = _this$payments.paymentAssetId,
	        traceId = _this$payments.traceId,
	        memo = _this$payments.memo,
	        recipient = _this$payments.recipient,
	        tag = _this$payments.tag,
	        _this$params = this.params,
	        _this$params$quoteAss = _this$params.quoteAsset,
	        qIcon = _this$params$quoteAss.iconUrl,
	        qSymbol = _this$params$quoteAss.symbol,
	        minQuoteAmount = _this$params$quoteAss.minQuoteAmount,
	        maxQuoteAmount = _this$params$quoteAss.maxQuoteAmount,
	        quoteAmount = _this$params.quoteAmount,
	        _this$params$paymentA = _this$params.paymentAsset,
	        pIcon = _this$params$paymentA.iconUrl,
	        pSymbol = _this$params$paymentA.symbol,
	        network = _this$params$paymentA.network,
	        paymentMethod = _this$params.paymentMethod,
	        _this$options3 = this.options,
	        payAssetId = _this$options3.quoteAssetId,
	        payAmount = _this$options3.quoteAmount,
	        result = this.result;
	    var activeIndex;
	    var activeField;
	    var fields = queryAll(this.$element, t('field'));

	    var q = function q(selector) {
	      return query(activeField, t(selector));
	    };

	    switch (page) {
	      case 'loading':
	        activeIndex = 0;
	        break;

	      case 'quote':
	        activeIndex = 1;
	        activeField = fields[activeIndex];

	        if (payAssetId) {
	          q('dropdown__toggle').classList.add('disabled');
	        } else {
	          q('dropdown__toggle').classList.remove('disabled');
	        }

	        setHTML(q('dropdown__selected'), "<img src=\"".concat(qIcon, "\" /><span>").concat(qSymbol, "</span>"));
	        setHTML(q('dropdown__menu'), quoteAssets.map(function (item) {
	          return "<li data-id=\"".concat(item.assetId, "\"><img src=\"").concat(item.iconUrl, "\" /><span>").concat(item.symbol, "</span></li>");
	        }).join(''));
	        var qInput = q('input-item__input');
	        qInput.value = quoteAmount;
	        qInput.setAttribute('placeholder', "".concat(minQuoteAmount, " - ").concat(maxQuoteAmount));
	        setText(q('input-item__right'), qSymbol);
	        setHTML(q('filed__error'), '');
	        break;

	      case 'payment':
	        activeIndex = 2;
	        activeField = fields[activeIndex];
	        setHTML(q('field__header-main'), "<img src=\"".concat(qIcon, "\" /><span>").concat(quoteAmount, " ").concat(qSymbol, "</span>"));
	        setHTML(q('dropdown__selected'), "<img src=\"".concat(pIcon, "\" /><span>").concat(pSymbol, "</span><em>").concat(network, "</em>"));
	        setHTML(q('dropdown__menu'), paymentAssets.map(function (item) {
	          return "<li data-id=\"".concat(item.assetId, "\"><img src=\"").concat(item.iconUrl, "\" /><span>").concat(item.symbol, "</span><em>").concat(item.network, "</em></li>");
	        }).join(''));
	        var pInput = queryAll(activeField, 'input')[paymentMethod === 'chain' ? 1 : 0];
	        pInput.checked = true;
	        setStyle(q('btn-inline'), 'display', payAssetId && payAmount > 0 ? 'none' : 'inline-flex');
	        break;

	      case 'checkoutMixin':
	        activeIndex = 3;
	        activeField = fields[activeIndex];
	        this.isUserConfirmed = false;
	        var mixinImg = q('field__header-main img');
	        mixinImg.setAttribute('src', pIcon);
	        setHTML(q('field__header-main-text'), "<span class=\"".concat("".concat(NAMESPACE, "-copy-content"), "\">", paymentAmount, "</span> ").concat(pSymbol));
	        setText(q('field__header-sub'), "".concat(quoteAmount, " ").concat(qSymbol));
	        var mixinCanvas = q('checkout__qrious canvas');
	        new qrious({
	          element: mixinCanvas,
	          level: 'H',
	          size: 600,
	          value: "mixin://pay?recipient=".concat(recipient, "&asset=").concat(paymentAssetId, "&amount=").concat(paymentAmount, "&trace=").concat(traceId, "&memo=").concat(memo)
	        });
	        setStyle(q('btn-group'), 'visibility', 'visible');
	        setStyle(q('btn-primary'), 'display', IS_MIXIN ? 'inline-flex' : 'none');
	        break;

	      case 'checkoutChain':
	        activeIndex = 4;
	        activeField = fields[activeIndex];
	        this.isUserConfirmed = false;
	        var chainImg = q('field__header-main img');
	        chainImg.setAttribute('src', pIcon);
	        setHTML(q('field__header-main-text'), "<span class=\"".concat("".concat(NAMESPACE, "-copy-content"), "\">", paymentAmount, "</span> ").concat(pSymbol));
	        setText(q('field__header-sub'), "".concat(quoteAmount, " ").concat(qSymbol));
	        var chainCanvas = q('checkout__qrious canvas');
	        new qrious({
	          element: chainCanvas,
	          level: 'H',
	          size: 600,
	          value: destination
	        });
	        var infos = queryAll(activeField, t('checkout__info-item > p'));
	        setText(infos[0], network);
	        setText(query(infos[1], t('copy-content')), destination);
	        setText(infos[2], tag);
	        setStyle(infos[2].parentNode, 'display', tag ? 'block' : 'none');
	        setStyle(q('btn-group'), 'visibility', 'visible');
	        break;

	      case 'checking':
	        activeIndex = 5;
	        activeField = fields[activeIndex];
	        setText(q('status-payment'), "".concat(paymentAmount, " ").concat(pSymbol));
	        setText(q('status-quote'), "".concat(quoteAmount, " ").concat(qSymbol));
	        break;

	      case 'pending':
	        activeIndex = 6;
	        activeField = fields[activeIndex];
	        setText(q('status-payment'), "".concat(result.payableAmount, " ").concat(result.paymentSymbol));
	        setText(q('status-quote'), "".concat(result.quoteAmount, " ").concat(result.quoteSymbol));
	        break;

	      case 'success':
	        activeIndex = 7;
	        activeField = fields[activeIndex];
	        setText(q('status-payment'), "".concat(result.payableAmount, " ").concat(result.paymentSymbol));
	        setText(q('status-quote'), "".concat(result.quoteAmount, " ").concat(result.quoteSymbol));
	        var desc = '';

	        if (result.surplusAmount > 0) {
	          desc = LANG.result.refundDesc.replace(/\$1/, "".concat(result.payableAmount, " ").concat(result.paymentSymbol)).replace(/\$2/, toFixed(Number(result.paymentAmount) + Number(result.surplusAmount), 8) + ' ' + result.paymentSymbol);
	        }

	        setText(q('status-des'), desc);
	        setStyle(q('status-des'), 'display', result.surplusAmount > 0 ? 'block' : 'none');
	        break;

	      case 'failed':
	        activeIndex = 8;
	        activeField = fields[activeIndex];
	        var reason = LANG.error.codeTable[result.failureCode] || result.failureReason;

	        if (String(result.failureCode) === '40024') {
	          reason = reason.replace(/\$1/, "".concat(result.payableAmount, " ").concat(result.paymentSymbol)).replace(/\$2/, "".concat(result.paymentAmount, " ").concat(result.paymentSymbol));
	        }

	        setText(q('status-des'), reason);
	        setText(q('status-payment'), "".concat(result.payableAmount, " ").concat(result.paymentSymbol));
	        setText(q('status-quote'), "".concat(result.quoteAmount, " ").concat(result.quoteSymbol));
	        break;

	      case 'overtime':
	        activeIndex = 9;
	        activeField = fields[activeIndex];
	        setText(q('status-payment'), "".concat(result.payableAmount, " ").concat(result.paymentSymbol));
	        setText(q('status-quote'), "".concat(result.quoteAmount, " ").concat(result.quoteSymbol));
	        break;
	    }

	    forEach(fields, function (field, index) {
	      if (index === activeIndex) {
	        field.style.display = 'block';
	      } else {
	        field.style.display = 'none';
	      }
	    });
	  },
	  startCountdown: function startCountdown(regularTask, endTask) {
	    var _this6 = this;

	    clearInterval(this.countdownPoll);
	    var expire = this.payments.expire;

	    var task = function task() {
	      var diff = expire - Math.ceil(new Date().getTime() / 1000);

	      if (diff >= 0) {
	        regularTask(diff);
	      } else {
	        clearInterval(_this6.countdownPoll);
	        clearInterval(_this6.paymentResultPoll);
	        endTask();
	      }
	    };

	    this.countdownPoll = setInterval(task, 1000);
	    task();
	  },
	  startQueryOrder: function startQueryOrder() {
	    var _this7 = this;

	    clearInterval(this.paymentResultPoll);
	    var _this$payments2 = this.payments,
	        clientId = _this$payments2.clientId,
	        traceId = _this$payments2.traceId;
	    this.paymentResultPoll = setInterval(function () {
	      _this7.$apis.getPaymentResult(clientId, traceId).then(function (data) {
	        var d = data.data;
	        var statusChanged = false;
	        var page = '';

	        if (_this7.result.status !== d.status) {
	          statusChanged = true;
	        }

	        _this7.result.status = d.status;
	        _this7.result.payableAmount = d.payableAmount;
	        _this7.result.paymentAmount = d.paymentAmount;
	        _this7.result.paymentSymbol = d.paymentSymbol;
	        _this7.result.quoteAmount = d.quoteAmount;
	        _this7.result.quoteSymbol = d.quoteSymbol;
	        _this7.result.txid = d.txid;
	        _this7.result.date = d.date;
	        _this7.result.failureCode = d.failureCode;
	        _this7.result.failureReason = d.failureReason;
	        _this7.result.surplusAmount = d.surplusAmount;

	        switch (_this7.result.status) {
	          case 'unpaid':
	            if (_this7.isUserConfirmed) {
	              page = 'checking';
	            }

	            break;

	          case 'pending':
	            clearInterval(_this7.countdownPoll);
	            page = 'pending';
	            break;

	          case 'failed':
	            clearInterval(_this7.countdownPoll);
	            clearInterval(_this7.paymentResultPoll);
	            page = 'failed';
	            dispatchEvent(_this7.$element, EVENT_PAYMENT_FAILED, {
	              code: d.failureCode,
	              reason: d.failureReason
	            });
	            break;

	          case 'success':
	            clearInterval(_this7.countdownPoll);
	            clearInterval(_this7.paymentResultPoll);
	            page = 'success';
	            dispatchEvent(_this7.$element, EVENT_PAYMENT_SUCCESS);
	            break;
	        }

	        if (statusChanged && page) {
	          _this7.renderPage(page);
	        }
	      }).catch(function () {});
	    }, 5000);
	  },
	  destroy: function destroy() {
	    clearInterval(this.countdownPoll);
	    clearInterval(this.paymentResultPoll);
	    this.unbind();

	    if (this.$wrapper && this.$element) {
	      this.$wrapper.removeChild(this.$element);
	    }
	  },
	  bind: function bind() {
	    var $element = this.$element,
	        options = this.options;
	    if (!$element) return;

	    if (isFunction(options.onReady)) {
	      addListener($element, EVENT_READY, options.onReady);
	    }

	    if (isFunction(options.onShow)) {
	      addListener($element, EVENT_MODAL_SHOW, options.onShow);
	    }

	    if (isFunction(options.onClose)) {
	      addListener($element, EVENT_MODAL_CLOSE, options.onClose);
	    }

	    if (isFunction(options.onPaymentCreate)) {
	      addListener($element, EVENT_PAYMENT_CREATE, options.onPaymentCreate);
	    }

	    if (isFunction(options.onPaymentSuccess)) {
	      addListener($element, EVENT_PAYMENT_SUCCESS, options.onPaymentSuccess);
	    }

	    if (isFunction(options.onPaymentFail)) {
	      addListener($element, EVENT_PAYMENT_FAILED, options.onPaymentFail);
	    }
	  },
	  unbind: function unbind() {
	    var $element = this.$element,
	        options = this.options;
	    if (!$element) return;

	    if (isFunction(options.onReady)) {
	      removeListener($element, EVENT_READY, options.onReady);
	    }

	    if (isFunction(options.onShow)) {
	      removeListener($element, EVENT_MODAL_SHOW, options.onShow);
	    }

	    if (isFunction(options.onClose)) {
	      removeListener($element, EVENT_MODAL_CLOSE, options.onClose);
	    }

	    if (isFunction(options.onPaymentCreate)) {
	      removeListener($element, EVENT_PAYMENT_CREATE, options.onPaymentCreate);
	    }

	    if (isFunction(options.onPaymentSuccess)) {
	      removeListener($element, EVENT_PAYMENT_SUCCESS, options.onPaymentSuccess);
	    }

	    if (isFunction(options.onPaymentFail)) {
	      removeListener($element, EVENT_PAYMENT_FAILED, options.onPaymentFail);
	    }
	  },
	  show: function show() {
	    if (this.options.isModal && !this.isShow) {
	      this.isShow = true;
	      setStyle(this.$element, 'display', 'block');
	      dispatchEvent(this.$element, EVENT_MODAL_SHOW);
	    }

	    return this;
	  },
	  hide: function hide() {
	    if (this.options.isModal && this.isShow) {
	      this.isShow = false;
	      setStyle(this.$element, 'display', 'none');
	      dispatchEvent(this.$element, EVENT_MODAL_CLOSE);
	    }

	    return this;
	  }
	};

	MixPay.setOptionDefault = function (options) {
	  assign(OPTIONS_DEFAULT, isPlainObject(options) && options);
	};

	MixPay.setPaymentDefault = function (options) {
	  assign(PAYMENT_DEFAULT, isPlainObject(options) && options);
	};

	MixPay.setLang = function (options) {
	  assign(LANG, isPlainObject(options) && options);
	};

	MixPay.setConfig = function (options) {
	  assign(CONFIG, isPlainObject(options) && options);
	};

	MixPay.newUUID = genUuid;

	return MixPay;

}));
