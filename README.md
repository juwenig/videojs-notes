# videojs-notetaking

A note taking plugin that allows users to annotate and take snapshots of video segments for their own note taking use.

## Installation

```sh
npm install --save videojs-notetaking
```

The npm installation is preferred, but Bower works, too.

```sh
bower install  --save videojs-notetaking
```

## Usage

To include videojs-notetaking on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-notetaking.min.js"></script>
<script>
  var player = videojs('my-video');

  player.notetaking();
</script>
```

### Browserify

When using with Browserify, install videojs-notetaking via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-notetaking');

var player = videojs('my-video');

player.notetaking();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-notetaking'], function(videojs) {
  var player = videojs('my-video');

  player.notetaking();
});
```

## License

MIT. Copyright (c) Shota Makino &lt;shota.makino@yahoo.com&gt;


[videojs]: http://videojs.com/
