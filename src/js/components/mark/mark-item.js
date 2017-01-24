/**
 * @file mark-item.js
 */

import * as Dom from '../utils/dom.js';
import * as Guid from '../utils/guid.js';

import mergeOptions from '../utils/merge-options.js';
import Log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';
import {assign} from '../utils/obj.js';

import config from '../../config.js';

class MarkItem extends Component {
	constructor(player, options){
		options = mergeOptions(MarkItem.prototype.options_, options);
		super(player, options);
				
		this.position_ = {};
		
		if (!!options.position) {
			this.setElPosition(options.position);
		} else {
			Log.warn('defaulting position of item');
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
		props = assign({
			startPoint: 0,
      className: 'ntk-mark-item'
		}, props);
		
		attrs = assign({
			id: this.id()
		}, attrs);
		
		return super.createEl(tag, props, attrs);
	}
	
	/**
	 * Sets the position of the item
	 *
	 * @param {Object} position 
	 *				ratio of pointer position to parent element width
	 *				where pointer position is taken from left edge of 
	 *				the parent element
	 * @method setPosition
	 */
	setElPosition(position) {
		let percent = {};
		
		for (let side in position) {
			if (typeof position[side] === "number") {
				// add percent sign later
				percent[side] = (position[side] * 100).toFixed(2);
			} 
		}
		
		if (percent.left) {
			let left = percent.left;
			this.el().style.left = left + "%";
			
			this.position_["left"] = position.left;
		}
		
		if (position.right) {
			let right = 100 - percent.right;
			this.el().style.right = right + "%";
			
			this.position_["right"] = position.right;
		}
	}
	
	/**
	 * Get the position of the item
	 *
	 * @return {Object} Position object with left and right values
	 * @method getPosition
	 */
	getPosition() {
		return this.position_;
	}
}

MarkItem.prototype.options_ = config.MarkItem;

Component.registerComponent('MarkItem', MarkItem);
export default MarkItem;