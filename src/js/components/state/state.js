/**
 * @file board
 */

import * as Dom from '../utils/dom.js';
import toTitleCase from '../utils/to-title-case.js';

import Config from '../config.js';
import Board from './board.js';

/**
 * Used to interface between the 
 */
class State {
	constructor(context, options) {
		this.options_ = options;
		this.context_ = context;
		
		
	}
	
	/**
	 * Adds a state to the private states object
	 * 
	 * @param {String} name Name of the state
	 * @param {Class} state State class
	 * @return {Object}
	 * @method registerState
	 */
	static registerState(name, state){
		if (!name) {
      return;
    }

    name = toTitleCase(name);

    if (!State.states_) {
      State.states_ = {};
    }

    State.states_[name] = comp;

    return comp;
	}
	
	/**
	 * Returns the states_ object
	 *
	 * @return {Object}
	 * @method getStates
	 */
	static getStates() {
		return State.states_;	
	}
	
	/**
	 * To be implemented by subclass
	 *
	 * @param {Event} event
	 * @method handleClick
	 */
	handleClick(event) {}
	
	/**
	 * To be implemented by subclass
	 *
	 * @param {Event} event
	 * @method handleMouseDown
	 */
	handleMouseDown(event) {}
	
	/**
	 * To be implemented by subclass
	 *
	 * @param {Event} event
	 * @method handleMouseMove
	 */
	handleMouseMove(event) {}
	
	/**
	 * To be implemented by subclass
	 *
	 * @param {Event} event
	 * @method handleUp
	 */
	handleMouseUp(event) {}
}

export default State;


