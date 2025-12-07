function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * ScrollBox - Modern ES6+ Scrollbox Plugin
 * (c) 2009-2025 Hunter Wu <hunter.wu@gmail.com>
 * MIT Licensed.
 *
 * Modernized vanilla JavaScript version with no dependencies
 * https://github.com/wmh/scrollbox
 */
var ScrollBox = /*#__PURE__*/function () {
  function ScrollBox(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, ScrollBox);
    this.element = element;
    this.config = _objectSpread({
      linear: false,
      startDelay: 2,
      delay: 3,
      step: 5,
      speed: 32,
      switchItems: 1,
      direction: 'vertical',
      distance: 'auto',
      autoPlay: true,
      onMouseOverPause: true,
      paused: false,
      queue: null,
      listElement: 'ul',
      listItemElement: 'li',
      infiniteLoop: true,
      switchAmount: 0,
      afterForward: null,
      afterBackward: null,
      triggerStackable: false
    }, options);
    this.config.scrollOffset = this.config.direction === 'vertical' ? 'scrollTop' : 'scrollLeft';
    if (this.config.queue) {
      this.config.queue = document.getElementById(this.config.queue);
    }
    this.scrollingId = null;
    this.nextScrollId = null;
    this.paused = false;
    this.switchCount = 0;
    this.stackedTriggerIndex = 0;
    this.containerUL = null;
    this.init();
  }
  return _createClass(ScrollBox, [{
    key: "init",
    value: function init() {
      var _this = this;
      if (this.config.onMouseOverPause) {
        this.element.addEventListener('mouseover', function () {
          _this.paused = true;
        });
        this.element.addEventListener('mouseout', function () {
          _this.paused = false;
        });
      }
      this.containerUL = this.element.querySelector("".concat(this.config.listElement, ":first-child"));
      if (!this.containerUL) {
        console.error('ScrollBox: No list element found');
        return;
      }

      // Init default switchAmount
      if (this.config.infiniteLoop === false && this.config.switchAmount === 0) {
        this.config.switchAmount = this.containerUL.children.length;
      }

      // Bind custom events
      this.element.addEventListener('resetClock', function (e) {
        var _e$detail;
        return _this.resetClock((_e$detail = e.detail) === null || _e$detail === void 0 ? void 0 : _e$detail.delay);
      });
      this.element.addEventListener('forward', function () {
        return _this.onForward();
      });
      this.element.addEventListener('backward', function () {
        return _this.onBackward();
      });
      this.element.addEventListener('pauseHover', function () {
        return _this.pauseHover();
      });
      this.element.addEventListener('forwardHover', function () {
        return _this.forwardHover();
      });
      this.element.addEventListener('speedUp', function (e) {
        var _e$detail2;
        return _this.speedUp((_e$detail2 = e.detail) === null || _e$detail2 === void 0 ? void 0 : _e$detail2.speed);
      });
      this.element.addEventListener('speedDown', function (e) {
        var _e$detail3;
        return _this.speedDown((_e$detail3 = e.detail) === null || _e$detail3 === void 0 ? void 0 : _e$detail3.speed);
      });
      this.element.addEventListener('updateConfig', function (e) {
        return _this.updateConfig(e.detail);
      });
      if (this.config.autoPlay) {
        this.nextScrollId = setTimeout(function () {
          return _this.forward();
        }, this.config.startDelay * 1000);
      }
    }
  }, {
    key: "scrollForward",
    value: function scrollForward() {
      var _this2 = this;
      if (this.paused) return;
      var curLi = this.containerUL.querySelector("".concat(this.config.listItemElement, ":first-child"));
      if (!curLi) return;
      var scrollDistance = this.config.distance !== 'auto' ? this.config.distance : this.config.direction === 'vertical' ? curLi.offsetHeight + this.getMargin(curLi) : curLi.offsetWidth + this.getMargin(curLi);
      var newScrollOffset;
      if (!this.config.linear) {
        var theStep = Math.max(3, parseInt((scrollDistance - this.element[this.config.scrollOffset]) * 0.3, 10));
        newScrollOffset = Math.min(this.element[this.config.scrollOffset] + theStep, scrollDistance);
      } else {
        newScrollOffset = Math.min(this.element[this.config.scrollOffset] + this.config.step, scrollDistance);
      }
      this.element[this.config.scrollOffset] = newScrollOffset;
      if (newScrollOffset >= scrollDistance) {
        // Reset scroll BEFORE moving elements to prevent bounce
        this.element[this.config.scrollOffset] = 0;
        for (var i = 0; i < this.config.switchItems; i++) {
          if (this.config.queue && this.config.queue.querySelector(this.config.listItemElement)) {
            var _this$containerUL$que;
            this.containerUL.appendChild(this.config.queue.querySelector(this.config.listItemElement));
            (_this$containerUL$que = this.containerUL.querySelector("".concat(this.config.listItemElement, ":first-child"))) === null || _this$containerUL$que === void 0 || _this$containerUL$que.remove();
          } else {
            var firstChild = this.containerUL.querySelector("".concat(this.config.listItemElement, ":first-child"));
            if (firstChild) {
              this.containerUL.appendChild(firstChild);
            }
          }
          this.switchCount++;
        }
        clearInterval(this.scrollingId);
        this.scrollingId = null;
        if (typeof this.config.afterForward === 'function') {
          this.config.afterForward.call(this.element, {
            switchCount: this.switchCount,
            currentFirstChild: this.containerUL.querySelector("".concat(this.config.listItemElement, ":first-child"))
          });
        }
        if (this.config.triggerStackable && this.stackedTriggerIndex !== 0) {
          this.releaseStack();
          return;
        }
        if (this.config.infiniteLoop === false && this.switchCount >= this.config.switchAmount) {
          return;
        }
        if (this.config.autoPlay) {
          this.nextScrollId = setTimeout(function () {
            return _this2.forward();
          }, this.config.delay * 1000);
        }
      }
    }
  }, {
    key: "scrollBackward",
    value: function scrollBackward() {
      var _this3 = this;
      if (this.paused) return;
      if (this.element[this.config.scrollOffset] === 0) {
        // Get scroll distance BEFORE moving elements
        var lastChild = this.containerUL.querySelector("".concat(this.config.listItemElement, ":last-child"));
        if (!lastChild) return;
        var scrollDistance = this.config.distance !== 'auto' ? this.config.distance : this.config.direction === 'vertical' ? lastChild.offsetHeight : lastChild.offsetWidth;

        // Set scroll position BEFORE moving elements
        this.element[this.config.scrollOffset] = scrollDistance;
        for (var i = 0; i < this.config.switchItems; i++) {
          var last = this.containerUL.querySelector("".concat(this.config.listItemElement, ":last-child"));
          var first = this.containerUL.querySelector("".concat(this.config.listItemElement, ":first-child"));
          if (last && first) {
            this.containerUL.insertBefore(last, first);
          }
        }
        return;
      }
      var newScrollOffset;
      if (!this.config.linear) {
        var theStep = Math.max(3, parseInt(this.element[this.config.scrollOffset] * 0.3, 10));
        newScrollOffset = Math.max(this.element[this.config.scrollOffset] - theStep, 0);
      } else {
        newScrollOffset = Math.max(this.element[this.config.scrollOffset] - this.config.step, 0);
      }
      this.element[this.config.scrollOffset] = newScrollOffset;
      if (newScrollOffset === 0) {
        this.switchCount--;
        clearInterval(this.scrollingId);
        this.scrollingId = null;
        if (typeof this.config.afterBackward === 'function') {
          this.config.afterBackward.call(this.element, {
            switchCount: this.switchCount,
            currentFirstChild: this.containerUL.querySelector("".concat(this.config.listItemElement, ":first-child"))
          });
        }
        if (this.config.triggerStackable && this.stackedTriggerIndex !== 0) {
          this.releaseStack();
          return;
        }
        if (this.config.autoPlay) {
          this.nextScrollId = setTimeout(function () {
            return _this3.forward();
          }, this.config.delay * 1000);
        }
      }
    }
  }, {
    key: "getMargin",
    value: function getMargin(element) {
      var style = window.getComputedStyle(element);
      var marginTop = parseInt(style.marginTop) || 0;
      var marginBottom = parseInt(style.marginBottom) || 0;
      var marginLeft = parseInt(style.marginLeft) || 0;
      var marginRight = parseInt(style.marginRight) || 0;
      return this.config.direction === 'vertical' ? marginTop + marginBottom : marginLeft + marginRight;
    }
  }, {
    key: "forward",
    value: function forward() {
      var _this4 = this;
      clearInterval(this.scrollingId);
      this.scrollingId = setInterval(function () {
        return _this4.scrollForward();
      }, this.config.speed);
    }
  }, {
    key: "backward",
    value: function backward() {
      var _this5 = this;
      clearInterval(this.scrollingId);
      this.scrollingId = setInterval(function () {
        return _this5.scrollBackward();
      }, this.config.speed);
    }
  }, {
    key: "forwardHover",
    value: function forwardHover() {
      var _this6 = this;
      this.config.autoPlay = true;
      this.paused = false;
      clearInterval(this.scrollingId);
      this.scrollingId = setInterval(function () {
        return _this6.scrollForward();
      }, this.config.speed);
    }
  }, {
    key: "pauseHover",
    value: function pauseHover() {
      this.paused = true;
    }
  }, {
    key: "resetClock",
    value: function resetClock(delay) {
      var _this7 = this;
      if (delay !== undefined) {
        this.config.delay = delay;
      }
      clearTimeout(this.nextScrollId);
      if (this.config.autoPlay) {
        this.nextScrollId = setTimeout(function () {
          return _this7.forward();
        }, this.config.delay * 1000);
      }
    }
  }, {
    key: "releaseStack",
    value: function releaseStack() {
      var _this8 = this;
      if (this.stackedTriggerIndex === 0) return;
      if (this.stackedTriggerIndex > 0) {
        this.stackedTriggerIndex--;
        this.nextScrollId = setTimeout(function () {
          return _this8.forward();
        }, 0);
      } else {
        this.stackedTriggerIndex++;
        this.nextScrollId = setTimeout(function () {
          return _this8.backward();
        }, 0);
      }
    }
  }, {
    key: "onForward",
    value: function onForward() {
      if (this.config.triggerStackable) {
        if (this.scrollingId !== null) {
          this.stackedTriggerIndex++;
        } else {
          this.forward();
        }
      } else {
        clearTimeout(this.nextScrollId);
        this.forward();
      }
    }
  }, {
    key: "onBackward",
    value: function onBackward() {
      if (this.config.triggerStackable) {
        if (this.scrollingId !== null) {
          this.stackedTriggerIndex--;
        } else {
          this.backward();
        }
      } else {
        clearTimeout(this.nextScrollId);
        this.backward();
      }
    }
  }, {
    key: "speedUp",
    value: function speedUp(speed) {
      if (speed === undefined) {
        speed = Math.max(1, parseInt(this.config.speed / 2, 10));
      }
      this.config.speed = speed;
    }
  }, {
    key: "speedDown",
    value: function speedDown(speed) {
      if (speed === undefined) {
        speed = this.config.speed * 2;
      }
      this.config.speed = speed;
    }
  }, {
    key: "updateConfig",
    value: function updateConfig(options) {
      this.config = _objectSpread(_objectSpread({}, this.config), options);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      clearInterval(this.scrollingId);
      clearTimeout(this.nextScrollId);
      this.element.removeEventListener('mouseover', function () {});
      this.element.removeEventListener('mouseout', function () {});
    }
  }]);
}(); // Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollBox;
} else if (typeof define === 'function' && define.amd) {
  define([], function () {
    return ScrollBox;
  });
} else {
  window.ScrollBox = ScrollBox;
}

// jQuery plugin wrapper for backward compatibility
if (typeof jQuery !== 'undefined' || typeof $ !== 'undefined') {
  var jq = jQuery || $;
  jq.fn.scrollbox = function (config) {
    return this.each(function () {
      if (!this._scrollbox) {
        this._scrollbox = new ScrollBox(this, config);
      }
    });
  };
}
