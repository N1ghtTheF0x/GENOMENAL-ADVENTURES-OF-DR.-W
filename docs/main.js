/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
var _currentState = /*#__PURE__*/new WeakMap();
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
    _classPrivateFieldInitSpec(this, _currentState, {
      writable: true,
      value: new _state__WEBPACK_IMPORTED_MODULE_2__["default"].Test()
    });
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
    key: "currentState",
    get: function get() {
      return _classPrivateFieldGet(this, _currentState);
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
  }, {
    key: "loadState",
    value: function loadState(State) {
      var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var state = new State();
      if (init) {
        if (!state.init(this)) throw new Error("Couldn't load ".concat(State.name, "!"));
      }
      _classPrivateFieldSet(this, _currentState, state);
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
    if (this.showFps) document.title = "FPS: ".concat(this.fps | 0);
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
      key: "init",
      value: function init() {
        return true;
      }
    }, {
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

/***/ }),

/***/ "./source/utils.ts":
/*!*************************!*\
  !*** ./source/utils.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blob2image": () => (/* binding */ blob2image),
/* harmony export */   "getTitle": () => (/* binding */ getTitle),
/* harmony export */   "isEmbedded": () => (/* binding */ isEmbedded)
/* harmony export */ });
function isEmbedded() {
  return window.frameElement != null;
}
function getTitle() {
  return "Genomenal Adventures of Dr. W";
}
function blob2image(blob) {
  return createImageBitmap(blob);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./source/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./source/utils.ts");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./source/game.ts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmbedded)()) {
          _context.next = 2;
          break;
        }
        throw new Error("Game cannot be embedded! Go to the orignal page!");
      case 2:
        _game__WEBPACK_IMPORTED_MODULE_1__["default"].Instance.start();
      case 3:
      case "end":
        return _context.stop();
    }
  }, _callee);
}))();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map