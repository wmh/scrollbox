# ScrollBox

[![npm version](https://img.shields.io/npm/v/@wmh/scrollbox?label=npm&logo=npm)](https://www.npmjs.com/package/@wmh/scrollbox)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://github.com/wmh/scrollbox)
[![Vanilla JS](https://img.shields.io/badge/vanilla-JS-yellow)](https://github.com/wmh/scrollbox)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)](https://github.com/wmh/scrollbox)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/wmh/scrollbox/blob/master/LICENSE)
[![Sponsor](https://img.shields.io/badge/sponsor-💖-ff69b4)](https://github.com/sponsors/wmh)

**Version 2.0** - Modern vanilla JavaScript scrolling plugin 🎉

> **📦 Note**: This package is available on npm as `@wmh/scrollbox`. It's a modern, dependency-free vanilla JavaScript library with optional jQuery support for backward compatibility.

ScrollBox is a lightweight, zero-dependency plugin that enables you to scroll a list of HTML elements (text, images, etc.) like a carousel slider or traditional marquee. Built with modern ES6+ JavaScript with optional jQuery support for backward compatibility.

## Features

* ✨ **Zero dependencies** - Pure vanilla JavaScript
* 🚀 Modern ES6+ with backward compatibility
* 📦 Simple and lightweight (~5KB minified)
* ↕️ Vertical and horizontal scroll
* ▶️ Auto play with customizable timing
* 🔄 Multiple instances on one page
* ⏸️ Pause on hover
* 🎛️ Extensive configuration options
* ⬅️➡️ Prev / Next navigation buttons
* 🎯 Queue container for advanced usages
* 🔌 Optional jQuery plugin wrapper for legacy support
* 🐛 Bug fixes for Chrome scroll jumping (Issue #38)
* 📱 Better handling of browser zoom/resize (Issue #37)

## Installation

### NPM
```bash
npm install @wmh/scrollbox
```

> **Note**: This is a **modern vanilla JavaScript library** with zero dependencies! Optional jQuery wrapper included for backward compatibility.

### CDN
```html
<script src="https://cdn.jsdelivr.net/npm/@wmh/scrollbox@2/dist/scrollbox.min.js"></script>
```

### Direct Download
Download `scrollbox.js` or `jquery.scrollbox.js` from this repository.

### GitHub
```bash
git clone https://github.com/wmh/scrollbox.git
```

## Basic Usage

### Modern Vanilla JavaScript (Recommended)

#### 1. Include ScrollBox
```html
<script src="scrollbox.js"></script>
```

#### 2. Create HTML structure
```html
<div id="demo" class="scroll-text">
  <ul>
    <li>item 1</li>
    <li>item 2</li>
    <li>item 3</li>
  </ul>
</div>
```

#### 3. Style your elements
```css
.scroll-text {
  width: 300px;
  height: 100px;
  overflow: hidden;
}
```

#### 4. Initialize
```js
const element = document.getElementById('demo');
const scrollbox = new ScrollBox(element, {
  direction: 'vertical',
  autoPlay: true
});
```

### jQuery (Legacy Support)

#### 1. Include jQuery and ScrollBox
```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="jquery.scrollbox.js"></script>
```

#### 2. Initialize with jQuery
```js
$('#demo').scrollbox({
  direction: 'vertical',
  autoPlay: true
});
```

## API Methods

### Vanilla JavaScript
```js
const scrollbox = new ScrollBox(element, options);

// Trigger events
element.dispatchEvent(new Event('forward'));
element.dispatchEvent(new Event('backward'));
element.dispatchEvent(new CustomEvent('resetClock', { detail: { delay: 5 } }));
element.dispatchEvent(new CustomEvent('speedUp', { detail: { speed: 16 } }));
element.dispatchEvent(new CustomEvent('speedDown', { detail: { speed: 64 } }));
element.dispatchEvent(new CustomEvent('updateConfig', { 
  detail: { autoPlay: false, speed: 50 } 
}));

// Destroy instance
scrollbox.destroy();
```

### jQuery API
```js
$('#demo').trigger('forward');
$('#demo').trigger('backward');
$('#demo').trigger('resetClock', [5]);
$('#demo').trigger('speedUp', [16]);
$('#demo').trigger('speedDown', [64]);
$('#demo').trigger('updateConfig', [{ autoPlay: false }]);
```

## Migration Guide (v1 to v2)

### If you're using jQuery (minimal changes needed)
Your existing code should work with minimal changes. Just update to the latest version.

### Migrating to Vanilla JavaScript (recommended)
```js
// Old jQuery way
$('#demo').scrollbox({ direction: 'vertical' });
$('#demo').trigger('forward');

// New vanilla JS way
const scrollbox = new ScrollBox(document.getElementById('demo'), {
  direction: 'vertical'
});
document.getElementById('demo').dispatchEvent(new Event('forward'));
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- IE 11+ (with transpiled ES5 version)

## Demos

__http://wmh.github.io/scrollbox/__

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `linear` | Boolean | `false` | Use linear scrolling animation |
| `startDelay` | Number | `2` | Initial delay before scrolling starts (seconds) |
| `delay` | Number | `3` | Delay between scroll events (seconds) |
| `step` | Number | `5` | Distance of each step in pixels (for linear mode) |
| `speed` | Number | `32` | Animation speed in milliseconds |
| `switchItems` | Number | `1` | Number of items to switch per scroll |
| `direction` | String | `'vertical'` | Scroll direction: `'vertical'` or `'horizontal'` |
| `distance` | String/Number | `'auto'` | Scroll distance or `'auto'` |
| `autoPlay` | Boolean | `true` | Enable auto-scrolling |
| `onMouseOverPause` | Boolean | `true` | Pause on mouse hover |
| `infiniteLoop` | Boolean | `true` | Enable infinite looping |
| `switchAmount` | Number | `0` | Total switches before stopping (0 = infinite) |
| `afterForward` | Function | `null` | Callback after forward scroll |
| `afterBackward` | Function | `null` | Callback after backward scroll |
| `triggerStackable` | Boolean | `false` | Allow stacking trigger events |

## Advanced Examples

### Non-infinite Loop (Vanilla JS)
```js
const scrollbox = new ScrollBox(document.getElementById('demo'), {
  infiniteLoop: false,
  switchAmount: 3
});
```

### With Callback Functions (Vanilla JS)
```js
const scrollbox = new ScrollBox(document.getElementById('demo'), {
  afterForward: function(data) {
    console.log('Scrolled forward', data.switchCount);
    if (data.switchCount >= 3) {
      // Trigger backward
      const event = new Event('backward');
      this.dispatchEvent(event);
    }
  },
  afterBackward: function(data) {
    console.log('Scrolled backward', data);
  }
});
```

### Manual Controls (Vanilla JS)
```js
const scrollbox = new ScrollBox(document.getElementById('demo'), {
  autoPlay: false
});

// Control with buttons
document.getElementById('forward-btn').addEventListener('click', () => {
  const event = new Event('forward');
  document.getElementById('demo').dispatchEvent(event);
});

document.getElementById('backward-btn').addEventListener('click', () => {
  const event = new Event('backward');
  document.getElementById('demo').dispatchEvent(event);
});
```

### jQuery Examples (Legacy)

```js
// Non-infinite loop
$('#demo').scrollbox({
  infiniteLoop: false,
  switchAmount: 3
});

// With callbacks
$('#demo').scrollbox({
  afterForward: function (data) {
    console.log(data.currentFirstChild);
    if (data.switchCount >= 3) {
      $(this).trigger('backward');
    }
  },
  afterBackward: function (data) {
    console.log(data);
  }
});

// Manual controls
$('#forward-btn').click(function() {
  $('#demo').trigger('forward');
});
$('#backward-btn').click(function() {
  $('#demo').trigger('backward');
});
```

## Support the Project

If you find ScrollBox helpful, consider [sponsoring me on GitHub](https://github.com/sponsors/wmh) ☕ Your support helps maintain and improve this project!

## License

jQuery Scrollbox is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
