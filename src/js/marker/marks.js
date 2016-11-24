/**
 * @file mark.js
 */

import * as Dom from '../utils/dom.js';
import * as Guid from '../utils/guid.js';

import mergeOptions from '../utils/merge-options.js';
import log from '../utils/log.js';

import config from '../config.js';
import {Component} from '../videojs-classes.js';

import MarkDialog from '../mark-form/mark-dialog.js';
import MarkItem from './mark-item.js';

/**
 * Overlays element over the player seek bar in order to inhibit triggering of seek bar events
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @Marks
 */
class Marks extends Component {
  constructor(player, options) {
		var id = player.id ? `${player.id()}_mark_${Guid.newGUID()}` : `mark_${Guid.newGUID()}`;
		options.id = id;
		options = mergeOptions(Marks.prototype.options_, options, {id: id});
    super(player, options);
		
    this.activeMark = null;
		this.markDialog = null;
		this.markDialogOptions = config[this.options.dialogName];
  }
  
  /**
   * Creates the parent element for holding all marks
	 * 
	 * @method createEl
   */
  createEl() {
    return Dom.createEl('ul', {
      className: this.options_.className
    });
  }
  
  /**
   * Creates a new mark at given point
	 * 
	 * @param {Number} percentage of left dist within scrollbar
	 * @method createNewMark
   */
  createNewMark(point) {
    var newMark = new MarkItem(this.player(), {})
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
		var options = {
			markID: this.activeMark.el().id
		}
		this.activeMark.addChild(Marks.prototype.options_.dialogName, options);
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

Marks.prototype.options_ = config.Marks;

Component.registerComponent('Marks', Marks);
export default Marks;