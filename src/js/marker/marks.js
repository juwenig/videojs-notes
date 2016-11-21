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

/**
 * Private global variables
 */
var _startTimes = [];
var _endTimes = [];
var _markIDs = [];

var _guids = 0;


/**
 * Overlays element over the player seek bar in order to inhibit triggering of seek bar events
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @Marks
 */
class Marks extends Component {
  constructor(player, options) {
		options = mergeOptions(Mark.prototype.options_, options);
    super(player, options);
    this.player_ = player;
		
		// require an id just in case there are multiple feeds associated to this
    if (player && player.id && player.id()) {
      this.id_ = `${player.id()}_mark_${Guid.newGUID()}`;
    }  
    
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
   * Gets the markup for creating the mark
	 * 
	 * @method getMarkup
   */
  getMarkup() {
    return {
      tag: 'li',
      properties: {
        startPoint: 0,
        className: this.options_.activeClassName
      },
      attributes: {
        id: this.options_.idPrefix + (_guids++).toString()
      }
    }
  }
  
  /**
   * Creates a new mark at given point
	 * 
	 * @param {Number} percentage of left dist within scrollbar
	 * @method createNewMark
   */
  createNewMark(point) {
    const childNodes = this.contentEl().children;
    const refNode = childNodes[childNodes.length] || null;
    
    let markup = this.getMarkup();
    markup.properties.startPoint = point;
    let el = Dom.createEl(markup.tag, markup.properties, markup.attributes);
    
    let activeMark = this.contentEl().insertBefore(el, refNode);
    
    return activeMark
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
    
    this.setMarkStartTime(time);
    this.activeMark = this.createNewMark(point);
    
    this.activeMark.style.left = (point * 100).toFixed(2) + '%';
  }
  
  /**
   * Draws the active Mark and is API for board-create
	 *
	 * @param progress The point along the seekbar the user has the mouse dragged over in percentage
	 * @method updateActiveMark
   */
  updateActiveMark(progress) {
    const mark = this.activeMark;

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
    
    let offSetPercent = (progress - this.activeMark.startPoint);
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
		var options = mergeOptions(config[Mark.prototype.options_.dialogName], {mark: this});
    //this.markDialog = new MarkDialog(this.player_, options);
		this.activeMark.addChild('MarkDialog', options);
		
		// We use this in replacement of addChild because we need a markDialog for each end of a mark
		//this.activeMark.insertBefore(this.markDialog.createDialog(), null);
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
  
	/**
	 * Saves the mark time in the _startTimes array
	 *  
	 * @param {Number} time The start time of the mark
	 * @method setMarkStartTime
	 */
  setMarkStartTime(time) {
    _startTimes.push(time);
  }
  
  endMarkStartTime(time) {
    _endTimes.push(time);
  }
}

Marks.prototype.options_ = config.Marks;

Component.registerComponent('Marks', Marks);
export default Marks;