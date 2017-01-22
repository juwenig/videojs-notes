/**
 * Mark Collection component
 * 		UI object that lays over the slider bar
 * 		to give access to mark item creation.
 * 
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
		
		this.contentEl_ = Dom.createEl('ul', {
			className: 'ntk-board vjs-progress-holder'
		});
		
		el.appendChild(this.contentEl_);
		
		return el;
  }
	
	/**
	 * Removes all marks from the static marks list
	 * 
	 * @method removeAllMarks
	 */
	removeAllMarks() {
		for (id in MarkCollection.prototype.marks) {
			delete MarkCollection.prototype.marks[id];
		}
		
		MarkCollection.prototype.marks = {};
	}
	
	/**
	 * Returns the marks_ - all mark items
	 *
	 * @return {Object} mark
	 * @method getAllMarks
	 */
	getAllMarks(){
		return MarkCollection.prototype.marks;	
	}
	
	/**
	 * Gets the mark of mark id
	 * 
	 * @param {String} markID The id of the mark
	 * @returns {MarkItem}
	 * @method getMark
	 */
	getMark(markID) {
		if (MarkCollection.prototype.marks[markID]) {
			return MarkCollection.prototype.marks[markID];
		} else {
			Log.Error('missing id encountered');
			return null;
		}
	}
  
	/**
	 * Removes the current mark
	 * 
	 * @param {String} markID The id of the mark
	 * @method removeMark
	 */
 	removeMark(markID) {
		let mark = this.getMark(markID); 
		
		if (mark) {
			mark.dispose();
		}

		MarkCollection.prototype.marks[markID] = null;
  }
	
	/**
	 * Adds a mark to the collection object
	 *
	 * @param {Object} options Options for MarkItem
	 * @return {MarkItem}
	 * @method addMark
	 */
	addMark(mark) {
		this.addChild(mark);
		
		MarkCollection.prototype.marks[mark.id()] = mark;
		return mark;
	}
  
	/**
	 * Creates a dialog and checks if there is an active mark
	 */
	
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
   * @method vertical
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
MarkCollection.prototype.marks = {};

MarkCollection.prototype.options_ = config.MarkCollection;

Component.registerComponent('MarkCollection', MarkCollection);
export default MarkCollection;