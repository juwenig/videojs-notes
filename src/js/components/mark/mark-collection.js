/**
 * @file mark-collection.js
 */

import * as Dom from '../utils/dom.js';
import * as Guid from '../utils/guid.js';
import mergeOptions from '../utils/merge-options.js';
import Log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';

import config from '../../config.js';

import MarkItem from './mark-item.js';

/**
 * Controls the CRUD operations for the mark items
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @MarkCollection
 */
class MarkCollection extends Component {
  constructor(player, options) {
		options = mergeOptions(MarkCollection.prototype.options_, options);
    super(player, options);
		
    this.mark_ = null;
  }
  
  /**
   * Creates the parent element for holding all MarkCollection
	 * 
	 * @return {HTMLElement}
	 * @method createEl
   */
  createEl() {
    const el = Dom.createEl('div', {
      className: 'ntk-mark-collection'
    });
		
		this.contentEl_ = Dom.createEl('div', {
			className: 'ntk-board'
		});
		
		el.appendChild(this.contentEl_);
		
		return el;
  }
	
	/**
	 * Gets the most recently added mark
	 * 	- useful for consecutive operations of creating then updating item
	 *
	 * @method getCurrentMark
	 */
	getCurrentMark(){
		return this.mark_;
	}
	
	/**
	 * Gets the mark of mark id
	 * 
	 * @param {String} markID The id of the mark
	 * @returns {MarkItem}
	 * @method getMark
	 */
	getMark(markID) {
		if (MarkCollection.marks[markID]) {
			return MarkCollection.marks[markID];
		} else {
			Log.Error('missing id encountered');
			return null;
		}
	}
  
	/**
	 * Removes the current mark
	 * 
	 * @method removeMark
	 */
 	removeMark(markID) {
		let mark = this.getMark(markID); 
    this.el().removeChild(mark.el());
		
		mark.dispose();
		MarkCollection.marks[mark.id()] = null;
  }
	
	/**
	 * Adds a mark to the collection object
	 *
	 * @returns mark
	 * @method addMark
	 */
	addMark(options = {}) {
		let mark = new MarkItem(this.player(), options);
		this.addChild(mark);
		
		// add reference to most recent mark
		this.mark_ = mark;
		
		MarkCollection.marks[mark.id()] = mark;
		return mark.id();
	}
  
  /**
   * Gets the mouse position in percentage x y within this element
   *
   * @param {Object} event Event object
   * @method calculateDistance
   */
  calculateDistance(event) {
    const position = Dom.getPointerPosition(this.contentEl(), event);

    if (this.vertical()) {
      return position.y;
    }
    return position.x;
  }
  
  /**
   * Gets the vertical status of slider bars from player's control bar
   * 
   * @method vertical()
   */
  vertical() {
    let controlBar = this.player_.getChild('controlBar');
    let progressControl = controlBar.getChild('progressControl');
    let seekBar = progressControl.getChild('seekBar');

    return seekBar.vertical();
  }
	
}

/**
 * Holds the marks elements 
 * Make sure set to null when destroying the mark-collection
 * by including it in the dispose method
 */
MarkCollection.marks = {};

MarkCollection.prototype.options_ = config.MarkCollection;

Component.registerComponent('MarkCollection', MarkCollection);
export default MarkCollection;