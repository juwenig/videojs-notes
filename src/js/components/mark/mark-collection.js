/**
 * @file mark.js
 */

import * as Dom from '../utils/dom.js';
import * as Guid from '../utils/guid.js';

import mergeOptions from '../utils/merge-options.js';
import log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';

import config from '../config.js';

import Board from '../board.js';

/**
 * Controls the CRUD operations for the mark items
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @MarkCollection
 */
class MarkCollection extends Board(Component) {
  constructor(player, options) {
		let id = player.id ? `${player.id()}_mark_${Guid.newGUID()}` : `mark_${Guid.newGUID()}`;
		options.id = id;
		options = mergeOptions(MarkCollection.prototype.options_, options, {id: id});
    super(player, options);
		
    this.activeMark = null;
		this.markDialog = null;
		this.markDialogOptions = config[this.options.dialogName];
		
		if ("notetaking_" in this.player()) {
			this.player().notetaking_[this.name()] = this;
		}
  }
  
  /**
   * Creates the parent element for holding all MarkCollection
	 * 
	 * @method createEl
   */
  createEl() {
    return Dom.createEl('ul', {
      className: this.options_.className
    });
  }
  
	/** ATTACH EVENT HANDLERS ON THE UL ELEMENT THAT TAKES 100% WIDTH OF 
	THE SCROLL BAR - THIS LOGIC SHOULD GO INSIDE THE STATES CLASSES**/
	handleClick() {
		
	}
	
  /**
   * Creates a new mark at given point
	 * 
	 * @param {Number} percentage of left dist within scrollbar
	 * @method createNewMark
   */
  createNewMark(point) {
    let newMark = new MarkItem(this.player(), {});
    newMark.el().startPoint = point;
   	return this.addChild(newMark);
  }
  
	/**
	 * Removes the current mark
	 * 
	 * @method deleteNewMark
	 */
  deleteNewMark() {
    this.contentEl().removeChild(this.activeMark);
  }
  
  /**
   * Handles the creation of a new mark and is API for board-create
   *
   * @param {Number} time Start time of mark
   * @method newActiveMark
   */
  startActiveMark(point) {
    let time = this.player_.duration() * point;
    this.activeMark = this.createNewMark(point);
    
    this.activeMark.el().style.left = (point * 100).toFixed(2) + '%';
  }
  
  /**
   * Draws the active Mark and is API for board-create
	 *
	 * @param progress The point along the seekbar the user has the mouse dragged over in percentage
	 * @method updateActiveMark
   */
  updateActiveMark(progress) {
    const mark = this.activeMark.el();

    if (!mark) {
      return;
    }

    // Protect against no duration and other division issues
    if (typeof progress !== 'number' ||
        progress !== progress ||
        progress < 0 ||
        progress === Infinity) {
      progress = 0;
    }
    
    let offSetPercent = (progress - this.activeMark.el().startPoint);
    // Convert to a percentage for setting
    const percentage = (offSetPercent * 100).toFixed(2) + '%';
    
    // Set the new bar width or height
    if (this.vertical()) {
      mark.style.height = percentage;
    } else {
      mark.style.width = percentage;
    }
  }
  
  /**
   * Handles the end of a new mark and is API for board-create
   *
   * @param {Number} time End time of mark
   * @method handleStart
   */
  endActiveMark(point) {
		this.activeMark.addChild(MarkCollection.prototype.options_.dialogName, options);
  }
  
	/**
   * Get percentage of video played
   *
   * @return {Number} Percentage played
   * @method getPercent
   */
  getPercent() {
    const percent = this.player_.currentTime() / this.player_.duration();

    return percent >= 1 ? 1 : percent;
  }
  
  /**
   * Calculate distance for slider
   *
   * @param {Object} event Event object
   * @method calculateDistance
   */
  calculateDistance(event) {
    const position = Dom.getPointerPosition(this.el_, event);

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

MarkCollection.prototype.options_ = config.MarkCollection;

Component.registerComponent('MarkCollection', MarkCollection);
export default MarkCollection;