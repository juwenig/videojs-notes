/**
 * @file mark.js
 */

import * as Dom from '../utils/dom.js';
import * as Guid from '../utils/guid.js';
import mergeOptions from '../utils/merge-options.js';
import log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';

import config from '../../config.js';

import Dialog from '../mark-dialog/dialog.js';

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
	
 
	/// REMOVE BELOW
	/**
   * Creates a new mark at given point
	 * 
	 * @param {Number} percentage of left dist within scrollbar
	 * @param {Boolean} set start flag if starting to create new, false if ending 
	 * @method createNewMark
   */
  createMark(options, start = true) {
		options = mergeOptions({
			time: [],
			vertical: this.vertical()
		}, options);
		
		if (start) {
			let newMark = new MarkItem(this.player(), options);
			this.addChild(newMark);
			
			return newMark.id();
		} else {
			
		}
    
  }
	
	readMark(markID) {
		
	}
  
	/**
	 * Removes the current mark
	 * 
	 * @method deleteNewMark
	 */
  deleteMark(markID) {
		this.readMark(markID); 
    this.el().removeChild();
  }
	
	/**
	 * 
	 */
  updateMark(markID, options) {
		
	}
	//// REMOVE ABOVE
	
	/**
	 * 
	 */
	addMark()
  
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