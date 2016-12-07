/**
 * @file board
 */

import * as Dom from '../utils/dom.js';

import mergeOptions from '../utils/merge-options.js';
import log from '../utils/log.js';
import {Component} from '../utils/vjs-classes.js';

import config from '../config.js';
import Board from './board.js';

/**
 * Handles events for selecting marks
 * 
 * @param {Player|Object} player
 * @param {Object=} options
 * @class MarkCreate
 */
class MarkSelect {
  /**
	 * Stops propogation of marks element click event to parent elements
	 */
	handleClick(event) {
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
	/**
   * Triggers the mark start event for a new active mark
   * 
   * @param {Object} event Event object
   * @method handleMouseDown
   */
  handleMouseDown(event) {
    event.preventDefault();
		event.stopImmediatePropagation();
  }
  
  /**
   * Draws the highlighted segment by calling Marks API
   *
   * @param {Event} event
   * @method handleMouseMove
   */
  handleMouseMove(event){
    event.preventDefault();
		event.stopImmediatePropagation();
  }
  
  /**
   * Triggers the mark end event for the active mark
   *
   * @param {Object} event Event object
   * @method handleMouseUp
   */
  handleMouseUp(event) {
    event.preventDefault();
		event.stopImmediatePropagation();
  }
}

MarkSelect.prototype.options_ = config.MarkSelect;

Component.registerComponent('MarkSelect', MarkSelect)
export default MarkSelect;