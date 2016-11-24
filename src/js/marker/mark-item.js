/**
 * @file mark-item.js
 */

import * as Dom from '../utils/dom.js';
import * as Guid from '../utils/guid.js';

import mergeOptions from '../utils/merge-options.js';
import log from '../utils/log.js';

import config from '../config.js';
import {Component} from '../videojs-classes.js';


class MarkItem extends Component {
	constructor(player, options){
		options = mergeOptions(MarkItem.prototype.options_, options);
		super(player, options);
		
		if (!!this.player_.el().ntk) {
			this.player_.el().ntk.activeMark = this.el();
		} else {
			this.player_.el().ntk = {activeMark: this.el()};
		}
	}
	
	createEl() {
		var tag = 'li';
		var props = {
			startPoint: 0,
      className: this.options_.className.active
		};
		var attrs = {
			id: `${this.options_.idPrefix}${Guid.newGUID().toString()}`
		}
		return Dom.createEl(tag, props, attrs);
	}
	
	handleClick(event) {
		
	}
}

MarkItem.prototype.options_ = config.MarkItem;

Component.registerComponent('MarkItem', MarkItem);
export default MarkItem;