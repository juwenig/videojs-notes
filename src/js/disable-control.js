/**
 * @file disable-control.js
 */

import * as Dom from './utils/dom.js';

import mergeOptions from './utils/merge-options.js';
import log from './utils/log.js';

import config from './config.js';

import BoardSelect from './board/board-select.js';
import BoardCreate from './board/board-create.js';
import {Component} from './videojs-classes.js';

/**
 * Overalys element over the player seek bar in order to inhibit triggering of seek bar events
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @DisableControl
 */
class DisableControl extends Component {
  constructor(player, options) {
    options.reportTouchActivity = false;
    options = mergeOptions(DisableControl.prototype.options_, options);
    super(player, options);
    
    player.notetaking_.marks = this.getChild('Mark');
    this.hide();
    
    this.injectEls(options.inject);
  }
  
  injectEls(mapping) {
		mapping.forEach(function(map){
			var obj = this.getChild(map.what);
			var dest = this.getChild(map.into);
			if (typeof dest.attachEls === 'function') {
				dest.attachEls(obj);
			}
		}, this);
  }
  
  createEl() {
    return Dom.createEl('div', {
      className: this.options_.className
    }, {});
  }
}

DisableControl.prototype.options_ = config.DisableControl;

Component.registerComponent('DisableControl', DisableControl);
export default DisableControl;