/**
 * @file select-state.js
 */

import * as Dom from '../utils/dom.js';
import mergeOptions from '../utils/merge-options.js';

import * as Logic from '../../logic/occlusion.js'

import Config from '../../config.js';
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
		options = mergeOptions(SelectState.prototype.options_, options);
		super(context, options);
	}
	
	initialize() {
		this.style_.zIndex = 100;
	}
	
	bindToContext() {
		const context = this.context_;
		
		context.on('click', Fn.bind(this, this.handleClick));
		context.on('mousedown', Fn.bind(this, this.handleMouseDown));
    context.on('touchstart', Fn.bind(this, this.handleMouseDown));
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
	
	/**
	 * Handles mark item click
	 *
	 * @param {Event} event Event object
	 * @method handleItemClick
	 */
	handleItemClick(event) {
		// do something.. 
		
		event.preventDefault();
		event.stopImmediatePropagation();
	}
	
	/**
	 * Handles mark item hover
	 */
	handleItemHover(event) {
		// do something..
		
		event.preventDefault();
		event.stopImmediatePropagation();
	}
}

SelectState.prototype.options_ = Config.SelectState;

State.registerState('Select', SelectState);
export default SelectState;