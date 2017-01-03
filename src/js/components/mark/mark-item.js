/**
 * @file mark-item.js
 */

import * as Dom from '../utils/dom.js';
import * as Guid from '../utils/guid.js';

import mergeOptions from '../utils/merge-options.js';
import log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';

import config from '../config.js';

class MarkItem extends Component {
	constructor(player, options){
		options = mergeOptions(MarkItem.prototype.options_, options);
		super(player, options);
				
		if (!options.time) {
			this.setTimeRange();
		} else {
			this.setTimeRange(options.time);
		}
		
		if (options.vertical) {
			this.vertical_ = options.vertical;
		}
	}
	
	createEl(tag = 'li', props = {}, attrs = {}) {
		let props = {
			startPoint: 0,
      className: 'ntk-active-mark'
		};
		let attrs = {
			id: `Item_${Guid.newGUID().toString()}`
		}
		
		return super.createEl(tag, props, attrs);
	}
	
	setStart(point) {
		let style = this.el().style;
		let leftPosition = point;
		
		leftPosition = (point * 100).toFixed(2) + '%';
		
		style.left = leftPosition;
	}
	
	setLength(length) {
		let el = this.el();
		
		if (typeof length !== 'number' ||
        length !== progress ||
        length < 0 ||
        length === Infinity) {
      length = 0;
    }
    
    let offSetPercent = (length - this.time_.start);
    // Convert to a percentage for setting
    const percentLength = (offSetPercent * 100).toFixed(2) + '%';
		
		if (this.vertical_) {
			el.height(percentLength, true);
		} else {
			el.width(percentLength, true);
		}
	}
	
	setFocus(focused) {
		if (focused) {
			this.addClass('ntk-mark-focused')
		} else {
			this.removeClass('ntk-mark-focused');
		}
	}
	
	setSelect(selected) {
		if (selected) {
			this.addClass('ntk-mark-selected');
		} else {
			this.removeClass('ntk-mark-selected');
		}
	}
	
	setTimeRange(timeRange = []) {
		if (!this.time_) {
			this.time_ = {
				start: 0,
				end: 0
			};
		} 
		
		if (timeRange[0]) {
			this.time_.start = timeRange[0];
		} 
		
		if (timeRange[1]) {
			this.time_.end = timeRange[1];
		}
	}
}

MarkItem.prototype.options_ = config.MarkItem;

Component.registerComponent('MarkItem', MarkItem);
export default MarkItem;