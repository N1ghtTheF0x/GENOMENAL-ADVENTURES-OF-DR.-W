"use strict";
(self["webpackChunk_igem_gaofw"] = self["webpackChunk_igem_gaofw"] || []).push([["source_game_ts"],{

/***/ "./source/game.ts":
/*!************************!*\
  !*** ./source/game.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _graphics_canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphics/canvas */ "./source/graphics/canvas.ts");
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input */ "./source/input.ts");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./source/state.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _canvas = /*#__PURE__*/new WeakMap();
var _input = /*#__PURE__*/new WeakMap();
var _handle = /*#__PURE__*/new WeakMap();
var _lastTime = /*#__PURE__*/new WeakMap();
var _currentTime = /*#__PURE__*/new WeakMap();
var _loop = /*#__PURE__*/new WeakSet();
var _update = /*#__PURE__*/new WeakSet();
var Game = /*#__PURE__*/function () {
  function Game() {
    _classCallCheck(this, Game);
    _classPrivateMethodInitSpec(this, _update);
    _classPrivateMethodInitSpec(this, _loop);
    _classPrivateFieldInitSpec(this, _canvas, {
      writable: true,
      value: new _graphics_canvas__WEBPACK_IMPORTED_MODULE_0__["default"]()
    });
    _classPrivateFieldInitSpec(this, _input, {
      writable: true,
      value: new _input__WEBPACK_IMPORTED_MODULE_1__["default"]()
    });
    _classPrivateFieldInitSpec(this, _handle, {
      writable: true,
      value: NaN
    });
    _classPrivateFieldInitSpec(this, _lastTime, {
      writable: true,
      value: 0
    });
    _classPrivateFieldInitSpec(this, _currentTime, {
      writable: true,
      value: 0
    });
    _defineProperty(this, "currentState", new _state__WEBPACK_IMPORTED_MODULE_2__["default"].Test());
    _defineProperty(this, "showFps", false);
    Object.defineProperty(window, "game", {
      value: this,
      writable: false
    });
  }
  _createClass(Game, [{
    key: "Canvas",
    get: function get() {
      return _classPrivateFieldGet(this, _canvas);
    }
  }, {
    key: "Input",
    get: function get() {
      return _classPrivateFieldGet(this, _input);
    }
  }, {
    key: "time",
    get: function get() {
      return _classPrivateFieldGet(this, _currentTime) - _classPrivateFieldGet(this, _lastTime);
    }
  }, {
    key: "delta",
    get: function get() {
      return this.time / 1000;
    }
  }, {
    key: "fps",
    get: function get() {
      return 1 / this.delta;
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;
      _classPrivateFieldGet(this, _canvas).element.focus();
      _classPrivateFieldSet(this, _handle, requestAnimationFrame(function (time) {
        return _classPrivateMethodGet(_this, _loop, _loop2).call(_this, time);
      }));
    }
  }, {
    key: "stop",
    value: function stop() {
      cancelAnimationFrame(_classPrivateFieldGet(this, _handle));
    }
  }, {
    key: "restart",
    value: function restart() {
      this.stop();
      this.start();
    }
  }]);
  return Game;
}();
function _loop2(time) {
  var _this2 = this;
  _classPrivateFieldSet(this, _lastTime, _classPrivateFieldGet(this, _currentTime));
  _classPrivateFieldSet(this, _currentTime, time);
  _classPrivateFieldGet(this, _input).update();
  _classPrivateMethodGet(this, _update, _update2).call(this);
  _classPrivateFieldSet(this, _handle, requestAnimationFrame(function (time) {
    return _classPrivateMethodGet(_this2, _loop, _loop2).call(_this2, time);
  }));
}
function _update2() {
  if (this.currentState) {
    var state = this.currentState;
    state.input(this);
    state.update(this);
    state.draw(this);
    if (this.showFps) {
      document.title = "FPS: ".concat(this.fps | 0);
    }
  }
}
_defineProperty(Game, "Instance", new Game());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./source/graphics/canvas.ts":
/*!***********************************!*\
  !*** ./source/graphics/canvas.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./source/math.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function getCanvas() {
  var canvas = document.createElement("canvas");
  canvas.id = "iGEM-game-canvas";
  canvas.tabIndex = 0;
  canvas.width = Canvas.WIDTH;
  canvas.height = Canvas.HEIGHT;
  canvas.style.inset = "0";
  canvas.style.height = "100%", canvas.style.width = "auto";
  canvas.style.imageRendering = "pixelated";
  canvas.style.backgroundColor = "white";
  canvas.style.outline = "none";
  return canvas;
}
function getContainer() {
  var div = document.createElement("div");
  div.id = "iGEM-game-container";
  div.style.position = "fixed";
  div.style.inset = "0";
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.textAlign = "center";
  div.style.backgroundColor = "black";
  div.style.imageRendering = "pixelated";
  div.style.outline = "none";
  return div;
}
function getContext(html) {
  var context = html.getContext("2d");
  if (context == null) throw new Error("2D Graphics are not available!");
  context.imageSmoothingEnabled = false;
  return context;
}
var _div = /*#__PURE__*/new WeakMap();
var _canvas = /*#__PURE__*/new WeakMap();
var _context = /*#__PURE__*/new WeakMap();
var Canvas = /*#__PURE__*/function () {
  function Canvas() {
    _classCallCheck(this, Canvas);
    _classPrivateFieldInitSpec(this, _div, {
      writable: true,
      value: getContainer()
    });
    _classPrivateFieldInitSpec(this, _canvas, {
      writable: true,
      value: getCanvas()
    });
    _classPrivateFieldInitSpec(this, _context, {
      writable: true,
      value: getContext(_classPrivateFieldGet(this, _canvas))
    });
    _defineProperty(this, "drawHitbox", false);
    _classPrivateFieldGet(this, _div).append(_classPrivateFieldGet(this, _canvas));
    document.body.appendChild(_classPrivateFieldGet(this, _div));
  }
  _createClass(Canvas, [{
    key: "element",
    get: function get() {
      return _classPrivateFieldGet(this, _canvas);
    }
  }, {
    key: "container",
    get: function get() {
      return _classPrivateFieldGet(this, _div);
    }
  }, {
    key: "draw",
    value: function draw() {
      for (var _len = arguments.length, items = new Array(_len), _key = 0; _key < _len; _key++) {
        items[_key] = arguments[_key];
      }
      for (var _i = 0, _items = items; _i < _items.length; _i++) {
        var item = _items[_i];
        if (!Canvas.inside(item)) continue;
        item.draw(_classPrivateFieldGet(this, _context));
        if (this.drawHitbox) item.drawHitbox(_classPrivateFieldGet(this, _context));
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      _classPrivateFieldGet(this, _context).clearRect(0, 0, Canvas.WIDTH, Canvas.HEIGHT);
    }
  }]);
  return Canvas;
}();
(function (_Canvas) {
  var WIDTH = _Canvas.WIDTH = 320;
  var HEIGHT = _Canvas.HEIGHT = 200;
  function inside(item) {
    var left = -item.rect.width;
    var right = WIDTH + item.rect.width;
    var top = -item.rect.height;
    var bottom = HEIGHT + item.rect.height;
    var bbox = (0,_math__WEBPACK_IMPORTED_MODULE_0__.createBBos)(item.rect);
    return left < bbox.left && right > bbox.right && top < bbox.top && bottom > bbox.bottom;
  }
  _Canvas.inside = inside;
})(Canvas || (Canvas = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Canvas);

/***/ }),

/***/ "./source/graphics/item.ts":
/*!*********************************!*\
  !*** ./source/graphics/item.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math */ "./source/math.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var CanvasItem = /*#__PURE__*/function () {
  function CanvasItem(rect) {
    _classCallCheck(this, CanvasItem);
    _defineProperty(this, "rotation", 0);
    this.rect = rect;
    this.origin = (0,_math__WEBPACK_IMPORTED_MODULE_0__.Vector2)(rect.width / 2, rect.height / 2);
  }
  _createClass(CanvasItem, [{
    key: "rotationDeg",
    get: function get() {
      return this.rotation * 180 / Math.PI;
    },
    set: function set(val) {
      this.rotation = val * Math.PI / 180;
    }
  }, {
    key: "rotate",
    value: function rotate(context) {
      context.translate(this.rect.x + this.origin.x | 0, this.rect.y + this.origin.y | 0);
      context.rotate(this.rotation | 0);
      context.translate((this.rect.x + this.origin.x | 0) * -1, (this.rect.y + this.origin.y | 0) * -1);
    }
  }, {
    key: "drawHitbox",
    value: function drawHitbox(context) {
      context.save();
      this.rotate(context);
      context.strokeStyle = CanvasItem.HITBOX_COLOR;
      context.strokeRect(this.rect.x | 0, this.rect.y | 0, this.rect.width | 0, this.rect.height | 0);
      context.restore();
    }
  }]);
  return CanvasItem;
}();
_defineProperty(CanvasItem, "HITBOX_COLOR", "red");
(function (_CanvasItem) {
  var Rectangle = /*#__PURE__*/function (_CanvasItem2) {
    _inherits(Rectangle, _CanvasItem2);
    var _super = _createSuper(Rectangle);
    function Rectangle(rect) {
      var _this;
      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "black";
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "fill";
      _classCallCheck(this, Rectangle);
      _this = _super.call(this, rect);
      _this.style = style;
      _this.mode = mode;
      return _this;
    }
    _createClass(Rectangle, [{
      key: "draw",
      value: function draw(context) {
        context.save();
        this.rotate(context);
        context["".concat(this.mode, "Style")] = this.style;
        context["".concat(this.mode, "Rect")](this.rect.x | 0, this.rect.y | 0, this.rect.width | 0, this.rect.height | 0);
        context.restore();
      }
    }]);
    return Rectangle;
  }(CanvasItem);
  _CanvasItem.Rectangle = Rectangle;
  var Image = /*#__PURE__*/function (_CanvasItem3) {
    _inherits(Image, _CanvasItem3);
    var _super2 = _createSuper(Image);
    function Image(image, pos) {
      var _this2;
      var source = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _objectSpread(_objectSpread({}, Image.getSize(image)), {}, {
        x: 0,
        y: 0
      });
      var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Image.getSize(image);
      _classCallCheck(this, Image);
      _this2 = _super2.call(this, _objectSpread(_objectSpread({}, pos), size));
      _this2.image = image;
      _this2.source = source;
      return _this2;
    }
    _createClass(Image, [{
      key: "draw",
      value: function draw(context) {
        context.save();
        this.rotate(context);
        context.drawImage(this.image, this.source.x | 0, this.source.y | 0, this.source.width | 0, this.source.height | 0, this.rect.x | 0, this.rect.y | 0, this.rect.width | 0, this.rect.height | 0);
        context.restore();
      }
    }], [{
      key: "getSize",
      value: function getSize(image) {
        var width = typeof image.width == "number" ? image.width : image.width.baseVal.value;
        var height = typeof image.height == "number" ? image.height : image.height.baseVal.value;
        return {
          width: width,
          height: height
        };
      }
    }]);
    return Image;
  }(CanvasItem);
  _CanvasItem.Image = Image;
  var Text = /*#__PURE__*/function (_CanvasItem4) {
    _inherits(Text, _CanvasItem4);
    var _super3 = _createSuper(Text);
    function Text(pos, text) {
      var _this3;
      var font = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "monospace";
      var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 11;
      var mode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "fill";
      _classCallCheck(this, Text);
      _this3 = _super3.call(this, _objectSpread(_objectSpread({}, pos), {}, {
        width: 0,
        height: height
      }));
      _this3.text = text;
      _this3.font = font;
      _this3.mode = mode;
      return _this3;
    }
    _createClass(Text, [{
      key: "draw",
      value: function draw(context) {
        var m = context.measureText(this.text);
        this.rect.width = m.width;
        context.save();
        this.rotate(context);
        context.font = "".concat(this.rect.height, "px ").concat(this.font);
        context["".concat(this.mode, "Text")](this.text, this.rect.x | 0, this.rect.y | 0, this.rect.width | 0);
        context.restore();
      }
    }]);
    return Text;
  }(CanvasItem);
  _CanvasItem.Text = Text;
})(CanvasItem || (CanvasItem = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasItem);

/***/ }),

/***/ "./source/input.ts":
/*!*************************!*\
  !*** ./source/input.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Input = /*#__PURE__*/function () {
  function Input() {
    var _this = this;
    _classCallCheck(this, Input);
    _defineProperty(this, "keyboard", {});
    _defineProperty(this, "mouse", [false, false, false, false, false]);
    _defineProperty(this, "mousePos", {
      x: 0,
      y: 0
    });
    _defineProperty(this, "gamepads", []);
    window.addEventListener("keydown", function (ev) {
      ev.preventDefault();
      _this.keyboard[ev.key.toLowerCase()] = true;
    });
    window.addEventListener("keyup", function (ev) {
      ev.preventDefault();
      _this.keyboard[ev.key.toLowerCase()] = false;
    });
    window.addEventListener("keypress", function (ev) {
      ev.preventDefault();
      _this.keyboard[ev.key.toLowerCase()] = true;
    });
    window.addEventListener("mousedown", function (ev) {
      ev.preventDefault();
      _this.mouse[ev.button] = true;
    });
    window.addEventListener("mouseup", function (ev) {
      ev.preventDefault();
      _this.mouse[ev.button] = false;
    });
    window.addEventListener("mousemove", function (ev) {
      ev.preventDefault();
      _this.mousePos = {
        x: ev.x,
        y: ev.y
      };
    });
    window.addEventListener("contextmenu", function (ev) {
      return ev.preventDefault();
    });
  }
  _createClass(Input, [{
    key: "update",
    value: function update() {
      this.gamepads = navigator.getGamepads();
    }
  }]);
  return Input;
}();
(function (_Input) {
  var MouseButton;
  (function (MouseButton) {
    MouseButton[MouseButton["Main"] = 0] = "Main";
    MouseButton[MouseButton["Auxiliary"] = 1] = "Auxiliary";
    MouseButton[MouseButton["Secondary"] = 2] = "Secondary";
    MouseButton[MouseButton["Back"] = 3] = "Back";
    MouseButton[MouseButton["Forward"] = 4] = "Forward";
    MouseButton[MouseButton["Count"] = 5] = "Count";
  })(MouseButton || (MouseButton = {}));
  _Input.MouseButton = MouseButton;
})(Input || (Input = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Input);

/***/ }),

/***/ "./source/math.ts":
/*!************************!*\
  !*** ./source/math.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rect": () => (/* binding */ Rect),
/* harmony export */   "Size": () => (/* binding */ Size),
/* harmony export */   "Vector2": () => (/* binding */ Vector2),
/* harmony export */   "createBBos": () => (/* binding */ createBBos)
/* harmony export */ });
function Vector2(x, y) {
  return {
    x: x,
    y: y
  };
}
function Size(width, height) {
  return {
    width: width,
    height: height
  };
}
function Rect(x, y, width, height) {
  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}
function createBBos(rect) {
  return {
    left: rect.x,
    right: rect.x + rect.width,
    top: rect.y,
    bottom: rect.y + rect.height
  };
}

/***/ }),

/***/ "./source/state.ts":
/*!*************************!*\
  !*** ./source/state.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _graphics_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./graphics/item */ "./source/graphics/item.ts");
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math */ "./source/math.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


var State = /*#__PURE__*/_createClass(function State() {
  _classCallCheck(this, State);
});
(function (_State) {
  var Test = /*#__PURE__*/function (_State2) {
    _inherits(Test, _State2);
    var _super = _createSuper(Test);
    function Test() {
      var _this;
      _classCallCheck(this, Test);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      _defineProperty(_assertThisInitialized(_this), "speed", 200);
      _defineProperty(_assertThisInitialized(_this), "rotation", 0);
      _defineProperty(_assertThisInitialized(_this), "pos", (0,_math__WEBPACK_IMPORTED_MODULE_1__.Vector2)(0, 0));
      _defineProperty(_assertThisInitialized(_this), "down", false);
      _defineProperty(_assertThisInitialized(_this), "up", false);
      _defineProperty(_assertThisInitialized(_this), "left", false);
      _defineProperty(_assertThisInitialized(_this), "right", false);
      _defineProperty(_assertThisInitialized(_this), "rotUp", false);
      _defineProperty(_assertThisInitialized(_this), "rotDown", false);
      return _this;
    }
    _createClass(Test, [{
      key: "update",
      value: function update(game) {
        if (this.up) this.pos.y -= game.delta * this.speed;
        if (this.down) this.pos.y += game.delta * this.speed;
        if (this.left) this.pos.x -= game.delta * this.speed;
        if (this.right) this.pos.x += game.delta * this.speed;
        if (this.rotDown) this.rotation -= game.delta * 5;
        if (this.rotUp) this.rotation += game.delta * 5;
      }
    }, {
      key: "input",
      value: function input(game) {
        this.down = game.Input.keyboard["arrowdown"];
        this.up = game.Input.keyboard["arrowup"];
        this.left = game.Input.keyboard["arrowleft"];
        this.right = game.Input.keyboard["arrowright"];
        this.rotDown = game.Input.keyboard["q"];
        this.rotUp = game.Input.keyboard["e"];
      }
    }, {
      key: "draw",
      value: function draw(game) {
        game.Canvas.clear();
        var item = new _graphics_item__WEBPACK_IMPORTED_MODULE_0__["default"].Rectangle(_objectSpread({
          width: 30,
          height: 30
        }, this.pos), "red", "fill");
        item.rotationDeg = this.rotation;
        game.Canvas.draw(item);
      }
    }]);
    return Test;
  }(State);
  _State.Test = Test;
})(State || (State = {}));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (State);

/***/ })

}]);
//# sourceMappingURL=source_game_ts.main.js.map