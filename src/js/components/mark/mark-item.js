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
				
		if (options.time || options.position) {
			this.setTimeRange(options.time || options.position);
		} else {
			this.setTimeRange();
		}
		
		if (options.vertical) {
			this.vertical_ = options.vertical;
		}
			
		this.id_ = `Item_${Guid.newGUID().toString()}`;
	}
	
	createEl(tag = 'li', props = {}, attrs = {}) {
		let props = {
			startPoint: 0,
      className: 'ntk-active-mark'
		};
		let attrs = {
			id: this.id()
		}
		
		return super.createEl(tag, props, attrs);
	}
	
	/**
	 * Sets the starting point of the mark
	 *
	 * @param {Number} point Left position of mark in percent
	 * @param {Boolean} left True if point indicates left pos, false otherwise
	 * @method setStart
	 */
	setStart(point, left = true) {
		let style = this.el().style;
		let position = 0;
		
		position = (point * 100).toFixed(2) + '%';
		
		if (left) {
			style.left = position;
		} else {
			style.right = position;
		}
	}
	
	/**
	 * Sets width/height of item based on vertical flag
	 *
	 * @param {Number} length Length of the item in percent or decimal value
	 * @method setLength
	 */
	setLength(length) {
		let el = this.el();
    
		const percentLength;
		
		if (length === 'string' && 
				length.indexOf('%') != -1) {
			percentLength = length;
		} else {
			const percentLength = (length * 100).toFixed(2) + '%';
		}
    let offSetPercent = (length - this.time_.start);
    // Convert to a percentage for setting
		
		if (this.vertical_) {
			el.height(percentLength, true);
		} else {
			el.width(percentLength, true);
		}
	}
	
	setFocusClass(focused) {
		if (focused) {
			this.addClass('ntk-mark-focused')
		} else {
			this.removeClass('ntk-mark-focused');
		}
	}
	
	setSelectClass(selected) {
		if (selected) {
			this.addClass('ntk-mark-selected');
		} else {
			this.removeClass('ntk-mark-selected');
		}
	}
	
	/**
	 * Sets the time range info to item object
	 * 
	 * @param {Object} timeRange Should include 'start' and 'end' props
	 * @method setTimeRange
	 */
	setTimeRange(timeRange = {}) {
		if (!this.time_) {
			this.time_ = {
				start: 0,
				end: 0
			};
		} 
		
		// don't use merge because we only want start and end
		if (timeRange.start && typeof timeRange.start === "number") {
			this.time_.start = timeRange.start;
		} else
		
		if (timeRange.end && typeof timeRange.end === "number") {
			this.time_.end = timeRange.end;
		}
	}
}

MarkItem.prototype.options_ = config.MarkItem;

Component.registerComponent('MarkItem', MarkItem);
export default MarkItem;