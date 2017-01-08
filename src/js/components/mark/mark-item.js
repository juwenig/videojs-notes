/**
 * @file mark-item.js
 */

import * as Dom from '../utils/dom.js';
import * as Guid from '../utils/guid.js';

import mergeOptions from '../utils/merge-options.js';
import Log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';

import config from '../config.js';

class MarkItem extends Component {
	constructor(player, options){
		options = mergeOptions(MarkItem.prototype.options_, options);
		super(player, options);
				
		if (options.position) {
			this.setPosition(options.position);
		} else {
			Log.warn('defaulting position of item');
		}
		
		if (options.vertical) {
			this.vertical_ = options.vertical;
		} else {
			Log.warn('not known if vertical');
		}
		
		if (options.anchor) {
			this.anchor_ = options.anchor;
		}
			
		this.id_ = `Item_${Guid.newGUID().toString()}`;
	}
	
	/**
   * Creates the MarkItem element
	 * 
	 * @return {HTMLElement}
	 * @method createEl
   */
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
	 * Gets the position where mouse down event happened
	 * Applies to the case when the user interacts with the 
	 * scroll bar in order to create an item
	 * 
	 * @return {Number} 
	 * @method getAnchor
	 */
	getAnchor() {
		return this.anchor_;
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
	 * Sets the position of the item
	 *
	 * @param {Object} position Contains the left and right positions in percent
	 * @method setPosition
	 */
	setPosition(position) {
		for (let side in position) {
			if (typeof position[side] === "number") {
				position[side] = (position[side] * 100).toFixed(2) + "%";
			} else if (typeof position[side] === "string") {
				if (position[side].indexOf("%") === -1) {
					position[side] = position[side] + "%";
				}
			}
		}
		
		if (position.left) {
			this.el().style.left = position.left;
		}
		
		if (position.right) {
			this.el().style.right = position.right;	
		}
	}
	
	/**
	 * Get the position of the item
	 *
	 * @return {Object} Position object with left and right values
	 * @method getPosition
	 */
	getPosition() {
		let position = {
			left: this.el().style.left,
			right: this.el().style.right
		}
		
		return position;
	}
}

MarkItem.prototype.options_ = config.MarkItem;

Component.registerComponent('MarkItem', MarkItem);
export default MarkItem;