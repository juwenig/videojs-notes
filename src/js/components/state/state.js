/**
 * @file board
 */

import * as Dom from '../utils/dom.js';
import toTitleCase from '../utils/to-title-case.js';
import Log from '../utils/log.js';

import Config from '../../config.js';
import Board from './board.js';

class State {
	constructor(context, options) {
		this.options_ = options;
		this.context_ = context;
		
		if (options.name) {
			this.name_ = options.name;	
		}
	}
	
	/**
	 * Returns the name of the state
	 * 
	 * @return {String}
	 * @method name
	 */
	name() {
		return this.name_;
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
	
	/**
	 * Adds a state to the private states object
	 * 
	 * @param {String} name Name of the state
	 * @param {Class} state State class
	 * @return {Object}
	 * @method registerState
	 */
	static registerState(name, state) {
		if (!name) {
      return;
    }

    name = toTitleCase(name);

    if (!State.states_) {
      State.states_ = {};
    }
		
    State.states_[name] = state;

    return state;
	}
	
	/**
	 * Returns a specific state class
	 *
	 * @return {Object}
	 * @method getStates
	 */
	static getState(name) {
		if (!name && !State.states_) {
			return;
		}
		
		name = toTitleCase(name);
		
		if (State.states_[name]) {
			return State.states_[name];	
		} else {
			Log.Error('Cannot find state in registered states: ', name);
		}
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
}

export default State;


