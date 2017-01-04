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
	
  /**
   * Creates a new mark at given point
	 * 
	 * @param {Number} percentage of left dist within scrollbar
	 * @method createNewMark
   */
  createNewMark(point) {
		options = {
			time: [point, point],
			vertical: this.vertical()
		};
		
    let newMark = new MarkItem(this.player(), options);
   	return this.addChild(newMark);
  }
  
	/**
	 * Removes the current mark
	 * 
	 * @method deleteNewMark
	 */
  deleteNewMark() {
    this.el().removeChild(this.activeMark);
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
   * Gets the mouse position in percentage x y within this element
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