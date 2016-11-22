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
    
    player.notetaking_.marks = this.getChild('Marks');
    this.hide();
    
    this.injectEls(options.inject);
  }
  
	/**
	 * Attaches elements from source to dest
	 * ie. Attaches Mark object to board create and board select
	 *
	 * @param mapping Maps what object needs to be attached to what
	 * @method injectEls
	 */
  injectEls(mapping) {
		mapping.forEach(function(map){
			var obj = this.getChild(map.src);
			var dest = this.getChild(map.dest);
			if (typeof dest.attachEls === 'function') {
				dest.attachEls(obj);
			}
		}, this);
  }
  
	/**
	 * Creates a DisableControl element
	 *
	 * @method createEl
	 */
  createEl() {
    return Dom.createEl('div', {
      className: this.options_.className
    }, {});
  }
}

DisableControl.prototype.options_ = config.DisableControl;

Component.registerComponent('DisableControl', DisableControl);
export default DisableControl;