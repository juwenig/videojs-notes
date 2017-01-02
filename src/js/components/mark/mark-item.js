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
		
		if (!!this.player_.el().ntk) {
			this.player().el().ntk.activeMark = this.el();
		} else {
			this.player().el().ntk = {activeMark: this.el()};
		}
		
		this.addMarkItemListeners();
		
		if ("notetaking_" in this.player()) {
			this.player().notetaking_[this.name()] = this;
		}
	}
	
	createEl() {
		let tag = 'li';
		let props = {
			startPoint: 0,
      className: this.options_.className.active
		};
		let attrs = {
			id: `${this.options_.idPrefix}${Guid.newGUID().toString()}`
		}
		
		return Dom.createEl(tag, props, attrs);
	}
	
	setStart(point) {
		let style = this.el().style;
		let leftPosition = point;
		
		leftPosition = (point * 100).toFixed(2) + '%';
		style.left = leftPosition;
	}
	
	setLength(dimension, length) {
		let el = this.el();
		
		if (dimension === "height") {
			el.height(length, true);
		} else if (dimension === "width") {
			el.width(length, true);
		}
	}
	
	setFocus(focused) {
		if (focused) {
			this.addClass('ntk-focus-mark')
		} else {
			this.removeClass('ntk-focus-mark');
		}
	}
	
	setSelect(selected) {
		if (selected) {
			this.addClass('ntk-select-mark');
		} else {
			this.removeClass('ntk-select-mark');
		}
	}
	
	/****** THIS REQUIRES OCCLUSION RULE *******/
	handleClick(event) {
		this.el_.style["border"] = "1px solid white"
		this.el_.style["border-radius"] = "5px";
	}
	
	/****** THIS REQUIRES OCCLUSION RULE *******/
	handleHover(event) {
		this.el_.style["border"] = "1px solid yellow"
		this.el_.style["border-radius"] = "5px";
	}
}

MarkItem.prototype.options_ = config.MarkItem;

Component.registerComponent('MarkItem', MarkItem);
export default MarkItem;