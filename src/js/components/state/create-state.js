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
 * Handles events for creating marks
 * 
 * @param {Player|Object} player
 * @param {Object=} options
 * @class CreateState
 */
class CreateState {
	constructor(context) {
		this = context;
	}
	
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
    const doc = this[this.options_.mark.toLocaleLowerCase()].el_.ownerDocument;
    
    event.preventDefault();
    Dom.blockTextSelection();

		this.on(doc, 'mousemove', this.handleMouseMove);
    this.on(doc, 'mouseup', this.handleMouseUp);
    this.on(doc, 'touchend', this.handleMouseUp);

    let startPoint = this.calculateDistance(event);
    
    this[this.options_.mark.toLocaleLowerCase()].startActiveMark(startPoint);
    this.handleMouseMove(event);
  }
  
  /**
   * Draws the highlighted segment by calling Marks API
   *
   * @param {Event} event
   * @method handleMouseMove
   */
  handleMouseMove(event){
    let progress = this.calculateDistance(event);
    this[this.options_.mark.toLocaleLowerCase()].updateActiveMark(progress);
  }
  
  /**
   * Triggers the mark end event for the active mark
   *
   * @param {Object} event Event object
   * @method handleMouseUp
   */
  handleMouseUp(event) {
    const doc = this[this.options_.mark.toLocaleLowerCase()].el_.ownerDocument;
    
    Dom.unblockTextSelection();
    
    this.off(doc, 'mousemove', this.handleMouseMove);
    this.off(doc, 'mouseup', this.handleMouseUp);
    this.off(doc, 'touchend', this.handleMouseUp);
    
    let endPoint = this.calculateDistance(event);
    this[this.options_.mark.toLocaleLowerCase()].endActiveMark(endPoint);
  }
}

CreateState.prototype.options_ = config.CreateState;

export default CreateState;