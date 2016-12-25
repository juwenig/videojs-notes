/**
 * @file board
 */

import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge-options.js';

import * as Logic from '../../logic/occlusion.js'

import Config from '../../config.js';
import Board from '../board.js';
import State from './state.js';

/**
 * Handles events for selecting marks
 * 
 * @param {Player|Object} player
 * @param {Object=} options
 * @class SelectState
 */
class SelectState extends State {
	constructor(context, options) {
		options = mergeOptions(NormalState.prototype.options_, options);
		super(context, options);
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
		
		Logic.update();
		
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

SelectState.prototype.options_ = Config.SelectState;

State.registerState('Select', SelectState);
export default SelectState;